import { useState, useEffect, useRef, useCallback } from 'react';
import { productAPI } from '../../api';
import { BadgeCheck, X, KeyRound } from 'lucide-react';

/**
 * PurchaseToasts — Live "recent purchase" social-proof notifications.
 * 1. Fake toasts: purely client-side demo, realistic-looking purchase popups
 *    sliding in from the bottom-left, using the REAL catalog (mod titles,
 *    durations) so it looks authentic.
 * 2. Real toasts: fired via the window 'real-purchase' event when an actual
 *    order completes (dispatched by ProductPage after payment success).
 * Both can be dismissed by tapping X or swiping left.
 */

const NAMES = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Rohit', 'Pooja', 'Karan', 'Neha', 'Arjun', 'Divya', 'Sanjay', 'Ritu', 'Manish', 'Kavita', 'Deepak', 'Anjali', 'Suresh', 'Meera', 'Aditya', 'Ishita', 'Varun', 'Tanvi'];
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur', 'Lucknow', 'Ahmedabad', 'Surat', 'Nagpur', 'Indore', 'Kochi', 'Chandigarh', 'Patna', 'Bhopal', 'Goa', 'Vadodara', 'Ludhiana'];
const TIMES = ['just now', 'just now', '1 min ago', '2 mins ago', '3 mins ago', '5 mins ago'];
const VERBS = ['bought', 'purchased', 'grabbed'];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ─── Single toast: swipe-left to dismiss, X button, slide-out anim ─── */
function ToastCard({ t, leaving, onDismiss }) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragId = useRef(null);
  const startX = useRef(0);

  const handlePointerDown = (e) => {
    startX.current = e.clientX;
    dragId.current = e.pointerId;
    setDragging(true);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
  };

  const handlePointerMove = (e) => {
    if (dragId.current !== e.pointerId) return;
    setDx(Math.max(-280, Math.min(0, e.clientX - startX.current)));
  };

  const handlePointerUp = (e) => {
    if (dragId.current !== e.pointerId) return;
    dragId.current = null;
    setDragging(false);
    if (dx <= -60) onDismiss();
    else setDx(0);
  };

  const cancelDrag = () => { dragId.current = null; setDragging(false); setDx(0); };

  const isReal = !!t.real;

  return (
    <div
      className={`${leaving ? 'toast-leave' : 'toast-slide-in'} relative pointer-events-auto touch-pan-y rounded-xl p-3 pr-9 flex items-start gap-2.5 shadow-panel select-none cursor-grab active:cursor-grabbing
        ${isReal
          ? 'bg-[#0d0d1a]/95 backdrop-blur-xl border border-amber-500/40 shadow-gold-sm'
          : 'bg-[#0d0d1a]/95 backdrop-blur-xl border border-[#1e1e2e]/80'}`}
      style={{ transform: `translateX(${dx}px)`, transition: dragging ? 'none' : 'transform 0.25s ease' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={cancelDrag}
      onPointerLeave={cancelDrag}
    >
      {/* Dismiss (X) button */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="absolute top-1.5 right-1.5 text-gray-600 hover:text-gray-300 hover:bg-white/5 rounded-md p-0.5 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Avatar / icon */}
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isReal ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/30' : 'bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30'}`}>
        {isReal
          ? <KeyRound className="w-4 h-4 text-emerald-400" />
          : <span className="text-xs font-bold text-amber-400">{t.name.slice(0, 1)}</span>}
      </div>

      <div className="min-w-0 flex-1">
        {isReal ? (
          <>
            <p className="text-[11px] leading-snug text-gray-300">
              <span className="font-bold text-emerald-400">Key Delivered</span> —{' '}
              <span className="font-semibold text-amber-400 truncate">{t.title}</span>
              {t.durLabel && <span className="text-gray-500"> ({t.durLabel})</span>}
            </p>
            <p className="text-[9px] text-gray-600 mt-1 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">Payment Confirmed</span>
              {t.amount != null && <span>· ₹{Number(t.amount).toLocaleString()}</span>}
              {t.timeAgo ? <span>· {t.timeAgo}</span> : null}
            </p>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <BadgeCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isReal ? 'text-emerald-500' : 'text-emerald-500'}`} />
    </div>
  );
}

export default function PurchaseToasts() {
  const [toasts, setToasts] = useState([]);
  const [leaving, setLeaving] = useState({});
  const modsRef = useRef([]);

  // Load real catalog once — toasts use real mod titles & durations
  // noimage=1: skip base64 images (only titles needed) → tiny payload
  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '50', noimage: '1' })
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

  const pushToast = useCallback((toast) => {
    setToasts((t) => [...t.slice(-1), toast]); // max 2 visible at once
    setTimeout(() => removeToast(toast.id), toast.real ? 8000 : 6000);
  }, [removeToast]);

  // Fake purchase popups — first after ~6s, then every 9–16s (randomized)
  const pushFake = useCallback(() => {
    const mods = modsRef.current;
    if (!mods.length) return;
    const mod = rand(mods);
    const dur = mod.durations?.[Math.floor(Math.random() * mod.durations.length)];
    pushToast({
      id: Date.now() + Math.random(),
      name: rand(NAMES),
      city: rand(CITIES),
      verb: rand(VERBS),
      title: mod.title,
      durLabel: dur?.label || '',
      timeAgo: rand(TIMES),
      real: false,
    });
  }, [pushToast]);

  useEffect(() => {
    pushFake();
    const first = setTimeout(pushFake, 8000);
    let interval;
    const schedule = () => {
      interval = setTimeout(() => {
        pushFake();
        schedule();
      }, 9000 + Math.random() * 7000);
    };
    schedule();
    return () => { clearTimeout(first); clearTimeout(interval); };
  }, [pushFake]);

  // REAL purchases — fired from ProductPage after payment success
  useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {};
      pushToast({
        id: Date.now() + Math.random(),
        title: d.title || 'Order',
        durLabel: d.durLabel || '',
        amount: d.amount != null ? d.amount : null,
        timeAgo: 'just now',
        real: true,
      });
    };
    window.addEventListener('real-purchase', handler);
    return () => window.removeEventListener('real-purchase', handler);
  }, [pushToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[70] flex flex-col gap-2 w-[300px] pointer-events-none select-none">
      {toasts.map((t) => (
        <ToastCard key={t.id} t={t} leaving={leaving[t.id]} onDismiss={() => removeToast(t.id)} />
      ))}
    </div>
  );
}
