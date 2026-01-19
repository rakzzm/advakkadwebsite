'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Buyer = {
  id: number;
  name: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  lastActive: string;
  history: string[]; // Mock history logs
};

type BuyerContextType = {
  buyers: Buyer[];
  addBuyer: (buyer: Omit<Buyer, 'id' | 'history'>) => void;
  updateBuyer: (id: number, data: Partial<Buyer>) => void;
  deleteBuyer: (id: number) => void;
  addHistoryLog: (id: number, log: string) => void;
};

const BuyerContext = createContext<BuyerContextType | undefined>(undefined);

const INITIAL_BUYERS: Buyer[] = [
  { id: 1, name: 'Rahul Krishna', location: 'Kerala, India', totalOrders: 12, totalSpent: 45000, lastActive: '2 mins ago', history: ['Viewed "Silk Saree"', 'Purchased Order #101'] },
  { id: 2, name: 'Sarah Jones', location: 'London, UK', totalOrders: 5, totalSpent: 12500, lastActive: '1 hr ago', history: ['Logged in'] },
  { id: 3, name: 'Mohammed Ali', location: 'Dubai, UAE', totalOrders: 8, totalSpent: 3000, lastActive: '1 day ago', history: ['Returned Item #55'] },
  { id: 4, name: 'Priya S.', location: 'Bangalore, India', totalOrders: 3, totalSpent: 8500, lastActive: '3 days ago', history: ['Added "Kids Frock" to cart'] },
];

export function BuyerProvider({ children }: { children: ReactNode }) {
  const [buyers, setBuyers] = useLocalStorage<Buyer[]>('advakkad_buyers', INITIAL_BUYERS);

  const addBuyer = (buyerData: Omit<Buyer, 'id' | 'history'>) => {
    const newBuyer: Buyer = {
      ...buyerData,
      id: Date.now(),
      history: ['Account Created manually by Admin'],
    };
    setBuyers([newBuyer, ...buyers]);
  };

  const updateBuyer = (id: number, data: Partial<Buyer>) => {
    setBuyers(buyers.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const deleteBuyer = (id: number) => {
    setBuyers(buyers.filter(b => b.id !== id));
  };

  const addHistoryLog = (id: number, log: string) => {
    setBuyers(buyers.map(b => 
      b.id === id ? { ...b, history: [log, ...b.history] } : b
    ));
  };

  return (
    <BuyerContext.Provider value={{ buyers, addBuyer, updateBuyer, deleteBuyer, addHistoryLog }}>
      {children}
    </BuyerContext.Provider>
  );
}

export function useBuyers() {
  const context = useContext(BuyerContext);
  if (context === undefined) {
    throw new Error('useBuyers must be used within a BuyerProvider');
  }
  return context;
}
