'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminPlaceholderPage() {
  const pathname = usePathname();
  
  // Convert slug array to title (e.g., ['products', 'add'] -> "Products Add")
  const title = pathname?.split('/').slice(2).map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Page';

  return (
    <div className="placeholder-container">
      <div className="content">
        <span className="material-symbols-outlined icon">construction</span>
        <h1>{title}</h1>
        <p>This feature is currently under development.</p>
        <Link href="/admin/dashboard" className="back-btn">
          Back to Dashboard
        </Link>
      </div>

      <style jsx>{`
        .placeholder-container {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .content {
          padding: 2rem;
        }

        .icon {
          font-size: 4rem;
          color: #d32f2f;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          font-family: var(--font-playfair);
        }

        p {
          color: #666;
          margin-bottom: 2rem;
        }

        .back-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #1a1a1a;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s;
        }

        .back-btn:hover {
          background: #d32f2f;
        }
      `}</style>
    </div>
  );
}
