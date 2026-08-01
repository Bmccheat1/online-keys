import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../../api';
import Loader from '../../components/common/Loader';
import {
  TrendingUp, DollarSign, ShoppingCart, Package, KeyRound,
  CalendarDays, ArrowUpRight, Clock
} from 'lucide-react';

function StatsCard({ icon: Icon, label, value, sub, color, link }) {
  const Wrapper = link ? Link : 'div';
  return (
    <Wrapper to={link || '#'} className={`panel group transition-all duration-300 ${link ? 'cursor-pointer hover:border-amber-500/40 hover:shadow-gold-sm' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs md:text-sm text-gray-500">{label}</p>
          <p className="text-xl md:text-2xl font-bold text-white mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Wrapper>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [topMods, setTopMods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsAPI.getSummary(),
      analyticsAPI.getSalesChart(14),
      analyticsAPI.getTopMods(5),
    ]).then(([s, c, t]) => {
      setSummary(s.data);
      setChartData(c.data || []);
      setTopMods(t.data || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
  const totalRevenueDisplay = summary?.totalRevenue?.toLocaleString() || '0';
  const todayRevenueDisplay = summary?.todayRevenue?.toLocaleString() || '0';
  const monthRevenueDisplay = summary?.monthRevenue?.toLocaleString() || '0';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Overview of your store's performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard icon={DollarSign} label="Total Revenue" value={`₹${totalRevenueDisplay}`} sub={`Today: ₹${todayRevenueDisplay}`} color="from-amber-500 to-yellow-600" />
        <StatsCard icon={ShoppingCart} label="Total Orders" value={summary?.totalOrders || 0} sub={`This month: ${summary?.monthOrders || 0}`} color="from-yellow-500 to-orange-600" />
        <StatsCard icon={Package} label="Active Mods" value={summary?.totalMods || 0} link="/admin/mods" color="from-emerald-500 to-green-600" />
        <StatsCard icon={KeyRound} label="Keys Sold" value={summary?.soldKeys || 0} sub={`Available: ${summary?.availableKeys || 0}`} link="/admin/available-keys" color="from-purple-500 to-pink-600" />
      </div>

      {/* Mini stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="panel !p-3 md:!p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span className="text-xs">Monthly Revenue</span>
          </div>
          <p className="text-base md:text-lg font-bold text-white">₹{monthRevenueDisplay}</p>
        </div>
        <div className="panel !p-3 md:!p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="text-xs">Today Orders</span>
          </div>
          <p className="text-base md:text-lg font-bold text-white">{summary?.todayOrders || 0}</p>
        </div>
        <div className="panel !p-3 md:!p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <KeyRound className="w-3.5 h-3.5" />
            <span className="text-xs">Total Keys</span>
          </div>
          <p className="text-base md:text-lg font-bold text-white">{summary?.totalKeys || 0}</p>
        </div>
        <div className="panel !p-3 md:!p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-xs">Available Keys</span>
          </div>
          <p className="text-base md:text-lg font-bold text-emerald-400">{summary?.availableKeys || 0}</p>
        </div>
      </div>

      {/* Sales Chart + Top Mods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Chart */}
        <div className="lg:col-span-2 panel">
          <h3 className="section-title">Sales (Last 14 Days)</h3>
          {chartData.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">No sales data yet</div>
          ) : (
            <div className="flex items-end gap-1 h-32 md:h-40">
              {chartData.map((day, i) => {
                const height = day.revenue > 0 ? Math.max((day.revenue / maxRevenue) * 100, 4) : 2;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full bg-gradient-to-t from-amber-600 to-yellow-500 rounded-t-md transition-all duration-200 hover:from-amber-500 hover:to-yellow-400"
                      style={{ height: `${height}%` }}
                      title={`${day.date}: ₹${day.revenue.toLocaleString()} (${day.orders} orders)`}
                    />
                    {i % 2 === 0 && (
                      <span className="text-[8px] text-gray-600 -rotate-45 origin-left whitespace-nowrap">
                        {day.date.slice(5)}
                      </span>
                    )}
                    {/* Tooltip on hover */}
                    {day.revenue > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#050508] border border-[#1e1e2e] rounded px-2 py-1 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        ₹{day.revenue.toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Selling Mods */}
        <div className="panel">
          <h3 className="section-title">Top Selling Mods</h3>
          {topMods.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">No sales yet</div>
          ) : (
            <div className="space-y-3">
              {topMods.map((mod, i) => {
                const icons = ['🥇', '🥈', '🥉'];
                return (
                  <div key={mod.productId} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs">{icons[i] || `#${i + 1}`}</span>
                      <span className="text-sm text-gray-300 truncate">{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-gray-500">{mod.orders} ord</span>
                      <span className="text-xs font-medium text-amber-400">₹{mod.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {topMods.length > 0 && (
            <Link to="/admin/mods" className="block text-center text-xs text-amber-400 hover:text-amber-300 mt-4 pt-3 border-t border-[#1e1e2e]/60">
              View All Mods →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
