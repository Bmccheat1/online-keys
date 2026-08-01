/**
 * CheckoutTrigger — "Pay Now" flow
 * =================================
 *
 * Uses the OFFICIAL QuickGateway Embed SDK (loaded by LINK from
 * https://quickgateway.in/sdk/quickgateway.js in index.html — NOT copied,
 * so it auto-updates whenever the gateway ships a new version).
 *
 * Flow:
 *   1. initiateOrder() prop → OUR backend reserves a key + creates the
 *      QuickGateway payment (paymentId) — reservation stays server-side.
 *   2. window.QuickGateway.showCheckout({ paymentId, ... }) renders the
 *      gateway's own embed sheet (QR, timer, polling, success/failure).
 *   3. onSuccess({ paymentId, trxId, amount }) → onComplete() → OUR backend
 *      verifies server-to-server and delivers the key.
 *   4. onFailure(msg) → releaseReservation() → key returns to the pool.
 *
 * Fallback: if the SDK script is unreachable (gateway CDN down/slow), the
 * built-in EmbeddedCheckout sheet takes over so payments never break.
 *
 * Usage:
 *   <CheckoutTrigger
 *     initiateOrder={() => orderAPI.initiate({ productId, durationValue, durationUnit })}
 *     onComplete={(res) => setPurchasedKey(res.data)}
 *     releaseReservation={(reservationId) => orderAPI.release({ reservationId })}
 *     disabled={!selectedDuration}
 *     buttonLabel={`Pay Now — ₹${price}`}
 *   />
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import EmbeddedCheckout from './EmbeddedCheckout';
import { Spinner } from './Loading';
import toast from 'react-hot-toast';

const SDK_URL = 'https://quickgateway.in/sdk/quickgateway.js';

/**
 * Ensure the QuickGateway SDK is ready. The script tag lives in index.html;
 * this helper also self-heals (re-injects) if it was blocked or too slow.
 * Resolves true when window.QuickGateway.showCheckout is usable.
 */
function loadQuickGatewaySDK() {
  return new Promise((resolve) => {
    if (window.QuickGateway?.showCheckout) return resolve(true);
    let script = document.getElementById('qgw-sdk');
    if (!script) {
      script = document.createElement('script');
      script.id = 'qgw-sdk';
      script.src = SDK_URL;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    } else {
      // Already present (index.html tag) but not loaded yet — wait for it
      const started = Date.now();
      const check = () => {
        if (window.QuickGateway?.showCheckout) resolve(true);
        else if (Date.now() - started > 4000) resolve(false); // give up → fallback
        else setTimeout(check, 100);
      };
      check();
    }
  });
}

export default function CheckoutTrigger({
  initiateOrder,         // async () => { paymentId, reservationId }
  onComplete,            // async (initiateResponse) => ...
  releaseReservation,    // optional: (reservationId) => ... — called on failure/cancel
  disabled = false,
  buttonLabel = 'Pay Now',
  buttonClassName = '',
  children,
}) {
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const reservationRef = useRef(null);
  const successTimerRef = useRef(null);

  // Close the sheet + clear timers when the trigger unmounts
  useEffect(() => () => { if (successTimerRef.current) clearTimeout(successTimerRef.current); }, []);

  /** Close whichever sheet is open (SDK sheet or built-in fallback) */
  const closeSheet = useCallback(() => {
    try { window.QuickGateway?.close?.(); } catch { /* noop */ }
    setSheetOpen(false);
    setPaymentId(null);
  }, []);

  const handlePay = useCallback(async () => {
    if (loading || disabled) return;
    setLoading(true);
    try {
      // 1. Call initiateOrder (the website's own backend — reserves key, creates payment)
      const response = await initiateOrder();
      const data = response.data?.result || response.data || response;
      const pid = data?.paymentId || data?.id;
      if (!pid) {
        throw new Error(data?.message || 'Failed to initiate payment order');
      }
      reservationRef.current = data?.reservationId || null;

      // 2. Prefer the official QuickGateway embed SDK; fall back to the
      //    built-in sheet only if the SDK can't load.
      const sdkReady = await loadQuickGatewaySDK();
      if (sdkReady) {
        // apiBase → our backend proxy (SDK reads this at call time)
        window.QuickGatewayConfig = { apiBase: '/api/quickgateway-proxy' };
        window.QuickGateway.showCheckout({
          paymentId: pid,
          merchantName: 'Keys Store',
          onSuccess: handleSuccess,
          onFailure: (msg) => {
            toast.error(msg || 'Payment failed');
            handleFailure();
          },
          onClose: () => { setPaymentId(null); },
        });
      } else {
        setPaymentId(pid);
        setSheetOpen(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Payment initiation failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [loading, disabled, initiateOrder]);

  const handleSuccess = useCallback(async (paymentInfo) => {
    try {
      // 3. Call onComplete — backend delivers key
      const result = await onComplete(paymentInfo);
      reservationRef.current = null; // key delivered — no need to release
      // 4. Let the success animation play ~2s, then auto-close so the user
      //    lands on the Key Delivered screen (no manual close needed)
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(closeSheet, 2000);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || 'Order completion failed — contact support';
      toast.error(msg);
      throw err;
    }
  }, [onComplete, closeSheet]);

  const handleFailure = useCallback(() => {
    // Release reservation if we had one and payment wasn't completed
    if (reservationRef.current) {
      releaseReservation?.(reservationRef.current).catch(() => {});
      reservationRef.current = null;
    }
  }, [releaseReservation]);

  return (
    <>
      {children ? (
        <span
          onClick={handlePay}
          className={`inline-flex w-full ${loading ? 'pointer-events-none opacity-60' : ''} ${disabled ? 'pointer-events-none cursor-not-allowed opacity-50 select-none' : 'cursor-pointer'}`}
        >
          {children}
        </span>
      ) : (
        <button
          onClick={handlePay}
          disabled={loading || disabled}
          className={`${buttonClassName || 'btn-gold'} !py-2.5 sm:!py-3 w-full disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="xs" />
              Processing...
            </span>
          ) : buttonLabel}
        </button>
      )}

      {/* Fallback sheet — used only when the official SDK couldn't load */}
      <EmbeddedCheckout
        isOpen={sheetOpen}
        onClose={closeSheet}
        paymentId={paymentId}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </>
  );
}
