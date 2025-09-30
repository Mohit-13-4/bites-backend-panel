import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';
import type { 
  ICategory, 
  IFoodItem, 
  IReview, 
  IDashboardStats,
  ApiResponse,
  PaginatedResponse 
} from '@/types/models';
import { apiCategories, apiFoodItems, apiReviews } from '@/data/apiMockData';

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Category Services
export const categoryService = {
  async getAll(): Promise<ICategory[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiCategories;
    }
    const response = await apiCall<ICategory[]>(API_ENDPOINTS.CATEGORIES.GET_ALL);
    return response.data || [];
  },

  async getById(id: string): Promise<ICategory | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiCategories.find(c => c._id === id) || null;
    }
    const response = await apiCall<ICategory>(API_ENDPOINTS.CATEGORIES.GET_BY_ID(id));
    return response.data || null;
  },

  async create(category: Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'>): Promise<ICategory | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Creating category', category);
      return null;
    }
    const response = await apiCall<ICategory>(API_ENDPOINTS.CATEGORIES.CREATE, {
      method: 'POST',
      body: JSON.stringify(category),
    });
    return response.data || null;
  },

  async update(id: string, category: Partial<ICategory>): Promise<ICategory | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Updating category', id, category);
      return null;
    }
    const response = await apiCall<ICategory>(API_ENDPOINTS.CATEGORIES.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(category),
    });
    return response.data || null;
  },

  async delete(id: string): Promise<boolean> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Deleting category', id);
      return true;
    }
    const response = await apiCall<void>(API_ENDPOINTS.CATEGORIES.DELETE(id), {
      method: 'DELETE',
    });
    return response.success;
  },
};

// Food Item Services
export const foodItemService = {
  async getAll(): Promise<IFoodItem[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiFoodItems;
    }
    const response = await apiCall<IFoodItem[]>(API_ENDPOINTS.FOOD_ITEMS.GET_ALL);
    return response.data || [];
  },

  async getById(id: string): Promise<IFoodItem | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiFoodItems.find(f => f._id === id) || null;
    }
    const response = await apiCall<IFoodItem>(API_ENDPOINTS.FOOD_ITEMS.GET_BY_ID(id));
    return response.data || null;
  },

  async getByCategory(categoryId: string): Promise<IFoodItem[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiFoodItems.filter(f => f.categoryId === categoryId);
    }
    const response = await apiCall<IFoodItem[]>(API_ENDPOINTS.FOOD_ITEMS.GET_BY_CATEGORY(categoryId));
    return response.data || [];
  },

  async getPopular(): Promise<IFoodItem[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiFoodItems.filter(f => f.isPopular);
    }
    const response = await apiCall<IFoodItem[]>(API_ENDPOINTS.FOOD_ITEMS.GET_POPULAR);
    return response.data || [];
  },

  async create(foodItem: Omit<IFoodItem, '_id' | 'createdAt' | 'updatedAt'>): Promise<IFoodItem | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Creating food item', foodItem);
      return null;
    }
    const response = await apiCall<IFoodItem>(API_ENDPOINTS.FOOD_ITEMS.CREATE, {
      method: 'POST',
      body: JSON.stringify(foodItem),
    });
    return response.data || null;
  },

  async update(id: string, foodItem: Partial<IFoodItem>): Promise<IFoodItem | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Updating food item', id, foodItem);
      return null;
    }
    const response = await apiCall<IFoodItem>(API_ENDPOINTS.FOOD_ITEMS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(foodItem),
    });
    return response.data || null;
  },

  async delete(id: string): Promise<boolean> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Deleting food item', id);
      return true;
    }
    const response = await apiCall<void>(API_ENDPOINTS.FOOD_ITEMS.DELETE(id), {
      method: 'DELETE',
    });
    return response.success;
  },

  async uploadImage(file: File): Promise<string | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Return a mock URL
      return URL.createObjectURL(file);
    }
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_ENDPOINTS.FOOD_ITEMS.UPLOAD_IMAGE}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.imageUrl || null;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  },
};

// Review Services
export const reviewService = {
  async getAll(): Promise<IReview[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiReviews;
    }
    const response = await apiCall<IReview[]>(API_ENDPOINTS.REVIEWS.GET_ALL);
    return response.data || [];
  },

  async getById(id: string): Promise<IReview | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiReviews.find(r => r._id === id) || null;
    }
    const response = await apiCall<IReview>(API_ENDPOINTS.REVIEWS.GET_BY_ID(id));
    return response.data || null;
  },

  async getByFoodItem(foodItemId: string): Promise<IReview[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiReviews.filter(r => r.foodItemId === foodItemId);
    }
    const response = await apiCall<IReview[]>(API_ENDPOINTS.REVIEWS.GET_BY_FOOD_ITEM(foodItemId));
    return response.data || [];
  },

  async create(review: Omit<IReview, '_id' | 'createdAt' | 'updatedAt'>): Promise<IReview | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Mock: Creating review', review);
      return null;
    }
    const response = await apiCall<IReview>(API_ENDPOINTS.REVIEWS.CREATE, {
      method: 'POST',
      body: JSON.stringify(review),
    });
    return response.data || null;
  },
};

// Dashboard Services
export const dashboardService = {
  async getStats(): Promise<IDashboardStats> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const totalCategories = apiCategories.length;
      const totalFoodItems = apiFoodItems.length;
      const totalPopularItems = apiFoodItems.filter(f => f.isPopular).length;
      const totalReviews = apiReviews.length;
      const averageRating = apiReviews.reduce((sum, r) => sum + r.rating, 0) / apiReviews.length;

      return {
        totalCategories,
        totalFoodItems,
        totalPopularItems,
        totalReviews,
        totalUsers: 128,
        totalOrders: 450,
        totalRevenue: 125000,
        averageRating: Math.round(averageRating * 10) / 10,
      };
    }
    const response = await apiCall<IDashboardStats>(API_ENDPOINTS.DASHBOARD.GET_STATS);
    return response.data || {
      totalCategories: 0,
      totalFoodItems: 0,
      totalPopularItems: 0,
      totalReviews: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      averageRating: 0,
    };
  },

  async getRecentReviews(limit: number = 10): Promise<IReview[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return apiReviews.slice(0, limit);
    }
    const response = await apiCall<IReview[]>(
      `${API_ENDPOINTS.DASHBOARD.GET_RECENT_REVIEWS}?limit=${limit}`
    );
    return response.data || [];
  },
};
