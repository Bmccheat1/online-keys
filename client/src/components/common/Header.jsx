import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { configAPI } from '../../api';
import { Settings, KeyRound } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [siteName, setSiteName] = useState('KeyStore');

  useEffect(() => {
    configAPI.get().then((r) => {
      if (r?.data?.siteName) setSiteName(r.data.siteName);
    }).catch(() => {});
  }, []);

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <header className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center relative">
          <Link
            to="/"
            className="group flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide font-display"
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200">
              <KeyRound className="w-4 h-4 text-white" />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
              {siteName}
            </span>
          </Link>
          <Link
            to="/login"
            className="absolute right-0 flex items-center gap-1.5 text-gray-500 hover:text-amber-400 transition-colors text-xs md:text-sm group"
            title="Admin"
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </header>
  );
}
