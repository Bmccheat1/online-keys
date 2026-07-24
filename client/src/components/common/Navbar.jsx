import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { memo } from 'react';

const Navbar = memo(function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🔑</span>
            <span className="text-xl font-bold text-white">KeyStore</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/mods" className="text-dark-300 hover:text-white transition">Store</Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-dark-300 text-sm">{user.name}</span>
                  <button onClick={handleLogout} className="text-dark-400 hover:text-white text-sm transition">Logout</button>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm">Admin Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
