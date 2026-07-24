import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { settingAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { Globe, ShieldCheck, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingPayment, setSavingPayment] = useState(false);
  const [savingSite, setSavingSite] = useState(false);
  const [siteName, setSiteName] = useState('KeyStore');
  const [gatewayLocked, setGatewayLocked] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    apiKey: '',
    isActive: true,
  });

  useEffect(() => {
    settingAPI.getAll().then((res) => {
      const data = res.data || {};
      setSettings(data);
      setGatewayLocked(!!data._gatewayLocked);
      if (data.site_name) setSiteName(data.site_name);
      if (data.payment_gateway) {
        const g = data.payment_gateway;
        setPaymentForm({
          apiKey: g.apiKey || '',
          isActive: g.isActive !== false,
        });
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSaveSiteName = async (e) => {
    e.preventDefault();
    if (!siteName.trim()) { toast.error('Site name is required'); return; }
    setSavingSite(true);
    try {
      await settingAPI.update('site_name', {
        value: siteName.trim(),
        description: 'Website name displayed in header',
      });
      toast.success('Site name updated!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSavingSite(false);
    }
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    if (!paymentForm.apiKey.trim()) { toast.error('Enter Merchant Token'); return; }
    setSavingPayment(true);
    try {
      await settingAPI.update('payment_gateway', {
        value: {
          gatewayName: 'quickgateway',
          apiUrl: 'https://api.quickgateway.in',
          apiKey: paymentForm.apiKey.trim(),
          isActive: paymentForm.isActive,
        },
        description: 'QuickGateway Payment Configuration',
      });
      toast.success('Payment settings saved!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSavingPayment(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-white">Settings</h1>

      {/* ─── Site Name ─── */}
      <div className="bg-[#0d0d1a]/80 backdrop-blur-sm border border-[#1e1e2e]/60 rounded-xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Site Name</h3>
            <p className="text-sm text-gray-500">Change the website name shown in the header</p>
          </div>
        </div>
        <form onSubmit={handleSaveSiteName} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="flex-1 bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
            placeholder="Enter site name"
            required
          />
          <button type="submit" disabled={savingSite} className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-600/20 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1.5 shrink-0">
            {savingSite ? 'Saving...' : <><Save className="w-4 h-4" /> Save</>}
          </button>
        </form>
      </div>

      {/* ─── Payment Gateway ─── */}
      <div className="bg-[#0d0d1a]/80 backdrop-blur-sm border border-[#1e1e2e]/60 rounded-xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">QuickGateway</h3>
            <p className="text-sm text-gray-500">Embedded UPI Checkout — No redirect</p>
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-gray-300">
          <p>💡 Customers pay via <strong>GPay, PhonePe, Paytm</strong> directly on your website.</p>
        </div>

        {/* Check if env var is set (gateway locked) */}
        {gatewayLocked ? (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
              <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-sm font-medium text-yellow-300">🔒 Gateway Locked</p>
              <p className="text-xs text-yellow-500/80 mt-1">
                Payment gateway is configured via <strong>environment variable</strong>.<br />
                Only the server owner can change it in <code className="text-amber-400">.env</code> file.
              </p>
              <p className="text-xs text-gray-600 mt-3">
                Env: <code className="text-amber-400">QUICKGATEWAY_MERCHANT_TOKEN</code>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSavePayment} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Merchant Token <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={paymentForm.apiKey}
                  onChange={(e) => setPaymentForm({ ...paymentForm, apiKey: e.target.value })}
                  className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
                  placeholder="Enter your QuickGateway Merchant Token"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">Your unique merchant token from QuickGateway.</p>
              </div>
              <button type="submit" disabled={savingPayment} className="w-full bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-amber-600/20 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1.5">
                {savingPayment ? 'Saving...' : <><Save className="w-4 h-4" /> Save Payment Settings</>}
              </button>
            </form>
          )}
      </div>
    </div>
  );
}
