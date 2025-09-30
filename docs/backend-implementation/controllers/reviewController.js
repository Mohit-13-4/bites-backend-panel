const Review = require('../models/Review');

// Get all reviews with pagination
exports.getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};
    
    if (req.query.foodItemId) {
      query.foodItemId = req.query.foodItemId;
    }
    
    if (req.query.rating) {
      query.rating = parseInt(req.query.rating);
    }

    const total = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .populate('foodItemId', 'itemName imageUrl')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single review
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('foodItemId', 'itemName imageUrl');
    
    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get reviews by food item
exports.getReviewsByFoodItem = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments({ foodItemId: req.params.foodItemId });
    const reviews = await Review.find({ foodItemId: req.params.foodItemId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create review
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
