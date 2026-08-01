import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productAPI } from '../api';
import SiteFooter from '../components/common/SiteFooter';
import { Package, Flame, ArrowRight, Smartphone, Clock } from 'lucide-react';

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

/* ─── Home — minimal hero + flash marquee + filters + catalog ─── */
export default function Home() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  // Search now lives in the Header — it drives this page via the ?q= URL param
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50' }).then((res) => {
      setMods(res.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const flashMods = mods.filter((m) => m.durations?.some(isDurFlashActive));

  // Earliest active flash end time (drives the "Ends in" timer above the marquee)
  const flashEnds = flashMods.flatMap((m) => m.durations.filter(isDurFlashActive).map((d) => d.flashSale.endAt));
  const earliestEnd = flashEnds.length ? new Date(Math.min(...flashEnds.map((t) => new Date(t).getTime()))).toISOString() : null;

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
    const query = q.trim().toLowerCase();
    if (query && !(m.title || '').toLowerCase().includes(query) && !(m.description || '').toLowerCase().includes(query)) return false;
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
      <main className="flex-1 px-3 sm:px-5 pt-2 sm:pt-3">
        <div className="w-full max-w-6xl mx-auto animate-fade-up pb-8">

          {/* ─── Flash Deals — logo + timing on top, auto-scrolling marquee below ─── */}
          {flashMods.length > 0 && (
            <div className="mb-5 animate-fade-in">
              {/* Flash header: logo + countdown */}
              <div className="flex items-center justify-between gap-3 px-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-gold">
                    <Flame className="w-3.5 h-3.5 text-[#0a0a14]" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
                    Flash Sale
                  </span>
                </div>
                {earliestEnd && (
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Ends in</span>
                    <Countdown endAt={earliestEnd} className="text-amber-400 font-bold" />
                  </div>
                )}
              </div>

              {/* Marquee */}
              <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-[#0c0c18]/90 py-2">
                <div className="flex w-max animate-[flash-marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
                  {[0, 1].map((half) => (
                    <div key={half} className="flex gap-2 pr-2" aria-hidden={half === 1}>
                      {flashMods.map((m) => {
                        const d = m.durations.find(isDurFlashActive);
                        const flashPrice = d?.flashSale?.flashPrice ?? d?.price;
                        const origPrice = d?.price;
                        const grad = cardGradients[(m.title || '').length % cardGradients.length];
                        return (
                          <Link
                            key={`${half}-${m._id}`}
                            to={`/product/${m._id}`}
                            className="group flex items-center gap-2 shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-colors pl-1.5 pr-3 py-1.5"
                          >
                            {/* Mod image thumb (falls back to letter tile) */}
                            <ModImage
                              image={m.image}
                              title={m.title}
                              letter={m.title?.charAt(0)?.toUpperCase() || 'M'}
                              grad={`bg-gradient-to-br ${grad}`}
                              className="w-6 h-6 rounded-full border border-amber-500/40 flex-shrink-0"
                            />
                            <span className="text-[10px] sm:text-[11px] text-white font-semibold truncate max-w-[90px] sm:max-w-[160px]">{m.title}</span>
                            <span className="text-[9px] text-gray-500 shrink-0">{d?.label}</span>
                            {origPrice != null && flashPrice < origPrice && (
                              <span className="text-[9px] text-gray-600 line-through shrink-0">₹{origPrice.toLocaleString()}</span>
                            )}
                            <span className="text-[11px] font-bold text-amber-400 shrink-0">₹{(flashPrice || 0).toLocaleString()}</span>
                            <ArrowRight className="w-3 h-3 text-amber-400/70 group-hover:text-amber-300 transition-colors shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#080812] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#080812] to-transparent z-10" />
              </div>
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
                const platformClass = pf === 'android'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : pf === 'ios'
                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300';
                return (
                  <Link
                    key={mod._id}
                    to={`/product/${mod._id}`}
                    className="panel panel-hover group block relative overflow-hidden transition-all duration-300 animate-fade-in !p-2 sm:!p-4"
                  >
                    {/* Top-right: Flash + Best Seller badges (icon-only on mobile to avoid overlap) */}
                    <div className="absolute top-1.5 right-1.5 z-10 flex flex-col items-end gap-1">
                      {hasFlash && (
                        <span className="chip chip-amber !text-[8px] sm:!text-[9px] !px-1 sm:!px-1.5 !py-0.5 animate-pulse-glow">
                          <Flame className="w-2 h-2 sm:w-2.5 sm:h-2.5" /><span className="hidden sm:inline"> Flash</span>
                        </span>
                      )}
                      {mod.isBestSeller && (
                        <span className="chip bg-gradient-to-r from-amber-500 to-yellow-500 !text-[8px] sm:!text-[9px] !px-1 sm:!px-1.5 !py-0.5 text-[#0a0a14] font-bold">
                          <span className="sm:hidden">★</span><span className="hidden sm:inline">★ Best Seller</span>
                        </span>
                      )}
                    </div>

                    {/* Image on top + platform tag (no overlap), name below */}
                    {mod.image ? (
                      <div className="relative h-20 sm:h-36 rounded-lg sm:rounded-xl overflow-hidden mb-1.5 sm:mb-3 bg-[#0a0a14] border border-[#1e1e2e]/60">
                        <ModImage
                          image={mod.image}
                          title={mod.title}
                          letter={mod.title?.charAt(0)?.toUpperCase() || 'M'}
                          grad={`bg-gradient-to-br ${grad}`}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        {pf && (
                          <span className={`absolute top-1.5 left-1.5 z-10 inline-flex items-center gap-1 chip !text-[8px] sm:!text-[9px] !px-1 sm:!px-1.5 !py-0.5 ${platformClass}`}>
                            <Smartphone className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            <span className="sm:hidden">{pf === 'both' ? 'Both' : pf === 'android' ? 'Android' : 'iOS'}</span>
                            <span className="hidden sm:inline">{pf === 'both' ? 'Android/iOS' : pf === 'android' ? 'Android' : 'iOS'}</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-1 mb-1.5 sm:mb-3">
                        <ModImage
                          image={null}
                          title={mod.title}
                          letter={mod.title?.charAt(0)?.toUpperCase() || 'M'}
                          grad={`bg-gradient-to-br ${grad}`}
                          className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-200"
                        />
                        {pf && (
                          <span className={`inline-flex items-center gap-1 chip !text-[8px] sm:!text-[9px] !px-1 sm:!px-1.5 !py-0.5 ${platformClass}`}>
                            <Smartphone className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            <span className="sm:hidden">{pf === 'both' ? 'Both' : pf === 'android' ? 'Android' : 'iOS'}</span>
                            <span className="hidden sm:inline">{pf === 'both' ? 'Android/iOS' : pf === 'android' ? 'Android' : 'iOS'}</span>
                          </span>
                        )}
                      </div>
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
