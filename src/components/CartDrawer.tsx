'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div 
        onClick={closeCart}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1999,
          backdropFilter: 'blur(4px)'
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          zIndex: 2000,
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          animation: 'slideIn 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Shopping Bag ({items.length})</h2>
          <button 
            onClick={closeCart}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.5rem', 
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            &times;
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</p>
              <p>Your cart is empty.</p>
              <button 
                onClick={closeCart}
                style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--color-primary)',
                  borderRadius: '20px',
                  background: 'none',
                  color: 'var(--color-primary)',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} style={{ display: 'flex', gap: '1rem' }}>
                   {/* Fallback for Image if needed, assuming image path is valid */}
                   <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                     <Image 
                        src={item.image.startsWith('/') ? item.image : '/products/placeholder.png'} // Fallback handling roughly
                        alt={item.name} 
                        fill 
                        style={{ objectFit: 'cover', borderRadius: '8px' }} 
                      />
                   </div>
                   
                   <div style={{ flex: 1 }}>
                     <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600 }}>{item.name}</h4>
                     {item.size && <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Size: {item.size}</p>}
                     {item.age && <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Age: {item.age}</p>}
                     
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f5f5f5', borderRadius: '4px', padding: '2px' }}>
                          <button 
                            onClick={() => updateQuantity(item.id, -1, item.size, item.age)}
                            style={{ border: 'none', background: 'none', padding: '0 8px', cursor: 'pointer', fontWeight: 'bold' }}
                          >-</button>
                          <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1, item.size, item.age)}
                            style={{ border: 'none', background: 'none', padding: '0 8px', cursor: 'pointer', fontWeight: 'bold' }}
                          >+</button>
                       </div>
                       
                       <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontWeight: 600 }}>₹{item.price * item.quantity}</p>
                       </div>
                     </div>
                   </div>
                   
                   <button
                     onClick={() => removeFromCart(item.id, item.size, item.age)}
                     style={{
                       background: 'none',
                       border: 'none',
                       color: '#ef4444',
                       cursor: 'pointer',
                       padding: '0.5rem',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       marginLeft: '0.5rem'
                     }}
                     title="Remove Item"
                   >
                     <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>delete</span>
                   </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', background: '#f9fafb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 700, fontSize: '1.2rem' }}>
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="btn-primary"
              style={{ 
                display: 'block', 
                width: '100%', 
                textAlign: 'center',
                textDecoration: 'none',
                padding: '1rem'
              }}
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
