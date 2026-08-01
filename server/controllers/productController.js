const { Product, Key } = require('../models');

/**
 * Add real-time key availability to product durations
 * For each duration option, shows how many keys are available RIGHT NOW
 */
async function attachAvailability(products) {
  const productIds = products.map((p) => p._id);

  // Aggregate: count available keys per product+duration combo
  const availability = await Key.aggregate([
    {
      $match: {
        productId: { $in: productIds },
        status: { $in: ['available'] }, // Only truly available keys
      },
    },
    {
      $group: {
        _id: {
          productId: '$productId',
          durationValue: '$durationValue',
          durationUnit: '$durationUnit',
        },
        count: { $sum: 1 },
      },
    },
  ]);

  // Build a lookup map: "productId|value|unit" → count
  const availabilityMap = {};
  availability.forEach((item) => {
    const key = `${item._id.productId}|${item._id.durationValue}|${item._id.durationUnit}`;
    availabilityMap[key] = item.count;
  });

  // Attach availability to each product's durations
  return products.map((product) => {
    const updatedDurations = product.durations.map((dur) => {
      const lookupKey = `${product._id}|${dur.value}|${dur.unit}`;
      const available = availabilityMap[lookupKey] || 0;
      return {
        ...dur,
        availableKeys: available,
        isSoldOut: available === 0,
      };
    });

    return {
      ...product,
      durations: updatedDurations,
      totalAvailableKeys: updatedDurations.reduce((sum, d) => sum + d.availableKeys, 0),
    };
  });
}

// @desc    Get all products (public) — with real-time availability
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { gameId, active, page = 1, limit = 20, noimage } = req.query;
    const filter = {};
    
    if (gameId) filter.gameId = gameId;
    if (active === 'true' || !active) filter.isActive = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // When `noimage=1` the heavy base64 image field is excluded from the response —
    // used by title-only consumers (header typewriter, purchase toasts) to keep
    // the payload tiny (a mod list with images can be megabytes of base64).
    const projection = noimage === '1' || noimage === 'true' ? { image: 0 } : null;

    let [products, total] = await Promise.all([
      Product.find(filter, projection)
        .populate('gameId', 'name image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(filter),
    ]);

    // Attach real-time key availability
    products = await attachAvailability(products);

    // Filter out completely sold-out products (optional)
    // products = products.filter(p => p.totalAvailableKeys > 0);

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product (public) — with real-time availability
// @route   GET /api/products/:id
const getProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id)
      .populate('gameId', 'name image')
      .lean();

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Attach real-time availability to a single product
    const enhanced = await attachAvailability([product]);
    product = enhanced[0];

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
