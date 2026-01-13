'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          {/* Logo path relative to public/ folder */}
          <Image 
            src="/logo/logo.jpg" 
            alt="Advakkad Logo" 
            width={120} 
            height={70} 
            priority
            style={{ width: 'auto', height: '70px' }}
          />
        </Link>

        {/* Mobile Toggle */}
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

        {/* Menu Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
          <li><Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          {/* Note: In a real app these might be hashes on home page or separate pages. 
              Assuming separate pages for now based on file structure. */}
          <li><Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          <li><Link href="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
          <li><Link href="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
          <li><Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          <li><Link href="/offers" className="nav-link offers-btn" onClick={() => setIsMenuOpen(false)}>Offers</Link></li>
          <li><Link href="/login" className="nav-link signin-btn" onClick={() => setIsMenuOpen(false)}>Sign In / Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
}
