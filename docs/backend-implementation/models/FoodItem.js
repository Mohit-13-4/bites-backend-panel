const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  ingredients: [{
    type: String
  }],
  allergens: [{
    type: String
  }],
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 30
  }
}, {
  timestamps: true
});

foodItemSchema.index({ categoryId: 1, isPopular: 1 });
foodItemSchema.index({ itemName: 'text', description: 'text' });

module.exports = mongoose.model('FoodItem', foodItemSchema);
