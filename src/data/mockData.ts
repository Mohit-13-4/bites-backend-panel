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
    name: "John Sena",
    daysAgo: 2,
    rating: 5,
    comment: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  },
  {
    id: 2,
    name: "Sofia",
    daysAgo: 5,
    rating: 4,
    comment: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text",
    imageUrl: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 3,
    name: "Anandranayyah",
    daysAgo: 10,
    rating: 5,
    comment: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Snack",
    imageUrl: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400"
  },
  {
    id: 2,
    name: "Meal",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
  },
  {
    id: 3,
    name: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
  },
  {
    id: 4,
    name: "Dessert",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
  },
  {
    id: 5,
    name: "Drink",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"
  }
];

export const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Chocolate Brownie",
    category: "Dessert",
    price: 15.00,
    description: "Premium Cocoa, Melted Chocolate, And A Hint Of Vanilla, Creating A Moist, Fudgy Center With A Crisp, Crackly Top.",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    isPopular: true
  },
  {
    id: 2,
    name: "Burger",
    category: "Meal",
    price: 10.00,
    description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt Ut Labore.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    isPopular: true
  },
  {
    id: 3,
    name: "Macarons",
    category: "Dessert",
    price: 12.00,
    description: "Delicate Vanilla And Chocolate Macarons, Featuring A Crisp Outer Shell And A Smooth.",
    imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400",
    isPopular: true
  },
  {
    id: 4,
    name: "Mushroom Risotto",
    category: "Vegan",
    price: 15.00,
    description: "Creamy Mushroom Risotto, Cooked To Perfection In Arborio Rice, Wild Mushrooms, Parmesan Cheese, And White Wine.",
    imageUrl: "https://images.unsplash.com/photo-1476124369491-f7addf4db90c?w=400",
    isPopular: false
  }
];
