'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

// Define User Type
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
};

// Define Context Type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser, isInitialized] = useLocalStorage<User | null>('advakkad_user', null);
  const isLoading = !isInitialized;
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
    
    // Redirect based on role
    if (userData.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/account');
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
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
