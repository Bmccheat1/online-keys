import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api';
import {
  ShieldCheck, Zap, BadgeCheck, Search, ShoppingBag, Package, Flame, X, ArrowRight
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

/* ─── Home — Shopping-Style Catalog (3 per row on desktop) ─── */
export default function Home() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50' }).then((res) => {
      setMods(res.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const filteredMods = mods.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (m.title || '').toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q);
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center p-4"><div className="animate-pulse space-y-3 w-full max-w-sm"><div className="h-12 bg-[#1a1a28] rounded-xl"/><div className="h-12 bg-[#1a1a28] rounded-xl"/><div className="h-14 bg-[#1a1a28] rounded-xl"/></div></div>;

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

          {/* ─── Catalog — 3 per row on lg+ ─── */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {filteredMods.map((mod, i) => {
                  const prices = mod.durations.map((d) => d.price);
                  const minPrice = prices.length ? Math.min(...prices) : 0;
                  const hasFlash = mod.durations?.some(isDurFlashActive);
                  const inStock = (mod.totalAvailableKeys ?? null) === null ? true : mod.totalAvailableKeys > 0;
                  const grad = cardGradients[i % cardGradients.length];
                  return (
                    <Link
                      key={mod._id}
                      to={`/product/${mod._id}`}
                      className="panel panel-hover group block relative overflow-hidden transition-all duration-300 animate-fade-in"
                    >
                      {/* Flash badge */}
                      {hasFlash && (
                        <span className="absolute top-3 right-3 z-10 chip chip-amber !text-[9px] !px-1.5 !py-0.5 animate-pulse-glow">
                          <Flame className="w-2.5 h-2.5" /> Flash
                        </span>
                      )}

                      {/* Image / icon tile */}
                      {mod.image ? (
                        <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden mb-3 bg-[#0a0a14] border border-[#1e1e2e]/60">
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
                          className="w-11 h-11 rounded-xl mb-3 group-hover:scale-105 transition-transform duration-200"
                        />
                      )}

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
                          <span className={`chip !text-[9px] !py-0.5 ${inStock ? 'chip-green' : 'chip-red'}`}>
                            {inStock ? `${mod.totalAvailableKeys ?? '—'} in stock` : 'Sold out'}
                          </span>
                          <span className="text-[9px] text-gray-600">{mod.durations?.length || 0} durations</span>
                        </div>
                      </div>

                      {/* Buy CTA on hover */}
                      <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-[#1e1e2e]/40 text-[11px] font-semibold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Buy Now <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

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
