'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <header className="page-hero">
          <div className="container">
            <h1>Returns & Exchanges</h1>
            <p>Our commitment to your satisfaction.</p>
          </div>
        </header>

        <section className="container content">
          <div className="policy-content">
            <h2>Return Policy Overview</h2>
            <p>At Adavakkad Collections, we want you to be completely happy with your purchase. If you are not satisfied with your order, we accept returns for qualifying items within <strong>7 days</strong> of delivery.</p>

            <h3>Eligibility for Returns</h3>
            <ul>
              <li>Items must be unused, unwashed, and in their original condition.</li>
              <li>Original tags and packaging must be intact.</li>
              <li>Proof of purchase (invoice or order ID) is required.</li>
            </ul>

            <h3>Exchange Process</h3>
            <p>If you wish to exchange an item for a different size or color, please follow these steps:</p>
            <ol>
              <li>Contact our support team via the Chat widget or email at support@adavakkad.com within 7 days.</li>
              <li>Provide your Order ID and details of the item you wish to exchange.</li>
              <li>Our team will arrange a pickup for the original item (where available) or guide you on how to ship it back.</li>
              <li>Once inspected, we will dispatch the replacement item immediately.</li>
            </ol>

            <h3>Non-Returnable Items</h3>
            <p>The following categories are not eligible for return or exchange unless defective:</p>
            <ul>
              <li>Innerwear and Lingerie</li>
              <li>Customized or Altered Items</li>
              <li>Items sold during "Final Sale" or clearance events</li>
            </ul>

            <div className="contact-box">
              <span className="material-symbols-outlined">support_agent</span>
              <div>
                <h4>Need Help?</h4>
                <p>Contact our customer support for assistance with your return.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .policy-page { min-height: 80vh; background: #fff; padding-bottom: 4rem; }
        .container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }

        .page-hero { background: #f9fafb; padding: 4rem 0; text-align: center; margin-bottom: 3rem; border-bottom: 1px solid #eee; }
        .page-hero h1 { font-family: var(--font-playfair); font-size: 2.5rem; margin-bottom: 1rem; color: #1a1a1a; }
        .page-hero p { color: #666; font-size: 1.1rem; }

        .policy-content { font-family: var(--font-outfit); color: #333; line-height: 1.8; }
        .policy-content h2 { font-family: var(--font-playfair); font-size: 1.8rem; margin-bottom: 1.5rem; color: #d32f2f; }
        .policy-content h3 { font-size: 1.3rem; margin-top: 2rem; margin-bottom: 1rem; color: #1a1a1a; font-weight: 600; }
        .policy-content p { margin-bottom: 1.5rem; color: #555; }
        
        .policy-content ul, .policy-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; color: #555; }
        .policy-content li { margin-bottom: 0.5rem; }

        .contact-box { background: #f3f4f6; padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem; margin-top: 3rem; }
        .contact-box span { font-size: 2.5rem; color: #d32f2f; }
        .contact-box h4 { margin: 0; font-size: 1.1rem; color: #1a1a1a; }
        .contact-box p { margin: 0; font-size: 0.9rem; }
      `}</style>
    </>
  );
}
