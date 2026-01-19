'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Product = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  sizes: string[];
  stock: number;
  sku: string;
  delivery: string;
  ageGroups?: string[];
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  updateStock: (id: number, newStock: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Initial Mock Data (Merged from ProductList and Admin Mocks)
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Banarasi Butta Saree", category: "silk-sarees", subcategory: "women", price: 499, image: "/Products/Banarasi Butta Saree.png", sizes: ["Free Size"], stock: 15, sku: 'SKU-001', delivery: "Standard: 7-10 days" },
  { id: 2, name: "Kaithari Mundu", category: "traditional", subcategory: "women", price: 299, image: "/Products/Kaithari Mundu.png", sizes: ["Free Size"], stock: 25, sku: 'SKU-002', delivery: "Standard: 5-7 days" },
  { id: 3, name: "Checked Shirt", category: "mens", subcategory: "mens", price: 899, image: "/Products/Checked Shirt.png", sizes: ["S", "M", "L"], stock: 10, sku: 'SKU-003', delivery: "Standard: 5-7 days" },
  { id: 4, name: "Kids Frock", category: "kids", subcategory: "kids", price: 650, image: "/Products/Kids Frock.png", sizes: ["S", "M", "L"], stock: 5, sku: 'SKU-004', delivery: "Standard: 5-7 days" },
  // ... more initial data can be added here if needed to match the full list
];

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>('advakkad_products', INITIAL_PRODUCTS);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Date.now(); // Simple ID generation
    setProducts([...products, { ...newProduct, id }]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateStock = (id: number, newStock: number) => {
    setProducts(products.map(p => (p.id === id ? { ...p, stock: newStock } : p)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
