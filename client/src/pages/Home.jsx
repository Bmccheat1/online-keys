import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api';
import {
  ShieldCheck, Zap, BadgeCheck, Search, ShoppingBag, Package, Flame, X,
  ArrowRight, Smartphone, ChevronLeft, ChevronRight, Clock
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

/* ─── Mod image with graceful fallback to letter tile ─── */
function ModImage({ image, title, letter, grad, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return (
      <div className={`${grad} bg-gradient-to-br flex items-center justify-center shadow-lg flex-shrink-0 ${className}`}>
        <span className="text-lg font-bold text-white font-display">{letter}</span>
      </div>
    );
  }
  return (
    <img
      src={image}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover flex-shrink-0 ${className}`}
    />
  );
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

function isDurFlashActive(d) {
  return !!(d?.flashSale?.isActive && d?.flashSale?.flashPrice != null &&
    d.flashSale?.endAt && new Date(d.flashSale.endAt) > new Date() &&
    (!d.flashSale?.startAt || new Date(d.flashSale.startAt) <= new Date()));
}

function Countdown({ endAt, className = '' }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const total = Math.max(0, Math.floor((new Date(endAt).getTime() - now) / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  if (total <= 0) return <span className={className}>Ended</span>;
  return <span className={`font-mono tabular-nums ${className}`}>{h}:{m}:{s}</span>;
}

/* ─── Home — professional storefront: flash slider + filters + catalog ─── */
export default function Home() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50' }).then((res) => {
      setMods(res.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const flashMods = mods.filter((m) => m.durations?.some(isDurFlashActive));

  // Auto-rotate flash slider every 4s
  useEffect(() => {
    if (flashMods.length < 2) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % flashMods.length), 4000);
    return () => clearInterval(t);
  }, [flashMods.length]);

  const categories = [...new Set(mods.map((m) => m.category).filter(Boolean))];
  const chips = [
    { key: 'all', label: 'All' },
    { key: 'android', label: 'Android' },
    { key: 'ios', label: 'iOS' },
    { key: 'promo', label: 'Promo' },
    { key: 'bestseller', label: 'Best Seller' },
    ...categories.map((c) => ({ key: `cat:${c}`, label: c })),
  ];

  const matchesPlatform = (m, target) => {
    const pf = m.platform || 'both';
    return target === 'both' ? true : pf === target || pf === 'both';
  };

  const filteredMods = mods.filter((m) => {
    const q = search.trim().toLowerCase();
    if (q && !(m.title || '').toLowerCase().includes(q) && !(m.description || '').toLowerCase().includes(q)) return false;
    switch (filter) {
      case 'all': return true;
      case 'android': return matchesPlatform(m, 'android');
      case 'ios': return matchesPlatform(m, 'ios');
      case 'promo': return m.durations?.some(isDurFlashActive);
      case 'bestseller': return !!m.isBestSeller;
      default:
        return filter.startsWith('cat:') ? (m.category || '') === filter.slice(4) : true;
    }
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center p-4"><div className="animate-pulse space-y-3 w-full max-w-sm"><div className="h-12 bg-[#1a1a28] rounded-xl"/><div className="h-12 bg-[#1a1a28] rounded-xl"/><div className="h-14 bg-[#1a1a28] rounded-xl"/></div></div>;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Bg />
      <main className="flex-1 px-3 sm:px-5 pt-14 sm:pt-16 md:pt-20">
        <div className="w-full max-w-6xl mx-auto animate-fade-up pb-10">

          {/* ─── Hero ─── */}
          <div className="text-center mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-3">
              <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400" />
              <span className="text-[10px] md:text-xs text-amber-400 font-medium tracking-wide">Digital Keys Store · Instant Delivery</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-display leading-tight">
              Purchase <span className="text-gradient">License Keys</span>
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-2">Browse mods, pick your duration & pay via UPI — key delivered instantly</p>

            {/* Trust stats */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <b className="text-white text-xs sm:text-sm font-display">25K+</b> Keys Delivered
              </span>
              <span className="text-gray-800 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500">
                <span className="text-amber-400 text-xs sm:text-sm">★ 4.9</span> Customer Rating
              </span>
              <span className="text-gray-800 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <b className="text-white text-xs sm:text-sm font-display">30 Sec</b> Delivery
              </span>
            </div>

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

          {/* ─── Flash Sale Slider (auto-rotating) ─── */}
          {flashMods.length > 0 && (
            <div className="relative mb-6 sm:mb-7 animate-fade-in">
              <div className="rounded-2xl overflow-hidden border border-amber-500/25 shadow-gold">
                <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
                  {flashMods.map((m) => {
                    const d = m.durations.find(isDurFlashActive);
                    const flashPrice = d?.flashSale?.flashPrice ?? d?.price;
                    const origPrice = d?.price;
                    const grad = cardGradients[((m.title || '').length) % cardGradients.length];
                    return (
                      <div key={m._id} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0d0d1a] via-[#141422] to-[#0a0a14] p-4 sm:p-5">
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                          <div className="relative flex items-center gap-3 sm:gap-5 w-full">
                            <ModImage
                              image={m.image}
                              title={m.title}
                              letter={m.title?.charAt(0)?.toUpperCase() || 'M'}
                              grad={`bg-gradient-to-br ${grad}`}
                              className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl"
                            />
                            <div className="min-w-0 flex-1 text-center sm:text-left">
                              <span className="inline-flex items-center gap-1 chip chip-amber !text-[9px] sm:!text-[10px] !px-2 !py-0.5 mb-1.5 animate-pulse-glow">
                                <Flame className="w-3 h-3" /> Flash Sale
                              </span>
                              <p className="text-sm sm:text-lg font-bold text-white font-display truncate">{m.title}</p>
                              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                                <Clock className="w-3 h-3 text-amber-400" /> Ends in{' '}
                                <Countdown endAt={d?.flashSale?.endAt} className="text-amber-300 text-[10px] sm:text-xs" />
                              </p>
                            </div>
                            <div className="text-center sm:text-right flex-shrink-0">
                              {origPrice != null && flashPrice < origPrice && (
                                <p className="text-[10px] sm:text-xs text-gray-600 line-through">₹{origPrice.toLocaleString()}</p>
                              )}
                              <p className="text-lg sm:text-2xl font-bold text-gradient leading-tight">₹{(flashPrice || 0).toLocaleString()}</p>
                              <Link
                                to={`/product/${m._id}`}
                                className="mt-1.5 inline-flex items-center gap-1.5 btn btn-gold !py-1.5 !px-3.5 !text-[11px] sm:!text-xs"
                              >
                                Shop Now <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Arrows */}
              {flashMods.length > 1 && (
                <>
                  <button
                    onClick={() => setSlide((flashMods.length + slide - 1) % flashMods.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 text-gray-300 hover:text-amber-400 hover:border-amber-500/40 transition-all z-10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSlide((slide + 1) % flashMods.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 text-gray-300 hover:text-amber-400 hover:border-amber-500/40 transition-all z-10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Dots */}
              {flashMods.length > 1 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {flashMods.map((m, i) => (
                    <button
                      key={m._id}
                      onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── Filter chips (All / Android / iOS / Promo / Best Seller / categories) ─── */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {chips.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`chip shrink-0 cursor-pointer transition-all !text-[10px] sm:!text-[11px] !px-3 !py-1.5
                  ${filter === c.key
                    ? 'chip-amber !text-amber-300 font-semibold border-amber-500/50'
                    : 'chip-gray hover:border-amber-500/40 hover:text-amber-400'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* ─── Catalog — 3 per row (phone + desktop) ─── */}
          {filteredMods.length === 0 ? (
            <div className="text-center py-16 panel border-dashed p-8">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-700" />
              <p className="text-base font-medium text-gray-500">{mods.length === 0 ? 'No mods available yet' : 'No mods match your filters'}</p>
              <p className="text-sm text-gray-700 mt-1">Check back later or try a different search</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {filteredMods.map((mod, i) => {
                const prices = mod.durations.map((d) => d.price);
                const minPrice = prices.length ? Math.min(...prices) : 0;
                const hasFlash = mod.durations?.some(isDurFlashActive);
                const inStock = (mod.totalAvailableKeys ?? null) === null ? true : mod.totalAvailableKeys > 0;
                const grad = cardGradients[i % cardGradients.length];
                const pf = mod.platform || 'both';
                return (
                  <Link
                    key={mod._id}
                    to={`/product/${mod._id}`}
                    className="panel panel-hover group block relative overflow-hidden transition-all duration-300 animate-fade-in !p-2 sm:!p-4"
                  >
                    {/* Top-left: platform tag */}
                    {pf && (
                      <span className={`absolute top-2 left-2 z-10 inline-flex items-center gap-1 chip !text-[8px] sm:!text-[9px] !px-1.5 !py-0.5
                        ${pf === 'android'
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : pf === 'ios'
                            ? 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}
                      >
                        <Smartphone className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                        {pf === 'both' ? 'Android/iOS' : pf === 'android' ? 'Android' : 'iOS'}
                      </span>
                    )}

                    {/* Top-right: Flash + Best Seller badges */}
                    <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1">
                      {hasFlash && (
                        <span className="chip chip-amber !text-[8px] sm:!text-[9px] !px-1.5 !py-0.5 animate-pulse-glow">
                          <Flame className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> Flash
                        </span>
                      )}
                      {mod.isBestSeller && (
                        <span className="chip bg-gradient-to-r from-amber-500 to-yellow-500 !text-[8px] sm:!text-[9px] !px-1.5 !py-0.5 text-[#0a0a14] font-bold">★ Best Seller</span>
                      )}
                    </div>

                    {/* Image / icon tile */}
                    {mod.image ? (
                      <div className="relative h-20 sm:h-36 rounded-lg sm:rounded-xl overflow-hidden mb-1.5 sm:mb-3 bg-[#0a0a14] border border-[#1e1e2e]/60">
                        <ModImage
                          image={mod.image}
                          title={mod.title}
                          letter={mod.title?.charAt(0)?.toUpperCase() || 'M'}
                          grad={`bg-gradient-to-br ${grad}`}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <ModImage
                        image={null}
                        title={mod.title}
                        letter={mod.title?.charAt(0)?.toUpperCase() || 'M'}
                        grad={`bg-gradient-to-br ${grad}`}
                        className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl mb-1.5 sm:mb-3 group-hover:scale-105 transition-transform duration-200"
                      />
                    )}

                    <h3 className="font-semibold text-white text-[11px] sm:text-[15px] font-display truncate group-hover:text-amber-400 transition-colors leading-snug">
                      {mod.title}
                    </h3>
                    <p className="hidden sm:block text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed min-h-[2em]">{mod.description}</p>

                    <div className="flex items-end justify-between mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-[#1e1e2e]/50">
                      <div className="min-w-0">
                        <span className="hidden sm:block text-[9px] text-gray-600 uppercase tracking-wider">Starting from</span>
                        <p className="text-sm sm:text-base font-bold text-gradient leading-tight">₹{minPrice.toLocaleString()}</p>
                        <span className={`text-[9px] sm:hidden font-medium ${inStock ? 'text-emerald-400' : 'text-red-400'}`}>
                          {inStock ? `${mod.totalAvailableKeys ?? '✓'} in stock` : 'Sold out'}
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <span className={`chip hidden sm:inline-flex !text-[9px] !py-0.5 ${inStock ? 'chip-green' : 'chip-red'}`}>
                          {inStock ? `${mod.totalAvailableKeys ?? '—'} in stock` : 'Sold out'}
                        </span>
                        <span className="hidden sm:block text-[9px] text-gray-600">{mod.durations?.length || 0} durations</span>
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center sm:group-hover:bg-amber-500 sm:group-hover:border-amber-400 transition-all duration-200">
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Trust row */}
          <div className="mt-6 pt-4 border-t border-[#1e1e2e]/40 flex items-center justify-center gap-3 text-[10px] text-gray-500 flex-wrap">
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
