'use client';



export default function ShippingPolicyPage() {
  return (
    <div className="policy-page">
      <header className="page-hero">
        <div className="container">
          <h1>Shipping Policy</h1>
          <p>Effective Date: January 13, 2026</p>
        </div>
      </header>

      <section className="container content">
        <div className="policy-content">
          <h2>Shipping & Delivery Policies</h2>
          <p>Adavakkad Collections ships its products to almost all parts of India and abroad. Most orders placed will be shipped within 24 hours. However, for selected products, shipping might be delayed due to customization or other specific requirements. We ship on all days except Sunday and National Holidays.</p>
          <p>For all areas serviced by reputed couriers, the delivery time would be within 4 to 5 business days of shipping (business days exclude Sundays and other holidays).</p>

          <h3>Delivery Timelines</h3>
          <p><strong>Domestic Orders (within India):</strong> Products are typically delivered within 4 to 7 business days from the date of shipping.</p>
          <p><strong>International Orders:</strong> Products are typically delivered within 7 to 12 business days, depending on the destination and customs clearance.</p>
          
          <p>At times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which Adavakkad Collections is not liable and would request its users to cooperate as Adavakkad Collections continuously tries to nought such instances.</p>
          <p>Also, Adavakkad Collections reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s) to your source account.</p>
          
          <div className="last-updated">
            <p>Last Updated: January 20, 2026</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .policy-page { min-height: 80vh; background: #fff; padding-bottom: 4rem; }
        .container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }

        .page-hero { background: #f9fafb; padding: 4rem 0; text-align: center; margin-bottom: 3rem; border-bottom: 1px solid #eee; }
        .page-hero h1 { font-family: var(--font-playfair); font-size: 2.5rem; margin-bottom: 1rem; color: #1a1a1a; }
        .page-hero p { color: #666; font-size: 1.1rem; }

        .policy-content { font-family: var(--font-outfit); color: #333; line-height: 1.8; }
        .policy-content h2 { font-family: var(--font-playfair); font-size: 1.8rem; margin-bottom: 1.5rem; color: #d32f2f; margin-top: 3rem; }
        .policy-content h3 { font-size: 1.1rem; margin-top: 2rem; margin-bottom: 1rem; color: #1a1a1a; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #f59e0b; display: inline-block; padding-bottom: 0.25rem; }
        .policy-content p { margin-bottom: 1.5rem; color: #555; text-align: justify; }
        .policy-content ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: #555; }
        .policy-content li { margin-bottom: 0.5rem; }
        
        .last-updated { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #eee; font-style: italic; color: #999; font-size: 0.9rem; }
        a { color: #f59e0b; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
