# MongoDB Database Setup for Bites Restaurant Dashboard

## MongoDB Connection
```javascript
const MONGODB_URI = "mongodb://127.0.0.1:27017/bites_restaurant";
```

## Mongoose Models

### 1. Category Model (`models/Category.js`)

```javascript
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
```

### 2. FoodItem Model (`models/FoodItem.js`)

```javascript
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
}, { _id: false });

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
  },
  nutritionInfo: nutritionSchema
}, {
  timestamps: true
});

// Index for better query performance
foodItemSchema.index({ categoryId: 1, isPopular: 1 });
foodItemSchema.index({ itemName: 'text', description: 'text' });

module.exports = mongoose.model('FoodItem', foodItemSchema);
```

### 3. Review Model (`models/Review.js`)

```javascript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  foodItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem',
    required: true
  },
  imageUrl: {
    type: String
  },
  avatar: {
    type: String
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpfulCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
reviewSchema.index({ foodItemId: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });

module.exports = mongoose.model('Review', reviewSchema);
```

### 4. User Model (`models/User.js`)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'restaurant_owner'],
    default: 'customer'
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

### 5. Restaurant Model (`models/Restaurant.js`)

```javascript
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cuisineType: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
```

### 6. Order Model (`models/Order.js`)

```javascript
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  foodItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  specialInstructions: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'wallet'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  deliveryTime: Date
}, {
  timestamps: true
});

// Auto-generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${Date.now()}${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
```

## MongoDB Aggregation Pipelines for Dashboard

### Get Dashboard Statistics

```javascript
// controllers/dashboardController.js

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalCategories,
      totalFoodItems,
      totalPopularItems,
      totalReviews,
      totalUsers,
      totalOrders,
      revenueData,
      avgRatingData
    ] = await Promise.all([
      Category.countDocuments({ isActive: true }),
      FoodItem.countDocuments({ isAvailable: true }),
      FoodItem.countDocuments({ isPopular: true, isAvailable: true }),
      Review.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      Review.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalCategories,
        totalFoodItems,
        totalPopularItems,
        totalReviews,
        totalUsers,
        totalOrders,
        totalRevenue: revenueData[0]?.total || 0,
        averageRating: Math.round((avgRatingData[0]?.avgRating || 0) * 10) / 10
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get recent reviews with food item details
const getRecentReviews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const reviews = await Review.find()
      .populate('foodItemId', 'itemName imageUrl')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get trending items
const getTrendingItems = async (req, res) => {
  try {
    const trendingItems = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.foodItemId',
          totalOrders: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'fooditems',
          localField: '_id',
          foreignField: '_id',
          as: 'foodItem'
        }
      },
      { $unwind: '$foodItem' }
    ]);

    res.json({ success: true, data: trendingItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentReviews,
  getTrendingItems
};
```

## Database Configuration (`config/database.js`)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/bites_restaurant', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Next Steps

1. Install required packages:
```bash
npm install mongoose bcryptjs
```

2. Run the seed script:
```bash
node data/seedData.js
```

3. Start your Express server with MongoDB connection
