import { NavLink, useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Package, KeyRound, ClipboardList, Settings,
  LogOut, X, BarChart3, Tag, ShieldCheck
} from 'lucide-react';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/mods', label: 'Mods', icon: Package },
  { to: '/admin/keys', label: 'License Keys', icon: KeyRound },
  { to: '/admin/available-keys', label: 'Available Keys', icon: BarChart3 },
  { to: '/admin/coupons', label: 'Coupons', icon: Tag },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminSidebar = memo(function AdminSidebar({ open, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close sidebar on browser back/forward (mobile)
  useEffect(() => {
    const handleRoute = () => onToggle?.(false);
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, [onToggle]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = (user?.name || user?.email || 'A')
    .split(/[\s@.]+/).filter(Boolean).slice(0, 2)
    .map(s => s[0].toUpperCase()).join('');

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-[#1e1e2e]/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-gold flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#0a0a14]" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 font-display leading-tight">
            Admin Panel
          </h2>
          <p className="text-[10px] text-gray-600 truncate">Online Keys · Dashboard</p>
        </div>
        {/* Close button — inside the drawer, never overlapping options (mobile only) */}
        <button
          onClick={() => onToggle?.(false)}
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a28] transition-colors flex-shrink-0"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-gray-700 font-semibold">Menu</p>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin/dashboard'}
              onClick={() => onToggle?.(false)}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10'
                    : 'text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500" />
                  )}
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : ''}`} />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="px-3 py-4 border-t border-[#1e1e2e]/60 space-y-2">
        {user && (
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#0a0a14]/50 border border-[#1e1e2e]/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-amber-400">{initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-gray-300 truncate">{user.name || user.email}</p>
              <p className="text-[9px] text-gray-600 uppercase tracking-wider">Administrator</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay (mobile) — above header bar, below drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => onToggle?.(false)}
        />
      )}

      {/* Sidebar - Desktop: always visible, Mobile: slide overlay */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
});

export default AdminSidebar;
