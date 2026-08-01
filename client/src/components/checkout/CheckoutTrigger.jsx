/**
 * CheckoutTrigger — "Pay Now" flow using EmbeddedCheckout (React component)
 * =========================================================================
 * 
 * Replaces the old SDK script approach (loadQG() + QG.checkout()).
 * 
 * Flow:
 *   1. Calls initiateOrder() prop → backend creates order + QuickGateway payment
 *   2. Opens <EmbeddedCheckout paymentId={...} />
 *   3. On success: calls onComplete(result) → backend delivers key
 *   4. On failure: calls releaseReservation() if provided → backend releases reserved key
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

import { useState, useCallback, useRef } from 'react';
import EmbeddedCheckout from './EmbeddedCheckout';
import { Spinner } from './Loading';
import toast from 'react-hot-toast';

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
      setPaymentId(pid);
      setSheetOpen(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Payment initiation failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [loading, disabled, initiateOrder]);

  const handleSuccess = useCallback(async (paymentInfo) => {
    try {
      // 2. Call onComplete — backend delivers key
      const result = await onComplete(paymentInfo);
      reservationRef.current = null; // key delivered — no need to release
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || 'Order completion failed — contact support';
      toast.error(msg);
      throw err;
    }
  }, [onComplete]);

  const handleFailure = useCallback(() => {
    // Release reservation if we had one and payment wasn't completed
    if (reservationRef.current) {
      releaseReservation?.(reservationRef.current).catch(() => {});
      reservationRef.current = null;
    }
  }, [releaseReservation]);

  const handleClose = useCallback(() => {
    setSheetOpen(false);
    setPaymentId(null);
  }, []);

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

      <EmbeddedCheckout
        isOpen={sheetOpen}
        onClose={handleClose}
        paymentId={paymentId}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </>
  );
}
