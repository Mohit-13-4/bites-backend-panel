const FoodItem = require('../models/FoodItem');

// Get all food items with pagination
exports.getAllFoodItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = { isAvailable: true };
    
    if (req.query.category) {
      query.categoryId = req.query.category;
    }
    
    if (req.query.isPopular) {
      query.isPopular = req.query.isPopular === 'true';
    }

    const total = await FoodItem.countDocuments(query);
    const foodItems = await FoodItem.find(query)
      .populate('categoryId', 'categoryName')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: foodItems,
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

// Get single food item
exports.getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id)
      .populate('categoryId', 'categoryName description');
    
    if (!foodItem) {
      return res.status(404).json({ success: false, error: 'Food item not found' });
    }
    
    res.json({ success: true, data: foodItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get food items by category
exports.getFoodItemsByCategory = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ 
      categoryId: req.params.categoryId,
      isAvailable: true 
    }).populate('categoryId', 'categoryName');
    
    res.json({ success: true, data: foodItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get popular food items
exports.getPopularFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ 
      isPopular: true,
      isAvailable: true 
    })
    .populate('categoryId', 'categoryName')
    .sort({ createdAt: -1 });
    
    res.json({ success: true, data: foodItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create food item
exports.createFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.create(req.body);
    res.status(201).json({ success: true, data: foodItem });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update food item
exports.updateFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categoryId', 'categoryName');
    
    if (!foodItem) {
      return res.status(404).json({ success: false, error: 'Food item not found' });
    }
    
    res.json({ success: true, data: foodItem });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete food item
exports.deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    
    if (!foodItem) {
      return res.status(404).json({ success: false, error: 'Food item not found' });
    }
    
    res.json({ success: true, message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
