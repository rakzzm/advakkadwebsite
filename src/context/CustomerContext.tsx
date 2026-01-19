'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: number;
  spent: number;
  status: 'Active' | 'Inactive';
  joinDate: string;
  segments: string[];
};

export type Segment = {
  id: number;
  name: string;
  criteria: string;
};

type CustomerContextType = {
  customers: Customer[];
  segments: Segment[];
  addCustomer: (customer: Omit<Customer, 'id' | 'orders' | 'spent' | 'joinDate' | 'status'>) => void;
  updateCustomer: (id: number, data: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;
  addSegment: (segment: Omit<Segment, 'id'>) => void;
  deleteSegment: (id: number) => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 1, name: 'Rahul Krishna', email: 'rahul@example.com', phone: '9876543210', address: 'Kochi, Kerala', orders: 12, spent: 45000, status: 'Active', joinDate: '2025-01-10', segments: ['VIP', 'Repeat Buyer'] },
  { id: 2, name: 'Sarah Jones', email: 'sarah@example.com', phone: '8765432109', address: 'London, UK', orders: 5, spent: 12500, status: 'Active', joinDate: '2025-11-05', segments: ['Repeat Buyer'] },
  { id: 3, name: 'Mohammed Ali', email: 'pli@example.com', phone: '7654321098', address: 'Dubai, UAE', orders: 2, spent: 3000, status: 'Inactive', joinDate: '2026-01-01', segments: ['New Signup'] },
  { id: 4, name: 'Priya S.', email: 'priya@example.com', phone: '6543210987', address: 'Bangalore, India', orders: 0, spent: 0, status: 'Active', joinDate: '2026-01-12', segments: ['New Signup', 'At Risk'] },
];

const INITIAL_SEGMENTS: Segment[] = [
  { id: 1, name: 'VIP Customers', criteria: 'Spent > ₹50,000' },
  { id: 2, name: 'Repeat Buyers', criteria: 'Orders > 3' },
  { id: 3, name: 'New Signups', criteria: 'Joined < 30 days' },
  { id: 4, name: 'At Risk', criteria: 'No order in 6 months' },
];

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('advakkad_customers', INITIAL_CUSTOMERS);
  const [segments, setSegments] = useLocalStorage<Segment[]>('advakkad_segments', INITIAL_SEGMENTS);

  const addCustomer = (customerData: Omit<Customer, 'id' | 'orders' | 'spent' | 'joinDate' | 'status'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now(),
      orders: 0,
      spent: 0,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      segments: ['New Signup'],
    };
    setCustomers([newCustomer, ...customers]);
  };

  const updateCustomer = (id: number, data: Partial<Customer>) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const addSegment = (segmentData: Omit<Segment, 'id'>) => {
    setSegments([...segments, { ...segmentData, id: Date.now() }]);
  };

  const deleteSegment = (id: number) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  return (
    <CustomerContext.Provider value={{ customers, segments, addCustomer, updateCustomer, deleteCustomer, addSegment, deleteSegment }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
}
