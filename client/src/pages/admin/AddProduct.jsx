import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { gameAPI, productAPI } from '../../api';
import Loader from '../../components/common/Loader';

const emptyDuration = { label: '', value: 1, unit: 'hours', price: 0 };

export default function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ gameId: '', title: '', description: '', durations: [{ ...emptyDuration }] });

  useEffect(() => {
    gameAPI.getAll({ active: 'true' }).then((res) => setGames(res.data || []));
    if (isEdit) {
      productAPI.getById(id).then((res) => {
        const p = res.data;
        setForm({ gameId: p.gameId?._id || '', title: p.title, description: p.description || '', durations: p.durations.length > 0 ? p.durations : [{ ...emptyDuration }] });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.gameId || !form.title.trim()) { toast.error('Game and Title are required'); return; }
    if (form.durations.some((d) => d.price <= 0)) { toast.error('All durations must have a price > 0'); return; }
    setSaving(true);
    try {
      if (isEdit) { await productAPI.update(id, form); toast.success('Product updated!'); }
      else { await productAPI.create(form); toast.success('Product created!'); }
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Product Details</h3>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Game *</label>
            <select value={form.gameId} onChange={(e) => setForm({ ...form, gameId: e.target.value })} className="select-field" required>
              <option value="">Select Game</option>
              {games.map((game) => (<option key={game._id} value={game._id}>{game.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="e.g. Valorant Premium Account" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows="3" placeholder="Product description..." />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Durations & Pricing</h3>
            <button type="button" onClick={addDuration} className="btn-secondary text-sm">+ Add Duration</button>
          </div>
          <div className="space-y-3">
            {form.durations.map((dur, index) => (
              <div key={index} className="flex items-center space-x-2 bg-dark-700/50 rounded-lg p-3">
                <input type="number" value={dur.value} onChange={(e) => handleDurationChange(index, 'value', parseInt(e.target.value) || 1)} className="input-field w-20 text-center" min="1" />
                <select value={dur.unit} onChange={(e) => handleDurationChange(index, 'unit', e.target.value)} className="select-field w-28">
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
                <span className="text-dark-400">→</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">₹</span>
                  <input type="number" value={dur.price} onChange={(e) => handleDurationChange(index, 'price', parseInt(e.target.value) || 0)} className="input-field pl-8" placeholder="Price" min="0" />
                </div>
                {form.durations.length > 1 && (
                  <button type="button" onClick={() => removeDuration(index)} className="text-red-400 hover:text-red-300 p-2">✕</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-3">
          <button type="submit" disabled={saving} className="btn-primary px-8">{saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}
