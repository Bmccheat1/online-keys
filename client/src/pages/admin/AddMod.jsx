import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { Package, Plus, X, ArrowLeft, Sparkles } from 'lucide-react';

const emptyDuration = { label: '', value: 1, unit: 'hours', price: 0, flashSale: { isActive: false, flashPrice: null, startAt: null, endAt: null } };

export default function AddMod() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', durations: [{ ...emptyDuration }] });

  useEffect(() => {
    if (isEdit) {
      productAPI.getById(id).then((res) => {
        const p = res.data;
        setForm({ title: p.title, description: p.description || '', durations: p.durations.length > 0 ? p.durations : [{ ...emptyDuration }] });
      }).finally(() => setLoading(false));
    } else { setLoading(false); }
  }, [id, isEdit]);

  const handleDurationChange = (index, field, value) => {
    const newDurations = [...form.durations];
    newDurations[index] = { ...newDurations[index], [field]: value };
    if (field === 'value' || field === 'unit') {
      const d = newDurations[index];
      const unitLabel = d.unit === 'hours' ? (d.value === 1 ? 'Hour' : 'Hours') : (d.value === 1 ? 'Day' : 'Days');
      d.label = `${d.value} ${unitLabel}`;
    }
    setForm({ ...form, durations: newDurations });
  };

  const addDuration = () => setForm({ ...form, durations: [...form.durations, { ...emptyDuration }] });
  const removeDuration = (index) => {
    if (form.durations.length <= 1) return;
    setForm({ ...form, durations: form.durations.filter((_, i) => i !== index) });
  };

  const generateLabel = (d) => {
    if (d.label) return d.label;
    const unitLabel = d.unit === 'hours' ? (d.value === 1 ? 'Hour' : 'Hours') : (d.value === 1 ? 'Day' : 'Days');
    return `${d.value} ${unitLabel}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Mod title is required'); return; }
    if (form.durations.some((d) => d.price <= 0)) { toast.error('All durations must have a price > 0'); return; }
    const submitData = {
      ...form,
      durations: form.durations.map(d => ({ ...d, label: generateLabel(d) })),
    };
    setSaving(true);
    try {
      if (isEdit) { await productAPI.update(id, submitData); toast.success('Mod updated!'); }
      else { await productAPI.create(submitData); toast.success('Mod created!'); }
      navigate('/admin/mods');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-full lg:max-w-2xl">
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <button onClick={() => navigate('/admin/mods')} className="text-gray-500 hover:text-amber-400 transition-colors p-1.5 hover:bg-amber-500/10 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="page-title">{isEdit ? 'Edit Mod' : 'Add New Mod'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Mod Details */}
        <div className="panel !p-4 md:!p-6 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-gold flex-shrink-0">
              <Package className="w-4 h-4 text-[#0a0a14]" />
            </div>
            <h3 className="font-semibold text-white text-base font-display">Mod Details</h3>
          </div>
          <div>
            <label className="field">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="e.g. Windows 10 Pro" required />
          </div>
          <div>
            <label className="field">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows="3" placeholder="Mod description..." />
          </div>
        </div>

        {/* Durations */}
        <div className="panel !p-4 md:!p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-base font-display">Durations & Pricing</h3>
            <button type="button" onClick={addDuration} className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-medium bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1 border border-amber-500/20">
              <Plus className="w-3.5 h-3.5" /> Add Duration
            </button>
          </div>
          <div className="space-y-3">
            {form.durations.map((dur, index) => (
              <div key={index} className="bg-[#0a0a14]/60 border border-[#1e1e2e]/40 rounded-xl p-3 space-y-2.5">
                {/* Row 1: Value + Unit + Price + Remove */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <input type="number" value={dur.value} onChange={(e) => handleDurationChange(index, 'value', parseInt(e.target.value) || 1)} className="w-16 bg-[#0a0a14] border border-[#1e1e2e] rounded-lg px-2.5 py-2 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all" min="1" />
                    <select value={dur.unit} onChange={(e) => handleDurationChange(index, 'unit', e.target.value)} className="bg-[#0a0a14] border border-[#1e1e2e] rounded-lg px-2.5 py-2 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all">
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </select>
                  </div>
                  <span className="hidden sm:inline text-gray-600">→</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <input type="number" value={dur.price} onChange={(e) => handleDurationChange(index, 'price', parseInt(e.target.value) || 0)} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-lg pl-7 pr-2.5 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all" placeholder="Price" min="0" />
                  </div>
                  {form.durations.length > 1 && (
                    <button type="button" onClick={() => removeDuration(index)} className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg transition-all flex-shrink-0 self-end sm:self-center">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {/* Row 2: Flash Sale Toggle */}
                <div className="flex items-center gap-3 pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dur.flashSale?.isActive || false}
                      onChange={(e) => {
                        const newDurations = [...form.durations];
                        if (!newDurations[index].flashSale) newDurations[index].flashSale = { isActive: false, flashPrice: null, startAt: null, endAt: null };
                        newDurations[index].flashSale.isActive = e.target.checked;
                        setForm({ ...form, durations: newDurations });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#1e1e2e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs text-gray-400">Flash Sale</span>
                  </div>
                  {dur.flashSale?.isActive && (
                    <div className="flex items-center gap-2 ml-auto">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">₹</span>
                        <input
                          type="number"
                          value={dur.flashSale.flashPrice || ''}
                          onChange={(e) => {
                            const newDurations = [...form.durations];
                            if (!newDurations[index].flashSale) newDurations[index].flashSale = { isActive: true, flashPrice: null, startAt: null, endAt: null };
                            newDurations[index].flashSale.flashPrice = parseInt(e.target.value) || 0;
                            setForm({ ...form, durations: newDurations });
                          }}
                          className="w-20 bg-[#0a0a14] border border-[#1e1e2e] rounded-lg pl-5 pr-2 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                          placeholder="Price"
                          min="0"
                        />
                      </div>
                      <input
                        type="datetime-local"
                        value={dur.flashSale?.endAt ? new Date(dur.flashSale.endAt).toISOString().slice(0, 16) : ''}
                        onChange={(e) => {
                          const newDurations = [...form.durations];
                          if (!newDurations[index].flashSale) newDurations[index].flashSale = { isActive: true, flashPrice: null, startAt: null, endAt: null };
                          newDurations[index].flashSale.endAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                          setForm({ ...form, durations: newDurations });
                        }}
                        className="bg-[#0a0a14] border border-[#1e1e2e] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" disabled={saving} className="btn-gold !py-2.5 !px-8 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-2">
            {saving ? 'Saving...' : isEdit ? 'Update Mod' : 'Create Mod'}
          </button>
          <button type="button" onClick={() => navigate('/admin/mods')} className="btn-secondary !py-2.5 !px-6 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
