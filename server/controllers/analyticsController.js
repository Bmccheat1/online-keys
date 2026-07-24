const { Order, Product, Key } = require('../models');

// @desc    Get summary stats (Admin)
// @route   GET /api/analytics/summary
const getSummary = async (req, res, next) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalOrders,
      totalRevenue,
      todayOrders,
      todayRevenue,
      monthOrders,
      monthRevenue,
      totalMods,
      totalKeys,
      soldKeys,
    ] = await Promise.all([
      Order.countDocuments({ paymentStatus: 'completed' }),
      Order.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.countDocuments({ paymentStatus: 'completed', createdAt: { $gte: todayStart } }),
      Order.aggregate([
        { $match: { paymentStatus: 'completed', createdAt: { $gte: todayStart } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.countDocuments({ paymentStatus: 'completed', createdAt: { $gte: monthStart } }),
      Order.aggregate([
        { $match: { paymentStatus: 'completed', createdAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Product.countDocuments({ isActive: true }),
      Key.countDocuments(),
      Key.countDocuments({ status: 'sold' }),
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        todayOrders,
        todayRevenue: todayRevenue[0]?.total || 0,
        monthOrders,
        monthRevenue: monthRevenue[0]?.total || 0,
        totalMods,
        totalKeys,
        soldKeys,
        availableKeys: totalKeys - soldKeys,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sales chart data (last 30 days) (Admin)
// @route   GET /api/analytics/sales-chart
const getSalesChart = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'completed',
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ]);

    // Fill empty days with 0
    const chartData = [];
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toISOString().split('T')[0];
      const found = sales.find(
        (s) =>
          s._id.year === date.getFullYear() &&
          s._id.month === date.getMonth() + 1 &&
          s._id.day === date.getDate()
      );
      chartData.push({
        date: dayStr,
        revenue: found?.revenue || 0,
        orders: found?.orders || 0,
      });
    }

    res.json({ success: true, data: chartData });
  } catch (error) {
    next(error);
  }
};

// @desc    Get top selling mods (Admin)
// @route   GET /api/analytics/top-mods
const getTopMods = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topMods = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          revenue: { $sum: '$items.selectedDuration.price' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: limit },
    ]);

    // Populate product titles
    const populated = await Product.populate(topMods, {
      path: '_id',
      select: 'title',
      model: 'Product',
    });

    const result = populated.map((item) => ({
      productId: item._id?._id || item._id,
      title: item._id?.title || 'Deleted Mod',
      revenue: item.revenue,
      orders: item.orders,
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary, getSalesChart, getTopMods };
