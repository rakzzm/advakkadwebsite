'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BrandMarquee from '@/components/BrandMarquee';
import Testimonials from '@/components/Testimonials';
import TypewriterText from '@/components/TypewriterText';

const HERO_IMAGES = [
  "/HeroSectionhome/Hero_Banner.png",
  "/HeroSectionhome/Hero_Corridor.png", 
  "/HeroSectionhome/Hero_Sofa.png",
  "/HeroSectionhome/Hero_Steps.jpg",
  "/HeroSectionhome/Hero_Mirrored.png"
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
      <main>
        {/* Banner Section */}
        <section id="banner" className="hero">
          {/* Background Slides */}
          <div className="hero-content">
            {HERO_IMAGES.map((src, index) => (
              <div 
                key={src} 
                className={`hero-slide ${index === currentHeroIndex ? 'active' : ''}`}
                style={{ opacity: index === currentHeroIndex ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt={`Adavakkad Collection ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  style={{ objectPosition: 'top' }}
                  unoptimized
                />
              </div>
            ))}
            <div className="hero-overlay"></div>
            
            {/* Foreground Content */}
            <div className="hero-text-container">
              {/* Buttons removed as per request */}
            </div>
          </div>
        </section>


      {/* About Section */}
      <section id="about-collection">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Since 2006</h2>
            <h2 className="section-title">Welcome to Adavakkad Collections</h2>
            <h3 style={{ 
              fontSize: '1.5rem', 
              color: '#f59e0b', 
              marginTop: '0.5rem', 
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Thrikkadeeri
            </h3>
          </div>

          {/* Trust Badges - Restored SVGs */}
          <div className="trust-badges" style={{ marginTop: '1.5rem', marginBottom: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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

          {/* National Presence Content - Moved Here */}
          <div style={{ marginTop: '0rem', marginBottom: '3rem' }}>
            <div className="mb-4">
              <p className="text-accent" style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem' }}>NATIONAL PRESENCE</p>
              <h2 className="section-title" style={{textAlign: 'left'}}>From Kerala to All of India</h2>
              <p style={{ margin: '0 0 2rem 0' }}>
                The love and loyalty of our Kerala customers have been the heartbeat of our success. Inspired by this support, we have expanded our horizons. Today, we are proud to announce that Adavakkad Collection now delivers nationwide. Whether you are in Kochi, Delhi, Mumbai, or beyond, our signature collections are now just a click away.
              </p>
            </div>
            
            <div className="grid grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="card" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '3rem', margin: 0, color: '#f59e0b' }}>19</h3>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em' }}>YEARS OF TRUST<br/><span style={{fontSize: '0.8rem', fontWeight: 400}}>Serving our community</span></p>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ color: '#f59e0b', fontSize: '2.5rem' }}>❤️</div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>Customer Centric</h4>
                  <p style={{ margin: 0 }}>Your satisfaction is our top priority.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Story / Mission / Vision - Moved Here, now inside page.tsx structure properly */}
          <div className="card mb-5" style={{ marginBottom: '2rem' }}>
            <TypewriterText text="Our Story" as="h3" className="mb-2" />
            <p>
              Adavakkad Collections has been a cornerstone of the local fashion community, bringing quality clothing and exceptional service to our 
              valued customers. We pride ourselves on offering a diverse range of apparel that caters to every member of the family.
            </p>
            <p>
              From traditional wear to contemporary fashion, our carefully curated 
              collections reflect our commitment to quality, style, and affordability. 
              We believe that everyone deserves to look and feel their best, and our 
              extensive selection ensures that you&apos;ll find the perfect outfit for any occasion.
            </p>
          </div>

          {/* Why Choose Us - Moved Here */}
          <div style={{ marginTop: '2rem' }}>
            <div className="card">
              <div className="text-center">
                 <TypewriterText text="Why Choose Adavakkad Collections?" as="h3" />
              </div>
  
            <div className="grid grid-2 mt-4">
              <div>
                <TypewriterText text="Our Mission" as="h4" className="text-primary mb-2" />
                <p>
                  To provide high-quality, fashionable clothing at affordable prices while maintaining 
                  strong relationships with our customers through trust and excellent service.
                </p>
              </div>
              <div>
                <TypewriterText text="Vision" as="h4" className="text-secondary mb-2" />
                <p>
                  To be the preferred family shopping destination in Kerala, known for our 
                  wide selection, quality assurance, and community values.
                </p>
              </div>
            </div>
              <div className="grid grid-3 mt-2">
                <div>
                  <h4 className="text-gradient">✓ Quality Assured</h4>
                  <p>
                    Every piece in our collection is carefully selected to ensure 
                    the highest quality fabrics and craftsmanship.
                  </p>
                </div>
                <div>
                  <h4 className="text-gradient">✓ Wide Selection</h4>
                  <p>
                    From men&apos;s and women&apos;s wear to kids&apos; clothing and festive 
                    collections, we have something for everyone.
                  </p>
                </div>
                <div>
                  <h4 className="text-gradient">✓ Customer First</h4>
                  <p>
                    Your satisfaction is our priority. We provide personalized 
                    service and expert styling advice.
                  </p>
                </div>
                <div>
                  <h4 className="text-gradient">✓ Affordable Pricing</h4>
                  <p>
                    Quality fashion shouldn&apos;t break the bank. We offer competitive 
                    prices on all our collections.
                  </p>
                </div>
                <div>
                  <h4 className="text-gradient">✓ Traditional & Modern</h4>
                  <p>
                    Perfect blend of traditional ethnic wear and contemporary fashion 
                    to suit every occasion.
                  </p>
                </div>
                <div>
                  <h4 className="text-gradient">✓ Trusted Service</h4>
                  <p>
                    Years of experience serving our community with integrity, 
                    honesty, and dedication.
                  </p>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </section>

      {/* Collection Section */}


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
              { title: "Traditional Wear", img: "/Homepage/Traditional_Wear_New.jpg", color: "#f59e0b", desc: "Elegant sarees, dhotis, and ethnic sets." },
              { title: "Casual Wear", img: "/Homepage/Casual_Wear_New.png", color: "#3b82f6", desc: "Comfortable and trendy everyday outfits." },
              { title: "Formal Attire", img: "/Homepage/Formal_Attire_New.png", color: "#1e293b", desc: "Sharp, simple styles." },
              { title: "Festive Specials", img: "/Homepage/Festive_Specials_New.png", color: "#ef4444", desc: "Exclusive designs for celebrations." },
              { title: "Kids Wear", img: "/Homepage/Kids_Wear_New.jpg", color: "#10b981", desc: "Playful clothing for little ones." },
              { title: "Women Wear", img: "/Homepage/Women_Wear_New.png", color: "#ec4899", desc: "Elegant and stylish apparel." },
              { title: "Mundu Collection", img: "/Homepage/Mundu_Collection.png", color: "#f59e0b", desc: "Traditional Kerala wear for men." },
              { title: "Mens Wear", img: "/Homepage/Mens_Wear.jpg", color: "#1e293b", desc: "Stylish and contemporary men's fashion." },
            ].map((item, index) => (
              <div key={index} className="card fade-in collection-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="collection-image" style={{ height: '300px', position: 'relative' }}>
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
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





      {/* Testimonials Section */}
      <Testimonials />

      {/* Brand Marquee Section */}
      <BrandMarquee />
    </main>
  );
}
