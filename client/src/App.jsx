import { lazy, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/common/Loader';
import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminSidebar from './components/admin/AdminSidebar';
import AdminHeader from './components/admin/AdminHeader';

// Lazy load
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageMods = lazy(() => import('./pages/admin/ManageMods'));
const AddMod = lazy(() => import('./pages/admin/AddMod'));
const AdminKeys = lazy(() => import('./pages/admin/AdminKeys'));
const AvailableKeys = lazy(() => import('./pages/admin/AvailableKeys'));
const CouponsPage = lazy(() => import('./pages/admin/CouponsPage'));
const OrdersList = lazy(() => import('./pages/admin/OrdersList'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar — hamburger lives inside this header */}
      <AdminHeader open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <AdminSidebar open={sidebarOpen} onToggle={setSidebarOpen} />
      <div className="flex-1 min-h-screen overflow-auto pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<Loader text="Loading..." />}>
          <Routes>
            {/* Public - Main buy page is the home */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Redirect old routes to home */}
            <Route path="/mods" element={<Navigate to="/" replace />} />
            <Route path="/mods/:id" element={<Navigate to="/" replace />} />
            <Route path="/products" element={<Navigate to="/" replace />} />
            <Route path="/products/:id" element={<Navigate to="/" replace />} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/mods" element={<ProtectedRoute adminOnly><AdminLayout><ManageMods /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/mods/add" element={<ProtectedRoute adminOnly><AdminLayout><AddMod /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/mods/:id" element={<ProtectedRoute adminOnly><AdminLayout><AddMod /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/keys" element={<ProtectedRoute adminOnly><AdminLayout><AdminKeys /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/available-keys" element={<ProtectedRoute adminOnly><AdminLayout><AvailableKeys /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute adminOnly><AdminLayout><CouponsPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminLayout><OrdersList /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute adminOnly><AdminLayout><SettingsPage /></AdminLayout></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
