import { Restaurant, FoodItem, Order, User } from "@/types";

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    addresses: ["123 Main St, Downtown", "456 Oak Ave, Midtown"],
    favoriteRestaurants: ["1", "3"]
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    addresses: ["789 Pine St, Uptown"],
    favoriteRestaurants: ["2", "5"]
  },
  {
    id: "owner-1",
    name: "Mario Rossi",
    email: "mario@bellaitalia.com",
    phone: "+1 (555) 345-6789",
    addresses: ["123 Restaurant St, Downtown"],
    favoriteRestaurants: []
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: "order-1",
    restaurantId: "1",
    orderitems: [
      {
        mealId: "1",
        quantity: 2,
        price: 14.99
      }
    ],
    totalAmount: 29.98,
    status: 'delivered',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: "order-2",
    restaurantId: "2",
    orderitems: [
      {
        mealId: "3",
        quantity: 1,
        price: 12.99
      }
    ],
    totalAmount: 15.98,
    status: 'placed',
    createdAt: new Date('2024-01-16').toISOString()
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Bella Italia",
    description: "Authentic Italian cuisine with fresh ingredients",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    cuisine: ["Italian", "Pizza", "Pasta"],
    isOpen: true,
    address: "123 Main St, Downtown",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Tokyo Sushi",
    description: "Fresh sushi and Japanese delicacies",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 3.99,
    cuisine: ["Japanese", "Sushi", "Asian"],
    isOpen: true,
    address: "456 Oak Ave, Midtown",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "Spice Garden",
    description: "Exotic Indian flavors with aromatic spices",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 1.99,
    cuisine: ["Indian", "Curry", "Vegetarian"],
    isOpen: true,
    address: "789 Pine St, Uptown",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Burger Palace",
    description: "Juicy burgers and crispy fries",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    cuisine: ["American", "Burgers", "Fast Food"],
    isOpen: true,
    address: "321 Elm St, Downtown",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "5",
    name: "Green Garden",
    description: "Healthy and organic vegetarian meals",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    rating: 4.6,
    deliveryTime: "20-35 min",
    deliveryFee: 2.49,
    cuisine: ["Vegetarian", "Healthy", "Organic"],
    isOpen: true,
    address: "654 Maple Ave, Westside",
    phone: "+1 (555) 567-8901",
  },
  {
    id: "6",
    name: "Dragon Wok",
    description: "Authentic Chinese cuisine with fresh ingredients",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
    rating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    cuisine: ["Chinese", "Asian", "Noodles"],
    isOpen: false,
    address: "987 Cedar St, Eastside",
    phone: "+1 (555) 678-9012",
  },
];

export const mockFoodItems: FoodItem[] = [
  // Bella Italia
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
    imageThumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop&crop=center",
    imageLarge: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&crop=center",
    imageAlt: "Delicious Margherita Pizza with fresh mozzarella and basil",
    price: 14.99,
    category: "Pizza",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    restaurantId: "1",
    rating: 4.6,
    preparationTime: "15-20 min",
    imageMetadata: {
      width: 400,
      height: 300,
      format: "jpg",
      size: 85000
    },
  },
  {
    id: "2",
    name: "Carbonara Pasta",
    description: "Creamy pasta with pancetta and parmesan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    imageThumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop",
    imageLarge: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    imageAlt: "Creamy Carbonara Pasta with pancetta and parmesan cheese",
    price: 16.99,
    category: "Pasta",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    restaurantId: "1",
    rating: 4.8,
    preparationTime: "12-18 min",
    imageMetadata: {
      width: 400,
      height: 300,
      format: "jpg",
      size: 92000
    },
  },

  // Tokyo Sushi
  {
    id: "3",
    name: "California Roll",
    description: "Crab, avocado, and cucumber roll",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    imageThumbnail: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=150&h=150&fit=crop",
    imageLarge: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    imageAlt: "Fresh California Roll with crab, avocado, and cucumber",
    price: 12.99,
    category: "Sushi Rolls",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    restaurantId: "2",
    rating: 4.5,
    preparationTime: "10-15 min",
    imageMetadata: {
      width: 400,
      height: 300,
      format: "jpg",
      size: 78000
    },
  },
  {
    id: "4",
    name: "Spicy Tuna Roll",
    description: "Fresh tuna with spicy mayo",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300",
    price: 15.99,
    category: "Sushi Rolls",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    restaurantId: "2",
    rating: 4.7,
    preparationTime: "10-15 min",
  },

  // Spice Garden
  {
    id: "5",
    name: "Butter Chicken",
    description: "Creamy tomato curry with tender chicken",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    imageThumbnail: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=150&h=150&fit=crop",
    imageLarge: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    imageAlt: "Rich and creamy Butter Chicken curry with tender chicken pieces",
    price: 18.99,
    category: "Curry",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    restaurantId: "3",
    rating: 4.9,
    preparationTime: "20-25 min",
    imageMetadata: {
      width: 400,
      height: 300,
      format: "jpg",
      size: 95000
    },
  },
  {
    id: "6",
    name: "Paneer Tikka",
    description: "Grilled paneer with spices and yogurt",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300",
    price: 13.99,
    category: "Appetizers",
    isVegetarian: true,
    isVegan: false,
    isSpicy: true,
    restaurantId: "3",
    rating: 4.4,
    preparationTime: "15-20 min",
  },

  // Burger Palace
  {
    id: "7",
    name: "Classic Cheeseburger",
    description: "Beef patty with cheese, lettuce, and tomato",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    price: 11.99,
    category: "Burgers",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    restaurantId: "4",
    rating: 4.3,
    preparationTime: "10-15 min",
  },
  {
    id: "8",
    name: "Loaded Fries",
    description: "Crispy fries with cheese and bacon",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300",
    price: 7.99,
    category: "Sides",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    restaurantId: "4",
    rating: 4.1,
    preparationTime: "8-12 min",
  },

  // Green Garden
  {
    id: "9",
    name: "Quinoa Buddha Bowl",
    description: "Quinoa, roasted vegetables, and tahini dressing",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
    price: 14.99,
    category: "Bowls",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    restaurantId: "5",
    rating: 4.7,
    preparationTime: "12-18 min",
  },
  {
    id: "10",
    name: "Avocado Toast",
    description: "Whole grain toast with avocado and microgreens",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300",
    price: 9.99,
    category: "Breakfast",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    restaurantId: "5",
    rating: 4.5,
    preparationTime: "8-12 min",
  },
];