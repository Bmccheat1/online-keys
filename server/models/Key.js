const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required'],
  },
  keyValue: {
    type: String,
    required: [true, 'Key value is required'],
    trim: true,
    unique: true,
  },
  durationValue: {
    type: Number,
    required: [true, 'Duration value is required'],
  },
  durationUnit: {
    type: String,
    enum: ['hours', 'days'],
    required: [true, 'Duration unit is required'],
  },
  status: {
    type: String,
    enum: ['available', 'payment_pending', 'sold'],
    default: 'available',
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null,
  },
  soldAt: {
    type: Date,
    default: null,
  },
  reservedAt: {
    type: Date,
    default: null,
  },
  reservationExpiresAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Compound indexes for fast queries
keySchema.index({ productId: 1, status: 1 });
keySchema.index({ productId: 1, durationValue: 1, durationUnit: 1, status: 1 });
keySchema.index({ orderId: 1 });
keySchema.index({ status: 1, reservationExpiresAt: 1 }); // For cleanup queries
// keyValue index auto-created by `unique: true`

module.exports = mongoose.model('Key', keySchema);
