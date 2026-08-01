import { Link } from 'react-router-dom';
import { KeyRound, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-gold-lg">
          <KeyRound className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-7xl font-bold font-display mb-2">
          <span className="text-gradient">404</span>
        </h1>
        <p className="text-xl text-gray-400 mb-6">Page not found</p>
        <Link to="/" className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 text-sm">
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  );
}
