import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productAPI, orderAPI } from '../api';
import DurationSelector from '../components/checkout/DurationSelector';
import Loader from '../components/common/Loader';

// Load QuickGateway SDK dynamically
function loadQuickGatewaySDK() {
  return new Promise((resolve, reject) => {
    if (window.QuickGateway) {
      resolve(window.QuickGateway);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://api.quickgateway.in/sdk/quickgateway.js';
    script.async = true;
    script.onload = () => {
      if (window.QuickGateway) resolve(window.QuickGateway);
      else reject(new Error('QuickGateway SDK loaded but not found'));
    };
    script.onerror = () => reject(new Error('Failed to load QuickGateway SDK'));
    document.head.appendChild(script);
  });
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [buying, setBuying] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState(null);
  const [paymentStep, setPaymentStep] = useState('idle'); // idle | initiating | payment | verifying | done

  useEffect(() => {
    productAPI.getById(id).then((res) => {
      setProduct(res.data);
      // Auto-select first available duration
      const firstAvailable = res.data.durations?.find((d) => !d.isSoldOut);
      if (firstAvailable) {
        setSelectedDuration(firstAvailable);
      } else if (res.data.durations?.length > 0) {
        setSelectedDuration(res.data.durations[0]); // All sold out, select first anyway
      }
    }).finally(() => setLoading(false));
  }, [id]);

  const handleBuy = useCallback(async () => {
    if (!selectedDuration) { toast.error('Please select a duration'); return; }

    setBuying(true);
    setPaymentStep('initiating');

    try {
      // Step 1: Initiate order - get amount + merchant token from backend
      const initiateRes = await orderAPI.initiate({
        productId: product._id,
        durationValue: selectedDuration.value,
        durationUnit: selectedDuration.unit,
      });

      const { amount, gateway } = initiateRes.data;

      // Step 2: Load QuickGateway SDK & open bottom sheet checkout
      setPaymentStep('payment');
      const QG = await loadQuickGatewaySDK();

      QG.checkout({
        amount: amount,
        userToken: gateway.merchantToken,
        onSuccess: async function (paymentData) {
          // Step 3: Payment success → verify & complete order on backend
          setPaymentStep('verifying');
          try {
            const completeRes = await orderAPI.complete({
              productId: product._id,
              durationValue: selectedDuration.value,
              durationUnit: selectedDuration.unit,
              paymentId: paymentData.paymentId || paymentData.id,
            });
            setPurchasedKey(completeRes.data);
            setPaymentStep('done');
            toast.success('Payment successful! Key delivered.');
          } catch (err) {
            toast.error(err.response?.data?.message || 'Payment verified but key delivery failed. Contact support.');
            setPaymentStep('idle');
          }
        },
        onFailure: function (error) {
          toast.error(error?.message || 'Payment was cancelled or failed. Please try again.');
          setPaymentStep('idle');
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment. Please try again.');
      setPaymentStep('idle');
    } finally {
      setBuying(false);
    }
  }, [product, selectedDuration]);

  // ─── Loading State ───
  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-16 text-dark-400">Product not found</div>;

  // ─── Success State (Key Delivered) ───
  if (purchasedKey) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="card p-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
          <p className="text-dark-400 mb-6">{product.title} - {purchasedKey.duration}</p>
          <div className="bg-dark-900 border border-dark-600 rounded-lg p-4 mb-6">
            <p className="text-xs text-dark-500 mb-2">Your Key:</p>
            <p className="text-lg font-mono font-bold text-primary-400 break-all select-all">{purchasedKey.key}</p>
          </div>
          <p className="text-sm text-dark-400">
            Amount paid: <span className="text-white font-medium">₹{purchasedKey.amount.toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  }

  // ─── Payment Steps Status ───
  const getButtonText = () => {
    switch (paymentStep) {
      case 'initiating': return 'Initializing...';
      case 'payment': return 'Opening Checkout...';
      case 'verifying': return 'Verifying Payment...';
      default: return buying ? 'Processing...' : 'Buy Now';
    }
  };

  // ─── Main UI ───
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Info */}
        <div>
          <div className="card p-6">
            {product.gameId && (
              <span className="text-xs text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">
                {product.gameId.name}
              </span>
            )}
            <h1 className="text-2xl font-bold mt-3 mb-3">{product.title}</h1>
            <p className="text-dark-400">{product.description}</p>
            <div className="mt-6 flex items-center text-sm text-dark-500">
              <span>Available: {product.totalAvailableKeys || 0}</span>
              <span className="mx-3">|</span>
              <span>Sold: {product.soldKeys || 0}</span>
            </div>
            {/* Payment Info Badge */}
            <div className="mt-4 flex items-center space-x-2 text-xs text-dark-500 bg-dark-700/50 rounded-lg px-3 py-2">
              <span className="text-green-400">🔒</span>
              <span>Secured by QuickGateway • UPI • No redirect</span>
            </div>
          </div>
        </div>

        {/* Buy Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Select Duration & Buy</h3>
          <DurationSelector
            durations={product.durations}
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
                  <p className="text-red-400 text-sm font-medium">😔 This duration is sold out</p>
                  <p className="text-xs text-dark-500 mt-1">Please select a different duration above</p>
                </div>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={buying}
                  className="btn-primary w-full text-center py-3 text-lg relative"
                >
                  {buying && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    </span>
                  )}
                  {getButtonText()}
                </button>
              )}
              <p className="text-center text-xs text-dark-500 mt-2">
                🔒 Pay via UPI (GPay, PhonePe, Paytm) — Instant delivery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
