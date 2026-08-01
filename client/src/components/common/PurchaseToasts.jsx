import { useState, useEffect, useRef, useCallback } from 'react';
import { productAPI } from '../../api';
import { BadgeCheck } from 'lucide-react';

/**
 * PurchaseToasts — Live "recent purchase" social-proof notifications.
 * Purely client-side demo: shows realistic-looking purchase popups
 * sliding in from the bottom-left, using the REAL catalog (mod titles,
 * durations) so it looks authentic.
 */

const NAMES = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Rohit', 'Pooja', 'Karan', 'Neha', 'Arjun', 'Divya', 'Sanjay', 'Ritu', 'Manish', 'Kavita', 'Deepak', 'Anjali', 'Suresh', 'Meera', 'Aditya', 'Ishita', 'Varun', 'Tanvi'];
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur', 'Lucknow', 'Ahmedabad', 'Surat', 'Nagpur', 'Indore', 'Kochi', 'Chandigarh', 'Patna', 'Bhopal', 'Goa', 'Vadodara', 'Ludhiana'];
const TIMES = ['just now', 'just now', '1 min ago', '2 mins ago', '3 mins ago', '5 mins ago'];
const VERBS = ['bought', 'purchased', 'grabbed'];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function PurchaseToasts() {
  const [toasts, setToasts] = useState([]);
  const [leaving, setLeaving] = useState({});
  const modsRef = useRef([]);

  // Load real catalog once — toasts use real mod titles & durations
  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50' })
      .then((r) => { modsRef.current = r.data || []; })
      .catch(() => {});
  }, []);

  const removeToast = useCallback((id) => {
    setLeaving((l) => ({ ...l, [id]: true }));
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
      setLeaving((l) => {
        const copy = { ...l };
        delete copy[id];
        return copy;
      });
    }, 380);
  }, []);

  const pushToast = useCallback(() => {
    const mods = modsRef.current;
    if (!mods.length) return;
    const mod = rand(mods);
    const dur = mod.durations?.[Math.floor(Math.random() * mod.durations.length)];
    const id = Date.now() + Math.random();
    const toast = {
      id,
      name: rand(NAMES),
      city: rand(CITIES),
      verb: rand(VERBS),
      title: mod.title,
      durLabel: dur?.label || '',
      timeAgo: rand(TIMES),
    };
    setToasts((t) => [...t.slice(-1), toast]); // max 2 visible at once
    setTimeout(() => removeToast(id), 6000);
  }, [removeToast]);

  // First toast after ~6s, then every 9–16s (randomized so it feels organic)
  useEffect(() => {
    pushToast();
    const first = setTimeout(pushToast, 8000);
    let interval;
    const schedule = () => {
      interval = setTimeout(() => {
        pushToast();
        schedule();
      }, 9000 + Math.random() * 7000);
    };
    schedule();
    return () => { clearTimeout(first); clearTimeout(interval); };
  }, [pushToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[70] flex flex-col gap-2 w-[300px] pointer-events-none select-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${leaving[t.id] ? 'toast-leave' : 'toast-slide-in'} bg-[#0d0d1a]/95 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-xl p-3 shadow-panel flex items-start gap-2.5`}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-amber-400">{t.name.slice(0, 1)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] leading-snug text-gray-300">
              <span className="font-bold text-white">{t.name}</span> from <span className="text-gray-500">{t.city}</span>{' '}
              {t.verb} <span className="font-semibold text-amber-400 truncate">{t.title}</span>
              {t.durLabel && <span className="text-gray-500"> — {t.durLabel}</span>}
            </p>
            <p className="text-[9px] text-gray-600 mt-1 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">Verified</span> · {t.timeAgo}
            </p>
          </div>
          <BadgeCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
        </div>
      ))}
    </div>
  );
}
