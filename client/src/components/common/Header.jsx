import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productAPI, configAPI } from '../../api';
import { Search, KeyRound, LogIn, LayoutDashboard, X } from 'lucide-react';

/**
 * Header — logo (left) + search bar (center) + login button (right).
 * Search navigates to `/?q=...` so it works from any page.
 * The search placeholder auto-types real mod names (typewriter effect).
 */
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const q = new URLSearchParams(location.search).get('q') || '';
  const [query, setQuery] = useState(q);
  const [focused, setFocused] = useState(false);

  // Real mod names for the animated placeholder
  const [suggestions, setSuggestions] = useState([]);
  const [placeholder, setPlaceholder] = useState('Search mods...');
  // Uploaded site logo (from Settings)
  const [siteLogo, setSiteLogo] = useState('');
  const [logoLoading, setLogoLoading] = useState(true);

  // Load site logo once
  useEffect(() => {
    configAPI.get()
      .then((res) => setSiteLogo(res.data?.siteLogo || ''))
      .catch(() => {})
      .finally(() => setLogoLoading(false));
  }, []);

  // Keep the input in sync when navigating (back/forward, filters, etc.)
  useEffect(() => { setQuery(q); }, [q]);

  // Load mod names once (noimage=1 → tiny payload, no base64 images)
  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '10', noimage: '1' })
      .then((res) => {
        const titles = (res.data || []).map((p) => p.title).filter(Boolean).slice(0, 10);
        setSuggestions(titles);
      })
      .catch(() => {});
  }, []);

  // ─── Typewriter placeholder: types each mod name, erases, next ───
  useEffect(() => {
    const words = suggestions;
    if (!words.length) { setPlaceholder('Search mods...'); return; }

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIdx % words.length];
      if (!deleting) {
        charIdx++;
        setPlaceholder(word.slice(0, charIdx));
        if (charIdx === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1800); // hold full word
          return;
        }
        timer = setTimeout(tick, 110); // typing speed
      } else {
        charIdx--;
        setPlaceholder(word.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          wordIdx++;
          timer = setTimeout(tick, 500); // pause before next word
          return;
        }
        timer = setTimeout(tick, 40); // erase speed
      }
    };

    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [suggestions]);

  if (location.pathname.startsWith('/admin')) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const t = query.trim();
    if (t) navigate(`/?q=${encodeURIComponent(t)}`);
    else navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080812]/85 backdrop-blur-xl border-b border-[#1e1e2e]/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* ─── Left: logo (uploaded image or default key icon) — fixed-size slot, no flash/jump ─── */}
          <Link to="/" className="flex-shrink-0 group w-8 h-8 sm:w-9 sm:h-9" title="KeyStore">
            {logoLoading ? (
              /* Skeleton while config loads — same size, so no layout shift */
              <span className="block w-full h-full rounded-lg bg-[#14142a]/80 border border-[#1e1e2e]/50 animate-pulse" />
            ) : siteLogo ? (
              <img
                src={siteLogo}
                alt="Logo"
                className="w-full h-full rounded-lg object-contain bg-[#0d0d1a]/70 border border-[#1e1e2e]/60 p-0.5 group-hover:scale-105 transition-transform duration-200 animate-fade-in"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200">
                <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
            )}
          </Link>

          {/* ─── Center: search bar (animated placeholder) ─── */}
          <form onSubmit={handleSearch} className="flex-1 min-w-0 max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={!focused && !query ? placeholder : 'Search mods...'}
              className="w-full bg-[#0d0d1a]/80 border border-[#1e1e2e]/60 rounded-xl pl-9 pr-8 py-2 sm:py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); navigate('/'); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* ─── Right: login / admin button ─── */}
          {user ? (
            <Link
              to="/admin/dashboard"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all"
            >
              <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
