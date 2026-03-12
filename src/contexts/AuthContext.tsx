import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bill_express_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for admin
    if (email === 'admin@billexpress.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@billexpress.com',
        phone: '+233 54 675 7801',
        address: 'C22/U/26 Community 22, Tema',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('bill_express_user', JSON.stringify(adminUser));
      return true;
    }
    
    // Check for demo customer
    if (email === 'demo@example.com' && password === 'demo123') {
      const demoUser: User = {
        id: 'user-1',
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '+233 20 123 4567',
        address: 'Accra, Ghana',
        role: 'customer'
      };
      setUser(demoUser);
      localStorage.setItem('bill_express_user', JSON.stringify(demoUser));
      return true;
    }
    
    // For any other email, create a new user (simulated)
    if (email && password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '',
        address: '',
        role: 'customer'
      };
      setUser(newUser);
      localStorage.setItem('bill_express_user', JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bill_express_user');
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        address: '',
        role: 'customer'
      };
      setUser(newUser);
      localStorage.setItem('bill_express_user', JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('bill_express_user', JSON.stringify(updatedUser));
      return true;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      logout,
      register,
      updateProfile
    }}>
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
