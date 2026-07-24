import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { couponAPI, productAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { Tag, Plus, Trash2, Copy, Check, Percent, DollarSign } from 'lucide-react';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(null);
  const [form, setForm] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minAmount: '',
    maxUses: '',
    expiresAt: '',
    applicableModId: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      couponAPI.getAll(),
      productAPI.getAll({ active: 'true', limit: '100' }),
    ]).then(([cRes, pRes]) => {
      setCoupons(cRes.data || []);
      setMods(pRes.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.discountValue) {
      toast.error('Code and discount value are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        code: form.code.trim(),
        discountType: form.discountType,
        discountValue: parseInt(form.discountValue) || 0,
        minAmount: parseInt(form.minAmount) || 0,
        maxUses: parseInt(form.maxUses) || null,
        expiresAt: form.expiresAt || null,
        applicableModId: form.applicableModId || null,
        description: form.description || '',
      };
      const res = await couponAPI.create(payload);
      setCoupons([res.data, ...coupons]);
      setForm({ code: '', discountType: 'percentage', discountValue: '', minAmount: '', maxUses: '', expiresAt: '', applicableModId: '', description: '' });
      setShowForm(false);
      toast.success('Coupon created!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this coupon?')) return;
    try {
      await couponAPI.delete(id);
      setCoupons(coupons.filter(c => c._id !== id));
      toast.success('Coupon deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Coupons</h1>
          <p className="text-xs text-gray-500 mt-0.5">Create and manage discount codes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 px-5 rounded-xl transition-all text-sm shadow-lg shadow-amber-600/20">
          <Plus className="w-4 h-4" /> {showForm ? 'Cancel' : 'Add Coupon'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#0d0d1a]/80 backdrop-blur-sm border border-[#1e1e2e]/60 rounded-xl p-4 md:p-5 mb-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">New Coupon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Code *</label>
              <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="SAVE20" required />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Discount Type</label>
              <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Discount Value *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{form.discountType === 'percentage' ? '%' : '₹'}</span>
                <input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40" min="1" required />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Amount (₹)</label>
              <input type="number" value={form.minAmount} onChange={(e) => setForm({ ...form, minAmount: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="0" min="0" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Uses</label>
              <input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="Unlimited" min="1" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Expires At</label>
              <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Applicable Mod</label>
              <select value={form.applicableModId} onChange={(e) => setForm({ ...form, applicableModId: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                <option value="">All Mods</option>
                {mods.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="Optional" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 text-white font-medium py-2 px-6 rounded-xl text-sm shadow-lg shadow-amber-600/20 disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Coupon'}
          </button>
        </form>
      )}

      {/* Coupons List */}
      {coupons.length === 0 ? (
        <div className="text-center py-16 text-gray-600 bg-[#0d0d1a]/50 rounded-xl border border-[#1e1e2e]/60">
          <Tag className="w-12 h-12 mx-auto mb-3 text-gray-700" />
          <p className="text-base font-medium text-gray-500">No coupons yet</p>
          <p className="text-sm text-gray-700 mt-1">Create your first discount coupon</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {coupons.map((c) => {
            const isExpired = c.expiresAt && new Date(c.expiresAt) < new Date();
            const isExhausted = c.maxUses && c.usedCount >= c.maxUses;
            const isInvalid = !c.isActive || isExpired || isExhausted;
            return (
              <div key={c._id} className={`bg-[#0d0d1a]/80 backdrop-blur-sm border rounded-xl p-4 md:p-5 transition-all ${isInvalid ? 'border-red-500/20 opacity-60' : 'border-[#1e1e2e]/60'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${c.discountType === 'percentage' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-gradient-to-br from-emerald-500 to-green-600'}`}>
                      {c.discountType === 'percentage' ? <Percent className="w-4 h-4 text-white" /> : <DollarSign className="w-4 h-4 text-white" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm font-mono">{c.code}</span>
                        <button onClick={() => copyCode(c.code)} className="text-gray-600 hover:text-amber-400 transition-colors" title="Copy code">
                          {copied === c.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                        {c.minAmount > 0 && ` · Min ₹${c.minAmount.toLocaleString()}`}
                        {c.maxUses && ` · ${c.usedCount}/${c.maxUses} used`}
                        {c.expiresAt && ` · Exp: ${new Date(c.expiresAt).toLocaleDateString()}`}
                      </p>
                      {c.description && <p className="text-xs text-gray-600 mt-0.5">{c.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      isExpired ? 'bg-red-500/10 text-red-400' :
                      isExhausted ? 'bg-yellow-500/10 text-yellow-400' :
                      c.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {isExpired ? 'Expired' : isExhausted ? 'Exhausted' : c.isActive ? 'Active' : 'Disabled'}
                    </span>
                    <button onClick={() => handleDelete(c._id)} className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
