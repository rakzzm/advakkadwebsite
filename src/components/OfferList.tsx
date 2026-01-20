'use client';

import { useCart } from '@/context/CartContext';

const offers = [
  {
    id: 1,
    title: "Mega Family Festival Bundle",
    description: "Complete festival outfit set for a family.",
    originalPrice: 3999,
    offerPrice: 2999,
    discount: "25% OFF",
    items: [
      "1x Men's Mundu Set",
      "1x Art Silk Saree",
      "2x Kids Outfit"
    ],
    category: "family",
    image: "/products/placeholder.png"
  },
  {
    id: 2,
    title: "Premium Saree Trio",
    description: "Elegant collection of 3 distinctive sarees.",
    originalPrice: 3499,
    offerPrice: 2499,
    discount: "28% OFF",
    items: [
      "1x Banarasi Print",
      "1x Daily Wear",
      "1x Cotton Silk"
    ],
    category: "saree",
    image: "/products/placeholder.png"
  },
  {
    id: 3,
    title: "Authentic Mundu Pack",
    description: "Essential Kerala traditional wear for men.",
    originalPrice: 1999,
    offerPrice: 1499,
    discount: "25% OFF",
    items: [
      "2x Double Mundu",
      "1x Single Mundu",
      "Matching Angavastram"
    ],
    category: "mundu",
    image: "/products/placeholder.png"
  },
  {
    id: 4,
    title: "Churidhar Materials Combo",
    description: "Trendy unstitched churidhar materials.",
    originalPrice: 2499,
    offerPrice: 1899,
    discount: "24% OFF",
    items: [
      "1x Cotton Print",
      "1x Synthetic",
      "1x Embroidered"
    ],
    category: "churidhar",
    image: "/products/placeholder.png"
  },
  {
    id: 5,
    title: "Kids' Smart Casuals",
    description: "Comfortable daily wear for children.",
    originalPrice: 2199,
    offerPrice: 1599,
    discount: "27% OFF",
    items: [
      "3x Tops/T-Shirts",
      "2x Bottoms",
    ],
    category: "kids",
    image: "/products/placeholder.png"
  },
  {
    id: 6,
    title: "Wedding Guest Special",
    description: "Curated set for couples.",
    originalPrice: 3999,
    offerPrice: 2999,
    discount: "25% OFF",
    items: [
      "1x Designer Saree",
      "1x Men's Set",
      "Accessories"
    ],
    category: "wedding",
    image: "/products/placeholder.png"
  },
  // New Festival Offers
  {
    id: 7,
    title: "Thrissur Pooram Special",
    description: "Vibrant colors for the festival of festivals.",
    originalPrice: 1999,
    offerPrice: 1499,
    discount: "25% OFF",
    items: [
      "1x Festive Silk Saree",
      "1x Traditional Mundu"
    ],
    category: "pooram",
    image: "/products/placeholder.png"
  },
  {
    id: 8,
    title: "Vishu Kani Collection",
    description: "Golden hues for a prosperous new year.",
    originalPrice: 2499,
    offerPrice: 1899,
    discount: "24% OFF",
    items: [
      "1x Kasavu Saree",
      "1x Golden Border Mundu",
      "1x Kids Kasavu Set"
    ],
    category: "vishu",
    image: "/products/placeholder.png"
  },
  {
    id: 9,
    title: "Ramzan Eid Edition",
    description: "Elegant styles for the holy celebrations.",
    originalPrice: 2999,
    offerPrice: 2299,
    discount: "23% OFF",
    items: [
      "1x Premium Salwar Suit",
      "1x Men's Kurta Pyjama",
      "1x Prayer Cap/Scarf"
    ],
    category: "ramzan",
    image: "/products/placeholder.png"
  },
  {
    id: 10,
    title: "Bakrid Festive Pack",
    description: "Celebrate with our premium selection.",
    originalPrice: 3299,
    offerPrice: 2499,
    discount: "24% OFF",
    items: [
      "1x Embroidered Abaya/Suit",
      "1x Men's Pathani Suit"
    ],
    category: "bakrid",
    image: "/products/placeholder.png"
  },
  {
    id: 11,
    title: "Independence Day Tricolor",
    description: "Wear your patriotism with pride.",
    originalPrice: 1499,
    offerPrice: 999,
    discount: "33% OFF",
    items: [
      "1x Khadi Sari/Kurta",
      "1x Tricolor Dupatta/Sash",
      "1x Flag Badge"
    ],
    category: "independence",
    image: "/products/placeholder.png"
  },
  {
    id: 12,
    title: "Onam Sadhya Special",
    description: "The ultimate Kerala traditional attire.",
    originalPrice: 2599,
    offerPrice: 1999,
    discount: "23% OFF",
    items: [
      "1x Set Mundu",
      "1x Men's Jubba & Mundu",
      "1x Onam Gift Box"
    ],
    category: "onam",
    image: "/products/placeholder.png"
  },
  {
    id: 13,
    title: "Mahanavami Divine Set",
    description: "Graceful attire for auspicious days.",
    originalPrice: 2199,
    offerPrice: 1699,
    discount: "22% OFF",
    items: [
      "1x Silk Cotton Saree",
      "1x Blouse Material",
      "1x Pooja Accessories"
    ],
    category: "mahanavami",
    image: "/products/placeholder.png"
  },
  {
    id: 14,
    title: "Vijayadasami Vidyarambham",
    description: "New beginnings with traditional elegance.",
    originalPrice: 1899,
    offerPrice: 1399,
    discount: "26% OFF",
    items: [
      "1x Kids Traditional Set",
      "1x Kerala Saree",
      "Writing Accessories"
    ],
    category: "vijayadasami",
    image: "/products/placeholder.png"
  },
  {
    id: 15,
    title: "Deepavali Lights Combo",
    description: "Sparkling outfits for the festival of lights.",
    originalPrice: 3499,
    offerPrice: 2699,
    discount: "23% OFF",
    items: [
      "1x Designer Lehenga/Saree",
      "1x Men's Silk Kurta",
      "1x Kids Festive Wear"
    ],
    category: "deepavali",
    image: "/products/placeholder.png"
  },
  {
    id: 16,
    title: "Christmas Joy Bundle",
    description: "Red and white themes for the season.",
    originalPrice: 2699,
    offerPrice: 1999,
    discount: "26% OFF",
    items: [
      "1x Party Gown/Dress",
      "1x Men's Formal Shirt",
      "1x Santa Hat/Accessory"
    ],
    category: "christmas",
    image: "/products/placeholder.png"
  }
];

export default function OfferList() {
  const { addToCart } = useCart();

  const handleClaim = (offer: typeof offers[0]) => {
    addToCart({
      id: `offer-${offer.id}`,
      name: offer.title,
      price: offer.offerPrice,
      image: offer.image,
      variant: 'Bundle'
    });
  };

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Exclusive Bundled Offers</h2>
        <p className="section-subtitle">
          Unbeatable value packs curated just for you
        </p>
      </div>

      <div className="grid grid-3">
        {offers.map((offer) => (
          <div key={offer.id} className="card product-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Discount Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-35px',
              background: '#f59e0b',
              color: 'white',
              padding: '5px 40px',
              transform: 'rotate(45deg)',
              fontWeight: 'bold',
              zIndex: 10,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              {offer.discount}
            </div>

            <div className="product-info" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  textTransform: 'uppercase', 
                  fontSize: '0.8rem', 
                  letterSpacing: '1px',
                  color: 'var(--color-primary)',
                  fontWeight: 600
                }}>
                  {offer.category} Bundle
                </span>
                <h3 className="product-name" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{offer.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{offer.description}</p>
              </div>

              <div style={{ background: 'var(--color-bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What&apos;s Included:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {offer.items.map((item, idx) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      marginBottom: '0.25rem', 
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <span style={{ color: 'var(--color-success)' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{offer.offerPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    ₹{offer.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => handleClaim(offer)}
                >
                  Claim Offer Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
