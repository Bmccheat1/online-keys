/**
 * EmbeddedCheckout — Bottom Sheet Payment UI
 * ==========================================
 * 
 * Adapted from QuickGateway's EmbeddedCheckout.tsx.
 * Uses the backend proxy for API calls (no direct gateway calls).
 * 
 * Usage:
 *   <EmbeddedCheckout
 *     isOpen={isOpen}
 *     onClose={() => setIsOpen(false)}
 *     paymentId="pay_xxx123"
 *     onSuccess={({ paymentId, trxId, amount }) => ...}
 *     onFailure={(error) => ...}
 *   />
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { quickGatewayAPI } from '../../utils/quickgateway';
import { Spinner } from './Loading';
import toast from 'react-hot-toast';

// ─── Props ───────────────────────────────────────────────────
export default function EmbeddedCheckout({
  isOpen, onClose, paymentId,
  redirectUrl, onSuccess, onFailure,
}) {
  // ─── State ─────────────────────────────────────────────────
  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | pending | success | failed
  const [timeLeft, setTimeLeft] = useState(1800);
  const [qrCycleLeft, setQrCycleLeft] = useState(300);
  const [qrExpired, setQrExpired] = useState(false);
  const [qrRefreshKey, setQrRefreshKey] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [amountLocked, setAmountLocked] = useState(false);
  const [creating, setCreating] = useState(false);
  const [renderSheet, setRenderSheet] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [successAnimPhase, setSuccessAnimPhase] = useState('circle');
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [redirecting, setRedirecting] = useState(false);
  const sheetRef = useRef(null);
  const redirectTimerRef = useRef(null);

  // ─── Open/Close animation ──────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setRenderSheet(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimateIn(true)));
      setStatus('loading');
      setPayment(null);
      setTimeLeft(1800);
      setQrCycleLeft(300);
      setQrExpired(false);
      setQrRefreshKey(k => k + 1);
      setCustomAmount('');
      setAmountLocked(false);
      setSuccessAnimPhase('circle');
      setRedirectCountdown(3);
      setRedirecting(false);
    } else {
      setAnimateIn(false);
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
      const timer = setTimeout(() => setRenderSheet(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ─── Success animation sequence ────────────────────────────
  useEffect(() => {
    if (status !== 'success') return;
    const t1 = setTimeout(() => setSuccessAnimPhase('check'), 400);
    const t2 = setTimeout(() => setSuccessAnimPhase('details'), 900);
    const t3 = setTimeout(() => {
      setSuccessAnimPhase('redirect');
      setRedirectCountdown(3);
      const countInterval = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) { clearInterval(countInterval); return 0; }
          return prev - 1;
        });
      }, 1000);
      if (redirectUrl) {
        redirectTimerRef.current = setTimeout(() => {
          try {
            const url = new URL(redirectUrl);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              setRedirecting(true);
              window.location.href = redirectUrl;
            }
          } catch {}
        }, 3000);
      }
    }, 1200);
    onSuccess?.({
      paymentId: payment?.paymentId || '',
      trxId: payment?.trxId || '',
      amount: payment?.amount || 0,
    });
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current); };
  }, [status, redirectUrl, payment, onSuccess]);

  useEffect(() => {
    return () => { if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current); };
  }, []);

  // ─── Fetch payment details ─────────────────────────────────
  useEffect(() => {
    if (!isOpen || !paymentId) return;
    quickGatewayAPI.getPaymentDetails(paymentId)
      .then(res => {
        const p = res.data.result || res.data;
        if (!p.isCustomAmount && (!p.amount || p.amount <= 0)) {
          setStatus('failed');
          onFailure?.('Invalid payment amount');
          toast.error('Invalid payment amount detected.');
          return;
        }
        setPayment(p);
        if (p.createdOn) {
          const elapsedSec = Math.floor((Date.now() - new Date(p.createdOn).getTime()) / 1000);
          setTimeLeft(Math.max(0, 1800 - elapsedSec));
          setQrCycleLeft(300 - Math.min(elapsedSec % 300, 299));
          if (Math.min(elapsedSec % 300, 299) === 0 && elapsedSec > 0) setQrExpired(true);
        }
        if (p.isCustomAmount && p.amount > 0) {
          setCustomAmount(p.amount.toString());
          setAmountLocked(true);
        }
        if (p.status === 1) setStatus('success');
        else if (p.status === -1) {
          setStatus('failed');
          onFailure?.('Payment session expired');
          toast.error('Payment session expired. Request a fresh payment.');
        } else setStatus('pending');
      })
      .catch(() => {
        setStatus('failed');
        onFailure?.('Payment session invalid');
        toast.error('Payment session invalid or not found');
      });
  }, [isOpen, paymentId, onFailure]);

  // ─── Countdown timer ───────────────────────────────────────
  useEffect(() => {
    if (status !== 'pending' || !isOpen) return;
    if (timeLeft <= 0) {
      setStatus('failed');
      onFailure?.('Payment session expired');
      toast.error('Payment session expired.');
      return;
    }
    const t = setInterval(() => {
      setTimeLeft(p => Math.max(0, p - 1));
      setQrCycleLeft(p => { if (p <= 1) { setQrExpired(true); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [status, isOpen, timeLeft, onFailure]);

  // ─── Polling every 5 seconds ────────────────────────────────
  useEffect(() => {
    if (!payment || status !== 'pending' || !isOpen) return;
    const interval = setInterval(async () => {
      try {
        const res = await quickGatewayAPI.verifyPayment(payment.trxId);
        const text = typeof res.data === 'string' ? res.data : res.data?.status;
        if (text === 'SUCCESS' || text === 'ALREADY') {
          clearInterval(interval);
          try {
            const detailRes = await quickGatewayAPI.getPaymentDetails(payment.paymentId);
            setPayment({ ...payment, ...(detailRes.data.result || detailRes.data) });
          } catch {}
          setStatus('success');
        } else if (text === 'FAILURE') {
          setStatus('failed');
          onFailure?.('Payment failed');
          toast.error('Payment failed');
          clearInterval(interval);
        }
      } catch {}
    }, 5000);
    return () => clearInterval(interval);
  }, [payment, status, isOpen, onFailure]);

  // ─── Helpers ────────────────────────────────────────────────
  const getUpiUrl = useCallback(() => {
    if (!payment) return '';
    const pa = payment.upiId || `payments@${payment.method?.toLowerCase() || 'upi'}`;
    const amt = (payment.isCustomAmount && amountLocked && customAmount) ? parseFloat(customAmount) : payment.amount;
    return `upi://pay?pa=${encodeURIComponent(pa)}&am=${amt || 1}&pn=${encodeURIComponent(payment.merchantName || 'Merchant')}&tn=${payment.trxId}&tr=${payment.trxId}&mc=0000&mode=02&orgid=000000`;
  }, [payment, customAmount, amountLocked]);

  const getQrUrl = useCallback(() => {
    if (!payment) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(getUpiUrl())}`;
  }, [getUpiUrl, payment]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' + sec : sec}`;
  };

  const handleQrRetry = () => {
    setQrCycleLeft(300);
    setQrExpired(false);
    setQrRefreshKey(k => k + 1);
  };

  const handleSetAmount = async () => {
    const amt = parseFloat(customAmount);
    if (isNaN(amt) || amt < 1) { toast.error('Enter a valid amount (min ₹1)'); return; }
    try {
      setCreating(true);
      await quickGatewayAPI.setPaymentAmount(payment.paymentId, amt);
      setAmountLocked(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to set amount';
      toast.error(msg);
      if (msg === 'PAYMENT_SESSION_EXPIRED') setStatus('failed');
    } finally { setCreating(false); }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && status !== 'success') onClose();
  };

  if (!renderSheet) return null;

  return (
    <>
      <StyleInjector />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-all duration-300 ease-out"
        style={{
          backgroundColor: animateIn ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)',
          backdropFilter: animateIn ? 'blur(4px)' : 'blur(0px)',
        }}
        onClick={handleBackdropClick}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center pointer-events-none">
        <div
          ref={sheetRef}
          className="relative w-full max-w-lg bg-[#0a0a14] border border-[#1e1e2e]/80 rounded-t-3xl shadow-2xl pointer-events-auto overflow-hidden transition-all duration-400"
          style={{
            maxHeight: '92vh',
            transform: animateIn ? 'translateY(0)' : 'translateY(100%)',
            opacity: animateIn ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Handle Bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-[#1e1e2e]" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-3 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a28] hover:bg-[#2a2a3e] text-gray-500 hover:text-white transition-colors z-10 ${successAnimPhase === 'redirect' ? 'hidden' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ─── Scrollable Content ─── */}
          <div className="overflow-y-auto px-5 pb-8 pt-2" style={{ maxHeight: 'calc(92vh - 40px)' }}>

            {/* ========== LOADING ========== */}
            {status === 'loading' && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Spinner size="md" />
                <p className="text-sm text-gray-500 font-medium">Loading payment details...</p>
              </div>
            )}

            {/* ========== SUCCESS ========== */}
            {status === 'success' && (
              <div className="flex flex-col items-center text-center py-6 min-h-[300px]">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full animate-success-glow"
                    style={{
                      background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
                      transform: successAnimPhase === 'circle' ? 'scale(0.5)' : 'scale(1.5)',
                      opacity: successAnimPhase === 'circle' ? 0 : 0.6,
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center relative"
                    style={{
                      background: successAnimPhase === 'circle' ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.15)',
                      border: '2px solid rgba(16,185,129,0.4)',
                      transform: successAnimPhase === 'circle' ? 'scale(0.3)' : 'scale(1)',
                      opacity: successAnimPhase === 'circle' ? 0 : 1,
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: successAnimPhase !== 'circle' ? '0 0 40px rgba(16,185,129,0.25)' : 'none',
                    }}>
                    <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        strokeDasharray: 30,
                        strokeDashoffset: (successAnimPhase === 'circle' || successAnimPhase === 'check') ? 30 : 0,
                        transition: 'stroke-dashoffset 0.4s ease-out 0.1s',
                      }}>
                      <path d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1"
                  style={{
                    opacity: successAnimPhase === 'circle' ? 0 : 1,
                    transform: successAnimPhase === 'circle' ? 'translateY(10px)' : 'translateY(0)',
                    transition: 'all 0.5s ease-out 0.2s',
                  }}>
                  Payment Successful!
                </h3>
                <p className="text-sm text-gray-500 mb-5"
                  style={{
                    opacity: successAnimPhase === 'circle' ? 0 : 1,
                    transform: successAnimPhase === 'circle' ? 'translateY(10px)' : 'translateY(0)',
                    transition: 'all 0.5s ease-out 0.3s',
                  }}>
                  Thank you for your payment
                </p>
                <div className="w-full bg-[#050508]/80 border border-[#1e1e2e]/60 rounded-2xl p-4 text-left transition-all duration-500"
                  style={{
                    opacity: (successAnimPhase === 'circle' || successAnimPhase === 'check') ? 0 : 1,
                    transform: (successAnimPhase === 'circle' || successAnimPhase === 'check') ? 'translateY(20px)' : 'translateY(0)',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                  }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-3 text-center text-gray-600 border-b border-[#1e1e2e]/60 pb-2">Transaction Details</span>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount Paid</span>
                      <span className="font-bold text-emerald-400">₹{Number(payment?.amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transaction ID</span>
                      <span className="font-mono text-xs text-gray-400">{payment?.trxId}</span>
                    </div>
                    {payment?.utr && payment.utr !== '0' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">UTR / Ref</span>
                        <span className="font-mono text-xs text-gray-400">{payment.utr}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment ID</span>
                      <span className="font-mono text-xs text-gray-400">{payment?.paymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border border-emerald-700/50 bg-emerald-500/10 text-emerald-400">Success</span>
                    </div>
                  </div>
                </div>
                {successAnimPhase === 'redirect' && (
                  <div className="mt-5 w-full animate-fade-in">
                    {redirectUrl && !redirecting ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l2.623 2.623a9.75 9.75 0 004.598 3.366 9.75 9.75 0 005.003-.429 9.75 9.75 0 003.86-2.578 9.75 9.75 0 002.178-3.992m-2.39-10.05h-4.992m4.992 0l-2.623-2.623a9.75 9.75 0 00-4.598-3.366 9.75 9.75 0 00-5.003.429 9.75 9.75 0 00-3.86 2.579 9.75 9.75 0 00-2.178 3.991" />
                          </svg>
                          <span>Redirecting in <span className="font-bold text-white text-lg mx-0.5 tabular-nums">{redirectCountdown}</span>s...</span>
                        </div>
                        <button onClick={onClose} className="text-xs text-gray-600 hover:text-gray-300 transition-colors mt-1 underline underline-offset-2">Stay on this page</button>
                      </div>
                    ) : redirecting ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500"><Spinner size="xs" /><span>Redirecting...</span></div>
                    ) : (
                      <button onClick={onClose} className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-2">Close</button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ========== FAILED ========== */}
            {status === 'failed' && (
              <div className="flex flex-col items-center text-center py-8 animate-fade-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-red-500/10 border border-red-500/30" style={{ boxShadow: '0 0 40px rgba(239,68,68,0.2)' }}>
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Payment Failed</h3>
                <p className="text-sm text-gray-500 mb-6">Something went wrong. Please try again.</p>
                <button onClick={() => {
                  setStatus('loading');
                  setPayment(null);
                  setTimeLeft(1800);
                  setQrCycleLeft(300);
                  setQrExpired(false);
                  quickGatewayAPI.getPaymentDetails(paymentId)
                    .then(res => {
                      const p = res.data.result || res.data;
                      setPayment(p);
                      if (p.createdOn) setTimeLeft(Math.max(0, 1800 - Math.floor((Date.now() - new Date(p.createdOn).getTime()) / 1000)));
                      if (p.status === 1) setStatus('success');
                      else if (p.status === -1) setStatus('failed');
                      else setStatus('pending');
                    }).catch(() => setStatus('failed'));
                }} className="w-full py-3 px-6 rounded-2xl font-bold text-sm bg-[#1a1a28] hover:bg-[#2a2a3e] text-white border border-[#1e1e2e] transition-all active:scale-[0.98]">
                  Retry Payment
                </button>
              </div>
            )}

            {/* ========== PENDING (QR + Timer) ========== */}
            {status === 'pending' && (
              <div className="flex flex-col items-center gap-4 animate-fade-in">
                {/* Header */}
                <div className="w-full flex items-center gap-3 pb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a28] border border-[#1e1e2e] flex items-center justify-center font-bold text-white text-sm shrink-0">
                    {payment?.merchantName?.charAt(0)?.toUpperCase() || 'M'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{payment?.merchantName || 'Merchant'}</h4>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.52l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.7L23 12z" /></svg>
                      Verified Merchant
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] block uppercase font-bold tracking-wider text-gray-600">Ref ID</span>
                    <span className="text-[11px] font-mono text-gray-500">{payment?.trxId}</span>
                  </div>
                </div>

                {/* Custom Amount Input */}
                {payment?.isCustomAmount && !amountLocked ? (
                  <div className="w-full flex flex-col items-center gap-4 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Enter Amount to Pay</span>
                    <div className="relative flex items-center rounded-2xl py-4 w-full max-w-xs bg-[#050508]/80 border border-[#1e1e2e]/60">
                      <span className="absolute left-5 text-xl font-bold text-gray-500">₹</span>
                      <input type="text" inputMode="decimal" placeholder="0.00" value={customAmount}
                        onChange={e => { const v = e.target.value; if (v === '' || /^\d*\.?\d{0,2}$/.test(v)) setCustomAmount(v); }}
                        className="w-full bg-transparent text-3xl font-extrabold text-center outline-none border-none px-12 text-white" autoFocus />
                    </div>
                    <button onClick={handleSetAmount} disabled={!customAmount || parseFloat(customAmount) < 1 || creating}
                      className="w-full max-w-xs py-3.5 px-6 rounded-2xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', boxShadow: '0 4px 20px rgba(217,119,6,0.3)' }}>
                      {creating ? <span className="flex items-center justify-center gap-2"><Spinner size="xs" />Processing...</span>
                        : `Proceed to Pay ₹${customAmount ? parseFloat(customAmount).toFixed(2) : '0.00'}`}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Payable Amount</span>
                      <span className="text-3xl font-extrabold tracking-tight text-white flex items-baseline">
                        <span className="text-xl font-semibold mr-1 text-gray-500">₹</span>
                        {payment?.isCustomAmount ? parseFloat(customAmount).toFixed(2) : Number(payment?.amount || 0).toFixed(2)}
                      </span>
                      <div className={`inline-flex items-center gap-1.5 mt-3 py-1.5 px-3.5 rounded-full text-[10px] font-semibold select-none ${qrExpired ? 'bg-red-500/10 text-red-400 border border-red-800/40' : 'bg-amber-500/10 text-amber-400 border border-amber-800/40'}`}>
                        {qrExpired ? (
                          <span className="flex items-center gap-1.5 cursor-pointer" onClick={handleQrRetry}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                            QR Expired — Tap to refresh
                          </span>
                        ) : (
                          <><span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" /></span><span>Expires in {formatTime(timeLeft)}</span></>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 py-2">
                      <div className="relative p-3 rounded-2xl bg-white transition-all duration-300" style={{ opacity: qrExpired ? 0.6 : 1, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                        <img key={qrRefreshKey} src={getQrUrl()} alt="UPI QR" className="w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] block rounded-xl" />
                        {qrExpired && (
                          <button onClick={handleQrRetry} className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>
                              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l2.623 2.623a9.75 9.75 0 004.598 3.366 9.75 9.75 0 005.003-.429 9.75 9.75 0 003.86-2.578 9.75 9.75 0 002.178-3.992m-2.39-10.05h-4.992m4.992 0l-2.623-2.623a9.75 9.75 0 00-4.598-3.366 9.75 9.75 0 00-5.003.429 9.75 9.75 0 00-3.86 2.579 9.75 9.75 0 00-2.178 3.991" /></svg>
                              <span className="text-xs font-bold">Refresh QR</span>
                            </div>
                          </button>
                        )}
                      </div>
                      {!qrExpired && <p className="text-[10px] text-gray-600 text-center max-w-[240px] leading-relaxed">Scan the QR code with any UPI application to pay.</p>}
                    </div>
                    <div className="flex items-center justify-center gap-2 py-1">
                      <Spinner size="xs" />
                      <span className="text-[10px] font-medium text-gray-500">Waiting for payment detection...</span>
                    </div>
                  </>
                )}
                <div className="w-full text-center pt-2 border-t border-[#1e1e2e]/40">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-gray-700">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    <span>Secured by QuickGateway</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Inline keyframe injector (runs once) ────────────────────
function StyleInjector() {
  useEffect(() => {
    const id = 'ksw-embedded-checkout-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes success-glow { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.1); } }
      .animate-success-glow { animation: success-glow 2s ease-in-out infinite; }
      @keyframes spin-slow { to { transform: rotate(360deg); } }
      .animate-spin-slow { animation: spin-slow 1.2s linear infinite; }
      @keyframes sparkle-1 { 0%,100% { opacity:0; transform:scale(0.5) translate(0,0); } 50% { opacity:1; transform:scale(1.2) translate(5px,-5px); } }
      @keyframes sparkle-2 { 0%,100% { opacity:0; transform:scale(0.5) translate(0,0); } 50% { opacity:0.8; transform:scale(1) translate(-5px,5px); } }
      @keyframes sparkle-3 { 0%,100% { opacity:0; transform:scale(0.3) translate(0,0); } 50% { opacity:0.6; transform:scale(0.8) translate(8px,0); } }
      .tabular-nums { font-variant-numeric: tabular-nums; }
      .duration-400 { transition-duration: 400ms; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}
