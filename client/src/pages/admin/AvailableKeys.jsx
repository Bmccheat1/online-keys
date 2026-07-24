import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productAPI, keyAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { BarChart3, KeyRound, Package, ChevronDown, RefreshCw, Clock } from 'lucide-react';

export default function AvailableKeys() {
  const [mods, setMods] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [expandedMod, setExpandedMod] = useState(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      productAPI.getAll({ active: 'true', limit: '100' }),
      keyAPI.getStats(),
    ]).then(([prodRes, statsRes]) => {
      setMods(prodRes.data || []);
      setStats(statsRes.data || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleClearExpired = async () => {
    setClearing(true);
    try {
      await keyAPI.clearExpired();
      toast.success('Expired pending keys cleared!');
      loadData();
    } catch (e) {
      toast.error('Failed to clear');
    } finally { setClearing(false); }
  };

  // Calculate total pending across all mods
  const totalPending = stats.reduce((sum, s) => {
    return sum + (s.statuses?.find(st => st.status === 'payment_pending')?.count || 0);
  }, 0);

  const getDurStats = (modId, durValue, durUnit) => {
    const entry = stats.find(s =>
      String(s._id.productId) === String(modId) &&
      s._id.durationValue === durValue &&
      s._id.durationUnit === durUnit
    );
    if (!entry) return { available: 0, sold: 0, pending: 0, total: 0 };
    const available = entry.statuses.find(s => s.status === 'available')?.count || 0;
    const sold = entry.statuses.find(s => s.status === 'sold')?.count || 0;
    const pending = entry.statuses.find(s => s.status === 'payment_pending')?.count || 0;
    return { available, sold, pending, total: entry.total };
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Available Keys</h1>
          <p className="text-xs text-gray-500 mt-0.5">Overview of all key inventory across mods and durations</p>
        </div>
      </div>

      {/* Pending keys alert */}
      {totalPending > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 md:p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-300">{totalPending} key{totalPending > 1 ? 's are' : ' is'} payment pending</p>
              <p className="text-xs text-yellow-500/80">These keys were reserved but payment wasn't completed. Expired ones will auto-clear in 10 min.</p>
            </div>
          </div>
          <button
            onClick={handleClearExpired}
            disabled={clearing}
            className="text-xs text-yellow-300 hover:text-yellow-200 bg-yellow-500/20 hover:bg-yellow-500/30 px-3 py-2 rounded-lg transition-all font-medium shrink-0 inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${clearing ? 'animate-spin' : ''}`} />
            {clearing ? 'Clearing...' : 'Clear Expired'}
          </button>
        </div>
      )}

      {mods.length === 0 ? (
        <div className="text-center py-16 text-gray-600 bg-[#0d0d1a]/50 rounded-xl border border-[#1e1e2e]/60">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-700" />
          <p className="text-base font-medium text-gray-500">No mods found</p>
          <Link to="/admin/mods/add" className="text-amber-400 hover:text-amber-300 text-sm mt-2 inline-block">Create your first mod →</Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {mods.map((mod) => {
            const isExpanded = expandedMod === mod._id;
            const totalKeys = stats
              .filter(s => String(s._id.productId) === String(mod._id))
              .reduce((sum, s) => sum + s.total, 0);
            const availableKeys = stats
              .filter(s => String(s._id.productId) === String(mod._id))
              .reduce((sum, s) => sum + (s.statuses.find(st => st.status === 'available')?.count || 0), 0);

            return (
              <div key={mod._id} className="bg-[#0d0d1a]/80 backdrop-blur-sm border border-[#1e1e2e]/60 rounded-xl overflow-hidden transition-all duration-200">
                {/* Mod Header — Click to expand */}
                <button
                  onClick={() => setExpandedMod(isExpanded ? null : mod._id)}
                  className="w-full px-4 md:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[#0a0a14]/40 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">{mod.title}</h3>
                      <p className="text-xs text-gray-500">{mod.durations?.length || 0} duration{(mod.durations?.length || 0) !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-4 text-xs">
                      <span className="text-emerald-400 font-medium">{availableKeys} available</span>
                      <span className="text-gray-600">/</span>
                      <span className="text-gray-500">{totalKeys} total</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="sm:hidden text-right">
                        <p className="text-xs text-emerald-400 font-medium">{availableKeys}/{totalKeys}</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Duration rows — expandable */}
                {isExpanded && (
                  <div className="border-t border-[#1e1e2e]/40 divide-y divide-[#1e1e2e]/30">
                    {mod.durations?.length > 0 ? (
                      mod.durations.map((dur, i) => {
                        const cnt = getDurStats(mod._id, dur.value, dur.unit);
                        return (
                          <div key={i} className="px-4 md:px-5 py-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 min-w-0">
                              <KeyRound className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{dur.label}</span>
                              <span className="text-xs text-gray-600">₹{dur.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                              <span className="text-xs text-emerald-400 font-medium">{cnt.available} avail</span>
                              {cnt.sold > 0 && <span className="text-xs text-red-400">{cnt.sold} sold</span>}
                              {cnt.pending > 0 && <span className="text-xs text-yellow-400">{cnt.pending} pending</span>}
                              <span className="text-xs text-gray-600">({cnt.total})</span>
                              {cnt.total === 0 && <span className="text-xs text-gray-700">No keys</span>}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="px-4 md:px-5 py-3 text-xs text-gray-700">No durations configured</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
