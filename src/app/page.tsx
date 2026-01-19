'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BrandMarquee from '@/components/BrandMarquee';

const HERO_IMAGES = [
  "/HeroSectionhome/EIDSales.png",
  "/HeroSectionhome/Kidswear.png",
  "/HeroSectionhome/OnamSales.png",
  "/HeroSectionhome/VishuSales.png"
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* Hero Section with Slideshow */}
      <section className="hero" id="home">
        <div className="hero-video-container">
          {HERO_IMAGES.map((src, index) => (
            <div 
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: currentImageIndex === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: 0
              }}
            >
              <Image
                src={src}
                alt="Hero Background"
                fill
                style={{ objectFit: 'fill' }}
                priority={index === 0}
              />
            </div>
          ))}
          <div className="hero-overlay" style={{ zIndex: 1 }}></div>
        </div>
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-buttons">
            <Link href="/products">
              <button className="btn btn-primary">Shop Now</button>
            </Link>
            <Link href="/contact">
              <button className="btn btn-secondary">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about-collection">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Adavakkad Collection</h2>
            <p className="section-subtitle">Crafting Confidence Since 2006</p>
          </div>

          <div className="card">
            <p>
              Welcome to Adavakkad Collection, your premier destination for fashion that blends tradition with contemporary style. Established in 2006, we began our journey with a simple mission: to provide high-quality, stylish clothing that celebrates the diverse tastes of our community.
            </p>
            <p className="mt-2">
              What started as a local passion project in the heart of Kerala has grown into a fashion landmark. For nearly two decades, we have had the privilege of serving millions of satisfied customers across the state, becoming a household name known for trust, quality, and an eye for detail.
            </p>
          </div>
          
          {/* Trust Badges - Restored SVGs */}
          <div className="trust-badges" style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Badge 1 - Happy Customers */}
            <div className="trust-badge-item">
              <div className="trust-icon customers-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#FFE5B4" opacity="0.3"/>
                  <path d="M24 12C19.58 12 16 15.58 16 20C16 22.54 17.29 24.79 19.2 26.2C15.16 27.78 12 31.51 12 36H16C16 31.58 19.58 28 24 28C28.42 28 32 31.58 32 36H36C36 31.51 32.84 27.78 28.8 26.2C30.71 24.79 32 22.54 32 20C32 15.58 28.42 12 24 12ZM24 24C21.79 24 20 22.21 20 20C20 17.79 21.79 16 24 16C26.21 16 28 17.79 28 20C28 22.21 26.21 24 24 24Z" fill="#FF6B35"/>
                </svg>
              </div>
              <div className="trust-content">
                <h3>7 Lakh+</h3>
                <p>Happy Customers</p>
              </div>
            </div>

            {/* Badge 2 - India Wide */}
            <div className="trust-badge-item">
              <div className="trust-icon delivery-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#C7EFCF" opacity="0.3"/>
                  <path d="M32 16H28V14C28 12.9 27.1 12 26 12H14C12.9 12 12 12.9 12 14V30H14C14 32.21 15.79 34 18 34C20.21 34 22 32.21 22 30H26C26 32.21 27.79 34 30 34C32.21 34 34 32.21 34 30H36V24L32 16ZM18 32C16.9 32 16 31.1 16 30C16 28.9 16.9 28 18 28C19.1 28 20 28.9 20 30C20 31.1 19.1 32 18 32ZM32 18.5L34.46 24H28V18.5H32ZM30 32C28.9 32 28 31.1 28 30C28 28.9 28.9 28 30 28C31.1 28 32 28.9 32 30C32 31.1 31.1 32 30 32Z" fill="#00A878"/>
                </svg>
              </div>
              <div className="trust-content">
                <h3>India Wide</h3>
                <p>Delivery Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="our-collection">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Collection</h2>
            <p className="section-subtitle">
              We believe fashion is a form of self-expression.
            </p>
          </div>

          <div className="grid grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {/* Collection Items */}
            {[
              { title: "Traditional Wear", img: "/Homepage/Traditional Wear.png", color: "#f59e0b", desc: "Elegant sarees, dhotis, and ethnic sets." },
              { title: "Casual Wear", img: "/Homepage/Casual Wear.png", color: "#3b82f6", desc: "Comfortable and trendy everyday outfits." },
              { title: "Formal Attire", img: "/Homepage/Office Attire.png", color: "#1e293b", desc: "Sharp, simple styles." },
              { title: "Festive Specials", img: "/Homepage/Wedding Dress.png", color: "#ef4444", desc: "Exclusive designs for celebrations." },
              { title: "Kids Wear", img: "/Homepage/kidswear.png", color: "#10b981", desc: "Playful clothing for little ones." },
              { title: "Women Wear", img: "/Homepage/womanwear.png", color: "#ec4899", desc: "Elegant and stylish apparel." },
            ].map((item, index) => (
              <div key={index} className="card fade-in collection-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="collection-image" style={{ height: '300px', position: 'relative' }}>
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="collection-content" style={{ padding: '1.5rem', borderLeft: `4px solid ${item.color}` }}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Presence Section - RESTORED */}
      <section id="national-presence">
        <div className="container">
          <div className="grid grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div>
              <p className="text-accent" style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem' }}>NATIONAL PRESENCE</p>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>From Kerala to All of India</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                The love and loyalty of our Kerala customers have been the heartbeat of our success. Inspired by this support, we have expanded our horizons. Today, we are proud to announce that Adavakkad Collection now delivers nationwide. Whether you are in Kochi, Delhi, Mumbai, or beyond, our signature collections are now just a click away.
              </p>
              <div className="card" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b', maxWidth: '200px', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '3rem', margin: 0, color: '#f59e0b' }}>19</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>YEARS OF TRUST</p>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#f59e0b', fontSize: '1.5rem' }}>❤️</div>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Customer Centric</h4>
                    <p style={{ margin: 0 }}>Your satisfaction is, and always will be, our top priority.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Why Choose Us?</h2>
              <div className="mt-2">
                <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1.5rem' }}>⭐</div>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>Legacy of Trust</h4>
                      <p style={{ margin: 0 }}>19 years of expertise in the textile industry.</p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1.5rem' }}>✨</div>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>Quality First</h4>
                      <p style={{ margin: 0 }}>Every fabric is handpicked to ensure durability and comfort.</p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1.5rem' }}>💎</div>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>Affordable Luxury</h4>
                      <p style={{ margin: 0 }}>We believe great style shouldn&apos;t come with a heavy price tag.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee Section */}
      <BrandMarquee />
    </main>
  );
}
