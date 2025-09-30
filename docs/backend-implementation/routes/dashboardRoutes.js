const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', dashboardController.getDashboardStats);
router.get('/recent-reviews', dashboardController.getRecentReviews);
router.get('/trending', dashboardController.getTrendingItems);

module.exports = router;
