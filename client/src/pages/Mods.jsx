import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api';
import Loader from '../components/common/Loader';
import { Sparkles } from 'lucide-react';

export default function Mods() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '100' }).then((res) => {
      setMods(res.data || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Header area */}
      <div className="text-center mb-6 md:mb-10">
        <div className="inline-flex items-center gap-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full px-3 py-1 mb-3">
          <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-400" />
          <span className="text-[10px] md:text-xs text-primary-400 font-medium">Browse All Mods</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Mod Store</h1>
        <p className="text-dark-400 text-sm md:text-base mt-1">Browse all available mods and choose your license</p>
      </div>

      <Link to="/" className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 text-xs md:text-sm mb-6 transition-colors">
        ← Quick Buy (Select & Pay)
      </Link>

      {mods.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-dark-400 text-lg">No mods available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {mods.map((mod) => {
            const prices = mod.durations.map((d) => d.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            return (
              <Link
                key={mod._id}
                to={`/mods/${mod._id}`}
                className="card p-4 md:p-5 hover:border-primary-500/50 transition-all duration-300 group block relative overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary-500/5 rounded-full group-hover:bg-primary-500/10 transition-all" />
                <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-primary-400 transition mb-2">
                  {mod.title}
                </h3>
                <p className="text-dark-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{mod.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] md:text-xs text-dark-500">From</span>
                    <p className="text-base md:text-lg font-bold text-primary-400">
                      ₹{minPrice.toLocaleString()}
                      {maxPrice > minPrice && <span className="text-xs md:text-sm text-dark-500 font-normal"> - ₹{maxPrice.toLocaleString()}</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] md:text-xs text-dark-500">{mod.durations.length} option{mod.durations.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
