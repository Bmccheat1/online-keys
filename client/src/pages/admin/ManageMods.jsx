import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { Package, Plus, Edit3, Trash2 } from 'lucide-react';

export default function ManageMods() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '100' }).then((res) => setMods(res.data || [])).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this mod?')) return;
    try { await productAPI.delete(id); setMods(mods.filter((p) => p._id !== id)); }
    catch (error) { alert('Delete failed'); }
  };

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="page-header !mb-0">
          <h1 className="page-title">Mods</h1>
          <p className="page-sub">Manage your mod catalog & durations</p>
        </div>
        <Link to="/admin/mods/add" className="btn-gold !py-2.5 !px-5 inline-flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Add Mod
        </Link>
      </div>

      {/* Mod List */}
      <div className="grid gap-3 md:gap-4">
        {mods.map((mod) => (
          <div
            key={mod._id}
            className="panel panel-hover flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-gold flex-shrink-0">
                <Package className="w-5 h-5 text-[#0a0a14]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white truncate font-display">{mod.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  <span className="chip chip-amber !text-[9px] mr-1.5">{mod.durations?.length || 0} duration{(mod.durations?.length || 0) !== 1 ? 's' : ''}</span>
                  {mod.platform && mod.platform !== 'both' && (
                    <span className={`chip !text-[9px] mr-1.5 ${mod.platform === 'android' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-sky-500/15 border-sky-500/40 text-sky-300'}`}>
                      {mod.platform === 'android' ? 'Android' : 'iOS'}
                    </span>
                  )}
                  {mod.category && <span className="chip chip-gray !text-[9px] mr-1.5">{mod.category}</span>}
                  {mod.isBestSeller && <span className="chip bg-gradient-to-r from-amber-500 to-yellow-500 !text-[9px] mr-1.5 text-[#0a0a14] font-bold">★ Best Seller</span>}
                  {mod.durations?.length > 0 && (
                    <>Starting <span className="text-amber-400 font-semibold">₹{Math.min(...mod.durations.map(d => d.price)).toLocaleString()}</span></>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to={`/admin/mods/${mod._id}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg transition-all border border-amber-500/20"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </Link>
              <button
                onClick={() => handleDelete(mod._id)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
        {mods.length === 0 && (
          <div className="text-center py-16 panel border-dashed">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <p className="text-lg font-medium text-gray-500">No mods yet</p>
            <p className="text-sm text-gray-700 mt-1">Create your first mod to start selling</p>
            <Link to="/admin/mods/add" className="btn-gold inline-flex items-center gap-2 mt-4 !py-2 !px-4 text-xs">
              <Plus className="w-3.5 h-3.5" /> Add Mod
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
