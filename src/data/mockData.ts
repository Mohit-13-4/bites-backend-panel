import type { ICategory, IFoodItem, IReview } from '@/types/models';

// Legacy interfaces for backward compatibility
export interface Review {
  id: number;
  name: string;
  daysAgo: number;
  rating: number;
  comment: string;
  imageUrl: string;
  avatar: string;
}

export interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  isPopular: boolean;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    daysAgo: 2,
    rating: 5,
    comment: "Absolutely amazing! The Butter Chicken was perfectly cooked with rich, creamy gravy. Best I've had in years!",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  },
  {
    id: 2,
    name: "Priya Sharma",
    daysAgo: 3,
    rating: 5,
    comment: "The Paneer Tikka was outstanding! Fresh ingredients and authentic taste. Will definitely order again.",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 3,
    name: "Amit Patel",
    daysAgo: 5,
    rating: 4,
    comment: "Great biryani with perfectly cooked rice and tender meat. The portions are generous too!",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    daysAgo: 7,
    rating: 5,
    comment: "The Masala Dosa was crispy and delicious. Authentic South Indian taste with perfect sambhar and chutney.",
    imageUrl: "https://images.unsplash.com/photo-1694672997083-13ba8456184d?w=400",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
  },
  {
    id: 5,
    name: "Vikram Singh",
    daysAgo: 8,
    rating: 4,
    comment: "Loved the pasta! Creamy and flavorful. The garlic bread was a perfect accompaniment.",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
  },
  {
    id: 6,
    name: "Ananya Iyer",
    daysAgo: 10,
    rating: 5,
    comment: "The Gulab Jamun was heaven! Soft, sweet, and perfectly soaked in syrup. Best dessert ever!",
    imageUrl: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
  },
  {
    id: 7,
    name: "Karthik Nair",
    daysAgo: 12,
    rating: 4,
    comment: "The Hakka Noodles were amazing! Great wok flavor and perfectly cooked vegetables.",
    imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
  },
  {
    id: 8,
    name: "Divya Menon",
    daysAgo: 14,
    rating: 5,
    comment: "Fresh fruit smoothie was excellent! Healthy and refreshing, perfect for summer.",
    imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100"
  },
  {
    id: 9,
    name: "Rohan Desai",
    daysAgo: 15,
    rating: 4,
    comment: "The burger was juicy and flavorful. Fresh lettuce and tomatoes with a perfect patty!",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100"
  },
  {
    id: 10,
    name: "Meera Kapoor",
    daysAgo: 18,
    rating: 5,
    comment: "The chocolate brownie was divine! Rich, fudgy, and perfectly baked. A must-try for chocolate lovers!",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Starters",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
  },
  {
    id: 2,
    name: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
  },
  {
    id: 3,
    name: "Chinese",
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400"
  },
  {
    id: 4,
    name: "Italian",
    imageUrl: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400"
  },
  {
    id: 5,
    name: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
  },
  {
    id: 6,
    name: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"
  },
  {
    id: 7,
    name: "South Indian",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400"
  }
];

export const foodItems: FoodItem[] = [
  // Starters
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Starters",
    price: 249.00,
    description: "Marinated cottage cheese cubes grilled to perfection with Indian spices, bell peppers and onions.",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    isPopular: true
  },
  {
    id: 2,
    name: "Chicken 65",
    category: "Starters",
    price: 299.00,
    description: "Spicy deep-fried chicken with curry leaves, yogurt, and red chilies. A South Indian classic.",
    imageUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400",
    isPopular: true
  },
  {
    id: 3,
    name: "Veg Spring Rolls",
    category: "Starters",
    price: 179.00,
    description: "Crispy rolls filled with fresh vegetables, served with sweet chili sauce.",
    imageUrl: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400",
    isPopular: false
  },
  // Main Course
  {
    id: 4,
    name: "Butter Chicken",
    category: "Main Course",
    price: 349.00,
    description: "Tender chicken in rich, creamy tomato-based gravy with aromatic spices.",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
    isPopular: true
  },
  {
    id: 5,
    name: "Dal Makhani",
    category: "Main Course",
    price: 229.00,
    description: "Slow-cooked black lentils in butter and cream with aromatic spices.",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    isPopular: true
  },
  {
    id: 6,
    name: "Hyderabadi Biryani",
    category: "Main Course",
    price: 399.00,
    description: "Fragrant basmati rice layered with marinated chicken and aromatic spices.",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    isPopular: true
  },
  {
    id: 7,
    name: "Palak Paneer",
    category: "Main Course",
    price: 269.00,
    description: "Cottage cheese cubes in creamy spinach gravy with Indian spices.",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    isPopular: false
  },
  // Chinese
  {
    id: 8,
    name: "Hakka Noodles",
    category: "Chinese",
    price: 219.00,
    description: "Stir-fried noodles with vegetables and Indo-Chinese sauces.",
    imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400",
    isPopular: true
  },
  {
    id: 9,
    name: "Manchurian",
    category: "Chinese",
    price: 239.00,
    description: "Crispy vegetable balls in spicy, tangy Chinese gravy.",
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a65edd015?w=400",
    isPopular: false
  },
  {
    id: 10,
    name: "Fried Rice",
    category: "Chinese",
    price: 199.00,
    description: "Wok-tossed rice with vegetables and soy sauce.",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    isPopular: false
  },
  // Italian
  {
    id: 11,
    name: "Margherita Pizza",
    category: "Italian",
    price: 329.00,
    description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    isPopular: true
  },
  {
    id: 12,
    name: "Alfredo Pasta",
    category: "Italian",
    price: 289.00,
    description: "Creamy fettuccine pasta with parmesan cheese and garlic.",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    isPopular: true
  },
  // Desserts
  {
    id: 13,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 149.00,
    description: "Premium cocoa, melted chocolate with a moist, fudgy center and crisp top.",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    isPopular: true
  },
  {
    id: 14,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 99.00,
    description: "Soft milk dumplings soaked in cardamom-flavored sugar syrup.",
    imageUrl: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
    isPopular: true
  },
  {
    id: 15,
    name: "Macarons",
    category: "Desserts",
    price: 199.00,
    description: "Delicate vanilla and chocolate macarons with smooth, creamy filling.",
    imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400",
    isPopular: false
  },
  // Beverages
  {
    id: 16,
    name: "Mango Lassi",
    category: "Beverages",
    price: 89.00,
    description: "Refreshing yogurt-based drink blended with fresh mangoes.",
    imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400",
    isPopular: true
  },
  {
    id: 17,
    name: "Masala Chai",
    category: "Beverages",
    price: 49.00,
    description: "Traditional Indian tea with aromatic spices and milk.",
    imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
    isPopular: true
  },
  {
    id: 18,
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 69.00,
    description: "Refreshing lime juice with soda water and a hint of salt or sugar.",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    isPopular: false
  },
  // South Indian
  {
    id: 19,
    name: "Masala Dosa",
    category: "South Indian",
    price: 129.00,
    description: "Crispy rice crepe filled with spiced potato filling, served with sambhar and chutney.",
    imageUrl: "https://images.unsplash.com/photo-1694672997083-13ba8456184d?w=400",
    isPopular: true
  },
  {
    id: 20,
    name: "Idli Sambhar",
    category: "South Indian",
    price: 99.00,
    description: "Steamed rice cakes served with lentil stew and coconut chutney.",
    imageUrl: "https://images.unsplash.com/photo-1630851840633-d03e1d3cde5e?w=400",
    isPopular: true
  }
];
