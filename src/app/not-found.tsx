import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-desc">The page you are looking for somewhere else.</p>
      <Link href="/" className="home-btn">
        Return Home
      </Link>

      <style jsx>{`
        .not-found-container {
          height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #fff;
          color: #1a1a1a;
        }

        .error-code {
          font-size: 8rem;
          font-weight: 700;
          color: #d32f2f; /* Primary Red */
          margin: 0;
          line-height: 1;
          font-family: var(--font-playfair);
        }

        .error-message {
          font-size: 2rem;
          margin: 1rem 0;
        }

        .error-desc {
          color: #666;
          margin-bottom: 2rem;
        }

        .home-btn {
          padding: 0.75rem 2rem;
          background: #1a1a1a;
          color: white;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 600;
          transition: background 0.3s;
        }

        .home-btn:hover {
          background: #d32f2f;
        }
      `}</style>
    </div>
  );
}
