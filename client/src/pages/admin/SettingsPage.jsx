import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import api, { settingAPI } from '../../api';
import Loader from '../../components/common/Loader';
import { Globe, ShieldCheck, Save, ImagePlus, UploadCloud, Trash2 } from 'lucide-react';

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
  // Logo state
  const [logo, setLogo] = useState('');              // saved logo (from DB)
  const [logoPreview, setLogoPreview] = useState(null); // picked but not saved yet
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [savingLogo, setSavingLogo] = useState(false);
  const logoFileRef = useRef(null);

  useEffect(() => {
    settingAPI.getAll().then((res) => {
      const data = res.data || {};
      setSettings(data);
      setGatewayLocked(!!data._gatewayLocked);
      if (data.site_name) setSiteName(data.site_name);
      if (data.site_logo) setLogo(data.site_logo);
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

  // ─── Logo handlers ───
  const handleLogoPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB'); e.target.value = ''; return; }
    const fd = new FormData();
    fd.append('image', file);
    setUploadingLogo(true);
    try {
      const res = await api.post('/upload', fd, { headers: { 'Content-Type': undefined } });
      const url = res.data.url;
      setLogoPreview(url);
      // Auto-save — logo applies immediately, no extra step needed
      await settingAPI.update('site_logo', {
        value: url,
        description: 'Website logo shown in header',
      });
      setLogo(url);
      toast.success('Logo saved & applied!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploadingLogo(false);
      e.target.value = '';
    }
  };

  const handleRemoveLogo = async () => {
    setSavingLogo(true);
    try {
      await settingAPI.update('site_logo', {
        value: '',
        description: 'Website logo shown in header',
      });
      setLogo('');
      setLogoPreview(null);
      toast.success('Logo removed — default icon will show');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSavingLogo(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-sub">Configure site branding & payments</p>
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

      {/* ─── Site Logo ─── */}
      <div className="panel p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-gold">
            <ImagePlus className="w-5 h-5 text-[#0a0a14]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-display">Site Logo</h3>
            <p className="text-sm text-gray-500">Upload your logo — shown in the header</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Preview */}
          <div className="w-20 h-20 shrink-0 rounded-xl bg-[#0d0d1a] border border-[#1e1e2e]/60 flex items-center justify-center overflow-hidden">
            {(logoPreview || logo) ? (
              <img src={logoPreview || logo} alt="Logo preview" className="w-full h-full object-contain p-1.5" />
            ) : (
              <ImagePlus className="w-8 h-8 text-gray-700" />
            )}
          </div>

          {/* Upload */}
          <div className="flex-1 space-y-2">
            <button
              type="button"
              onClick={() => logoFileRef.current?.click()}
              disabled={uploadingLogo}
              className="btn-gold !py-2 !px-5 text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
            >
              {uploadingLogo ? 'Uploading...' : <><UploadCloud className="w-4 h-4" /> Upload Logo</>}
            </button>
            <input
              ref={logoFileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleLogoPick}
            />
            <p className="text-xs text-gray-600">JPG, PNG, WebP or GIF — max 5 MB</p>
          </div>
        </div>

        {/* Remove saved logo */}
        {logo && (
          <button
            type="button"
            onClick={handleRemoveLogo}
            disabled={savingLogo}
            className="mt-4 text-xs text-red-400/80 hover:text-red-400 inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove Logo
          </button>
        )}
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
    </div>
  );
}
