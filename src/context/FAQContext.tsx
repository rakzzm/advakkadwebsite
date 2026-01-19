'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
};

type FAQContextType = {
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, data: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
};

const FAQContext = createContext<FAQContextType | undefined>(undefined);

const INITIAL_FAQS: FAQ[] = [
  { 
    id: 'faq_1', 
    question: 'What is your return policy?', 
    answer: 'We accept returns within 7 days of delivery for unused items with original tags. Refunds are processed within 5-7 business days.', 
    category: 'Orders', 
    published: true 
  },
  { 
    id: 'faq_2', 
    question: 'Do you offer international shipping?', 
    answer: 'Yes, we ship worldwide! Shipping costs and delivery times vary by location. Standard delivery takes 7-14 days for international orders.', 
    category: 'Shipping', 
    published: true 
  },
  { 
    id: 'faq_3', 
    question: 'How do I track my order?', 
    answer: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also track it from your "My Orders" page.', 
    category: 'Orders', 
    published: true 
  }
];

export function FAQProvider({ children }: { children: ReactNode }) {
  const [faqs, setFaqs] = useLocalStorage<FAQ[]>('advakkad_faqs', INITIAL_FAQS);

  const addFAQ = (data: Omit<FAQ, 'id'>) => {
    const newFAQ = { ...data, id: `faq_${Date.now()}` };
    setFaqs([newFAQ, ...faqs]);
  };

  const updateFAQ = (id: string, data: Partial<FAQ>) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, ...data } : faq));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <FAQContext.Provider value={{ faqs, addFAQ, updateFAQ, deleteFAQ }}>
      {children}
    </FAQContext.Provider>
  );
}

export function useFAQ() {
  const context = useContext(FAQContext);
  if (context === undefined) {
    throw new Error('useFAQ must be used within a FAQProvider');
  }
  return context;
}
