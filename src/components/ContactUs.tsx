'use client';

import { FormEvent } from 'react';
import Link from 'next/link';

export default function ContactUs() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.currentTarget.reset();
  };
// ... (rest of the file until line 151)
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" className="btn-secondary">View Products</Link>
          <Link href="/gallery" className="btn-secondary">View Gallery</Link>
        </div>

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Visit our store or reach out to us. We&apos;re here to help!
        </p>
      </div>

      <div className="grid grid-2">
        {/* Contact Information */}
        <div className="card">
          <h3>Contact Information</h3>
          <p style={{ marginBottom: '2rem' }}>
            We&apos;re ready to assist you! Visit us in person or get in touch through any of the channels below.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>📍 Store Address</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Adavakkad Collections<br />
              4/425 I J 4/427<br />
              City Centre Complex<br />
              Thrikkadeeri, Kerala<br />
              India, 679502
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>📞 Phone</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              <a href="tel:+919847672978" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                +91 98476 72978
              </a><br />
              <a href="tel:04662380011" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                0466 238 0011
              </a>
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>📧 Email</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              <a href="mailto:info@adavakkad.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                info@adavakkad.com
              </a><br />
              <a href="mailto:adavakkadcollections112@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                adavakkadcollections112@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>🕐 Business Hours</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Monday - Saturday: 9:00 AM - 8:00 PM<br />
              Sunday: 10:00 AM - 6:00 PM<br />
              <em style={{ fontSize: '0.9rem' }}>Closed on public holidays</em>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <h3>Send Us a Message</h3>
          <p style={{ marginBottom: '2rem' }}>
            Have a question or special request? Fill out the form below and we&apos;ll get back to you soon.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '1rem', transition: 'all var(--transition-base)' }}
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '1rem', transition: 'all var(--transition-base)' }}
              />
            </div>

            <div>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 98765 43210"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '1rem', transition: 'all var(--transition-base)' }}
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="How can we help you?"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '1rem', resize: 'vertical', transition: 'all var(--transition-base)' }}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Find Us on Google Maps</h3>
        <div style={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4707365325944!2d76.34071517485808!3d10.851756089301652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7da0afc754681%3A0x255be42fd5fb8015!2sAdavakkad%20Collections!5e0!3m2!1sen!2sin!4v1768903733954!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Map or Additional Info */}
      <div 
        className="card mt-3 text-center" 
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          marginTop: '2rem'
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Visit Our Store Today!</h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Experience our wide range of clothing collections in person. Our friendly staff is ready 
          to help you find the perfect outfit for any occasion. We look forward to serving you!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" className="btn-secondary">View Products</Link>
          <Link href="/gallery" className="btn-secondary">View Gallery</Link>
        </div>
      </div>
    </>
  );
}
