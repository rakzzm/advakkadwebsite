'use client';

import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Arjun Ramesh",
    place: "Palakkad",
    image: "/avatars/avatar-1.png", // Fallback or placeholder if not exists, will handle with color avatar if missing
    rating: 5,
    text: "The quality of the traditional wear is outstanding. I bought a set for Onam and it was perfect! Highly recommended for anyone looking for authentic Kerala wear."
  },
  {
    id: 2,
    name: "Sneha Menon",
    place: "Kochi",
    image: "/avatars/avatar-2.png",
    rating: 5,
    text: "Adavakkad Collections never disappoints. The fabric is so comfortable and breathable. The delivery was also very quick to Kochi. Will shop again!"
  },
  {
    id: 3,
    name: "Rahul Krishnan",
    place: "Bangalore",
    rating: 4,
    text: "Great collection of casual shirts. The fit is perfect and the prices are very reasonable compared to big brands. Good value for money."
  },
  {
    id: 4,
    name: "Fatima Bi",
    place: "Thrikkadeeri",
    rating: 5,
    text: "I have been a customer for 10 years. Their customer service is unmatched. They always help me choose the best matching outfits for my family."
  },
  {
    id: 5,
    name: "Vivek Nair",
    place: "Dubai",
    rating: 5,
    text: "Ordered online for my parents in Kerala. They loved the surprise! The packaging was good and the clothes were exactly as shown in the pictures."
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350; // Approx card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Check if we are at the end (with a small buffer)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll right
          scroll('right');
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="testimonials" style={{ padding: '4rem 0', background: '#f9fafb' }}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real stories from our happy customers.</p>
        </div>

        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-1rem',
              zIndex: 10,
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              color: '#374151'
            }}
            aria-label="Scroll left"
          >
            &#8592;
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '2rem',
              padding: '1rem 0.5rem',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none',  // IE/Edge
              width: '100%', // Ensure it takes full width to force overflow
              scrollBehavior: 'smooth'
            }}
            className="testimonial-scroll-container"
          >
            {/* Hide scrollbar for Chrome/Safari via style tag in component if needed, or inline style check */}
            <style jsx>{`
              .testimonial-scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className="card" 
                style={{ 
                  minWidth: '320px', 
                  maxWidth: '320px', 
                  flex: '0 0 auto', 
                  scrollSnapAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#f59e0b' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ opacity: i < item.rating ? 1 : 0.3 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: '#4b5563', lineHeight: '1.6' }}>
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div 
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #FF6B35 0%, #f59e0b 100%)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#111827' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.place}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-1rem',
              zIndex: 10,
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              color: '#374151'
            }}
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
