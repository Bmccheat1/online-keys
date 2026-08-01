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
  const [webhookSecret, setWebhookSecret] = useState('');
  const [savingWebhook, setSavingWebhook] = useState(false);

  useEffect(() => {
    settingAPI.getAll().then((res) => {
      const data = res.data || {};
      setSettings(data);
      setGatewayLocked(!!data._gatewayLocked);
      if (data.site_name) setSiteName(data.site_name);
      if (data.webhook_secret) setWebhookSecret(String(data.webhook_secret));
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

  const handleSaveWebhook = async (e) => {
    e.preventDefault();
    if (!webhookSecret.trim()) { toast.error('Enter Webhook Secret'); return; }
    setSavingWebhook(true);
    try {
      await settingAPI.update('webhook_secret', {
        value: webhookSecret.trim(),
        description: 'Secret used to verify QuickGateway webhook signatures (HMAC-SHA256)',
      });
      toast.success('Webhook secret saved!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSavingWebhook(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-sub">Configure site, payments & webhook security</p>
      </div>

      {/* ─── Site Name ─── */}
      <div className="panel p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-gold">
            <Globe className="w-5 h-5 text-[#0a0a14]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-display">Site Name</h3>
            <p className="text-sm text-gray-500">Change the website name shown in the header</p>
          </div>
        </div>
        <form onSubmit={handleSaveSiteName} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="flex-1 input-field"
            placeholder="Enter site name"
            required
          />
          <button type="submit" disabled={savingSite} className="btn-gold !py-2.5 !px-6 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1.5 shrink-0">
            {savingSite ? 'Saving...' : <><Save className="w-4 h-4" /> Save</>}
          </button>
        </form>
      </div>

      {/* ─── Payment Gateway ─── */}
      <div className="panel p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-gold">
            <ShieldCheck className="w-5 h-5 text-[#0a0a14]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-display">QuickGateway</h3>
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
                  className="w-full input-field font-mono"
                  placeholder="Enter your QuickGateway Merchant Token"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">Your unique merchant token from QuickGateway.</p>
              </div>
              <button type="submit" disabled={savingPayment} className="w-full btn-gold !py-2.5 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1.5">
                {savingPayment ? 'Saving...' : <><Save className="w-4 h-4" /> Save Payment Settings</>}
              </button>
            </form>
          )}
      </div>

      {/* ─── Webhook Secret ─── */}
      <div className="panel p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-display">Webhook Secret</h3>
            <p className="text-sm text-gray-500">Verify QuickGateway webhook callbacks (HMAC-SHA256)</p>
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-gray-300">
          <p>🔒 Payment callbacks (<code className="text-amber-400">/api/webhooks/quickgateway</code>) are rejected unless the <strong>X-Webhook-Signature</strong> header matches this secret. Set the same secret in your QuickGateway dashboard.</p>
        </div>

        <form onSubmit={handleSaveWebhook} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Webhook Secret <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              className="w-full input-field font-mono"
              placeholder="Enter the webhook secret shared by QuickGateway"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Falls back to the merchant token if left empty. Requests without a valid signature are rejected.
            </p>
          </div>
          <button type="submit" disabled={savingWebhook} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-600/20 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1.5">
            {savingWebhook ? 'Saving...' : <><Save className="w-4 h-4" /> Save Webhook Secret</>}
          </button>
        </form>
      </div>
    </div>
  );
}
