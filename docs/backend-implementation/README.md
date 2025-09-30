# Bites Restaurant Backend API

Complete Node.js/Express backend for the Bites Restaurant Management Dashboard.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd docs/backend-implementation
npm install
```

### 2. Set Up MongoDB

Make sure MongoDB is running on your local machine:
```bash
mongod
```

Or update the connection string in `server.js` to point to your MongoDB instance.

### 3. Seed the Database

Populate your database with sample data:
```bash
npm run seed
```

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend-implementation/
├── config/
│   └── uploadConfig.js       # Multer configuration for file uploads
├── controllers/
│   ├── categoryController.js
│   ├── foodItemController.js
│   ├── reviewController.js
│   └── dashboardController.js
├── models/
│   ├── Category.js
│   ├── FoodItem.js
│   └── Review.js
├── routes/
│   ├── categoryRoutes.js
│   ├── foodItemRoutes.js
│   ├── reviewRoutes.js
│   ├── dashboardRoutes.js
│   ├── orderRoutes.js
│   └── userRoutes.js
├── data/
│   └── seedData.js            # Database seeding script
├── uploads/                   # Uploaded images directory
├── server.js                  # Main application file
└── package.json
```

## 🔌 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Food Items
- `GET /api/food-items` - Get all food items (with pagination)
- `GET /api/food-items/:id` - Get single food item
- `GET /api/food-items/popular` - Get popular items
- `GET /api/food-items/category/:categoryId` - Get items by category
- `POST /api/food-items` - Create food item
- `PUT /api/food-items/:id` - Update food item
- `DELETE /api/food-items/:id` - Delete food item
- `POST /api/food-items/upload-image` - Upload food image

### Reviews
- `GET /api/reviews` - Get all reviews (with pagination)
- `GET /api/reviews/:id` - Get single review
- `GET /api/reviews/food-item/:foodItemId` - Get reviews for food item
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-reviews` - Get recent reviews
- `GET /api/dashboard/trending` - Get trending items

### Health Check
- `GET /api/health` - Check API status

## 🖼️ Image Upload

Images are stored in the `uploads/` directory and served as static files.

**Upload endpoint:**
```
POST /api/food-items/upload-image
Content-Type: multipart/form-data
Field name: image
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "/uploads/food-1234567890.jpg"
}
```

Access uploaded images at: `http://localhost:5000/uploads/filename.jpg`

## 🔗 Connect Frontend

In your frontend project, update `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  USE_MOCK_DATA: false, // Set to false to use real API
};
```

## 🗄️ Database Schema

### Categories
- categoryName (String, required, unique)
- description (String)
- imageUrl (String)
- displayOrder (Number)
- isActive (Boolean)

### Food Items
- itemName (String, required)
- categoryId (ObjectId, ref: Category)
- price (Number, required)
- isPopular (Boolean)
- imageUrl (String, required)
- description (String, required)
- ingredients (Array of Strings)
- isVegetarian (Boolean)
- isVegan (Boolean)
- isAvailable (Boolean)
- preparationTime (Number)

### Reviews
- customerName (String, required)
- rating (Number, 1-5, required)
- comment (String, required)
- foodItemId (ObjectId, ref: FoodItem)
- imageUrl (String)
- avatar (String)
- isVerifiedPurchase (Boolean)
- helpfulCount (Number)

## 🛠️ Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bites_restaurant
NODE_ENV=development
```

## 📝 Sample Data

The seed script (`npm run seed`) populates:
- 7 categories
- 20 food items
- 10 reviews
- Sample users and restaurant data

## 🔒 CORS Configuration

CORS is enabled for all origins in development. For production, update the CORS configuration in `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## 🐛 Debugging

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 📦 Deployment

For production deployment:

1. Set environment variables
2. Use a process manager like PM2
3. Set up MongoDB Atlas or hosted MongoDB
4. Configure proper CORS origins
5. Add authentication middleware (recommended)

## 🤝 Need Help?

Check the full API documentation in `docs/API_ENDPOINTS.md`
