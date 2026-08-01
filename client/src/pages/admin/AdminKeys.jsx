import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { productAPI, keyAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { KeyRound, Plus, Trash2, ChevronDown, Eye, EyeOff, BarChart3 } from 'lucide-react';

export default function AdminKeys() {
  const [mods, setMods] = useState([]);
  const [selectedModId, setSelectedModId] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [entryType, setEntryType] = useState('single');
  const [singleKey, setSingleKey] = useState('');
  const [bulkKeys, setBulkKeys] = useState('');
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [keys, setKeys] = useState([]);
  const [showKeys, setShowKeys] = useState(false);
  const [showOverview, setShowOverview] = useState(true);

  const selectedMod = mods.find((m) => m._id === selectedModId);
  const durations = selectedMod?.durations || [];

  useEffect(() => {
    Promise.all([
      productAPI.getAll({ active: 'true', limit: '100' }),
      keyAPI.getStats(),
    ]).then(([prodRes, statsRes]) => {
      setMods(prodRes.data || []);
      setStats(statsRes.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const loadKeys = async (modId, durLabel) => {
    if (!modId || !durLabel) return;
    try {
      const res = await keyAPI.getByProduct(modId);
      const filtered = (res.data || []).filter(k => {
        const dur = selectedMod?.durations?.find(d => d.label === durLabel);
        return dur && k.durationValue === dur.value && k.durationUnit === dur.unit;
      });
      setKeys(filtered);
      setShowKeys(true);
      setShowOverview(false);
    } catch (err) {
      setKeys([]);
    }
  };

  const handleModChange = (modId) => {
    setSelectedModId(modId);
    setSelectedDuration('');
    setShowKeys(false);
  };

  const handleDurationChange = (label) => {
    setSelectedDuration(label);
    setShowKeys(false);
    loadKeys(selectedModId, label);
  };

  const handleAddKeys = async () => {
    if (!selectedModId || !selectedDuration) {
      toast.error('Select a Mod and Duration first');
      return;
    }
    const dur = durations.find((d) => d.label === selectedDuration);
    if (!dur) { toast.error('Invalid duration'); return; }

    let keyValues = [];
    if (entryType === 'single') {
      if (!singleKey.trim()) { toast.error('Enter a license key'); return; }
      keyValues = [singleKey.trim()];
    } else {
      keyValues = bulkKeys.split('\n').map((k) => k.trim()).filter((k) => k.length > 0);
      if (keyValues.length === 0) { toast.error('Enter at least one key'); return; }
    }

    setAdding(true);
    try {
      const keyDocs = keyValues.map((kv) => ({
        keyValue: kv,
        durationValue: dur.value,
        durationUnit: dur.unit,
      }));
      await keyAPI.add({ productId: selectedModId, keys: keyDocs });
      toast.success(`${keyValues.length} key${keyValues.length > 1 ? 's' : ''} added!`);
      setSingleKey('');
      setBulkKeys('');
      // Refresh stats
      const statsRes = await keyAPI.getStats();
      setStats(statsRes.data || []);
      loadKeys(selectedModId, selectedDuration);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add keys');
    } finally { setAdding(false); }
  };

  const handleDelete = async (keyId) => {
    if (!confirm('Delete this key?')) return;
    try {
      await keyAPI.delete(keyId);
      setKeys(keys.filter((k) => k._id !== keyId));
      // Refresh stats
      const statsRes = await keyAPI.getStats();
      setStats(statsRes.data || []);
      toast.success('Key deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  // Helper: get key counts for a specific mod + duration
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
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">License Keys</h1>
        <p className="page-sub">Add & manage license keys per mod and duration</p>
      </div>

      {/* ─── Overview: All Mods × Durations ─── */}
      {showOverview && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-gray-300">Key Inventory Overview</h2>
          </div>

          <div className="grid gap-3">
            {mods.length === 0 && (
              <div className="text-center py-10 text-gray-600 panel border-dashed">
                <KeyRound className="w-10 h-10 mx-auto mb-2 text-gray-700" />
                <p className="text-sm text-gray-500">No mods created yet</p>
              </div>
            )}

            {mods.map((mod) => {
              // Only show mods that have at least some keys
              const modHasKeys = stats.some(s => String(s._id.productId) === String(mod._id));
              return (
                <div key={mod._id} className="panel overflow-hidden !p-0">
                  {/* Mod Header */}
                  <div className="px-4 py-3 bg-[#0a0a14]/60 border-b border-[#1e1e2e]/40 flex items-center gap-3">
                    <KeyRound className="w-4 h-4 text-amber-400/70 flex-shrink-0" />
                    <span className="font-semibold text-white text-sm">{mod.title}</span>
                    {!modHasKeys && <span className="text-xs text-gray-600 ml-auto">No keys</span>}
                  </div>

                  {/* Duration rows */}
                  {mod.durations?.length > 0 && (
                    <div className="divide-y divide-[#1e1e2e]/30">
                      {mod.durations.map((dur, i) => {
                        const cnt = getDurStats(mod._id, dur.value, dur.unit);
                        const isEmpty = cnt.total === 0;
                        return (
                          <div key={i} className={`px-4 py-2.5 flex items-center justify-between gap-2 ${isEmpty ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xs text-gray-400 w-20 flex-shrink-0">{dur.label}</span>
                              <span className="text-xs text-gray-600">₹{dur.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                              {isEmpty ? (
                                <span className="text-xs text-gray-700">—</span>
                              ) : (
                                <>
                                  <span className="text-xs text-emerald-400 font-medium">{cnt.available} avail</span>
                                  <span className="text-xs text-red-400">{cnt.sold} sold</span>
                                  {cnt.pending > 0 && <span className="text-xs text-yellow-400">{cnt.pending} pending</span>}
                                  <span className="text-xs text-gray-600">({cnt.total})</span>
                                </>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedModId(mod._id);
                                  setSelectedDuration(dur.label);
                                  loadKeys(mod._id, dur.label);
                                }}
                                className="text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg transition-all"
                              >
                                View Keys
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(!mod.durations || mod.durations.length === 0) && (
                    <div className="px-4 py-3 text-xs text-gray-600">No durations configured</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Toggle Overview ─── */}
      {!showOverview && (
        <button
          onClick={() => { setShowOverview(true); setShowKeys(false); }}
          className="mb-4 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5"
        >
          <BarChart3 className="w-3.5 h-3.5" /> Show Overview
        </button>
      )}

      {/* ─── Add Keys Section ─── */}
      <div className="panel mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-3">Add License Key</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Select Mod</label>
            <div className="relative">
              <select value={selectedModId} onChange={(e) => handleModChange(e.target.value)} className="select-field w-full">
                <option value="">— Select Mod —</option>
                {mods.map((mod) => (
                  <option key={mod._id} value={mod._id}>{mod.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Select Duration</label>
            <div className="relative">
              <select value={selectedDuration} onChange={(e) => handleDurationChange(e.target.value)} className="select-field w-full disabled:opacity-50" disabled={!selectedModId}>
                <option value="">— Select Duration —</option>
                {durations.map((dur, i) => (
                  <option key={i} value={dur.label}>{dur.label} — ₹{dur.price.toLocaleString()}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Entry Type</label>
            <div className="relative">
              <select value={entryType} onChange={(e) => setEntryType(e.target.value)} className="select-field w-full">
                <option value="single">Single Key Entry</option>
                <option value="bulk">Bulk Key Entry</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Key Entry ─── */}
      {selectedModId && selectedDuration && (
        <div className="panel mb-6">
          <h3 className="font-semibold text-white mb-3 text-sm md:text-base font-display">
            {entryType === 'single' ? 'Enter License Key' : 'Bulk Add License Keys'}
          </h3>

          {entryType === 'single' ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={singleKey}
                onChange={(e) => setSingleKey(e.target.value)}
                className="flex-1 input-field font-mono"
                placeholder="e.g. ABCD-1234-EFGH-5678"
              />
              <button onClick={handleAddKeys} disabled={adding || !singleKey.trim()} className="btn-gold !py-2.5 !px-5 text-sm disabled:opacity-50 flex items-center justify-center gap-1.5">
                {adding ? 'Adding...' : <><Plus className="w-4 h-4" /> Add Key</>}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-2">Enter one key per line:</p>
              <textarea
                value={bulkKeys}
                onChange={(e) => setBulkKeys(e.target.value)}
                className="w-full input-field font-mono"
                rows="6"
                placeholder={"ABCD-1234-EFGH-5678\nIJKL-9012-MNOP-3456\nQRST-7890-UVWX-1234"}
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-3">
                <span className="text-sm text-gray-500">
                  {bulkKeys.split('\n').filter((k) => k.trim()).length} keys detected
                </span>
                <button onClick={handleAddKeys} disabled={adding} className="btn-gold !py-2.5 !px-5 text-sm disabled:opacity-50 flex items-center gap-1.5">
                  {adding ? 'Adding...' : <><Plus className="w-4 h-4" /> Add {bulkKeys.split('\n').filter((k) => k.trim()).length || 0} Keys</>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── View Keys Table ─── */}
      {showKeys && selectedMod && (
        <div className="panel overflow-hidden !p-0">
          <div className="p-4 md:p-5 border-b border-[#1e1e2e]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-semibold text-white text-sm md:text-base font-display">
              {selectedMod.title} — {selectedDuration}
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
              <span className="text-emerald-400 font-medium">{keys.filter(k => k.status === 'available').length} Available</span>
              <span className="text-red-400 font-medium">{keys.filter(k => k.status === 'sold').length} Sold</span>
              <span className="text-gray-500">{keys.filter(k => k.status === 'payment_pending').length} Pending</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="table-head">
                  <th className="text-left p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">License Key</th>
                  <th className="text-left p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Status</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr key={key._id} className="table-row">
                    <td className="p-3 md:p-4 font-mono text-xs md:text-sm text-gray-200 break-all">{key.keyValue}</td>
                    <td className="p-3 md:p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        key.status === 'available' ? 'bg-emerald-500/10 text-emerald-400' :
                        key.status === 'sold' ? 'bg-red-500/10 text-red-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>{key.status}</span>
                    </td>
                    <td className="p-3 md:p-4 text-right">
                      {key.status === 'available' && (
                        <button onClick={() => handleDelete(key._id)} className="text-red-400 hover:text-red-300 text-xs md:text-sm font-medium bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all inline-flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {keys.length === 0 && (
                  <tr><td colSpan="3" className="p-8 md:p-12 text-center text-gray-600">No keys for this duration yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!selectedModId && !showOverview && (
        <div className="text-center py-16 text-gray-600">
          <KeyRound className="w-12 h-12 mx-auto mb-3 text-gray-700" />
          <p className="text-base font-medium text-gray-500">Manage License Keys</p>
          <p className="text-sm text-gray-700 mt-1">Select a Mod and Duration above to add or view keys</p>
        </div>
      )}
    </div>
  );
}
