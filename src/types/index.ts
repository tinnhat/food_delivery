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
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  tax: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliveryTime: string;
  paymentMethod: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  favoriteRestaurants: string[];
}