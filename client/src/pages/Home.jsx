import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { productAPI, orderAPI, couponAPI } from '../api';
import { quickGatewayAPI } from '../utils/quickgateway';
import CheckoutTrigger from '../components/checkout/CheckoutTrigger';
import {
  ShieldCheck, Zap, KeyRound, ArrowRight, Copy, Check, Tag, Clock,
  Percent, Sparkles, BadgeCheck, Search, ShoppingBag, Flame, Package, X
} from 'lucide-react';

/* ─── Deterministic gradient per mod card ─── */
const cardGradients = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-pink-600',
  'from-blue-500 to-indigo-600',
  'from-rose-500 to-red-600',
  'from-cyan-500 to-blue-600',
];

function Bg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#080812] to-[#0a0608]" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)', animation: 'drift-slow 12s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full blur-[140px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)', animation: 'drift-slower 16s ease-in-out infinite' }} />
      <div className="absolute top-1/3 -left-20 w-[300px] h-[300px] rounded-full blur-[120px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', animation: 'drift-slow 10s ease-in-out infinite reverse' }} />
      <div className="absolute bottom-1/4 right-0 w-[280px] h-[280px] rounded-full blur-[100px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', animation: 'drift-slower 14s ease-in-out infinite alternate' }} />
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
  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg animate-pulse-glow whitespace-nowrap">
      <Clock className="w-3 h-3" />
      <span className="tabular-nums">{String(time.h).padStart(2,'0')}:{String(time.m).padStart(2,'0')}:{String(time.s).padStart(2,'0')}</span>
    </div>
  );
}

/* ─── Helpers ─── */
function formatOrderId(id) {
  if (!id) return '—';
  const clean = String(id).replace(/[^a-f0-9]/gi, '').slice(-12).toUpperCase();
  return clean.length >= 8 ? `LIC-${clean.slice(0,4)}-${clean.slice(4,8)}-${clean.slice(8,12)}` : `#${id.slice(-10)}`;
}

function isDurFlashActive(d) {
  return !!(d?.flashSale?.isActive && d?.flashSale?.flashPrice != null &&
    d.flashSale?.endAt && new Date(d.flashSale.endAt) > new Date() &&
    (!d.flashSale?.startAt || new Date(d.flashSale.startAt) <= new Date()));
}

/* ─── Success View ─── */
function SuccessView({ purchasedKey, mod, onReset }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [paymentMeta, setPaymentMeta] = useState(null);
  const copyKey = () => { navigator.clipboard?.writeText(purchasedKey.key); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 2000); };
  const copyOrderText = () => { navigator.clipboard?.writeText(purchasedKey.orderId || purchasedKey.orderNumber); setCopiedOrder(true); setTimeout(() => setCopiedOrder(false), 2000); };
  const date = purchasedKey.purchasedAt ? new Date(purchasedKey.purchasedAt).toLocaleString('en-IN') : '';

  useEffect(() => {
    if (!purchasedKey?.paymentId) return;
    quickGatewayAPI.getPaymentDetails(purchasedKey.paymentId)
      .then(res => {
        const meta = res.data?.result || res.data;
        if (meta && meta.utr) setPaymentMeta(meta);
      })
      .catch(() => {});
  }, [purchasedKey?.paymentId]);

  const orderLabel = purchasedKey.orderNumber
    ? `ORD-${String(purchasedKey.orderNumber).slice(-8).toUpperCase()}`
    : formatOrderId(purchasedKey.orderId);
  const utr = paymentMeta?.utr && paymentMeta.utr !== '0' ? paymentMeta.utr : null;
  const payMethod = paymentMeta?.method || null;

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-3 sm:px-4 py-4 sm:py-6 animate-fade-up">
      <div className="card-glass p-4 sm:p-5 md:p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20 animate-success-glow" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)' }} />

        <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-glow-emerald animate-float">
          <BadgeCheck className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white text-center mb-1 font-display">Payment Successful!</h2>
        <p className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-5">{purchasedKey.product || mod?.title} — {purchasedKey.duration}</p>

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

/* ─── Main Home — Shopping-Style Buy Page ─── */
export default function Home() {
  const [mods, setMods] = useState([]);
  const [selectedMod, setSelectedMod] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedKey, setPurchasedKey] = useState(null);
  const [search, setSearch] = useState('');
  const orderPanelRef = useRef(null);

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Effective price (flash sale or normal)
  const effectivePrice = selectedDuration
    ? (selectedDuration.flashSale?.isActive && selectedDuration.flashSale?.flashPrice != null
      ? selectedDuration.flashSale.flashPrice : selectedDuration.price)
    : 0;
  const isFlashActive = selectedDuration ? isDurFlashActive(selectedDuration) : false;
  const discountedPrice = appliedCoupon ? appliedCoupon.finalAmount : effectivePrice;

  const reset = () => { setPurchasedKey(null); setSelectedMod(null); setSelectedDuration(null); setAppliedCoupon(null); setCouponCode(''); };

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50' }).then((res) => {
      setMods(res.data || []);
    }).finally(() => setLoading(false));
  }, []);

  // Shopping-style: when a mod is picked on mobile, scroll to the order panel
  useEffect(() => {
    if (selectedMod && window.innerWidth < 1024) {
      setTimeout(() => orderPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }, [selectedMod]);

  const filteredMods = mods.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (m.title || '').toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q);
  });

  const handleSelectMod = (modId) => {
    if (selectedMod?._id === modId) return;
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

  if (loading) return <div className="min-h-screen flex items-center justify-center p-4"><div className="animate-pulse space-y-3 w-full max-w-sm"><div className="h-12 bg-[#1a1a28] rounded-xl"/><div className="h-12 bg-[#1a1a28] rounded-xl"/><div className="h-14 bg-[#1a1a28] rounded-xl"/></div></div>;
  if (purchasedKey) return <div className="min-h-screen flex items-center justify-center p-3 sm:p-4"><Bg /><SuccessView purchasedKey={purchasedKey} mod={selectedMod} onReset={reset} /></div>;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Bg />
      <main className="flex-1 px-3 sm:px-5 pt-14 sm:pt-16 md:pt-20">
        <div className="w-full max-w-6xl mx-auto animate-fade-up pb-10">

          {/* ─── Hero ─── */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-3">
              <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400" />
              <span className="text-[10px] md:text-xs text-amber-400 font-medium tracking-wide">Digital Keys Store · Instant Delivery</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-display leading-tight">
              Purchase <span className="text-gradient">License Keys</span>
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-2">Browse mods, pick your duration & pay via UPI — key delivered instantly</p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto mt-4 sm:mt-5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search mods..."
                className="w-full bg-[#0d0d1a]/80 backdrop-blur-sm border border-[#1e1e2e]/60 rounded-xl pl-10 pr-9 py-2.5 sm:py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 md:gap-6 items-start">

            {/* ═══════════ LEFT: Catalog ═══════════ */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm sm:text-base font-semibold text-white font-display flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-400" /> Available Mods
                </h2>
                <span className="chip chip-gray !text-[10px]">{filteredMods.length} mod{filteredMods.length !== 1 ? 's' : ''}</span>
              </div>

              {filteredMods.length === 0 ? (
                <div className="text-center py-16 panel border-dashed p-8">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                  <p className="text-base font-medium text-gray-500">{mods.length === 0 ? 'No mods available yet' : `No mods match "${search}"`}</p>
                  <p className="text-sm text-gray-700 mt-1">Check back later or try a different search</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                  {filteredMods.map((mod, i) => {
                    const selected = selectedMod?._id === mod._id;
                    const prices = mod.durations.map((d) => d.price);
                    const minPrice = prices.length ? Math.min(...prices) : 0;
                    const hasFlash = mod.durations?.some(isDurFlashActive);
                    const inStock = (mod.totalAvailableKeys ?? null) === null ? true : mod.totalAvailableKeys > 0;
                    const grad = cardGradients[i % cardGradients.length];
                    return (
                      <button
                        key={mod._id}
                        onClick={() => handleSelectMod(mod._id)}
                        className={`
                          panel group text-left p-4 relative overflow-hidden transition-all duration-300 animate-fade-in
                          ${selected
                            ? 'ring-2 ring-amber-500/60 border-amber-500/50 shadow-gold-sm'
                            : 'panel-hover'}
                        `}
                      >
                        {/* Flash badge */}
                        {hasFlash && (
                          <span className="absolute top-3 right-3 chip chip-amber !text-[9px] !px-1.5 !py-0.5 animate-pulse-glow">
                            <Flame className="w-2.5 h-2.5" /> Flash
                          </span>
                        )}

                        {/* Icon tile */}
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg mb-3 group-hover:scale-105 transition-transform duration-200`}>
                          <span className="text-lg font-bold text-white font-display">{mod.title?.charAt(0)?.toUpperCase() || 'M'}</span>
                        </div>

                        <h3 className="font-semibold text-white text-sm sm:text-[15px] font-display truncate group-hover:text-amber-400 transition-colors">
                          {mod.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed min-h-[2em]">{mod.description}</p>

                        <div className="flex items-end justify-between mt-3 pt-3 border-t border-[#1e1e2e]/50">
                          <div>
                            <span className="text-[9px] text-gray-600 uppercase tracking-wider">Starting from</span>
                            <p className="text-base font-bold text-gradient leading-tight">₹{minPrice.toLocaleString()}</p>
                          </div>
                          <div className="text-right flex flex-col items-end gap-1">
                            <span className="chip chip-green !text-[9px] !py-0.5">
                              {inStock ? `${mod.totalAvailableKeys ?? '—'} in stock` : 'Sold out'}
                            </span>
                            <span className="text-[9px] text-gray-600">{mod.durations?.length || 0} durations</span>
                          </div>
                        </div>

                        {/* Selected check */}
                        {selected && (
                          <span className="absolute bottom-3 left-3 text-[9px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                            ✓ Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ═══════════ RIGHT: Order Panel ═══════════ */}
            <div ref={orderPanelRef} className="lg:sticky lg:top-6 scroll-mt-20">
              {selectedMod ? (
                <div className="card-glass p-4 sm:p-5 relative overflow-hidden animate-fade-in">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                  {/* Mod header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cardGradients[selectedMod.title?.length % cardGradients.length]} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-lg font-bold text-white font-display">{selectedMod.title?.charAt(0)?.toUpperCase() || 'M'}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white text-sm md:text-base font-display truncate">{selectedMod.title}</h3>
                      <p className="text-[10px] text-gray-500 truncate">{selectedMod.durations?.length || 0} duration options</p>
                    </div>
                    <button
                      onClick={() => { setSelectedMod(null); setSelectedDuration(null); setAppliedCoupon(null); setCouponCode(''); }}
                      className="text-[10px] text-gray-500 hover:text-amber-400 bg-[#0a0a14]/60 border border-[#1e1e2e]/60 px-2.5 py-1.5 rounded-lg transition-colors flex-shrink-0"
                    >
                      Change
                    </button>
                  </div>

                  {/* Duration picker */}
                  <p className="text-[11px] font-medium text-gray-400 mb-2">Select Duration</p>
                  {(() => {
                    const availableDurs = selectedMod.durations?.filter(d => !d.isSoldOut) || [];
                    return availableDurs.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {availableDurs.map((dur, i) => {
                          const isSelected = selectedDuration?.value === dur.value && selectedDuration?.unit === dur.unit;
                          const flash = isDurFlashActive(dur);
                          return (
                            <button
                              key={i}
                              onClick={() => { setSelectedDuration(dur); setAppliedCoupon(null); setCouponCode(''); }}
                              className={`
                                relative p-3 rounded-xl border text-left transition-all duration-200 active:scale-[0.98]
                                ${isSelected
                                  ? 'border-amber-500/60 bg-amber-500/15 ring-1 ring-amber-500/30'
                                  : 'border-[#1e1e2e] bg-[#0a0a14]/60 hover:border-amber-500/40 hover:bg-amber-500/5'}
                              `}
                            >
                              {flash && (
                                <span className="absolute top-2 right-2 text-amber-400 animate-pulse">
                                  <Flame className="w-3 h-3" />
                                </span>
                              )}
                              <span className={`block text-xs font-semibold ${isSelected ? 'text-amber-400' : 'text-white'}`}>{dur.label}</span>
                              <span className="block text-[11px] mt-0.5">
                                {flash ? (
                                  <span className="flex items-center gap-1.5">
                                    <span className="text-amber-400 font-bold">₹{dur.flashSale.flashPrice.toLocaleString()}</span>
                                    <span className="text-[9px] text-gray-600 line-through">₹{dur.price.toLocaleString()}</span>
                                  </span>
                                ) : (
                                  <span className="text-gray-400">₹{dur.price.toLocaleString()}</span>
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-[#0a0a14]/50 rounded-xl border border-dashed border-[#1a1a28] mb-4">
                        <p className="text-gray-600 text-xs sm:text-sm">All durations are sold out for this mod</p>
                      </div>
                    );
                  })()}

                  {/* Flash sale banner */}
                  {isFlashActive && selectedDuration?.flashSale?.endAt && (
                    <div className="mb-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/25 rounded-xl p-3 animate-fade-in">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-display">
                          <Flame className="w-3.5 h-3.5 animate-pulse" /> Flash Sale Active
                        </span>
                        <Countdown endAt={selectedDuration.flashSale.endAt} />
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] text-gray-500 line-through">₹{selectedDuration.price.toLocaleString()}</span>
                        <span className="text-sm font-bold text-amber-400">₹{selectedDuration.flashSale.flashPrice.toLocaleString()}</span>
                        {selectedDuration.price > 0 && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full font-semibold">
                            Save -{Math.round((1 - selectedDuration.flashSale.flashPrice / selectedDuration.price) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price summary + Coupon */}
                  {selectedDuration && !selectedDuration.isSoldOut && (
                    <div className="mb-4 bg-[#0a0a14]/60 border border-[#1e1e2e]/50 rounded-xl p-3 space-y-2.5 animate-fade-in">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs">
                        <span className="text-gray-500">{selectedDuration.label}</span>
                        <span className="text-gray-300">₹{effectivePrice.toLocaleString()}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#1e1e2e]/40">
                          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                            <Percent className="w-3 h-3" /> {appliedCoupon.code}
                            <span className="text-[9px] text-gray-600 font-normal">applied</span>
                          </span>
                          <span className="text-emerald-400 font-semibold">-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-[#1e1e2e]/40">
                        <span className="text-gray-300">Total</span>
                        <span className="text-white font-display text-base sm:text-lg">{discountedPrice > 0 ? `₹${discountedPrice.toLocaleString()}` : '₹0'}</span>
                      </div>
                    </div>
                  )}

                  {/* Coupon input */}
                  {selectedDuration && !selectedDuration.isSoldOut && (
                    <div className={`mb-4 ${appliedCoupon ? 'opacity-70' : ''}`}>
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
                  )}

                  {/* Pay Now */}
                  <CheckoutTrigger
                    initiateOrder={handleInitiate}
                    onComplete={handleComplete}
                    releaseReservation={handleRelease}
                    disabled={!selectedDuration || selectedDuration.isSoldOut}
                    buttonLabel={<><Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Pay ₹{discountedPrice.toLocaleString()} <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></>}
                  />

                  {/* Security note */}
                  <p className="text-center text-[10px] text-gray-700 mt-3">
                    🔒 Secured by QuickGateway · GPay · PhonePe · Paytm
                  </p>
                </div>
              ) : (
                <div className="panel border-dashed p-6 text-center animate-fade-in">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-[#1a1a28] flex items-center justify-center mb-3">
                    <ShoppingBag className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Select a mod to continue</p>
                  <p className="text-gray-700 text-[11px] mt-1">Tap any mod card from the catalog — duration, coupon & payment will appear here</p>
                </div>
              )}

              {/* Trust row (below panel, desktop only) */}
              <div className="hidden lg:flex items-center justify-center gap-3 mt-4 text-[10px] text-gray-500 flex-wrap">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure</span>
                <span className="text-gray-800">•</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Delivery</span>
                <span className="text-gray-800">•</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> UPI Verified</span>
              </div>
            </div>
          </div>

          {/* Mobile trust row */}
          <div className="lg:hidden mt-6 pt-4 border-t border-[#1e1e2e]/40 flex items-center justify-center gap-3 text-[10px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure</span>
            <span className="text-gray-800">•</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Delivery</span>
            <span className="text-gray-800">•</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> UPI Verified</span>
          </div>

          <p className="text-center text-[10px] text-gray-700 mt-5">
            © {new Date().getFullYear()} Online Keys — Digital license key store
          </p>
        </div>
      </main>
    </div>
  );
}
