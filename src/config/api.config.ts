// API Configuration
// Update this with your actual backend URL
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api' 
    : 'http://localhost:5000/api',
  
  TIMEOUT: 10000, // 10 seconds
  
  // Enable mock mode to use local mock data instead of API calls
  USE_MOCK_DATA: true, // Set to false when backend is ready
};

// API Endpoints
export const API_ENDPOINTS = {
  // Categories
  CATEGORIES: {
    GET_ALL: '/categories',
    GET_BY_ID: (id: string) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  
  // Food Items
  FOOD_ITEMS: {
    GET_ALL: '/food-items',
    GET_BY_ID: (id: string) => `/food-items/${id}`,
    GET_BY_CATEGORY: (categoryId: string) => `/food-items/category/${categoryId}`,
    GET_POPULAR: '/food-items/popular',
    CREATE: '/food-items',
    UPDATE: (id: string) => `/food-items/${id}`,
    DELETE: (id: string) => `/food-items/${id}`,
    UPLOAD_IMAGE: '/food-items/upload-image',
  },
  
  // Reviews
  REVIEWS: {
    GET_ALL: '/reviews',
    GET_BY_ID: (id: string) => `/reviews/${id}`,
    GET_BY_FOOD_ITEM: (foodItemId: string) => `/reviews/food-item/${foodItemId}`,
    CREATE: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },
  
  // Dashboard
  DASHBOARD: {
    GET_STATS: '/dashboard/stats',
    GET_RECENT_REVIEWS: '/dashboard/recent-reviews',
    GET_TRENDING_ITEMS: '/dashboard/trending',
  },
  
  // Orders
  ORDERS: {
    GET_ALL: '/orders',
    GET_BY_ID: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },
  
  // Users
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
  },
  
  // Restaurants
  RESTAURANTS: {
    GET_ALL: '/restaurants',
    GET_BY_ID: (id: string) => `/restaurants/${id}`,
    CREATE: '/restaurants',
    UPDATE: (id: string) => `/restaurants/${id}`,
  },
};
