import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../api';
import Loader from '../../components/common/Loader';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ active: 'true', limit: '100' }).then((res) => setProducts(res.data || [])).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try { await productAPI.delete(id); setProducts(products.filter((p) => p._id !== id)); }
    catch (error) { alert('Delete failed'); }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/admin/products/add" className="btn-primary">+ Add Product</Link>
      </div>
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product._id} className="card p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-dark-400">{product.durations?.length} durations | Starting ₹{Math.min(...product.durations.map(d => d.price)).toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to={`/admin/products/${product._id}`} className="text-primary-400 hover:text-primary-300 text-sm">Edit</Link>
              <Link to={`/admin/keys/${product._id}`} className="text-dark-400 hover:text-white text-sm">Keys</Link>
              <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
            </div>
          </div>
        ))}
        {products.length === 0 && <div className="text-center py-12 text-dark-400">No products yet</div>}
      </div>
    </div>
  );
}
