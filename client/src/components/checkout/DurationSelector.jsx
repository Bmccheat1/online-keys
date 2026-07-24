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
        <h4 className="text-sm font-medium text-dark-400 mb-2 capitalize">{title}</h4>
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
                  p-3 rounded-lg border text-sm font-medium transition-all relative
                  ${isSelected && !soldOut
                    ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                    : soldOut
                      ? 'border-dark-700 bg-dark-800/50 text-dark-500 cursor-not-allowed opacity-60'
                      : 'border-dark-600 bg-dark-700 text-dark-200 hover:border-dark-500'
                  }
                `}
              >
                <span className="block">{d.label}</span>
                <span className="block text-xs mt-1 text-primary-400">
                  {soldOut ? '—' : `₹${d.price.toLocaleString()}`}
                </span>
                {soldOut ? (
                  <span className="block text-[10px] mt-0.5 text-red-400 font-medium">
                    Sold Out
                  </span>
                ) : showCount ? (
                  <span className="block text-[10px] mt-0.5 text-dark-500">
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
      <div className="text-center py-6 text-dark-400 text-sm bg-dark-700/30 rounded-lg border border-dashed border-dark-600">
        <p className="mb-1">😔 All durations are currently sold out</p>
        <p className="text-xs text-dark-500">Check back later or try a different product</p>
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
