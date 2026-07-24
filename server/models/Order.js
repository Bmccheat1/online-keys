const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  keyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Key',
    required: true,
  },
  selectedDuration: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String, enum: ['hours', 'days'], required: true },
    price: { type: Number, required: true },
  },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  customerEmail: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  items: {
    type: [orderItemSchema],
    validate: {
      validator: function (items) {
        return items.length > 0;
      },
      message: 'At least one item is required',
    },
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative'],
  },
  paymentId: {
    type: String,
    default: '',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'completed', 'cancelled'],
    default: 'processing',
  },
  currency: {
    type: String,
    default: 'INR',
  },
}, {
  timestamps: true,
});

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ paymentId: 1 });

module.exports = mongoose.model('Order', orderSchema);
