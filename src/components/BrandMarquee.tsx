import Image from 'next/image';

const brands = [
  { name: "Jockey", src: "/brands/Jockey_Logo.jpeg" },
  { name: "Minister White", src: "/brands/Minister_White.jpeg" },
  { name: "Kitex", src: "/brands/kitex_new1.png" },
  { name: "MCR", src: "/brands/mcr.jpeg" },
  { name: "New Day", src: "/brands/newday.jpeg" },
  { name: "North Republic", src: "/brands/northrepublic.png" },
  { name: "Otto", src: "/brands/otto.jpeg" },
  { name: "Popees", src: "/brands/popees.jpeg" },
  { name: "Ramraj", src: "/brands/ramraj_logo_155x@2x.jpeg" },
  { name: "Uathayam", src: "/brands/uathayam.jpeg" },

  { name: "Vikas", src: "/brands/vikas.png" },
];

export default function BrandMarquee() {
  return (
    <section className="brand-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="text-accent" style={{ 
          color: '#d97706', 
          fontSize: '0.85rem', 
          fontWeight: 700, 
          letterSpacing: '0.1em', 
          marginBottom: '0.5rem',
          textTransform: 'uppercase'
        }}>
          Our Partners
        </p>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontFamily: '"Playfair Display", serif', 
          color: '#1f2937',
          marginBottom: '1rem' 
        }}>
          Brands We Carry
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto', color: '#6b7280' }}>
          Featuring premium brands trusted by millions for quality and comfort
        </p>
      </div>
      
      <div className="marquee-container">
        <div className="marquee-track">
          {/* First Set */}
          {brands.map((brand, index) => (
            <div key={`brand-1-${index}`} className="brand-card">
              <Image 
                src={brand.src} 
                alt={brand.name} 
                width={140} 
                height={70} 
                className="brand-logo"
              />
            </div>
          ))}
          {/* Second Set (Duplicate) */}
          {brands.map((brand, index) => (
            <div key={`brand-2-${index}`} className="brand-card">
              <Image 
                src={brand.src} 
                alt={brand.name} 
                width={140} 
                height={70} 
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
