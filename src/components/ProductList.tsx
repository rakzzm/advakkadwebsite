'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Product Data
const products = [
  // Kids Wear
  {
    id: 1,
    name: "Banarasi Butta Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 499,
    image: "/Products/Banarasi Butta Saree.png",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 2,
    name: "Kaithari Mundu",
    category: "traditional",
    subcategory: "women",
    price: 299,
    image: "/Products/Kaithari Mundu.png",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 3,
    name: "Foil Print Vichitra Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 899,
    image: "/Products/Foil Print Vichitra Silk Saree.png",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 4,
    name: "Girls School Uniform",
    category: "school",
    subcategory: "kids",
    price: 849,
    image: "/Products/Girls School Uniform.jpeg",
    sizes: ["S", "M", "L", "XL"],
    ageGroups: ["5-8 years", "8-12 years", "12-15 years"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Women Wear
  {
    id: 5,
    name: "Cotton Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 799,
    image: "/Products/Cotton Silk Saree.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 6,
    name: "Designer Churidar Set",
    category: "women",
    subcategory: "women",
    price: 749,
    image: "/Products/Designer Churidar Set.jpeg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 7,
    name: "Churidhar Custom",
    category: "women",
    subcategory: "women",
    price: 599,
    image: "/Products/Churidhar Custom.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 8,
    name: "Mandarin & Banarasi Collars",
    category: "women",
    subcategory: "women",
    price: 649,
    image: "/Products/Mandarin_Banarasi_Collars.png",
    sizes: ["S", "M", "L", "XL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Men's Wear
  {
    id: 9,
    name: "Monochromatic Colors",
    category: "women", // Note: Legacy data had this category, check if it should be mens
    subcategory: "women",
    price: 549,
    image: "/Products/Monochromatic Colors.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 10,
    name: "Organza Dupattas",
    category: "women",
    subcategory: "women",
    price: 499,
    image: "/Products/Organza Dupattas.png",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 11,
    name: "Pure Linen & Handloom Cotton",
    category: "women",
    subcategory: "women",
    price: 699,
    image: "/Products/Pure Linen & Handloom Cotton.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 12,
    name: "Traditional Mundu Set",
    category: "traditional",
    subcategory: "mens",
    price: 599,
    image: "/Products/Traditional Mundu Set.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Traditional Wear
  {
    id: 13,
    name: "Kasavu Saree",
    category: "traditional",
    subcategory: "traditional",
    price: 899,
    image: "/Products/Kasavu Saree.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 14,
    name: "Traditional Pavada Set",
    category: "traditional",
    subcategory: "kids",
    price: 449,
    image: "/Products/Traditional Pavada Set.jpeg",
    sizes: ["S", "M", "L"],
    ageGroups: ["2-5 years", "5-8 years", "8-12 years"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 15,
    name: "Kerala Set Mundu",
    category: "traditional",
    subcategory: "mens",
    price: 699,
    image: "/Products/Kerala Set Mundu.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Silk Sarees
  {
    id: 16,
    name: "Kanchipuram Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 899,
    image: "/Products/Kanchipuram Silk Saree.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 17,
    name: "Mysore Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 849,
    image: "/Products/Mysore Silk Saree.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 18,
    name: "Banarasi Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 899,
    image: "/Products/Banarasi Silk Saree.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },

  // Wedding Collection
  {
    id: 19,
    name: "Bridal Silk Saree",
    category: "wedding",
    subcategory: "women",
    price: 899,
    image: "/Products/Bridal Silk Saree.jpeg",
    sizes: ["Free Size"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  },
  {
    id: 20,
    name: "Groom Sherwani",
    category: "wedding",
    subcategory: "mens",
    price: 899,
    image: "/Products/Groom Sherwani.jpeg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  },
  {
    id: 21,
    name: "Reception Lehenga",
    category: "wedding",
    subcategory: "women",
    price: 899,
    image: "/Products/Reception Lehenga.jpeg",
    sizes: ["S", "M", "L", "XL"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  },
  {
    id: 22,
    name: "Wedding Kurta Set",
    category: "wedding",
    subcategory: "mens",
    price: 799,
    image: "/Products/Wedding Kurta Set.jpeg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  }
];

export default function ProductList() {
  const router = useRouter();
  const { addToCart: addToCartContext } = useCart();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [selectedAges, setSelectedAges] = useState<{ [key: number]: string }>({});

  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAgeChange = (productId: number, age: string) => {
    setSelectedAges(prev => ({ ...prev, [productId]: age }));
  };

  const buyNow = (product: typeof products[0]) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const age = selectedAges[product.id] || (product.ageGroups ? product.ageGroups[0] : null);
    
    addToCartContext({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      age: age ? age : undefined
    });
    router.push('/checkout');
  };

  const addToCartInternal = (product: typeof products[0]) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const age = selectedAges[product.id] || (product.ageGroups ? product.ageGroups[0] : null);
    
    addToCartContext({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      age: age ? age : undefined
    });
  };

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Shop Our Collections</h2>
        <p className="section-subtitle">
          Browse our curated selection of quality clothing for every occasion
        </p>
      </div>

      <div className="filter-bar">
        <div className="filter-container">
          <div className="filter-group">
            <label htmlFor="categoryFilter">Category:</label>
            <select 
              id="categoryFilter" 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="kids">Kids Wear</option>
              <option value="women">Women Wear</option>
              <option value="mens">Men's Wear</option>
              <option value="traditional">Traditional Wear</option>
              <option value="silk-sarees">Silk Sarees</option>
              <option value="wedding">Wedding Collection</option>
              <option value="school">School Collection</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="searchInput">Search:</label>
            <input 
              type="text" 
              id="searchInput" 
              className="filter-input" 
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="products-grid" id="productsGrid" style={{ display: filteredProducts.length ? 'grid' : 'none' }}>
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card" data-category={product.category}>
            <div className="product-image-placeholder">
              {(product.image.startsWith('/')) ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
              ) : (
                <span className="product-icon" style={{ fontSize: '4rem' }}>{product.image}</span>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
              
              <div className="product-details">
                <div className="detail-group">
                  <label htmlFor={`size-${product.id}`}>Size:</label>
                  <select 
                    id={`size-${product.id}`} 
                    className="product-select"
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  >
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                {product.ageGroups && (
                  <div className="detail-group">
                    <label htmlFor={`age-${product.id}`}>Age:</label>
                    <select 
                      id={`age-${product.id}`} 
                      className="product-select"
                      onChange={(e) => handleAgeChange(product.id, e.target.value)}
                    >
                      {product.ageGroups.map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="detail-group">
                  <label>Delivery:</label>
                  <p className="delivery-info">{product.delivery}</p>
                </div>
              </div>
              
              <div className="product-actions">
                <button className="btn btn-buy-now" onClick={() => buyNow(product)}>Buy Now</button>
                <button className="btn btn-add-cart" onClick={() => addToCartInternal(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!filteredProducts.length && (
        <div id="noResults" className="no-results" style={{ display: 'block' }}>
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </>
  );
}
