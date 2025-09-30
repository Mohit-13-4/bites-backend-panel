// TypeScript interfaces matching MongoDB schemas

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'restaurant_owner';
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  ownerId: string;
  cuisineType: string[];
  rating: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  description: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFoodItem {
  _id: string;
  itemName: string;
  categoryId: string;
  category?: ICategory;
  price: number;
  isPopular: boolean;
  imageUrl: string;
  description: string;
  restaurantId?: string;
  ingredients?: string[];
  allergens?: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isAvailable: boolean;
  preparationTime: number; // in minutes
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: string;
  customerName: string;
  customerId?: string;
  rating: number; // 1-5
  comment: string;
  foodItemId: string;
  foodItem?: IFoodItem;
  imageUrl?: string;
  avatar?: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  customerId: string;
  restaurantId: string;
  items: Array<{
    foodItemId: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: 'cash' | 'card' | 'upi' | 'wallet';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  deliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard statistics interface
export interface IDashboardStats {
  totalCategories: number;
  totalFoodItems: number;
  totalPopularItems: number;
  totalReviews: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
