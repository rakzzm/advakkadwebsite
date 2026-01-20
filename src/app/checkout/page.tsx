'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          name: user.name,
          email: user.email
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container success">
        <div className="success-content">
          <span className="material-symbols-outlined success-icon">check_circle</span>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with Adavakkad Collections.</p>
          <p>Your order ID is <strong>#ORD-7821</strong></p>
          <div className="success-actions">
            <Link href="/account" className="btn btn-secondary">View Order</Link>
            <Link href="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
        <style jsx>{`
          .checkout-container.success {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .success-icon {
            font-size: 5rem;
            color: #d32f2f;
            margin-bottom: 1rem;
          }
          .success-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
          }
          .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
          }
          .btn-primary { background: #d32f2f; color: white; }
          .btn-secondary { background: #1a1a1a; color: white; }
        `}</style>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Your Cart is Empty</h2>
        <Link href="/" className="btn-primary">Start Shopping</Link>
        <style jsx>{`
          .empty-cart-container {
            text-align: center;
            padding: 5rem 0;
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .btn-primary {
            background: #d32f2f;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            text-decoration: none;
            display: inline-block;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-grid">
          {/* Shipping Form */}
          <div className="form-section">
            <div className="section-card">
              <h2>Shipping Information</h2>
              <form onSubmit={handleSubmit} id="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Street, House No." />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>ZIP / Pincode</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
                  </div>
                </div>

                <div className="payment-section">
                   <h3>Payment Method</h3>
                   <div className="payment-options">
                     {/* Credit/Debit Card */}
                     <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                       <div className="option-header">
                         <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                         <span>Debit / Credit Card</span>
                       </div>
                       {paymentMethod === 'card' && (
                         <div className="payment-details fade-in">
                           <input type="text" placeholder="Card Number" className="payment-input" required />
                           <div className="form-row" style={{ marginBottom: 0 }}>
                             <input type="text" placeholder="MM / YY" className="payment-input" required />
                             <input type="text" placeholder="CVV" className="payment-input" required />
                           </div>
                           <input type="text" placeholder="Name on Card" className="payment-input" style={{ marginTop: '0.75rem' }} required />
                         </div>
                       )}
                     </label>
                     
                     {/* Razorpay */}
                     <label className={`payment-option ${paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                        <div className="option-header">
                          <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                          <span>Razorpay</span>
                        </div>
                        {paymentMethod === 'razorpay' && (
                          <div className="payment-details fade-in">
                            <p className="payment-note">You will be redirected to Razorpay secure payment gateway.</p>
                          </div>
                        )}
                     </label>

                     {/* PhonePe */}
                     <label className={`payment-option ${paymentMethod === 'phonepe' ? 'selected' : ''}`}>
                       <div className="option-header">
                         <input type="radio" name="payment" value="phonepe" checked={paymentMethod === 'phonepe'} onChange={() => setPaymentMethod('phonepe')} />
                         <span>PhonePe</span>
                       </div>
                       {paymentMethod === 'phonepe' && (
                         <div className="payment-details fade-in">
                            <input type="tel" placeholder="Enter PhonePe Number" className="payment-input" required pattern="[0-9]{10}" />
                            <p className="payment-note">We will send a payment request to this number.</p>
                         </div>
                       )}
                     </label>

                     {/* Paytm */}
                     <label className={`payment-option ${paymentMethod === 'paytm' ? 'selected' : ''}`}>
                       <div className="option-header">
                         <input type="radio" name="payment" value="paytm" checked={paymentMethod === 'paytm'} onChange={() => setPaymentMethod('paytm')} />
                         <span>Paytm</span>
                       </div>
                       {paymentMethod === 'paytm' && (
                         <div className="payment-details fade-in">
                            <input type="tel" placeholder="Enter Paytm Number" className="payment-input" required pattern="[0-9]{10}" />
                         </div>
                       )}
                     </label>

                     {/* UPI */}
                     <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                       <div className="option-header">
                         <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                         <span>UPI / QR Code</span>
                       </div>
                       {paymentMethod === 'upi' && (
                         <div className="payment-details fade-in">
                            <input type="text" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" className="payment-input" required />
                            <button type="button" className="btn-verify" onClick={() => alert('UPI ID Verified!')}>Verify</button>
                         </div>
                       )}
                     </label>
                   </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="summary-section">
            <div className="section-card summary-card">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="summary-item">
                    <div className="item-info">
                       <span className="item-name">{item.name}</span>
                       <span className="item-qty">x {item.quantity}</span>
                    </div>
                    <span className="item-price">₹ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹ {total}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form" 
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          background: #f9f9f9;
          padding: 3rem 0;
          min-height: 80vh;
        }

        .page-title {
          font-family: var(--font-playfair);
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #1a1a1a;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }

        .section-card {
           background: white;
           padding: 2rem;
           border-radius: 12px;
           box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .section-card h2 {
           font-size: 1.25rem;
           margin-bottom: 1.5rem;
           color: #1a1a1a;
           border-bottom: 1px solid #eee;
           padding-bottom: 0.5rem;
        }

        .form-row {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 1rem;
        }

        .form-group {
           margin-bottom: 1.25rem;
        }

        .form-group label {
           display: block;
           margin-bottom: 0.5rem;
           color: #555;
           font-weight: 500;
           font-size: 0.9rem;
        }

        .form-group input {
           width: 100%;
           padding: 0.75rem;
           border: 1px solid #ddd;
           border-radius: 6px;
           font-size: 1rem;
        }

        .form-group input:focus {
           border-color: #d32f2f;
           outline: none;
        }

        .payment-section {
           margin-top: 2rem;
        }

        .payment-options {
           display: flex;
           flex-direction: column;
           gap: 0.75rem;
        }

        .payment-option {
           border: 1px solid #eee;
           padding: 1rem;
           border-radius: 8px;
           display: flex;
           align-items: center;
           gap: 0.75rem;
           cursor: pointer;
           transition: all 0.2s;
        }

        .payment-option.selected {
           border-color: #d32f2f;
           background: #fff5f5;
        }

        .summary-items {
           margin-bottom: 1.5rem;
           max-height: 300px;
           overflow-y: auto;
        }

        .summary-item {
           display: flex;
           justify-content: space-between;
           margin-bottom: 0.75rem;
           color: #555;
        }

        .item-info {
           display: flex;
           flex-direction: column;
        }

        .item-name { font-weight: 500; color: #333; }
        .item-qty { font-size: 0.85rem; color: #888; }
        .item-price { font-weight: 600; }

        .summary-totals {
           border-top: 1px solid #eee;
           padding-top: 1rem;
        }

        .summary-row {
           display: flex;
           justify-content: space-between;
           margin-bottom: 0.5rem;
           color: #666;
        }

        .summary-row.total {
           font-size: 1.25rem;
           font-weight: 700;
           color: #1a1a1a;
           margin-top: 1rem;
           border-top: 1px solid #eee;
           padding-top: 1rem;
        }

        .place-order-btn {
           width: 100%;
           background: #d32f2f;
           color: white;
           border: none;
           padding: 1rem;
           border-radius: 6px;
           font-size: 1rem;
           font-weight: 600;
           cursor: pointer;
           margin-top: 1.5rem;
        }

        .place-order-btn:hover {
           background: #b71c1c;
        }

        .place-order-btn:disabled {
           background: #ccc;
           cursor: not-allowed; } .payment-option { display: block !important; } .option-header { display: flex; align-items: center; gap: 0.75rem; } .payment-details { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; animation: fadeIn 0.3s ease; } .payment-input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem; margin-bottom: 0.75rem; } .payment-note { font-size: 0.85rem; color: #666; margin-top: -0.25rem; } .btn-verify { background: #333; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } } .dummy {
        }
      `}</style>
    </div>
  );
}
