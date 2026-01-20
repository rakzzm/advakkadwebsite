'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCart, cartCount } = useCart();

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          {/* Logo path relative to public/ folder */}
          <Image 
            src="/logo/logo.jpg" 
            alt="Adavakkad Logo"  
            width={120} 
            height={70} 
            priority
            style={{ width: 'auto', height: '70px' }}
          />
        </Link>

        {/* Mobile Actions (Cart + Toggle) */}
        <div className="mobile-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={openCart} className="cart-btn-mobile" style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            id="menuToggle" 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Menu Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
          <li><Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link></li>

          <li><Link href="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
          <li><Link href="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
          <li><Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          <li className="desktop-cart">
             <button onClick={openCart} className="nav-link cart-btn">
               <span className="material-symbols-outlined">shopping_bag</span>
               {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
             </button>
          </li>
          <li><Link href="/offers" className="nav-link offers-btn" onClick={() => setIsMenuOpen(false)}>Offers</Link></li>
          <li><Link href="/login" className="nav-link signin-btn" onClick={() => setIsMenuOpen(false)}>Sign In / Sign Up</Link></li>
        </ul>
      </div>

      <style jsx>{`
        .cart-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          padding: 0.5rem;
        }

        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #d32f2f;
          color: white;
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: bold;
        }

        .cart-btn-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .cart-btn-mobile {
            display: flex;
          }
          .desktop-cart {
            display: none;
          }
          .mobile-actions {
             margin-left: auto;
          }
           /* Hide default toggle positioning if we move it to flex */
          .menu-toggle {
             display: flex; /* Restore flex for hamburger lines */
          }
        }
      `}</style>
    </nav>
  );
}
