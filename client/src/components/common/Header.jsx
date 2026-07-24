import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { configAPI } from '../../api';
import { Settings } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center relative">
          <Link to="/" className="text-lg md:text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
            {siteName}
          </Link>
          <Link to="/login" className="absolute right-0 text-gray-600 hover:text-amber-400 transition-colors" title="Admin">
            <Settings className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </header>
  );
}
