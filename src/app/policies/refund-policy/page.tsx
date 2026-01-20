'use client';



export default function RefundPolicyPage() {
  return (
    <div className="policy-page">
      <header className="page-hero">
        <div className="container">
          <h1>Refund Policy</h1>
          <p>Effective Date: January 13, 2026</p>
        </div>
      </header>

      <section className="container content">
        <div className="policy-content">
          <h2>Return</h2>
          <p>Products must be returned to us within 7 days from the date of delivery.</p>
          <p>To be eligible for a return, your item must be in the same condition that you received it—unworn or unused, with tags, and in its original packaging. You&apos;ll also need the receipt or proof of purchase.</p>
          <p>To start a return, please contact us at <a href="mailto:info@adavakkad.com">info@adavakkad.com</a>. Returns must be sent to the following address:</p>
          <p>
            <strong>Adavakkad Collections</strong><br/>
            4/425 I J 4/427<br/>
            City Centre Complex<br/>
            Thrikkadeeri, Kerala<br/>
            India, 679502
          </p>
          <p>If your return is accepted, we&apos;ll send you a return shipping label and instructions on how and where to send your package. Items sent back without prior approval will not be accepted.</p>
          <p>For any return-related queries, feel free to contact us at <a href="mailto:info@adavakkad.com">info@adavakkad.com</a>.</p>

          <h3>Damages and Issues</h3>
          <p>Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or incorrect, so we can evaluate the issue and make it right.</p>
          <p>Product unboxing video within 24 hours of delivery is a must for faulty/Damaged products</p>

          <h3>Exceptions / Non-returnable Items</h3>
          <p>Certain items cannot be returned:</p>
          <ul>
            <li>Perishable goods (e.g. food, flowers, or plants)</li>
            <li>Custom or personalized products</li>
            <li>Personal care items (e.g. beauty products)</li>
            <li>Hazardous materials, flammable liquids, or gases</li>
          </ul>
          <p>We also do not accept returns on sale items or gift cards.</p>
          <p>Please contact us if you have any questions about the eligibility of your item.</p>

          <h3>Exchanges</h3>
          <p>If you need a different product, the fastest option is to return the original item. Once the return is accepted, you can place a new order separately.</p>

          <h2>Refund</h2>
          <p>Once we receive the returned product and confirm it meets our return criteria, Adavakkad Collections will initiate the refund within 24–48 hours.</p>
          <p>The refund amount will be credited to your original payment method (or source account).</p>
          <p>Depending on your bank or payment provider, the credited amount may take 5–7 business days to reflect in your account.</p>

          <h3>Refund and Cancellation for Service Providers</h3>
          <p>For services offered by Adavakkad Collections:</p>
          <p>No refund or cancellation is allowed once payment has been made, due to the nature of services provided.</p>

          <h3>Cancellation Policy</h3>
          <p>Orders can be cancelled within 24 hours of placing the order.</p>
          <p>Cancellation requests after 24 hours will not be accepted, as the order would have already been processed.</p>
          
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
