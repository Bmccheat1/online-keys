import { memo } from 'react';

/**
 * DurationSelector — Shows available durations with real-time stock
 *
 * Props:
 * - durations: Array of { label, value, unit, price, availableKeys, isSoldOut }
 * - selected: Currently selected duration object
 * - onSelect: Callback when user selects a duration
 * - hideSoldOut: If true, sold-out durations are hidden (default: false)
 * - showCount: If true, shows "X left" count (default: false — counts are internal only)
 */
const DurationSelector = memo(function DurationSelector({
  durations,
  selected,
  onSelect,
  hideSoldOut = false,
  showCount = false, // Public page pe count nahi dikhana
}) {
  // If hiding sold-out, filter them out first
  const visibleDurations = hideSoldOut
    ? durations.filter((d) => !d.isSoldOut)
    : durations;

  const hours = visibleDurations.filter((d) => d.unit === 'hours');
  const days = visibleDurations.filter((d) => d.unit === 'days');

  const renderGroup = (items, title) => {
    if (items.length === 0) return null;

    return (
      <div>
        <h4 className="text-xs font-semibold text-gray-500 mb-2 capitalize tracking-wide uppercase">{title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {items.map((d, i) => {
            const isSelected = selected?.value === d.value && selected?.unit === d.unit;
            const soldOut = d.isSoldOut;

            return (
              <button
                key={i}
                onClick={() => !soldOut && onSelect(d)}
                disabled={soldOut}
                className={`
                  p-3 rounded-xl border text-sm font-medium transition-all relative
                  ${isSelected && !soldOut
                    ? 'border-amber-500/60 bg-amber-500/15 text-amber-400 shadow-gold-sm ring-1 ring-amber-500/30'
                    : soldOut
                      ? 'border-[#1e1e2e] bg-[#0a0a14]/50 text-gray-700 cursor-not-allowed opacity-60'
                      : 'border-[#1e1e2e] bg-[#0a0a14]/60 text-gray-300 hover:border-amber-500/40 hover:bg-amber-500/5'
                  }
                `}
              >
                <span className="block">{d.label}</span>
                <span className={`block text-xs mt-1 ${isSelected && !soldOut ? 'text-amber-400' : 'text-gray-400'}`}>
                  {soldOut ? '—' : `₹${d.price.toLocaleString()}`}
                </span>
                {soldOut ? (
                  <span className="block text-[10px] mt-0.5 text-red-400 font-medium">
                    Sold Out
                  </span>
                ) : showCount ? (
                  <span className="block text-[10px] mt-0.5 text-gray-600">
                    {d.availableKeys} left
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // If all durations are sold out
  if (visibleDurations.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm bg-[#0a0a14]/50 rounded-xl border border-dashed border-[#1e1e2e]">
        <p className="mb-1">All durations are currently sold out</p>
        <p className="text-xs text-gray-700">Check back later or try a different product</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {renderGroup(hours, 'Hours')}
      {renderGroup(days, 'Days')}
    </div>
  );
});

export default DurationSelector;
