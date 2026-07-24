import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { productAPI, orderAPI } from '../api';
import CheckoutTrigger from '../components/checkout/CheckoutTrigger';
import DurationSelector from '../components/checkout/DurationSelector';
import Loader from '../components/common/Loader';
import { KeyRound, LogIn } from 'lucide-react';

export default function ModDetail() {
  const { user, logout } = useAuth();
  const { id } = useParams();
  const [mod, setMod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [purchasedKey, setPurchasedKey] = useState(null);

  useEffect(() => {
    productAPI.getById(id).then((res) => {
      setMod(res.data);
      const firstAvailable = res.data.durations?.find((d) => !d.isSoldOut);
      if (firstAvailable) {
        setSelectedDuration(firstAvailable);
      } else if (res.data.durations?.length > 0) {
        setSelectedDuration(res.data.durations[0]);
      }
    }).finally(() => setLoading(false));
  }, [id]);

  const handleInitiate = () => orderAPI.initiate({
    productId: mod._id,
    durationValue: selectedDuration.value,
    durationUnit: selectedDuration.unit,
  });

  const handleComplete = async ({ paymentId }) => {
    const res = await orderAPI.complete({
      productId: mod._id,
      durationValue: selectedDuration.value,
      durationUnit: selectedDuration.unit,
      paymentId,
    });
    setPurchasedKey(res.data);
    toast.success('Payment successful! Your key is ready.');
  };

  const handleRelease = (reservationId) => orderAPI.release({ reservationId });

  // Loading state
  if (loading) return <Loader />;
  if (!mod) return <div className="text-center py-16 text-dark-400">Mod not found</div>;

  // Success State (Key Delivered)
  if (purchasedKey) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="card p-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
          <p className="text-dark-400 mb-6">{mod.title} - {purchasedKey.duration}</p>
          <div className="bg-dark-900 border border-dark-600 rounded-lg p-4 mb-6">
            <p className="text-xs text-dark-500 mb-2">Your License Key:</p>
            <p className="text-lg font-mono font-bold text-primary-400 break-all select-all">{purchasedKey.key}</p>
          </div>
          <div className="text-sm text-dark-400 space-y-1">
            <p>Amount paid: <span className="text-white font-medium">₹{purchasedKey.amount?.toLocaleString()}</span></p>
            <p>Payment ID: <span className="text-dark-500 font-mono text-xs">{purchasedKey.paymentId}</span></p>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Link to="/mods" className="btn-secondary">Browse More Mods</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <Link to="/mods" className="text-dark-400 hover:text-white text-xs md:text-sm mb-3 md:mb-4 inline-block transition-colors">← Back to Mods</Link>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mod Info */}
        <div>
          <div className="card p-6">
            <h1 className="text-2xl font-bold mb-3">{mod.title}</h1>
            <p className="text-dark-400">{mod.description || 'No description available'}</p>
            <div className="mt-6 flex items-center text-sm text-dark-500">
              <span>Durations: {mod.durations?.length || 0}</span>
              <span className="mx-3">|</span>
              <span>Sold: {mod.soldKeys || 0}</span>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-xs text-dark-500 bg-dark-700/50 rounded-lg px-3 py-2">
              <span className="text-green-400">🔒</span>
              <span>Secured by QuickGateway • UPI • Instant delivery</span>
            </div>
          </div>
        </div>

        {/* Buy Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Select Duration & Buy</h3>
          <DurationSelector
            durations={mod.durations}
            selected={selectedDuration}
            onSelect={setSelectedDuration}
            hideSoldOut={false}
          />
          {selectedDuration && (
            <div className="mt-6 pt-6 border-t border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-dark-400">Total:</span>
                <span className="text-2xl font-bold text-primary-400">
                  ₹{selectedDuration.price.toLocaleString()}
                </span>
              </div>
              {selectedDuration.isSoldOut ? (
                <div className="text-center py-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm font-medium">Sold out for this duration</p>
                  <p className="text-xs text-dark-500 mt-1">Please select a different duration</p>
                </div>
              ) : (
                <CheckoutTrigger
                  initiateOrder={handleInitiate}
                  onComplete={handleComplete}
                  releaseReservation={handleRelease}
                  disabled={!selectedDuration}
                  buttonLabel={`Buy Now — ₹${selectedDuration?.price?.toLocaleString() || ''}`}
                  buttonClassName="btn-primary w-full text-center py-3 text-lg"
                />
              )}
              <p className="text-center text-xs text-dark-500 mt-2">
                🔒 No login required • Pay via UPI (GPay, PhonePe, Paytm)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
