const Category = require('../models/Category');
const FoodItem = require('../models/FoodItem');
const Review = require('../models/Review');
const Order = require('../models/Order');
const User = require('../models/User');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
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

// Get recent reviews
exports.getRecentReviews = async (req, res) => {
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
exports.getTrendingItems = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

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
      { $limit: limit },
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
