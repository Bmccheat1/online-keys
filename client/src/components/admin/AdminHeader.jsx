import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Store, ShieldCheck } from 'lucide-react';

/**
 * AdminHeader — Mobile-only top bar for the admin panel.
 * Keeps the hamburger/close button INSIDE a proper header so it never
 * floats over the sidebar content or page content.
 */
const AdminHeader = memo(function AdminHeader({ open, onToggle }) {
  const { user } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 z-30 lg:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#1e1e2e]/60">
      <div className="flex items-center gap-3 h-14 px-3">
        {/* Toggle button lives inside the header bar */}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl border border-[#1e1e2e]/80 bg-[#0a0a14]/60 text-amber-400 hover:text-amber-300 active:scale-95 transition-all flex-shrink-0"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-gold-sm">
            <ShieldCheck className="w-4 h-4 text-[#0a0a14]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white font-display leading-tight truncate">Admin Panel</p>
            <p className="text-[9px] text-gray-600 truncate">{user?.name || 'Online Keys · Dashboard'}</p>
          </div>
        </div>

        <Link
          to="/"
          className="flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all shrink-0"
        >
          <Store className="w-3 h-3" /> Store
        </Link>
      </div>
    </header>
  );
});

export default AdminHeader;
