const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');
const upload = require('../config/uploadConfig');

router.get('/', foodItemController.getAllFoodItems);
router.get('/popular', foodItemController.getPopularFoodItems);
router.get('/category/:categoryId', foodItemController.getFoodItemsByCategory);
router.get('/:id', foodItemController.getFoodItemById);
router.post('/', foodItemController.createFoodItem);
router.put('/:id', foodItemController.updateFoodItem);
router.delete('/:id', foodItemController.deleteFoodItem);
router.post('/upload-image', upload.single('image'), foodItemController.uploadImage);

module.exports = router;
