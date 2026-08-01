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
    const { gameId, active, page = 1, limit = 20, noimage, flashOnly } = req.query;
    const filter = {};
    
    if (gameId) filter.gameId = gameId;
    if (active === 'true' || !active) filter.isActive = true;
    if (flashOnly === '1' || flashOnly === 'true') {
      // Only mods with a LIVE flash deal (for the home marquee)
      filter['durations.flashSale.isActive'] = true;
      filter['durations.flashSale.endAt'] = { $gt: new Date() };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const isNoimage = noimage === '1' || noimage === 'true';
    const limitNum = Math.max(1, Math.min(parseInt(limit) || 20, 100));

    // List payload strategy (keeps every card looking IDENTICAL to today):
    //  - Mods WITH a thumbnail (new uploads) → only the tiny thumb is sent (fast).
    //  - Legacy mods WITHOUT a thumbnail → their existing full image is still
    //    sent, so cards keep showing the real image (no letter-tile regression).
    //  - noimage=1 → title-only (header typewriter, purchase toasts).
    const project = {
      title: 1, description: 1, platform: 1, category: 1,
      isBestSeller: 1, durations: 1, isActive: 1,
      createdAt: 1, updatedAt: 1,
      imageThumb: isNoimage ? '' : 1,
      image: isNoimage
        ? ''
        : {
            $cond: [
              { $and: [{ $ne: [{ $ifNull: ['$imageThumb', ''] }, ''] }] },
              '',        // has a thumbnail → drop the heavy full image
              '$image',  // legacy → keep the full image (look unchanged)
            ],
          },
      'gameId.name': 1,
      'gameId.image': 1,
    };

    let [products, total] = await Promise.all([
      // Aggregation lets us pick image vs thumbnail PER PRODUCT (find can't)
      Product.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limitNum },
        {
          $lookup: { from: 'games', localField: 'gameId', foreignField: '_id', as: 'gameId' },
        },
        {
          $set: {
            gameId: { $cond: [{ $eq: [{ $size: '$gameId' }, 0] }, null, { $arrayElemAt: ['$gameId', 0] }] },
          },
        },
        { $project: project },
      ]),
      Product.countDocuments(filter),
    ]);

    // Attach real-time key availability
    products = await attachAvailability(products);

    // Expose the image as the client expects: thumb when available,
    // otherwise the legacy full image (look preserved for old mods).
    products = products.map((p) => ({ ...p, image: p.imageThumb || p.image || '' }));

    // Filter out completely sold-out products (optional)
    // products = products.filter(p => p.totalAvailableKeys > 0);

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum),
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
