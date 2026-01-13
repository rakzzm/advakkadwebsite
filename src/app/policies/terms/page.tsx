'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <header className="page-hero">
          <div className="container">
            <h1>Terms & Conditions</h1>
            <p>Please read these terms carefully before using our services.</p>
          </div>
        </header>

        <section className="container content">
          <div className="policy-content">
            <h2>Agreement to Terms</h2>
            <p>By assessing or using the Adavakkad Collections website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>

            <h3>1. Use of the Site</h3>
            <p>You agree to use this site only for lawful purposes and in accordance with these Terms. You are prohibited from violating or attempting to violate the security of the Site, including access data not intended for you.</p>

            <h3>2. Product Information</h3>
            <p>We attempt to be as accurate as possible in the description of our products. However, we do not warrant that product descriptions, colors, or other content is accurate, complete, reliable, or error-free. Screen displays may vary.</p>

            <h3>3. Pricing and Availability</h3>
            <p>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without notice. We reserve the right to limit the quantity of items purchased per person.</p>

            <h3>4. Intellectual Property</h3>
            <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of Adavakkad Collections and protected by international copyright laws.</p>

            <h3>5. Limitation of Liability</h3>
            <p>Adavakkad Collections shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>

            <div className="last-updated">
              <p>Last Updated: January 13, 2026</p>
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
        .policy-content h3 { font-size: 1.1rem; margin-top: 2rem; margin-bottom: 0.8rem; color: #1a1a1a; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .policy-content p { margin-bottom: 1.5rem; color: #555; }
        
        .last-updated { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #eee; font-style: italic; color: #999; font-size: 0.9rem; }
      `}</style>
    </>
  );
}
