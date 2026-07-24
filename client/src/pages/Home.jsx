import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { productAPI, orderAPI, couponAPI } from '../api';
import { ShieldCheck, Zap, KeyRound, ArrowRight, Copy, Check, ChevronDown, Tag, Clock, Percent, Sparkles } from 'lucide-react';

function loadQG() {
  return new Promise((resolve, reject) => {
    if (window.QuickGateway) return resolve(window.QuickGateway);
    const s = document.createElement('script');
    s.src = 'https://api.quickgateway.in/sdk/quickgateway.js';
    s.async = true;
    s.onload = () => window.QuickGateway ? resolve(window.QuickGateway) : reject();
    s.onerror = () => reject();
    document.head.appendChild(s);
  });
}

function Bg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#080812] to-[#0a0608]" />
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)', animation: 'float-gold 8s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 w-[350px] h-[350px] rounded-full blur-[120px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)', animation: 'float-gold-2 10s ease-in-out infinite' }} />
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

/* ─── Success View ─── */
function SuccessView({ purchasedKey, mod, onReset }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const copyKey = () => { navigator.clipboard?.writeText(purchasedKey.key); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 2000); };
  const copyOrder = () => { navigator.clipboard?.writeText(purchasedKey.orderId); setCopiedId(true); setTimeout(() => setCopiedId(false), 2000); };
  const date = purchasedKey.purchasedAt ? new Date(purchasedKey.purchasedAt).toLocaleString() : '';
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="bg-[#0d0d1a]/90 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl shadow-black/50">
        <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-xl shadow-emerald-500/30">
          <Zap className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white text-center mb-1">Payment Successful! 🎉</h2>
        <p className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-5">{purchasedKey.product || mod?.title} — {purchasedKey.duration}</p>

        <div className="bg-[#050508]/80 border border-[#1e1e2e] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
          <p className="text-[10px] sm:text-[11px] text-gray-500 mb-1 sm:mb-1.5">Your License Key</p>
          <p className="text-xs sm:text-sm md:text-base font-mono font-bold text-amber-400 break-all select-all">{purchasedKey.key}</p>
          <button onClick={copyKey} className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-gray-600 hover:text-amber-400 transition-colors">
            {copiedKey ? '✓ Copied!' : '📋 Click to copy'}
          </button>
        </div>

        <div className="bg-[#050508]/60 border border-[#1e1e2e] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5 text-left">
          <p className="text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-wider font-medium">Transaction Details</p>
          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500">Order ID</span>
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <span className="text-[11px] sm:text-xs font-mono text-gray-300 truncate">#{purchasedKey.orderId?.slice(-10) || '—'}</span>
              <button onClick={copyOrder} className="text-gray-600 hover:text-amber-400 transition-colors shrink-0" title="Copy Order ID">
                {copiedId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500">Transaction ID</span>
            <span className="text-[11px] sm:text-xs font-mono text-gray-300 truncate">{purchasedKey.paymentId ? purchasedKey.paymentId.slice(-16) : '—'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs text-gray-500">Amount Paid</span>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-400">₹{purchasedKey.amount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500">Date & Time</span>
            <span className="text-[11px] sm:text-xs text-gray-400 text-right">{date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs text-gray-500">Status</span>
            <span className="text-[10px] sm:text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Completed</span>
          </div>
        </div>

        <button onClick={onReset} className="w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 shadow-lg shadow-amber-600/20 transition-all duration-200">
          Buy Another Key
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
  const [buying, setBuying] = useState(false);
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
  const isFlashActive = hasFlashSale && selectedDuration.flashSale?.endAt && new Date(selectedDuration.flashSale.endAt) > new Date();

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

  const handleBuy = useCallback(async () => {
    if (!selectedMod || !selectedDuration) return toast.error('Select mod & duration');
    setBuying(true);

    let reservationId = null;

    try {
      // Step 1: Initiate order — backend reserves key + creates order on QuickGateway
      const r = await orderAPI.initiate({
        productId: selectedMod._id,
        durationValue: selectedDuration.value,
        durationUnit: selectedDuration.unit,
      });
      reservationId = r.data.reservationId;
      const paymentId = r.data.gateway.paymentId;

      if (!paymentId) {
        throw new Error('No payment ID returned from gateway');
      }

      // Step 2: Load QuickGateway SDK
      let QG;
      try { QG = await loadQG(); } catch (e) {
        // If SDK fails to load, fallback: open payment URL directly
        if (r.data.gateway.paymentUrl) {
          window.open(r.data.gateway.paymentUrl, '_blank');
          toast.success('Payment page opened in new tab. Complete payment and come back.');
          // Poll for completion manually
          const poll = setInterval(async () => {
            try {
              const cr = await orderAPI.complete({
                productId: selectedMod._id,
                durationValue: selectedDuration.value,
                durationUnit: selectedDuration.unit,
                paymentId: paymentId,
              });
              clearInterval(poll);
              setPurchasedKey(cr.data);
              toast.success('🎉 Key delivered!');
            } catch {
              // keep polling until complete or timeout
            }
          }, 5000);
          // Stop polling after 5 minutes
          setTimeout(() => clearInterval(poll), 300000);
          setBuying(false);
          return;
        }
        toast.error('Payment gateway unavailable. Check your internet connection.');
        setBuying(false); return;
      }

      // Step 3: Show existing payment in SDK bottom sheet (no duplicate order creation)
      QG.showCheckout({
        paymentId: paymentId,
        onSuccess: async (pd) => {
          try {
            const cr = await orderAPI.complete({
              productId: selectedMod._id,
              durationValue: selectedDuration.value,
              durationUnit: selectedDuration.unit,
              paymentId: pd.paymentId || pd.id || paymentId,
            });
            setPurchasedKey(cr.data);
            toast.success('🎉 Key delivered!');
          } catch (e) { toast.error(e.response?.data?.message || 'Delivery failed'); }
        },
        onFailure: async (e) => {
          if (reservationId) { try { await orderAPI.release({ reservationId }); } catch {} }
          toast.error(e?.message || 'Payment cancelled');
        },
      });
    } catch (e) {
      if (reservationId) { try { await orderAPI.release({ reservationId }); } catch {} }
      toast.error(e.response?.data?.message || 'Failed to start payment');
    } finally { setBuying(false); }
  }, [selectedMod, selectedDuration]);

  if (loading) return <div className="min-h-screen flex items-center justify-center p-4"><div className="animate-pulse space-y-3 w-full max-w-xs sm:max-w-sm"><div className="h-12 sm:h-14 bg-[#1a1a28] rounded-xl"/><div className="h-12 sm:h-14 bg-[#1a1a28] rounded-xl"/><div className="h-14 sm:h-16 bg-[#1a1a28] rounded-xl"/></div></div>;
  if (purchasedKey) return <div className="min-h-screen flex items-center justify-center p-3 sm:p-4"><Bg /><SuccessView purchasedKey={purchasedKey} mod={selectedMod} onReset={reset} /></div>;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Bg />
      <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-5 pt-16 sm:pt-20 md:pt-28 lg:pt-36">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Purchase <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">License</span></h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1">Select your mod and duration below</p>
          </div>

          <div className="bg-[#0d0d1a]/90 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-2xl shadow-black/50">

            {/* ─── Select Mod ─── */}
            <div className="mb-3 sm:mb-3.5 md:mb-4">
              <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5 block">Select Mod</label>
              <div className="relative">
                <select
                  value={selectedMod?._id || ''}
                  onChange={(e) => handleModChange(e.target.value)}
                  className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl sm:rounded-2xl px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
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
                    <div className="relative">
                      <select
                        value={selectedDuration ? `${selectedDuration.value}_${selectedDuration.unit}` : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) { setSelectedDuration(null); setAppliedCoupon(null); return; }
                          const [value, unit] = val.split('_');
                          const dur = selectedMod.durations.find(d => String(d.value) === value && d.unit === unit);
                          if (dur && !dur.isSoldOut) { setSelectedDuration(dur); setAppliedCoupon(null); setCouponCode(''); }
                        }}
                        className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl sm:rounded-2xl px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
                      >
                        <option value="">— Select duration —</option>
                        {availableDurs.map((dur, i) => {
                          const hasFS = dur.flashSale?.isActive && dur.flashSale?.flashPrice != null && new Date(dur.flashSale.endAt) > new Date();
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
              <div className="mb-3 sm:mb-3.5 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-semibold text-amber-400">🔥 Flash Sale</span>
                  </div>
                  <Countdown endAt={selectedDuration.flashSale.endAt} />
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 flex-wrap">
                  <span className="text-[11px] sm:text-xs text-gray-500 line-through">₹{selectedDuration.price.toLocaleString()}</span>
                  <span className="text-sm sm:text-base font-bold text-amber-400">₹{selectedDuration.flashSale.flashPrice.toLocaleString()}</span>
                  {selectedDuration.price > 0 && (
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                      -{Math.round((1 - selectedDuration.flashSale.flashPrice / selectedDuration.price) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ─── Price Summary + Coupon ─── */}
            {selectedDuration && !selectedDuration.isSoldOut && (
              <div className="mb-4 bg-[#0a0a14]/60 border border-[#1e1e2e]/50 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 space-y-3 sm:space-y-3.5">
                {/* Price breakdown */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs md:text-sm">
                    <span className="text-gray-500">{selectedDuration.label}</span>
                    <span className="text-gray-300">₹{(hasFlashSale && isFlashActive ? selectedDuration.flashSale.flashPrice : selectedDuration.price).toLocaleString()}</span>
                  </div>
                  {hasFlashSale && isFlashActive && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-[11px] sm:text-xs bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-transparent rounded-lg p-1.5 sm:p-2 -mx-1.5 animate-fade-in">
                      <span className="flex items-center gap-1 sm:gap-1.5 text-amber-400 font-medium">
                        <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-pulse-glow" />
                        <span className="animate-pulse-glow inline-block rounded px-1">Flash Sale</span>
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {selectedDuration.flashSale?.endAt && <Countdown endAt={selectedDuration.flashSale.endAt} />}
                        <span className="text-gray-600 line-through">₹{selectedDuration.price.toLocaleString()}</span>
                        <span className="text-amber-400 font-bold">₹{selectedDuration.flashSale.flashPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full font-semibold">-{Math.round((1 - selectedDuration.flashSale.flashPrice / selectedDuration.price) * 100)}%</span>
                      </div>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-[11px] sm:text-xs pt-1.5 border-t border-[#1e1e2e]/40">
                      <span className="flex items-center gap-1 text-emerald-400"><Percent className="w-3 h-3" /> {appliedCoupon.code}</span>
                      <span className="text-emerald-400">-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold pt-1.5 border-t border-[#1e1e2e]/40">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">₹{discountedPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon input */}
                <div className={appliedCoupon ? 'opacity-60' : ''}>
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-600" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setAppliedCoupon(null); }}
                        className="w-full bg-[#050508]/80 border border-[#1e1e2e] rounded-lg sm:rounded-xl pl-7 sm:pl-8 pr-2 sm:pr-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
                        placeholder={appliedCoupon ? `${appliedCoupon.code} applied` : 'Enter coupon code'}
                        disabled={!!appliedCoupon}
                      />
                    </div>
                    {appliedCoupon ? (
                      <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="text-[11px] text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all shrink-0 font-medium">
                        ✕ Remove
                      </button>
                    ) : (
                      <button onClick={handleApplyCoupon} disabled={couponLoading || !couponCode.trim()} className="text-[11px] text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all shrink-0 font-medium disabled:opacity-50">
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Buy button */}
                <button onClick={handleBuy} disabled={buying} className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 shadow-lg shadow-amber-600/20 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-60">
                  {buying ? (
                    <><span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" /> Processing...</>
                  ) : (
                    <><Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Pay ₹{discountedPrice.toLocaleString()} <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" /></>
                  )}
                </button>
              </div>
            )}

            {/* No mod selected */}
            {!selectedMod && (
              <div className="text-center py-5 sm:py-6 md:py-8 bg-[#0a0a14]/50 rounded-xl sm:rounded-2xl border border-dashed border-[#1a1a28]">
                <KeyRound className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 mx-auto mb-1.5 sm:mb-2 text-gray-700" />
                <p className="text-gray-600 text-sm sm:text-base font-medium">Select a Mod to Continue</p>
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

            <div className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-600 flex-wrap">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" /> Secure</span>
              <span className="hidden xs:inline">•</span>
              <span>UPI</span>
              <span className="hidden xs:inline">•</span>
              <span>Instant</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
