'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  // Derive product directly from context
  const product = products.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(''); 
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
       const timer = setTimeout(() => {
         setActiveImage(product.image);
         if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
         if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0].name);
       }, 0);
       return () => clearTimeout(timer);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: activeImage || product.image,
      size: selectedSize,
      color: selectedColor, // Fixed: Added color to cart item if supported by type
      age: undefined
    });
  };

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="container product-detail-container">
      <div className="product-layout">
        {/* Left: Image Gallery */}
        <div className="gallery-section">
          <div className="thumbnails">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumb-item ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <div className="thumb-img-wrapper">
                  <Image src={img} alt={`Thumbnail ${idx}`} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="main-image">
            <div className="main-img-wrapper">
               <span className="zoom-icon material-symbols-outlined">zoom_in</span>
               {activeImage && <Image src={activeImage} alt={product.name} fill style={{ objectFit: 'contain' }} priority />}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

          <div className="size-selector">
            <div className="label-row">
              <span className="label">Size: {selectedSize}</span>
              <a href="#" className="find-size-link">
                <span className="material-symbols-outlined icon">straighten</span> Find Your Size
              </a>
            </div>
            <div className="size-options">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => {
                 const isAvailable = product.sizes.includes(size) || product.sizes.includes('Free Size');
                 const disabled = !isAvailable; 

                 return (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={() => !disabled && setSelectedSize(size)}
                    disabled={disabled}
                  >
                    {size}
                  </button>
                 );
              })}
            </div>
          </div>

          <div className="color-selector">
             <span className="label">Color: {selectedColor || 'N/A'}</span>
             <div className="color-options">
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((col, idx) => (
                    <div 
                      key={idx} 
                      className={`color-swatch ${selectedColor === col.name ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedColor(col.name);
                        if(col.image) setActiveImage(col.image);
                      }}
                    >
                      <div className="swatch-img-wrapper">
                        <Image src={col.image || product.image} alt={col.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="color-swatch selected">
                     <div className="swatch-img-wrapper">
                        <Image src={product.image} alt="Default" fill style={{ objectFit: 'cover' }} />
                     </div>
                  </div>
                )}
             </div>
          </div>

          <div className="promo-banner">
             <span className="material-symbols-outlined">local_offer</span>
             <p>Get Up to 20% Off. Applies at Cart</p>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
            {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          
           <div className="description-text">
             <p>Experience premium quality with our {product.name}. Perfect for any occasion.</p>
             <p>Delivery: {product.delivery}</p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .product-detail-container { margin-top: 140px; padding-bottom: 4rem; }
        .product-layout { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        
        @media (min-width: 992px) {
          .product-layout { grid-template-columns: 1.2fr 1fr; gap: 4rem; }
        }

        /* Gallery */
        .gallery-section { display: flex; gap: 1rem; flex-direction: column-reverse; }
        @media (min-width: 768px) {
           .gallery-section { flex-direction: row; }
        }

        .thumbnails { display: flex; gap: 0.5rem; overflow-x: auto; flex-shrink: 0; }
        @media (min-width: 768px) {
          .thumbnails { flex-direction: column; width: 80px; overflow-y: auto; height: 600px; }
        }

        .thumb-item { width: 70px; height: 90px; border: 1px solid #ddd; cursor: pointer; opacity: 0.7; transition: 0.2s; }
        @media (min-width: 768px) {
          .thumb-item { width: 100%; height: 100px; }
        }
        .thumb-item.active { opacity: 1; border-color: #000; }
        .thumb-img-wrapper { position: relative; width: 100%; height: 100%; }

        .main-image { flex-grow: 1; height: 400px; position: relative; background: #fff; border: 1px solid #f0f0f0; }
        @media (min-width: 768px) {
           .main-image { height: 600px; }
        }
        .main-img-wrapper { position: relative; width: 100%; height: 100%; }
        .zoom-icon { position: absolute; top: 1rem; right: 1rem; background: #fff; padding: 0.5rem; border-radius: 50%; cursor: pointer; z-index: 10; font-size: 1.2rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }

        /* Details */
        .details-section { display: flex; flex-direction: column; }
        .product-title { font-family: var(--font-playfair); font-size: 2rem; margin-bottom: 0.5rem; color: #1a1a1a; }
        .product-price { font-family: var(--font-outfit); font-size: 1.5rem; color: #1a1a1a; margin-bottom: 2rem; }

        /* Size Selector */
        .size-selector { margin-bottom: 2rem; }
        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-family: var(--font-outfit); }
        .label { font-weight: 600; color: #1a1a1a; }
        .find-size-link { display: flex; align-items: center; gap: 0.25rem; font-size: 0.9rem; text-decoration: underline; color: #333; }
        .find-size-link .icon { font-size: 1.2rem; }

        .size-options { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .size-btn { 
          width: 45px; height: 45px; border-radius: 50%; border: 1px solid #ddd; background: #fff; 
          font-family: var(--font-outfit); font-size: 0.9rem; color: #1a1a1a; cursor: pointer; transition: 0.2s;
        }
        .size-btn:hover:not(.disabled) { border-color: #000; }
        .size-btn.selected { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .size-btn.disabled { color: #ccc; border-color: #eee; text-decoration: line-through; cursor: not-allowed; }

        /* Color Selector */
        .color-selector { margin-bottom: 2rem; }
        .color-options { display: flex; gap: 1rem; margin-top: 0.75rem; }
        .color-swatch { width: 60px; height: 80px; border: 1px solid transparent; cursor: pointer; padding: 2px; }
        .color-swatch.selected { border-color: #000; }
        .swatch-img-wrapper { position: relative; width: 100%; height: 100%; background: #eee; }

        /* Promo Banner */
        .promo-banner { 
          background: #eedec5; color: #1a1a1a; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; 
          margin-bottom: 2rem; border-radius: 4px; font-family: var(--font-outfit); font-weight: 500;
        }

        /* Cart Button */
        .add-to-cart-btn {
          width: 100%; background: #000; color: #fff; padding: 1rem; font-family: var(--font-outfit); font-weight: 600;
          letter-spacing: 1px; border: none; cursor: pointer; transition: 0.3s; margin-bottom: 2rem;
        }
        .add-to-cart-btn:hover { background: #333; }
        .add-to-cart-btn:disabled { background: #ccc; cursor: not-allowed; }

        .description-text { font-family: var(--font-outfit); color: #555; line-height: 1.6; }
      `}</style>
    </div>
  );
}
