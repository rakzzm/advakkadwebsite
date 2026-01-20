'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  age?: string;
  color?: string;
  variant?: string; // For bundle variants if any
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number | string, size?: string, age?: string, color?: string) => void;
  updateQuantity: (id: number | string, delta: number, size?: string, age?: string, color?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('advakkad-cart', []);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.size === newItem.size && 
          item.age === newItem.age &&
          item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
    setIsOpen(true);
  }, [setItems]);

  const removeFromCart = useCallback((id: number | string, size?: string, age?: string, color?: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.size === size && item.age === age && item.color === color))
    );
  }, [setItems]);

  const updateQuantity = useCallback((id: number | string, delta: number, size?: string, age?: string, color?: string) => {
    setItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id === id && item.size === size && item.age === age && item.color === color) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({
    items, 
    isOpen, 
    total, 
    cartCount,
    openCart, 
    closeCart, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  }), [items, isOpen, total, cartCount, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart]);

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
