import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { productAPI, orderAPI, couponAPI } from '../api';
import { quickGatewayAPI } from '../utils/quickgateway';
import CheckoutTrigger from '../components/checkout/CheckoutTrigger';
import { ShieldCheck, Zap, KeyRound, ArrowRight, Copy, Check, ChevronDown, Tag, Clock, Percent, Sparkles, BadgeCheck } from 'lucide-react';

function Bg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#080812] to-[#0a0608]" />
      {/* Animated orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)', animation: 'drift-slow 12s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full blur-[140px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)', animation: 'drift-slower 16s ease-in-out infinite' }} />
      <div className="absolute top-1/3 -left-20 w-[300px] h-[300px] rounded-full blur-[120px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', animation: 'drift-slow 10s ease-in-out infinite reverse' }} />
      <div className="absolute bottom-1/4 right-0 w-[280px] h-[280px] rounded-full blur-[100px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', animation: 'drift-slower 14s ease-in-out infinite alternate' }} />
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}

/* ─── Countdown Timer with end date ─── */
function Countdown({ endAt }) {
  const calc = () => {
    const diff = new Date(endAt).getTime() - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true };
    return { h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000), expired: false };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endAt]);
  if (time.expired) return null;
  const endDate = new Date(endAt);
  const dateStr = endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = endDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="flex flex-col items-end gap-0.5">
      <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-mono text-amber-400 bg-amber-500/15 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg animate-pulse-glow whitespace-nowrap">
        <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
        <span className="tabular-nums">{String(time.h).padStart(2,'0')}:{String(time.m).padStart(2,'0')}:{String(time.s).padStart(2,'0')}</span>
      </div>
      <span className="text-[8px] sm:text-[9px] text-amber-500/70 whitespace-nowrap">Ends: {dateStr} {timeStr}</span>
    </div>
  );
}

/* ─── Helper: format order ID as unique ─── */
function formatOrderId(id) {
  if (!id) return '—';
  const clean = String(id).replace(/[^a-f0-9]/gi, '').slice(-12).toUpperCase();
  return clean.length >= 8 ? `LIC-${clean.slice(0,4)}-${clean.slice(4,8)}-${clean.slice(8,12)}` : `#${id.slice(-10)}`;
}

/* ─── Success View ─── */
function SuccessView({ purchasedKey, mod, onReset }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [paymentMeta, setPaymentMeta] = useState(null);
  const copyKey = () => { navigator.clipboard?.writeText(purchasedKey.key); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 2000); };
  const copyOrderText = () => { navigator.clipboard?.writeText(purchasedKey.orderId || purchasedKey.orderNumber); setCopiedOrder(true); setTimeout(() => setCopiedOrder(false), 2000); };
  const date = purchasedKey.purchasedAt ? new Date(purchasedKey.purchasedAt).toLocaleString('en-IN') : '';

  // Fetch payment details (UTR, method, etc.)
  useEffect(() => {
    if (!purchasedKey?.paymentId) return;
    quickGatewayAPI.getPaymentDetails(purchasedKey.paymentId)
      .then(res => {
        const meta = res.data?.result || res.data;
        if (meta && meta.utr) setPaymentMeta(meta);
      })
      .catch(() => {}); // silent fail — UTR is bonus
  }, [purchasedKey?.paymentId]);

  const orderLabel = purchasedKey.orderNumber
    ? `ORD-${String(purchasedKey.orderNumber).slice(-8).toUpperCase()}`
    : formatOrderId(purchasedKey.orderId);
  const utr = paymentMeta?.utr && paymentMeta.utr !== '0' ? paymentMeta.utr : null;
  const payMethod = paymentMeta?.method || null;

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-3 sm:px-4 py-4 sm:py-6 animate-fade-up">
      <div className="card-glass p-4 sm:p-5 md:p-6 relative overflow-hidden">
        {/* Success glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20 animate-success-glow" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)' }} />

        <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-glow-emerald animate-float">
          <BadgeCheck className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white text-center mb-1 font-display">Payment Successful!</h2>
        <p className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-5">{purchasedKey.product || mod?.title} — {purchasedKey.duration}</p>

        {/* License Key */}
        <div className="bg-[#050508]/80 border border-amber-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="flex items-center justify-between mb-1 sm:mb-1.5">
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium uppercase tracking-wider">Your License Key</p>
            <KeyRound className="w-3.5 h-3.5 text-amber-400/60" />
          </div>
          <p className="text-xs sm:text-sm md:text-base font-mono font-bold text-amber-400 break-all select-all">{purchasedKey.key}</p>
          <button onClick={copyKey} className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-gray-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
            {copiedKey ? <><Check className="w-3 h-3 text-emerald-400" /> <span className="text-emerald-400">Copied!</span></> : <><Copy className="w-3 h-3" /> Click to copy</>}
          </button>
        </div>

        {/* Transaction Details */}
        <div className="bg-[#050508]/60 border border-[#1e1e2e] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5 text-left">
          <p className="text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-wider font-medium">Transaction Details</p>

          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500">Order</span>
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-400/90 truncate">{orderLabel}</span>
              <button onClick={copyOrderText} className="text-gray-600 hover:text-amber-400 transition-colors shrink-0" title="Copy Order ID">
                {copiedOrder ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500">Transaction ID</span>
            <span className="text-[11px] sm:text-xs font-mono text-gray-300 truncate">{purchasedKey.transactionId ? purchasedKey.transactionId.slice(-16) : (purchasedKey.paymentId?.slice(-16) || '—')}</span>
          </div>

          {utr && (
            <div className="flex justify-between items-center gap-2">
              <span className="text-[11px] sm:text-xs text-gray-500">UTR / Ref</span>
              <span className="text-[11px] sm:text-xs font-mono text-gray-300 truncate">{utr}</span>
            </div>
          )}

          {payMethod && (
            <div className="flex justify-between items-center">
              <span className="text-[11px] sm:text-xs text-gray-500">Payment Method</span>
              <span className="text-[11px] sm:text-xs font-medium text-gray-300">{payMethod}</span>
            </div>
          )}

          {purchasedKey.discountAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-[11px] sm:text-xs text-gray-500">Coupon {purchasedKey.couponCode ? `(${purchasedKey.couponCode})` : ''}</span>
              <span className="text-[11px] sm:text-xs font-medium text-emerald-400">-₹{Number(purchasedKey.discountAmount).toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs text-gray-500">Amount Paid</span>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-400">₹{Number(purchasedKey.amount || 0).toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500">Date & Time</span>
            <span className="text-[11px] sm:text-xs text-gray-400 text-right">{date}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs text-gray-500">Status</span>
            <span className="chip-green !text-[10px]">Completed</span>
          </div>
        </div>

        <button onClick={onReset} className="btn-gold w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5" /> Buy Another Key
        </button>
      </div>
    </div>
  );
}

/* ─── Main Home ─── */
export default function Home() {
  const [mods, setMods] = useState([]);
  const [selectedMod, setSelectedMod] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedKey, setPurchasedKey] = useState(null);

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Get effective price (flash sale or normal)
  const effectivePrice = selectedDuration
    ? (selectedDuration.flashSale?.isActive && selectedDuration.flashSale?.flashPrice != null
      ? selectedDuration.flashSale.flashPrice : selectedDuration.price)
    : 0;
  const hasFlashSale = selectedDuration?.flashSale?.isActive && selectedDuration.flashSale?.flashPrice != null;
  const isFlashActive = hasFlashSale && selectedDuration.flashSale?.endAt && new Date(selectedDuration.flashSale.endAt) > new Date() && (!selectedDuration.flashSale?.startAt || new Date(selectedDuration.flashSale.startAt) <= new Date());

  // Discounted price after coupon
  const discountedPrice = appliedCoupon ? appliedCoupon.finalAmount : effectivePrice;

  const reset = () => { setPurchasedKey(null); setSelectedDuration(null); setAppliedCoupon(null); setCouponCode(''); };

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50' }).then((res) => {
      const data = res.data || [];
      setMods(data);
    }).finally(() => setLoading(false));
  }, []);

  const handleModChange = (modId) => {
    if (!modId) { setSelectedMod(null); setSelectedDuration(null); setAppliedCoupon(null); setCouponCode(''); return; }
    const mod = mods.find(m => m._id === modId);
    if (!mod) return;
    setSelectedMod(mod);
    setSelectedDuration(null);
    setAppliedCoupon(null);
    setCouponCode('');
    productAPI.getById(modId).then((r) => {
      if (r.data) setSelectedMod(r.data);
    });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) { toast.error('Enter a coupon code'); return; }
    if (!selectedDuration) { toast.error('Select a duration first'); return; }
    setCouponLoading(true);
    try {
      const res = await couponAPI.validate({
        code: couponCode.trim(),
        amount: effectivePrice,
        productId: selectedMod?._id,
      });
      setAppliedCoupon(res.data);
      toast.success(`Coupon applied! You save ₹${res.data.discountAmount.toLocaleString()}`);
    } catch (error) {
      setAppliedCoupon(null);
      toast.error(error.response?.data?.message || 'Invalid coupon');
    } finally { setCouponLoading(false); }
  };

  const handleInitiate = () => orderAPI.initiate({
    productId: selectedMod._id,
    durationValue: selectedDuration.value,
    durationUnit: selectedDuration.unit,
    couponCode: appliedCoupon?.code || '',
  });

  const handleComplete = async ({ paymentId }) => {
    const res = await orderAPI.complete({
      productId: selectedMod._id,
      durationValue: selectedDuration.value,
      durationUnit: selectedDuration.unit,
      paymentId,
      couponCode: appliedCoupon?.code || '',
    });
    setPurchasedKey(res.data);
    toast.success('Key delivered!');
  };

  const handleRelease = (reservationId) => orderAPI.release({ reservationId });

  if (loading) return <div className="min-h-screen flex items-center justify-center p-4"><div className="animate-pulse space-y-3 w-full max-w-xs sm:max-w-sm"><div className="h-12 sm:h-14 bg-[#1a1a28] rounded-xl"/><div className="h-12 sm:h-14 bg-[#1a1a28] rounded-xl"/><div className="h-14 sm:h-16 bg-[#1a1a28] rounded-xl"/></div></div>;
  if (purchasedKey) return <div className="min-h-screen flex items-center justify-center p-3 sm:p-4"><Bg /><SuccessView purchasedKey={purchasedKey} mod={selectedMod} onReset={reset} /></div>;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Bg />
      <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-5 pt-14 sm:pt-16 md:pt-20 lg:pt-24">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl animate-fade-up">

          {/* ─── Hero ─── */}
          <div className="text-center mb-5 sm:mb-7">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-3">
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400" />
              <span className="text-[10px] md:text-xs text-amber-400 font-medium tracking-wide">Instant Digital Delivery</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-display leading-tight">
              Purchase <span className="text-gradient">License Keys</span>
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-2">Select your mod, choose a duration & pay via UPI — delivered instantly</p>
          </div>

          <div className="card-glass p-4 sm:p-5 md:p-6 lg:p-7 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            {/* ─── Select Mod ─── */}
            <div className="mb-3 sm:mb-3.5 md:mb-4">
              <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5 block">Select Mod</label>
              <div className="relative group">
                <select
                  value={selectedMod?._id || ''}
                  onChange={(e) => handleModChange(e.target.value)}
                  className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl sm:rounded-2xl px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all group-hover:border-[#2a2a3e]"
                >
                  <option value="">— Select a Mod —</option>
                  {mods.map((m) => (
                    <option key={m._id} value={m._id}>{m.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* ─── Duration ─── */}
            {selectedMod && selectedMod.durations?.length > 0 && (
              <div className="mb-3 sm:mb-3.5 md:mb-4">
                <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5 block">Select Duration</label>
                {(() => {
                  const availableDurs = selectedMod.durations.filter(d => !d.isSoldOut);
                  return availableDurs.length > 0 ? (
                    <div className="relative group">
                      <select
                        value={selectedDuration ? `${selectedDuration.value}_${selectedDuration.unit}` : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) { setSelectedDuration(null); setAppliedCoupon(null); return; }
                          const [value, unit] = val.split('_');
                          const dur = selectedMod.durations.find(d => String(d.value) === value && d.unit === unit);
                          if (dur && !dur.isSoldOut) { setSelectedDuration(dur); setAppliedCoupon(null); setCouponCode(''); }
                        }}
                        className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl sm:rounded-2xl px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all group-hover:border-[#2a2a3e]"
                      >
                        <option value="">— Select duration —</option>
                        {availableDurs.map((dur, i) => {
                          const hasFS = dur.flashSale?.isActive && dur.flashSale?.flashPrice != null && new Date(dur.flashSale.endAt) > new Date() && (!dur.flashSale?.startAt || new Date(dur.flashSale.startAt) <= new Date());
                          return (
                            <option key={i} value={`${dur.value}_${dur.unit}`}>
                              {dur.label} — {hasFS ? `₹${dur.flashSale.flashPrice.toLocaleString()}` : `₹${dur.price.toLocaleString()}`}
                              {hasFS ? ' 🔥' : ''}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-500 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="text-center py-4 sm:py-5 bg-[#0a0a14]/50 rounded-xl border border-dashed border-[#1a1a28]">
                      <p className="text-gray-600 text-xs sm:text-sm">All durations are sold out for this mod</p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ─── Flash Sale Badge ─── */}
            {isFlashActive && selectedDuration?.flashSale?.endAt && (
              <div className="mb-3 sm:mb-3.5 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/25 rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-fade-in">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-amber-400 font-display">🔥 Flash Sale Active</span>
                  </div>
                  <Countdown endAt={selectedDuration.flashSale.endAt} />
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-2 flex-wrap">
                  <span className="text-[11px] sm:text-xs text-gray-500 line-through">₹{selectedDuration.price.toLocaleString()}</span>
                  <span className="text-sm sm:text-base font-bold text-amber-400">₹{selectedDuration.flashSale.flashPrice.toLocaleString()}</span>
                  {selectedDuration.price > 0 && (
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full font-semibold">
                      Save -{Math.round((1 - selectedDuration.flashSale.flashPrice / selectedDuration.price) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ─── Price Summary + Coupon ─── */}
            {selectedDuration && !selectedDuration.isSoldOut && (
              <div className="mb-4 bg-[#0a0a14]/60 border border-[#1e1e2e]/50 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 space-y-3 sm:space-y-3.5 animate-fade-in">
                {/* Price breakdown */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs md:text-sm">
                    <span className="text-gray-500">{selectedDuration.label}</span>
                    <span className="text-gray-300">₹{(hasFlashSale && isFlashActive ? selectedDuration.flashSale.flashPrice : selectedDuration.price).toLocaleString()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-[11px] sm:text-xs pt-1.5 border-t border-[#1e1e2e]/40">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <Percent className="w-3 h-3" /> {appliedCoupon.code}
                        <span className="text-[9px] text-gray-600 font-normal">applied</span>
                      </span>
                      <span className="text-emerald-400 font-semibold">-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold pt-2 border-t border-[#1e1e2e]/40">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white font-display text-base sm:text-lg">{discountedPrice > 0 ? `₹${discountedPrice.toLocaleString()}` : '₹0'}</span>
                  </div>
                </div>

                {/* Coupon input */}
                <div className={appliedCoupon ? 'opacity-70' : ''}>
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-600" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setAppliedCoupon(null); }}
                        className={`w-full bg-[#050508]/80 border rounded-lg sm:rounded-xl pl-7 sm:pl-8 pr-2 sm:pr-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${appliedCoupon ? 'border-emerald-700/40 text-emerald-400' : 'border-[#1e1e2e]'}`}
                        placeholder={appliedCoupon ? `${appliedCoupon.code} applied` : 'Enter coupon code'}
                        disabled={!!appliedCoupon}
                      />
                    </div>
                    {appliedCoupon ? (
                      <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="btn-danger !px-2.5 sm:!px-3 !py-1.5 sm:!py-2 shrink-0">
                        ✕ Remove
                      </button>
                    ) : (
                      <button onClick={handleApplyCoupon} disabled={couponLoading || !couponCode.trim()} className="text-[11px] text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all shrink-0 font-medium disabled:opacity-50">
                        {couponLoading ? <span className="inline-block w-3.5 h-3.5 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin align-middle" /> : 'Apply'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Buy button — React component approach, no SDK script */}
                <CheckoutTrigger
                  initiateOrder={handleInitiate}
                  onComplete={handleComplete}
                  releaseReservation={handleRelease}
                  disabled={!selectedMod || !selectedDuration}
                  buttonLabel={<><Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Pay ₹{discountedPrice.toLocaleString()} <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></>}
                />
              </div>
            )}

            {/* No mod selected */}
            {!selectedMod && (
              <div className="text-center py-6 sm:py-7 md:py-8 bg-[#0a0a14]/50 rounded-xl sm:rounded-2xl border border-dashed border-[#1a1a28]">
                <div className="mx-auto w-10 h-10 rounded-xl bg-[#1a1a28] flex items-center justify-center mb-2">
                  <KeyRound className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm sm:text-base font-medium">Select a Mod to Continue</p>
                <p className="text-gray-700 text-[11px] sm:text-xs mt-1">Choose a mod from the dropdown above</p>
              </div>
            )}

            {/* Mod selected but no duration selected */}
            {selectedMod && !selectedDuration && (
              <div className="text-center py-3 sm:py-4 bg-[#0a0a14]/50 rounded-xl border border-dashed border-[#1a1a28]">
                <p className="text-gray-600 text-xs sm:text-sm">Select a duration to continue</p>
              </div>
            )}

            {/* Duration sold out */}
            {selectedMod && selectedDuration?.isSoldOut && (
              <div className="text-center py-3 sm:py-4 bg-[#0a0a14]/50 rounded-xl border border-dashed border-red-500/20">
                <p className="text-red-400 text-xs sm:text-sm">This duration is sold out. Select another.</p>
              </div>
            )}

            {/* Trust indicators */}
            <div className="mt-4 sm:mt-5 pt-4 border-t border-[#1e1e2e]/40 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" /> 100% Secure</span>
              <span className="hidden sm:inline text-gray-800">•</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" /> Instant Delivery</span>
              <span className="hidden sm:inline text-gray-800">•</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" /> UPI Verified</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-700 mt-5 mb-8">
            🔒 Secured payments by QuickGateway · GPay · PhonePe · Paytm
          </p>
        </div>
      </main>
    </div>
  );
}
