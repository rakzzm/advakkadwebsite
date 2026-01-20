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
  images?: string[]; // Additional images for gallery
  sizes: string[];
  colors?: { name: string; image: string }[]; // Color variants
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
  { 
    id: 1, 
    name: "Banarasi Butta Saree", 
    category: "silk-sarees", 
    subcategory: "women", 
    price: 499, 
    image: "/Products/Banarasi_Butta_Saree_New.jpg", 
    images: ["/Products/Banarasi_Butta_Saree_New.jpg", "/Products/Banarasi_Butta_Saree_New.jpg", "/Products/Banarasi_Butta_Saree_New.jpg", "/Products/Banarasi_Butta_Saree_New.jpg"],
    sizes: ["Free Size"], 
    colors: [{ name: "Red", image: "/Products/Banarasi_Butta_Saree_New.jpg" }, { name: "Green", image: "/Products/Banarasi_Butta_Saree_New.jpg" }],
    stock: 15, 
    sku: 'SKU-001', 
    delivery: "Standard: 7-10 days" 
  },
  { 
    id: 2, 
    name: "Kaithari Mundu", 
    category: "traditional", 
    subcategory: "women", 
    price: 299, 
    image: "/Products/Kaithari_Mundu_New.png", 
    images: ["/Products/Kaithari_Mundu_New.png"],
    sizes: ["Free Size"], 
    stock: 25, 
    sku: 'SKU-002', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 3, 
    name: "Checked Shirt", 
    category: "mens", 
    subcategory: "mens", 
    price: 399, 
    image: "/Products/Checked_Shirt_Updated.png", 
    images: ["/Products/Checked_Shirt_Updated.png"],
    sizes: ["S", "M", "L"], 
    stock: 10, 
    sku: 'SKU-003', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 4, 
    name: "Kids Frock", 
    category: "kids", 
    subcategory: "kids", 
    price: 650, 
    image: "/Products/Kids_Frock_Updated.png", 
    images: ["/Products/Kids_Frock_Updated.png"],
    sizes: ["S", "M", "L"], 
    stock: 5, 
    sku: 'SKU-004', 
    delivery: "Standard: 5-7 days" 
  },
  // ... more initial data can be added here if needed to match the full list
  { 
    id: 5, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 399, 
    image: "/Products/Product_1.png", 
    images: ["/Products/Product_1.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-005', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 6, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 499, 
    image: "/Products/Product_2.png", 
    images: ["/Products/Product_2.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-006', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 7, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 599, 
    image: "/Products/Product_3.png", 
    images: ["/Products/Product_3.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-007', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 8, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 349, 
    image: "/Products/Product_4.png", 
    images: ["/Products/Product_4.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-008', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 9, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 449, 
    image: "/Products/Product_5.png", 
    images: ["/Products/Product_5.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-009', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 10, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 649, 
    image: "/Products/Product_6.png", 
    images: ["/Products/Product_6.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-010', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 11, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 499, 
    image: "/Products/Product_7.png", 
    images: ["/Products/Product_7.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-011', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 12, 
    name: "Salwar Kameez Set", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 599, 
    image: "/Products/Product_8.png", 
    images: ["/Products/Product_8.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-012', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 13, 
    name: "New Arrival 9", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 699, 
    image: "/Products/Product_9.png", 
    images: ["/Products/Product_9.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-013', 
    delivery: "Standard: 5-7 days" 
  },
  { 
    id: 14, 
    name: "Dupatta", 
    category: "collections", 
    subcategory: "new-arrivals", 
    price: 299, 
    image: "/Products/Product_10.png", 
    images: ["/Products/Product_10.png"],
    sizes: ["S", "M", "L", "XL"], 
    stock: 10, 
    sku: 'SKU-014', 
    delivery: "Standard: 5-7 days" 
  },
];

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>('advakkad_products_v6', INITIAL_PRODUCTS);

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
