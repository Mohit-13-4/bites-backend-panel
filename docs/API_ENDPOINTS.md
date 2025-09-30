# API Endpoints Documentation

Base URL: `http://localhost:5000/api`

## Authentication
All routes except public endpoints require JWT authentication.
Include token in header: `Authorization: Bearer <token>`

---

## Categories

### GET /api/categories
Get all categories
- **Response**: Array of category objects

### GET /api/categories/:id
Get category by ID
- **Params**: `id` - Category ID
- **Response**: Category object

### POST /api/categories
Create new category (Admin only)
- **Body**:
```json
{
  "categoryName": "Italian",
  "description": "Classic Italian cuisine",
  "imageUrl": "https://example.com/image.jpg",
  "displayOrder": 4
}
```
- **Response**: Created category object

### PUT /api/categories/:id
Update category (Admin only)
- **Params**: `id` - Category ID
- **Body**: Partial category object
- **Response**: Updated category object

### DELETE /api/categories/:id
Delete category (Admin only)
- **Params**: `id` - Category ID
- **Response**: Success message

---

## Food Items

### GET /api/food-items
Get all food items
- **Query params**: 
  - `page` (default: 1)
  - `limit` (default: 20)
  - `category` - Filter by category ID
  - `isPopular` - Filter popular items (true/false)
- **Response**: Paginated food items array

### GET /api/food-items/:id
Get food item by ID
- **Params**: `id` - Food item ID
- **Response**: Food item object with populated category

### GET /api/food-items/category/:categoryId
Get food items by category
- **Params**: `categoryId` - Category ID
- **Response**: Array of food items

### GET /api/food-items/popular
Get popular food items
- **Response**: Array of popular food items

### POST /api/food-items
Create new food item (Admin only)
- **Body**:
```json
{
  "itemName": "Butter Chicken",
  "categoryId": "64abc123...",
  "price": 349,
  "description": "Rich and creamy chicken dish",
  "imageUrl": "https://example.com/image.jpg",
  "isPopular": true,
  "ingredients": ["Chicken", "Butter", "Tomatoes"],
  "isVegetarian": false,
  "preparationTime": 30
}
```
- **Response**: Created food item object

### PUT /api/food-items/:id
Update food item (Admin only)
- **Params**: `id` - Food item ID
- **Body**: Partial food item object
- **Response**: Updated food item object

### DELETE /api/food-items/:id
Delete food item (Admin only)
- **Params**: `id` - Food item ID
- **Response**: Success message

### POST /api/food-items/upload-image
Upload food item image
- **Body**: FormData with `image` file
- **Response**: 
```json
{
  "success": true,
  "imageUrl": "https://storage.example.com/uploads/image123.jpg"
}
```

---

## Reviews

### GET /api/reviews
Get all reviews
- **Query params**: 
  - `page` (default: 1)
  - `limit` (default: 20)
  - `foodItemId` - Filter by food item
  - `rating` - Filter by rating
- **Response**: Paginated reviews array

### GET /api/reviews/:id
Get review by ID
- **Params**: `id` - Review ID
- **Response**: Review object

### GET /api/reviews/food-item/:foodItemId
Get reviews for specific food item
- **Params**: `foodItemId` - Food item ID
- **Query params**: `page`, `limit`
- **Response**: Paginated reviews array

### POST /api/reviews
Create new review (Authenticated users)
- **Body**:
```json
{
  "foodItemId": "64abc123...",
  "rating": 5,
  "comment": "Excellent food!",
  "imageUrl": "https://example.com/review-image.jpg"
}
```
- **Response**: Created review object

### PUT /api/reviews/:id
Update review (Owner only)
- **Params**: `id` - Review ID
- **Body**: Partial review object
- **Response**: Updated review object

### DELETE /api/reviews/:id
Delete review (Owner or Admin)
- **Params**: `id` - Review ID
- **Response**: Success message

---

## Dashboard

### GET /api/dashboard/stats
Get dashboard statistics
- **Response**:
```json
{
  "success": true,
  "data": {
    "totalCategories": 7,
    "totalFoodItems": 20,
    "totalPopularItems": 14,
    "totalReviews": 150,
    "totalUsers": 128,
    "totalOrders": 450,
    "totalRevenue": 125000,
    "averageRating": 4.5
  }
}
```

### GET /api/dashboard/recent-reviews
Get recent reviews
- **Query params**: `limit` (default: 10)
- **Response**: Array of recent reviews with food item details

### GET /api/dashboard/trending
Get trending items based on orders
- **Query params**: `limit` (default: 10)
- **Response**: Array of trending food items with order counts

---

## Orders

### GET /api/orders
Get all orders
- **Query params**: 
  - `page`, `limit`
  - `status` - Filter by status
  - `customerId` - Filter by customer
- **Response**: Paginated orders array

### GET /api/orders/:id
Get order by ID
- **Params**: `id` - Order ID
- **Response**: Order object with populated items

### POST /api/orders
Create new order
- **Body**:
```json
{
  "items": [
    {
      "foodItemId": "64abc123...",
      "quantity": 2,
      "price": 349
    }
  ],
  "totalAmount": 698,
  "deliveryAddress": "123 Main St, Bangalore",
  "paymentMethod": "card"
}
```
- **Response**: Created order object

### PUT /api/orders/:id/status
Update order status (Admin only)
- **Params**: `id` - Order ID
- **Body**:
```json
{
  "status": "out_for_delivery"
}
```
- **Response**: Updated order object

---

## Users

### POST /api/users/register
Register new user
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91-9876543210"
}
```
- **Response**: User object with JWT token

### POST /api/users/login
Login user
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: User object with JWT token

### GET /api/users/profile
Get current user profile
- **Headers**: Authorization token required
- **Response**: User object

### PUT /api/users/profile
Update user profile
- **Headers**: Authorization token required
- **Body**: Partial user object
- **Response**: Updated user object

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Image Upload Configuration

### Multer Setup (config/uploadConfig.js)

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

module.exports = upload;
```

### Usage in route:
```javascript
const upload = require('../config/uploadConfig');

router.post('/food-items/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
});
```
