import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { KeyRound, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate(user.role === 'admin' ? '/admin/dashboard' : '/'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Fill all fields'); return; }
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success(`Welcome, ${data.name}!`);
      navigate(data.role === 'admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#0d0d1a]/90 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
            <KeyRound className="w-6 h-6 text-white" />
          </div>

          <h1 className="text-xl font-bold text-center text-white mb-1">Admin Login</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Sign in to manage mods and keys</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden font-semibold text-white rounded-xl transition-all duration-300 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 shadow-lg shadow-amber-600/20 hover:shadow-amber-500/40 py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Signing in...</>
              ) : (
                <><LogIn className="w-4 h-4" /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            <a href="/" className="hover:text-amber-400 transition-colors">← Back to store</a>
          </p>
        </div>
      </div>
    </div>
  );
}
