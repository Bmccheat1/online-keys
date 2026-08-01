import { ShieldCheck, Zap, BadgeCheck } from 'lucide-react';

/* Site-wide footer — pinned to the bottom of the page */
export default function SiteFooter() {
  return (
    <footer className="mt-auto px-3 sm:px-5 pb-5">
      <div className="max-w-6xl mx-auto">
        <div className="pt-4 border-t border-[#1e1e2e]/40 flex items-center justify-center gap-3 text-[10px] text-gray-500 flex-wrap">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure
          </span>
          <span className="text-gray-800">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Delivery
          </span>
          <span className="text-gray-800">•</span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> UPI Verified
          </span>
        </div>
        <p className="text-center text-[10px] text-gray-700 mt-4">
          © {new Date().getFullYear()} Online Keys — Digital license key store
        </p>
      </div>
    </footer>
  );
}
