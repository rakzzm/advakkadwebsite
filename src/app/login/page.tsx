'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter(); // Initialized useRouter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock Authentication Logic
    if (email === 'abhilash@adavakkad.com' && password === 'admin123') {
      login({
        id: '1',
        name: 'Abhilash',
        email: 'abhilash@adavakkad.com',
        role: 'admin'
      });
      // Set simple cookie/local storage auth
      localStorage.setItem('isAdmin', 'true');
      document.cookie = "isAdmin=true; path=/";
      router.push('/admin/dashboard');
    } else if (email === 'user@example.com' && password === 'user123') {
      login({
        id: '2',
        name: 'Demo User',
        email: email,
        role: 'customer'
      });
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to Adavakkad Collections</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

          <div className="login-footer">
            <p>Don&apos;t have an account? <Link href="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          padding: 2rem;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 450px;
          border-top: 4px solid #d32f2f; /* Red Accent */
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h2 {
          font-size: 2rem;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          font-family: var(--font-playfair);
        }

        .login-header p {
          color: #666;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          border-color: #d32f2f;
          outline: none;
        }

        .login-btn {
          width: 100%;
          padding: 1rem;
          background: #1a1a1a; /* Black Button */
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .login-btn:hover {
          background: #d32f2f; /* Red Hover */
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }

        .login-footer a {
          color: #d32f2f;
          font-weight: 600;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }
        
        .hint {
          margin-top: 1rem;
          font-size: 0.8rem;
          color: #888;
          background: #f9f9f9;
          padding: 0.5rem;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
