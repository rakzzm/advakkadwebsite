'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Invoice = {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  fileUrl?: string; // Mock URL for the uploaded file
};

type InvoiceContextType = {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, data: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const INITIAL_INVOICES: Invoice[] = [
  { id: 'INV-2024-001', orderId: '#ORD-7821', customer: 'Rahul Krishna', amount: 2499, date: '2026-01-12', status: 'Paid' },
  { id: 'INV-2024-002', orderId: '#ORD-7820', customer: 'Sarah Jones', amount: 1299, date: '2026-01-11', status: 'Paid' },
  { id: 'INV-2024-003', orderId: '#ORD-7819', customer: 'Mohammed Ali', amount: 5999, date: '2026-01-10', status: 'Pending' },
];

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('advakkad_invoices', INITIAL_INVOICES);

  const addInvoice = (data: Omit<Invoice, 'id'>) => {
    const newId = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    setInvoices([{ ...data, id: newId }, ...invoices]);
  };

  const updateInvoice = (id: string, data: Partial<Invoice>) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, ...data } : inv));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}
