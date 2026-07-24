import { useState, useEffect } from 'react';
import { orderAPI } from '../api';
import Loader from '../components/common/Loader';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getMyOrders().then((res) => setOrders(res.data || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12 text-dark-400">No orders yet</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-400">Order #{order._id.slice(-8)}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                  order.paymentStatus === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>{order.paymentStatus}</span>
              </div>
              <p className="text-lg font-semibold">₹{order.totalAmount.toLocaleString()}</p>
              <p className="text-xs text-dark-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}