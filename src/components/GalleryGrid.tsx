'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Gallery data
const galleryImages = [
  { src: '/Gallery/Fabric_Collections.png', title: 'Fabric Collections', description: 'Extensive Range of Sarees', category: 'store', type: 'normal' },
  { src: '/Gallery/Store_Interior.png', title: 'Store Interior', description: 'Premium Shopping Experience', category: 'store', type: 'normal' },
  { src: '/Gallery/Store_View.png', title: 'Store View', description: 'Wide Collection Display', category: 'store', type: 'tall' },
  { src: '/Gallery/Shopping_Area.png', title: 'Shopping Area', description: 'Comfortable Browsing Space', category: 'store', type: 'normal' },
  { src: '/Gallery/Saree_Collection.png', title: 'Saree Collection', description: 'Traditional & Designer', category: 'collections', type: 'normal' },
  { src: '/Gallery/Traditional_Wear.png', title: 'Traditional Wear', description: 'Kerala Kasavu Saree', category: 'wedding', type: 'tall' },
  { src: '/Gallery/Wedding_Collection.png', title: 'Wedding Collection', description: 'Bridal Special', category: 'wedding', type: 'wide' },
  { src: '/Gallery/Festival_Special.png', title: 'Festival Special', description: 'Vibrant Colors', category: 'collections', type: 'normal' },
  { src: '/Gallery/Traditional_Elegance.png', title: 'Traditional Elegance', description: 'Bridal Collection', category: 'wedding', type: 'normal' }
];

export default function GalleryGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const changeImage = (direction: number) => {
    let newIndex = currentIndex + direction;
    if (newIndex >= galleryImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    setCurrentIndex(newIndex);
  };

  // Handle body scroll locking
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      
      // We accept that changeImage is closed over current state here
      // Alternatively we could use functional state updates, but this logic is simple enough
      if (e.key === 'ArrowLeft') {
         setCurrentIndex(prev => {
            const newIndex = prev - 1;
            return newIndex < 0 ? galleryImages.length - 1 : newIndex;
         });
      }
      if (e.key === 'ArrowRight') {
         setCurrentIndex(prev => {
            const newIndex = prev + 1;
            return newIndex >= galleryImages.length ? 0 : newIndex;
         });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Our Gallery</h2>
        <p className="section-subtitle">
          Explore our stunning collection and beautiful store
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-masonry">
        {galleryImages.map((item, index) => (
          <div 
            key={index} 
            className={`gallery-item ${item.type !== 'normal' ? item.type : ''}`} 
            onClick={() => openLightbox(index)}
          >
            <div className="gallery-image">
              {/* Using Fill + Object Fit Cover relative to parent */}
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: item.type === 'tall' ? '600px' : '300px' }}>
                 <Image 
                   src={item.src} 
                   alt={item.title} 
                   fill 
                   style={{ objectFit: 'cover' }}
                 />
              </div>
              <div className="image-overlay">
                <div className="overlay-text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div id="lightboxModal" className="lightbox-modal" style={{ display: 'flex' }} onClick={closeLightbox}>
          <span className="lightbox-close">&times;</span>
          <span className="lightbox-prev" onClick={(e) => { e.stopPropagation(); changeImage(-1); }}>&#10094;</span>
          <span className="lightbox-next" onClick={(e) => { e.stopPropagation(); changeImage(1); }}>&#10095;</span>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image">
              <div style={{ position: 'relative', width: '90vw', height: '80vh' }}>
                <Image 
                  src={galleryImages[currentIndex].src} 
                  alt={galleryImages[currentIndex].title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="lightbox-caption" style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>
              <strong>{galleryImages[currentIndex].title}</strong><br/>
              {galleryImages[currentIndex].description}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
