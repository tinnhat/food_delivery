"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { FoodItem } from '@/types';

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
  addedAt: Date;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { foodItem: FoodItem; quantity?: number; specialInstructions?: string } }
  | { type: 'REMOVE_ITEM'; payload: { foodItemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { foodItemId: string; quantity: number } }
  | { type: 'UPDATE_INSTRUCTIONS'; payload: { foodItemId: string; specialInstructions: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (foodItem: FoodItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (foodItemId: string) => void;
  updateQuantity: (foodItemId: string, quantity: number) => void;
  updateInstructions: (foodItemId: string, specialInstructions: string) => void;
  clearCart: () => void;
  getItemQuantity: (foodItemId: string) => number;
  isInCart: (foodItemId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { foodItem, quantity = 1, specialInstructions } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.foodItem.id === foodItem.id
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, {
          foodItem,
          quantity,
          specialInstructions,
          addedAt: new Date()
        }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => item.foodItem.id !== action.payload.foodItemId
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { foodItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { foodItemId } });
      }

      const newItems = state.items.map(item =>
        item.foodItem.id === foodItemId
          ? { ...item, quantity }
          : item
      );

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'UPDATE_INSTRUCTIONS': {
      const { foodItemId, specialInstructions } = action.payload;
      const newItems = state.items.map(item =>
        item.foodItem.id === foodItemId
          ? { ...item, specialInstructions }
          : item
      );

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
        itemCount: calculateItemCount(action.payload)
      };

    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.foodItem.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('foodDeliveryCart');
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        } catch (error) {
          console.error('Failed to load cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodDeliveryCart', JSON.stringify(state.items));
    }
  }, [state.items]);

  const addItem = (foodItem: FoodItem, quantity = 1, specialInstructions?: string) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { foodItem, quantity, specialInstructions }
    });
  };

  const removeItem = (foodItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { foodItemId } });
  };

  const updateQuantity = (foodItemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { foodItemId, quantity } });
  };

  const updateInstructions = (foodItemId: string, specialInstructions: string) => {
    dispatch({ type: 'UPDATE_INSTRUCTIONS', payload: { foodItemId, specialInstructions } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (foodItemId: string): number => {
    const item = state.items.find(item => item.foodItem.id === foodItemId);
    return item?.quantity || 0;
  };

  const isInCart = (foodItemId: string): boolean => {
    return state.items.some(item => item.foodItem.id === foodItemId);
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    updateInstructions,
    clearCart,
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}