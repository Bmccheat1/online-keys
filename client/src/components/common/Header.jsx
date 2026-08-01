import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, KeyRound, LogIn, LayoutDashboard, X } from 'lucide-react';

/**
 * Header — logo (left) + search bar (center) + login button (right).
 * Search navigates to `/?q=...` so it works from any page.
 */
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const q = new URLSearchParams(location.search).get('q') || '';
  const [query, setQuery] = useState(q);

  // Keep the input in sync when navigating (back/forward, filters, etc.)
  useEffect(() => { setQuery(q); }, [q]);

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
          {/* ─── Left: logo only (no name) ─── */}
          <Link to="/" className="flex-shrink-0 group" title="KeyStore">
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200">
              <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </span>
          </Link>

          {/* ─── Center: search bar ─── */}
          <form onSubmit={handleSearch} className="flex-1 min-w-0 max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mods..."
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
