'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  age?: string;
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
  removeFromCart: (id: number | string, size?: string, age?: string) => void;
  updateQuantity: (id: number | string, delta: number, size?: string, age?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('advakkad-cart', []);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.size === newItem.size && 
          item.age === newItem.age
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
  };

  const removeFromCart = (id: number | string, size?: string, age?: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.size === size && item.age === age))
    );
  };

  const updateQuantity = (id: number | string, delta: number, size?: string, age?: string) => {
    setItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id === id && item.size === size && item.age === age) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
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
      }}
    >
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
