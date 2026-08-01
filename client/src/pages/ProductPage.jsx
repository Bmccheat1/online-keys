import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productAPI, orderAPI, couponAPI } from '../api';
import { quickGatewayAPI } from '../utils/quickgateway';
import CheckoutTrigger from '../components/checkout/CheckoutTrigger';
import Loader from '../components/common/Loader';
import {
  ArrowLeft, Zap, ArrowRight, Tag, Percent, Clock, Flame, BadgeCheck,
  Copy, Check, KeyRound, ShieldCheck, Sparkles, ShoppingBag, Package
} from 'lucide-react';

const cardGradients = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-pink-600',
  'from-blue-500 to-indigo-600',
  'from-rose-500 to-red-600',
  'from-cyan-500 to-blue-600',
];

function ModImage({ image, title, letter, grad, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return (
      <div className={`${grad} bg-gradient-to-br flex items-center justify-center shadow-lg flex-shrink-0 ${className}`}>
        <span className="text-lg font-bold text-white font-display">{letter}</span>
      </div>
    );
  }
  return <img src={image} alt={title} loading="lazy" onError={() => setFailed(true)} className={`object-cover flex-shrink-0 ${className}`} />;
}

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

function Countdown({ endAt }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const total = Math.max(0, Math.floor((new Date(endAt).getTime() - now) / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  if (total <= 0) return <span className="text-red-400 font-mono text-xs">Ended</span>;
  return <span className="font-mono text-amber-300 tabular-nums text-xs">{h}:{m}:{s}</span>;
}

function isDurFlashActive(d) {
  return !!(d?.flashSale?.isActive && d?.flashSale?.flashPrice != null &&
    d.flashSale?.endAt && new Date(d.flashSale.endAt) > new Date() &&
    (!d.flashSale?.startAt || new Date(d.flashSale.startAt) <= new Date()));
}

function formatOrderId(id = '') {
  return (id || '').length > 12 ? id.slice(-12).toUpperCase() : id.toUpperCase();
}

/* ─── Success view after purchase ─── */
function SuccessView({ purchasedKey, mod, onReset }) {
  const [copied, setCopied] = useState(false);
  const [copiedUtr, setCopiedUtr] = useState(false);

  const copy = async (text, setFlag) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlag(true);
      setTimeout(() => setFlag(false), 2000);
    } catch {
      toast.error('Copy failed — select manually');
    }
  };

  const grad = cardGradients[(mod?.title?.length || 0) % cardGradients.length];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Bg />
      <div className="w-full max-w-md animate-fade-up">
        <div className="panel p-6 sm:p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Purchase Successful!</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">Your key has been delivered. Copy it below:</p>

          {/* Key box */}
          <div className="mt-5 card-glass rounded-xl p-4 relative">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">License Key</span>
              <span className="chip chip-green !text-[9px] !py-0.5 ml-auto">✓ Verified</span>
            </div>
            <p className="font-mono text-sm sm:text-base text-white bg-black/30 border border-[#1e1e2e]/60 rounded-lg p-3 break-all text-left select-all">
              {purchasedKey.key}
            </p>
            <button
              onClick={() => copy(purchasedKey.key, setCopied)}
              className="btn btn-gold !w-full mt-3 !py-2.5"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Key'}
            </button>
          </div>

          {/* Txn details */}
          <div className="mt-3 card-glass rounded-xl p-4 text-left space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Mod</span>
              <span className="text-white font-medium max-w-[60%] truncate">{mod?.title}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Duration</span>
              <span className="text-white font-medium">{purchasedKey.durationValue} {purchasedKey.durationUnit}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Amount</span>
              <span className="text-amber-400 font-semibold">₹{purchasedKey.amountPaid?.toLocaleString?.() ?? purchasedKey.amountPaid}</span>
            </div>
            <div className="flex justify-between text-xs items-center">
              <span className="text-gray-500">Order ID</span>
              <button
                onClick={() => copy(purchasedKey.orderId || '', setCopiedUtr)}
                className="text-gray-300 font-mono hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                {formatOrderId(purchasedKey.orderId)} {copiedUtr ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            {purchasedKey.transactionId && (
              <div className="flex justify-between text-xs items-center">
                <span className="text-gray-500">Txn / UTR</span>
                <span className="text-gray-300 font-mono truncate max-w-[55%]">{purchasedKey.transactionId}</span>
              </div>
            )}
          </div>

          <button onClick={onReset} className="btn btn-gold !w-full mt-4">
            <ShoppingBag className="w-4 h-4" /> Buy Another
          </button>
          <Link to="/" className="block text-[11px] text-gray-600 hover:text-amber-400 transition-colors mt-3">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Detail Page: duration + payment ─── */
export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [purchasedKey, setPurchasedKey] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const grad = cardGradients[((product?.title || '').length) % cardGradients.length];
  const isFlashActive = selectedDuration ? isDurFlashActive(selectedDuration) : false;
  const effectivePrice = selectedDuration
    ? (isFlashActive ? selectedDuration.flashSale.flashPrice : selectedDuration.price)
    : 0;
  const discountedPrice = appliedCoupon ? appliedCoupon.finalAmount : effectivePrice;

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setSelectedDuration(null);
    setAppliedCoupon(null);
    setCouponCode('');
    setPurchasedKey(null);
    productAPI.getById(id)
      .then((r) => setProduct(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    if (!selectedDuration) return toast.error('Select a duration first');
    setCouponLoading(true);
    try {
      const res = await couponAPI.applyCoupon({ code: couponCode.trim(), price: effectivePrice });
      if (res.success) {
        setAppliedCoupon(res.data || res);
        toast.success('Coupon applied!');
      } else {
        toast.error(res.message || 'Invalid coupon');
      }
    } catch {
      toast.error('Invalid or expired coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleInitiate = () =>
    orderAPI.initiate({
      productId: product._id,
      durationValue: selectedDuration.value,
      durationUnit: selectedDuration.unit,
      couponCode: appliedCoupon?.code || '',
    });

  const handleComplete = async ({ paymentId }) => {
    const res = await orderAPI.complete({
      orderId: paymentId,
      productId: product._id,
      durationValue: selectedDuration.value,
      durationUnit: selectedDuration.unit,
      couponCode: appliedCoupon?.code || '',
    });
    setPurchasedKey(res.data);
    toast.success('Key delivered!');
  };

  const handleRelease = (reservationId) => orderAPI.release({ reservationId });

  const reset = () => {
    setPurchasedKey(null);
    setSelectedDuration(null);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <Bg />
        <div className="panel p-8 text-center max-w-sm animate-fade-up">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-700" />
          <h2 className="text-lg font-bold text-white font-display">Mod Not Found</h2>
          <p className="text-sm text-gray-500 mt-2">This product may have been removed or the link is invalid.</p>
          <Link to="/" className="btn btn-gold !w-full mt-5">
            <ShoppingBag className="w-4 h-4" /> Back to Store
          </Link>
        </div>
      </div>
    );
  }

  if (purchasedKey) {
    return <SuccessView purchasedKey={purchasedKey} mod={product} onReset={reset} />;
  }

  const inStock = (product.totalAvailableKeys ?? null) === null ? true : product.totalAvailableKeys > 0;

  return (
    <div className="min-h-screen relative">
      <Bg />
      <main className="px-3 sm:px-5 pt-14 sm:pt-16 md:pt-20 pb-10">
        <div className="w-full max-w-6xl mx-auto animate-fade-up">

          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-amber-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 md:gap-6 items-start">

            {/* ─── Left: product details + durations ─── */}
            <div className="space-y-4 md:space-y-5">
              <div className="panel p-4 sm:p-6">
                {/* Photo banner */}
                {product.image ? (
                  <div className="relative h-44 sm:h-60 rounded-2xl overflow-hidden bg-[#0a0a14] border border-[#1e1e2e]/60 mb-4">
                    <ModImage
                      image={product.image}
                      title={product.title}
                      letter={product.title?.charAt(0)?.toUpperCase() || 'M'}
                      grad={`bg-gradient-to-br ${grad}`}
                      className="w-full h-full"
                    />
                    {isDurFlashActive && (
                      <span className="absolute top-3 left-3 chip chip-amber animate-pulse-glow !text-[10px]">
                        <Flame className="w-3 h-3" /> Flash Sale
                      </span>
                    )}
                  </div>
                ) : (
                  <div className={`bg-gradient-to-br ${grad} h-32 sm:h-40 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-5xl font-bold text-white/90 font-display">{product.title?.charAt(0)?.toUpperCase() || 'M'}</span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white font-display">{product.title}</h1>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed max-w-xl">{product.description}</p>
                  </div>
                  <span className={`chip !text-[10px] ${inStock ? 'chip-green' : 'chip-red'}`}>
                    {inStock ? `${product.totalAvailableKeys ?? '—'} keys in stock` : 'Sold out'}
                  </span>
                </div>
              </div>

              {/* Duration picker */}
              <div className="panel p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm sm:text-base font-semibold text-white font-display flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> Select Duration
                  </h2>
                  <span className="text-[10px] text-gray-600">{product.durations?.length || 0} options</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3">
                  {product.durations.map((d) => {
                    const flash = isDurFlashActive(d);
                    const price = flash ? d.flashSale.flashPrice : d.price;
                    const active = selectedDuration?.value === d.value && selectedDuration?.unit === d.unit;
                    return (
                      <button
                        key={`${d.unit}-${d.value}`}
                        onClick={() => setSelectedDuration(d)}
                        disabled={!inStock}
                        className={`relative rounded-xl border p-3 text-left transition-all duration-200 text-center
                          ${active
                            ? 'border-amber-500/70 bg-amber-500/10 ring-2 ring-amber-500/30 shadow-gold'
                            : 'border-[#1e1e2e]/60 bg-[#0d0d1a]/60 hover:border-amber-500/40 hover:bg-amber-500/5'}
                          ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {flash && (
                          <span className="absolute -top-1.5 right-2 chip chip-amber !text-[8px] !px-1.5 !py-px animate-pulse-glow">FLASH</span>
                        )}
                        <p className="text-sm font-semibold text-white font-display">{d.value} {d.unit}</p>
                        <p className={`text-xs font-bold mt-1 ${flash ? 'text-amber-400' : 'text-gradient'}`}>
                          ₹{price.toLocaleString()}
                        </p>
                        {flash && d.flashSale?.flashPrice != null && d.flashSale.flashPrice < d.price && (
                          <p className="text-[9px] text-gray-600 line-through mt-0.5">₹{d.price.toLocaleString()}</p>
                        )}
                        {active && (
                          <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-glow" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Flash sale banner */}
                {isFlashActive && (
                  <div className="mt-4 flex items-center gap-3 bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/25 rounded-xl px-3.5 py-2.5 animate-pulse-glow">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Flame className="w-4 h-4 text-amber-400" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] sm:text-xs font-semibold text-amber-300">Flash Sale Active — {selectedDuration.value} {selectedDuration.unit}</p>
                      <p className="text-[9px] sm:text-[10px] text-amber-500/70">Deal ends in <Countdown endAt={selectedDuration.flashSale.endAt} /></p>
                    </div>
                    <span className="chip chip-amber !text-[9px] flex-shrink-0">Limited Time</span>
                  </div>
                )}
              </div>
            </div>

            {/* ─── Right: order summary (sticky) ─── */}
            <div className="lg:sticky lg:top-20">
              <div className="card-glass rounded-2xl p-4 sm:p-5 shadow-gold">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e1e2e]/50 mb-3">
                  {product.image ? (
                    <ModImage
                      image={product.image}
                      title={product.title}
                      letter={product.title?.charAt(0)?.toUpperCase() || 'M'}
                      grad={`bg-gradient-to-br ${grad}`}
                      className="w-9 h-9 rounded-lg"
                    />
                  ) : (
                    <ModImage image={null} title={product.title} letter={product.title?.charAt(0)?.toUpperCase() || 'M'} grad={`bg-gradient-to-br ${grad}`} className="w-9 h-9 rounded-lg" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white font-display truncate">{product.title}</p>
                    <p className="text-[10px] text-gray-600">
                      {selectedDuration ? `${selectedDuration.value} ${selectedDuration.unit}` : 'No duration selected'}
                    </p>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base Price</span>
                    <span className="text-white font-medium">
                      {selectedDuration ? `₹${selectedDuration.price.toLocaleString()}` : '—'}
                    </span>
                  </div>
                  {isFlashActive && selectedDuration?.flashSale?.flashPrice != null && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Flash Discount</span>
                      <span className="text-amber-400 font-medium">−₹{(selectedDuration.price - selectedDuration.flashSale.flashPrice).toLocaleString()}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Tag className="w-3 h-3 text-emerald-400" /> Coupon</span>
                      <span className="text-emerald-400 font-medium">−₹{(effectivePrice - appliedCoupon.finalAmount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[#1e1e2e]/50">
                    <span className="text-sm font-semibold text-white font-display">Total</span>
                    <span className="text-lg font-bold text-gradient">
                      ₹{(discountedPrice || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-3 py-2.5">
                      <span className="flex items-center gap-2 text-xs text-emerald-300">
                        <Percent className="w-3.5 h-3.5" />
                        {appliedCoupon.code} · {appliedCoupon.discountText || `−₹${(effectivePrice - appliedCoupon.finalAmount).toLocaleString()}`}
                      </span>
                      <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="text-[10px] text-gray-500 hover:text-red-400 transition-colors">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="COUPON CODE"
                          className="input-field !pl-9 !py-2.5 !text-xs"
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        className="btn btn-ghost !px-3.5 !py-2.5 !text-xs"
                      >
                        {couponLoading ? '…' : 'Apply'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Smart Pay button */}
                <CheckoutTrigger
                  disabled={!selectedDuration || !inStock}
                  soldOut={!inStock}
                  initiate={handleInitiate}
                  complete={handleComplete}
                  release={handleRelease}
                  label={`Pay ₹${(discountedPrice || 0).toLocaleString()}`}
                  noDurationLabel="Select Duration"
                  soldOutLabel="Sold Out"
                >
                  <span className="flex items-center gap-2">
                    {!selectedDuration || !inStock
                      ? (inStock ? <Clock className="w-4 h-4" /> : <Package className="w-4 h-4" />)
                      : <Sparkles className="w-4 h-4" />}
                    {!selectedDuration || !inStock
                      ? (inStock ? 'Select Duration' : 'Sold Out')
                      : `Pay ₹${(discountedPrice || 0).toLocaleString()}`}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </CheckoutTrigger>

                {/* Payment badges */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="chip chip-gray !text-[9px]">GPay</span>
                  <span className="chip chip-gray !text-[9px]">PhonePe</span>
                  <span className="chip chip-gray !text-[9px]">Paytm</span>
                  <span className="chip chip-gray !text-[9px]">UPI</span>
                </div>

                <p className="text-center text-[9px] sm:text-[10px] text-gray-600 mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Secure Payment · Instant Auto-Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
