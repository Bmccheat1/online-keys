const { Key, Product } = require('../models');

// @desc    Get keys for a product (Admin)
// @route   GET /api/keys/:productId
const getKeys = async (req, res, next) => {
  try {
    // Release any keys whose payment window (10 min) already expired
    await cleanupExpiredReservations();

    const { status, page = 1, limit = 50 } = req.query;
    const filter = { productId: req.params.productId };
    
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [keys, total] = await Promise.all([
      Key.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Key.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: keys.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: keys,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add keys to product (Admin)
// @route   POST /api/keys/add
const addKeys = async (req, res, next) => {
  try {
    const { productId, keys } = req.body;

    if (!productId || !keys || !keys.length) {
      res.status(400);
      throw new Error('Product ID and keys array are required');
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Prepare key documents with duration info from product
    const keyDocs = keys.map((k) => ({
      productId,
      keyValue: k.keyValue,
      durationValue: k.durationValue || product.durations[0]?.value || 1,
      durationUnit: k.durationUnit || product.durations[0]?.unit || 'hours',
    }));

    const created = await Key.insertMany(keyDocs, { ordered: false });

    // Update product total keys count
    await Product.findByIdAndUpdate(productId, {
      $inc: { totalKeys: created.length },
    });

    res.status(201).json({
      success: true,
      count: created.length,
      message: `${created.length} keys added successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete key (Admin)
// @route   DELETE /api/keys/:id
const deleteKey = async (req, res, next) => {
  try {
    const key = await Key.findByIdAndDelete(req.params.id);
    if (!key) {
      res.status(404);
      throw new Error('Key not found');
    }

    await Product.findByIdAndUpdate(key.productId, {
      $inc: { totalKeys: -1 },
    });

    res.json({ success: true, message: 'Key removed' });
  } catch (error) {
    next(error);
  }
};

// Helper: cleanup expired payment_pending keys
async function cleanupExpiredReservations() {
  try {
    const result = await Key.updateMany(
      { status: 'payment_pending', reservationExpiresAt: { $lte: new Date() } },
      { $set: { status: 'available', reservedAt: null, reservationExpiresAt: null } }
    );
    if (result.modifiedCount > 0) {
      console.log(`🧹 Cleaned up ${result.modifiedCount} expired key reservations`);
    }
  } catch (error) {
    console.error('❌ Cleanup error:', error.message);
  }
}

// @desc    Clear all expired pending keys manually (Admin)
// @route   POST /api/keys/clear-expired
const clearExpiredReservations = async (req, res, next) => {
  try {
    await cleanupExpiredReservations();
    res.json({ success: true, message: 'Expired reservations cleared' });
  } catch (error) {
    next(error);
  }
};

// @desc    Vercel cron — hourly safety net for stuck reservations
// @route   POST /api/keys/cron/cleanup
const cronCleanup = async (req, res, next) => {
  try {
    const secret = process.env.CRON_SECRET;
    if (secret) {
      const provided = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      if (provided !== secret) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
    }
    await cleanupExpiredReservations();
    res.json({ success: true, message: 'Cron cleanup completed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get key stats grouped by product + duration (Admin)
// @route   GET /api/keys/stats
const getKeyStats = async (req, res, next) => {
  try {
    // Run cleanup first so stats reflect current state
    await cleanupExpiredReservations();
    
    const stats = await Key.aggregate([
      {
        $group: {
          _id: {
            productId: '$productId',
            durationValue: '$durationValue',
            durationUnit: '$durationUnit',
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            productId: '$_id.productId',
            durationValue: '$_id.durationValue',
            durationUnit: '$_id.durationUnit',
          },
          statuses: {
            $push: {
              status: '$_id.status',
              count: '$count',
            },
          },
          total: { $sum: '$count' },
        },
      },
      { $sort: { '_id.productId': 1, '_id.durationValue': 1 } },
    ]);

    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

module.exports = { getKeys, addKeys, deleteKey, getKeyStats, clearExpiredReservations, cronCleanup };