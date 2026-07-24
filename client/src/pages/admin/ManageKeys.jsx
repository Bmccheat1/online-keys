import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { keyAPI, productAPI } from '../../api';
import Loader from '../../components/common/Loader';

export default function ManageKeys() {
  const { productId } = useParams();
  const [keys, setKeys] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [bulkInput, setBulkInput] = useState('');

  useEffect(() => {
    Promise.all([
      productAPI.getById(productId),
      keyAPI.getByProduct(productId),
    ]).then(([prodRes, keyRes]) => {
      setProduct(prodRes.data);
      setKeys(keyRes.data || []);
    }).finally(() => setLoading(false));
  }, [productId]);

  const handleAddKeys = async () => {
    const keyValues = bulkInput.split('\n').map((k) => k.trim()).filter((k) => k.length > 0);
    if (keyValues.length === 0) { toast.error('Enter at least one key'); return; }
    try {
      const keyDocs = keyValues.map((kv) => ({ keyValue: kv, durationValue: product.durations[0]?.value || 1, durationUnit: product.durations[0]?.unit || 'hours' }));
      await keyAPI.add({ productId, keys: keyDocs });
      toast.success(`${keyValues.length} keys added!`);
      setBulkInput('');
      setShowAdd(false);
      const res = await keyAPI.getByProduct(productId);
      setKeys(res.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add keys');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this key?')) return;
    try { await keyAPI.delete(id); setKeys(keys.filter((k) => k._id !== id)); toast.success('Key deleted'); }
    catch (error) { toast.error('Delete failed'); }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-12 text-dark-400">Product not found</div>;

  const availableKeys = keys.filter((k) => k.status === 'available').length;
  const soldKeys = keys.filter((k) => k.status === 'sold').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link to="/admin/products" className="text-dark-400 hover:text-white text-sm">← Products</Link>
          <h1 className="text-2xl font-bold mt-1">{product.title} - Keys</h1>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary">{showAdd ? 'Cancel' : '+ Add Keys'}</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center"><p className="text-2xl font-bold text-blue-400">{keys.length}</p><p className="text-xs text-dark-400">Total</p></div>
        <div className="card p-4 text-center"><p className="text-2xl font-bold text-green-400">{availableKeys}</p><p className="text-xs text-dark-400">Available</p></div>
        <div className="card p-4 text-center"><p className="text-2xl font-bold text-red-400">{soldKeys}</p><p className="text-xs text-dark-400">Sold</p></div>
      </div>
      {showAdd && (
        <div className="card p-6 mb-6">
          <h3 className="font-semibold mb-2">Add Keys (Bulk)</h3>
          <p className="text-sm text-dark-400 mb-3">Enter one key per line:</p>
          <textarea value={bulkInput} onChange={(e) => setBulkInput(e.target.value)} className="input-field font-mono text-sm" rows="8" placeholder="ABCD-1234-EFGH-5678\nIJKL-9012-MNOP-3456" />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-dark-400">{bulkInput.split('\n').filter((k) => k.trim()).length} keys detected</span>
            <button onClick={handleAddKeys} className="btn-primary">Add Keys</button>
          </div>
        </div>
      )}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-dark-700">
            <th className="text-left p-3 text-dark-400 text-sm">Key</th>
            <th className="text-left p-3 text-dark-400 text-sm">Status</th>
            <th className="text-right p-3 text-dark-400 text-sm">Actions</th>
          </tr></thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key._id} className="border-b border-dark-700/50 hover:bg-dark-700/30">
                <td className="p-3 font-mono text-sm">{key.keyValue}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${key.status === 'available' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{key.status}</span>
                </td>
                <td className="p-3 text-right">
                  {key.status === 'available' && <button onClick={() => handleDelete(key._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>}
                </td>
              </tr>
            ))}
            {keys.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-dark-400">No keys yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
