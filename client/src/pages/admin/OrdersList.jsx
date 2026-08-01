import { useState, useEffect } from 'react';
import { orderAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { ClipboardList } from 'lucide-react';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getAll().then((res) => setOrders(res.data || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <p className="page-sub">All customer orders & payment statuses</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 panel border-dashed p-8">
          <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-700" />
          <p className="text-lg font-medium text-gray-500">No orders yet</p>
          <p className="text-sm text-gray-700 mt-1">Orders will appear here once customers start buying</p>
        </div>
      ) : (
        <div className="panel overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="table-head">
                  <th className="text-left p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Order ID</th>
                  <th className="text-left p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Customer</th>
                  <th className="text-left p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Amount</th>
                  <th className="text-left p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Status</th>
                  <th className="text-right p-3 md:p-4 text-gray-500 text-xs md:text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="table-row">
                    <td className="p-3 md:p-4 font-mono text-xs text-gray-300">#{order._id.slice(-8)}</td>
                    <td className="p-3 md:p-4 text-sm text-gray-300">{order.customerEmail || 'Guest'}</td>
                    <td className="p-3 md:p-4 text-sm font-medium text-white">₹{order.totalAmount?.toLocaleString()}</td>
                    <td className="p-3 md:p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                        order.paymentStatus === 'completed' ? 'chip-green' :
                        order.paymentStatus === 'pending' ? 'chip-yellow' :
                        'chip-red'
                      }`}>{order.paymentStatus}</span>
                    </td>
                    <td className="p-3 md:p-4 text-right text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
