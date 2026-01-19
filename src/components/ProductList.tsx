'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useProducts, Product } from '@/context/ProductContext';

export default function ProductList() {
  const router = useRouter();
  const { addToCart: addToCartContext } = useCart();
  const { products } = useProducts(); // Use Context Data
  
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

  const buyNow = (product: Product) => {
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

  const addToCartInternal = (product: Product) => {
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
              <option value="mens">Men&apos;s Wear</option>
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
              {(product.image.startsWith('/') || product.image.startsWith('data:')) ? (
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
                <button className="btn btn-buy-now" onClick={() => buyNow(product)} disabled={product.stock === 0}>
                   {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
                </button>
                <button className="btn btn-add-cart" onClick={() => addToCartInternal(product)} disabled={product.stock === 0}>
                   <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!filteredProducts.length && (
        <div id="noResults" className="no-results" style={{ display: 'block' }}>
          <p>No products found in this category. We&apos;re updating our stock!</p>
        </div>
      )}
    </>
  );
}
