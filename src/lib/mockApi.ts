// Mock Authentication Service
// Simulates API calls but uses localStorage and mock data

import { User } from '@/types';
import { mockUsers, mockOrders } from '@/data/mockData';

// Mock authentication functions
export const mockAuth = {
  login: async (username: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple mock validation - in real app, this would check against backend
    const user = mockUsers.find(u => u.email === username);

    if (!user) {
      throw new Error('User not found');
    }

    // Mock password check (in real app, this would be hashed)
    if (password !== 'password123') {
      throw new Error('Invalid password');
    }

    // Create mock JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    return {
      accessToken: token,
      user: {
        id: user.id,
        username: user.email,
        permissions: user.id.startsWith('owner') ? 'owner' : 'user'
      }
    };
  },

  signup: async (username: string, password: string, permissions: 'user' | 'owner' = 'user') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: username.split('@')[0],
      email: username,
      phone: '+1 (555) 000-0000',
      addresses: [],
      favoriteRestaurants: []
    };

    // Add to mock data (in real app, this would be saved to backend)
    mockUsers.push(newUser);

    // Auto login after signup
    return mockAuth.login(username, password);
  },

  logout: () => {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  setCurrentUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  },

  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  },

  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }
};

// Mock Restaurant Service
export const mockRestaurantService = {
  getRestaurants: async (params?: { $limit?: number; $skip?: number }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const { mockRestaurants } = await import('@/data/mockData');
    let restaurants = [...mockRestaurants];

    // Apply pagination
    const limit = params?.$limit || 12;
    const skip = params?.$skip || 0;

    const paginatedRestaurants = restaurants.slice(skip, skip + limit);

    return {
      data: paginatedRestaurants,
      total: restaurants.length,
      limit,
      skip
    };
  },

  getRestaurant: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const { mockRestaurants } = await import('@/data/mockData');
    const restaurant = mockRestaurants.find(r => r.id === id);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return restaurant;
  }
};

// Mock Meal Service
export const mockMealService = {
  getMealsByRestaurant: async (restaurantId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const { mockFoodItems } = await import('@/data/mockData');
    const meals = mockFoodItems.filter(item => item.restaurantId === restaurantId);

    return {
      data: meals,
      total: meals.length
    };
  }
};

// Mock Order Service
export const mockOrderService = {
  createOrder: async (orderData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create mock order
    const newOrder = {
      id: `order-${Date.now()}`,
      ...orderData,
      status: 'placed' as const,
      createdAt: new Date().toISOString()
    };

    return newOrder;
  },

  getUserOrders: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Return mock orders (in real app, would filter by current user)
    return mockOrders;
  }
};

// Export all mock services
export const mockServices = {
  auth: mockAuth,
  restaurants: mockRestaurantService,
  meals: mockMealService,
  orders: mockOrderService
};