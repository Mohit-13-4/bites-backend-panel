// data/seedData.js
// Run this file to populate your MongoDB with sample data
// Usage: node data/seedData.js

const mongoose = require('mongoose');
const Category = require('../models/Category');
const FoodItem = require('../models/FoodItem');
const Review = require('../models/Review');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

const MONGODB_URI = "mongodb://127.0.0.1:27017/bites_restaurant";

// Sample data
const categoriesData = [
  {
    categoryName: "Starters",
    description: "Delicious appetizers to start your meal",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    displayOrder: 1,
    isActive: true
  },
  {
    categoryName: "Main Course",
    description: "Hearty main dishes",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    displayOrder: 2,
    isActive: true
  },
  {
    categoryName: "Chinese",
    description: "Indo-Chinese favorites",
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    displayOrder: 3,
    isActive: true
  },
  {
    categoryName: "Italian",
    description: "Classic Italian cuisine",
    imageUrl: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400",
    displayOrder: 4,
    isActive: true
  },
  {
    categoryName: "Desserts",
    description: "Sweet treats to end your meal",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    displayOrder: 5,
    isActive: true
  },
  {
    categoryName: "Beverages",
    description: "Refreshing drinks",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    displayOrder: 6,
    isActive: true
  },
  {
    categoryName: "South Indian",
    description: "Authentic South Indian delicacies",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400",
    displayOrder: 7,
    isActive: true
  }
];

const usersData = [
  {
    name: "Admin User",
    email: "admin@bites.com",
    password: "admin123",
    role: "admin",
    phone: "+91-9876543210"
  },
  {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    password: "customer123",
    role: "customer",
    phone: "+91-9876543211"
  }
];

const restaurantData = {
  name: "Bites Restaurant",
  description: "Authentic Indian and International Cuisine",
  address: "123 MG Road, Bangalore, Karnataka 560001",
  phone: "+91-9876543210",
  email: "contact@bites.com",
  cuisineType: ["Indian", "Chinese", "Italian", "Continental"],
  rating: 4.5,
  isActive: true
};

// Function to seed database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    // Clear existing data
    await Category.deleteMany({});
    await FoodItem.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Insert Users
    const users = await User.insertMany(usersData);
    console.log('Users inserted');

    // Insert Restaurant
    const restaurant = await Restaurant.create({
      ...restaurantData,
      ownerId: users[0]._id
    });
    console.log('Restaurant inserted');

    // Insert Categories
    const categories = await Category.insertMany(categoriesData);
    console.log('Categories inserted');

    // Create category map
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.categoryName] = cat._id;
    });

    // Food Items with category references
    const foodItemsData = [
      {
        itemName: "Paneer Tikka",
        categoryId: categoryMap["Starters"],
        price: 249,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
        description: "Marinated cottage cheese cubes grilled to perfection with Indian spices, bell peppers and onions.",
        restaurantId: restaurant._id,
        ingredients: ["Paneer", "Bell Peppers", "Onions", "Yogurt", "Spices"],
        isVegetarian: true,
        isVegan: false,
        isAvailable: true,
        preparationTime: 20
      },
      {
        itemName: "Chicken 65",
        categoryId: categoryMap["Starters"],
        price: 299,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400",
        description: "Spicy deep-fried chicken with curry leaves, yogurt, and red chilies.",
        restaurantId: restaurant._id,
        isVegetarian: false,
        isAvailable: true,
        preparationTime: 25
      },
      {
        itemName: "Butter Chicken",
        categoryId: categoryMap["Main Course"],
        price: 349,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
        description: "Tender chicken in rich, creamy tomato-based gravy with aromatic spices.",
        restaurantId: restaurant._id,
        isVegetarian: false,
        isAvailable: true,
        preparationTime: 30
      },
      {
        itemName: "Dal Makhani",
        categoryId: categoryMap["Main Course"],
        price: 229,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        description: "Slow-cooked black lentils in butter and cream with aromatic spices.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 35
      },
      {
        itemName: "Hyderabadi Biryani",
        categoryId: categoryMap["Main Course"],
        price: 399,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        description: "Fragrant basmati rice layered with marinated chicken and aromatic spices.",
        restaurantId: restaurant._id,
        isVegetarian: false,
        isAvailable: true,
        preparationTime: 45
      },
      {
        itemName: "Hakka Noodles",
        categoryId: categoryMap["Chinese"],
        price: 219,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400",
        description: "Stir-fried noodles with vegetables and Indo-Chinese sauces.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 20
      },
      {
        itemName: "Margherita Pizza",
        categoryId: categoryMap["Italian"],
        price: 329,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 25
      },
      {
        itemName: "Alfredo Pasta",
        categoryId: categoryMap["Italian"],
        price: 289,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
        description: "Creamy fettuccine pasta with parmesan cheese and garlic.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 20
      },
      {
        itemName: "Chocolate Brownie",
        categoryId: categoryMap["Desserts"],
        price: 149,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
        description: "Premium cocoa, melted chocolate with a moist, fudgy center and crisp top.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 15
      },
      {
        itemName: "Gulab Jamun",
        categoryId: categoryMap["Desserts"],
        price: 99,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
        description: "Soft milk dumplings soaked in cardamom-flavored sugar syrup.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 10
      },
      {
        itemName: "Mango Lassi",
        categoryId: categoryMap["Beverages"],
        price: 89,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400",
        description: "Refreshing yogurt-based drink blended with fresh mangoes.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 5
      },
      {
        itemName: "Masala Chai",
        categoryId: categoryMap["Beverages"],
        price: 49,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
        description: "Traditional Indian tea with aromatic spices and milk.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 5
      },
      {
        itemName: "Masala Dosa",
        categoryId: categoryMap["South Indian"],
        price: 129,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1694672997083-13ba8456184d?w=400",
        description: "Crispy rice crepe filled with spiced potato filling, served with sambhar and chutney.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 20
      },
      {
        itemName: "Idli Sambhar",
        categoryId: categoryMap["South Indian"],
        price: 99,
        isPopular: true,
        imageUrl: "https://images.unsplash.com/photo-1630851840633-d03e1d3cde5e?w=400",
        description: "Steamed rice cakes served with lentil stew and coconut chutney.",
        restaurantId: restaurant._id,
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 15
      }
    ];

    // Insert Food Items
    const foodItems = await FoodItem.insertMany(foodItemsData);
    console.log('Food items inserted');

    // Reviews data
    const reviewsData = [
      {
        customerName: "Rajesh Kumar",
        customerId: users[1]._id,
        rating: 5,
        comment: "Absolutely amazing! The Butter Chicken was perfectly cooked with rich, creamy gravy. Best I've had in years!",
        foodItemId: foodItems.find(f => f.itemName === "Butter Chicken")._id,
        imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        isVerifiedPurchase: true,
        helpfulCount: 15
      },
      {
        customerName: "Priya Sharma",
        rating: 5,
        comment: "The Paneer Tikka was outstanding! Fresh ingredients and authentic taste.",
        foodItemId: foodItems.find(f => f.itemName === "Paneer Tikka")._id,
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        isVerifiedPurchase: true,
        helpfulCount: 12,
        rating: 5
      },
      {
        customerName: "Amit Patel",
        rating: 4,
        comment: "Great biryani with perfectly cooked rice and tender meat. Generous portions!",
        foodItemId: foodItems.find(f => f.itemName === "Hyderabadi Biryani")._id,
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        isVerifiedPurchase: true,
        helpfulCount: 8
      }
    ];

    await Review.insertMany(reviewsData);
    console.log('Reviews inserted');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
