const mongoose = require('mongoose');

const durationSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Duration label is required'],
    trim: true,
  },
  value: {
    type: Number,
    required: [true, 'Duration value is required'],
    min: [1, 'Duration value must be at least 1'],
  },
  unit: {
    type: String,
    enum: ['hours', 'days'],
    required: [true, 'Duration unit is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  // Flash Sale
  flashSale: {
    isActive: { type: Boolean, default: false },
    flashPrice: { type: Number, default: null, min: [0, 'Flash price cannot be negative'] },
    startAt: { type: Date, default: null },
    endAt: { type: Date, default: null },
  },
}, { _id: false });

const productSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    default: null,
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  durations: {
    type: [durationSchema],
    validate: {
      validator: function (durations) {
        return durations.length > 0;
      },
      message: 'At least one duration option is required',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  totalKeys: {
    type: Number,
    default: 0,
  },
  soldKeys: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

productSchema.virtual('availableKeys').get(function () {
  return this.totalKeys - this.soldKeys;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ gameId: 1, isActive: 1 });
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ 'durations.price': 1 });

module.exports = mongoose.model('Product', productSchema);
