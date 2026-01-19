export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string[];
  isOpen: boolean;
  address: string;
  phone: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  restaurantId: string;
  rating?: number;
  preparationTime?: string;
  // Enhanced image properties
  imageAlt?: string;
  imageThumbnail?: string;
  imageLarge?: string;
  imageMetadata?: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  userId?: string;
  orderitems: OrderItem[];
  totalAmount: number;
  status: 'placed' | 'processing' | 'in_route' | 'delivered' | 'received' | 'canceled';
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  mealId: string;
  quantity: number;
  price: number;
  meal?: Meal;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  restaurantId: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  rating?: number;
  preparationTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  favoriteRestaurants: string[];
}