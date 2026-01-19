"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types';
import { mockAuth } from '@/lib/mockApi';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, password: string, permissions?: 'user' | 'owner') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    const checkAuth = () => {
      try {
        const token = mockAuth.getToken();
        const userData = mockAuth.getCurrentUser();

        if (token && userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Clear potentially corrupted data
        mockAuth.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await mockAuth.login(username, password);

      // Find the full user object from mock data
      const fullUser = mockAuth.getCurrentUser();
      if (fullUser) {
        setUser(fullUser);
      } else {
        // Fallback to basic user object
        setUser({
          id: response.user.id,
          name: response.user.username.split('@')[0],
          email: response.user.username,
          phone: '+1 (555) 000-0000',
          addresses: [],
          favoriteRestaurants: []
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    mockAuth.logout();
    setUser(null);
  };

  const signup = async (username: string, password: string, permissions: 'user' | 'owner' = 'user') => {
    try {
      const response = await mockAuth.signup(username, password, permissions);

      // Find the full user object from mock data
      const fullUser = mockAuth.getCurrentUser();
      if (fullUser) {
        setUser(fullUser);
      } else {
        // Fallback to basic user object
        setUser({
          id: response.user.id,
          name: username.split('@')[0],
          email: username,
          phone: '+1 (555) 000-0000',
          addresses: [],
          favoriteRestaurants: []
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isOwner: user?.id?.startsWith('owner') || false,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}