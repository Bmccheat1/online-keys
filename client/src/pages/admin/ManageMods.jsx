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
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white">Mods</h1>
        <Link to="/admin/mods/add" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-200 shadow-lg shadow-amber-600/20 text-sm">
          <Plus className="w-4 h-4" /> Add Mod
        </Link>
      </div>

      {/* Mod List */}
      <div className="grid gap-3 md:gap-4">
        {mods.map((mod) => (
          <div
            key={mod._id}
            className="bg-[#0d0d1a]/80 backdrop-blur-sm border border-[#1e1e2e]/60 rounded-xl p-4 md:p-5 hover:border-amber-500/20 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{mod.title}</h3>
                  <p className="text-sm text-gray-500">
                    {mod.durations?.length || 0} duration{(mod.durations?.length || 0) !== 1 ? 's' : ''}
                    {mod.durations?.length > 0 && (
                      <> · Starting ₹{Math.min(...mod.durations.map(d => d.price)).toLocaleString()}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to={`/admin/mods/${mod._id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(mod._id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {mods.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <p className="text-lg font-medium text-gray-500">No mods yet</p>
            <p className="text-sm text-gray-700 mt-1">Create your first mod to start selling</p>
          </div>
        )}
      </div>
    </div>
  );
}
