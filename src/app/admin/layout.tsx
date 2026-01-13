'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Protected Route Check (Basic)
  if (!user || user.role !== 'admin') {
     // In a real app we'd redirect here, but for now we'll show a message or let it render 
     // (The page content usually handles the redirect or AuthContext does)
  }

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { name: 'Products', icon: 'inventory_2', path: '/admin/products' },
    { name: 'Orders', icon: 'shopping_cart', path: '/admin/orders' },
    { name: 'Customers', icon: 'group', path: '/admin/customers' },
    { name: 'Settings', icon: 'settings', path: '/admin/settings' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Advakkad</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            <span className="material-symbols-outlined">logout</span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <button 
            className="toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="user-profile">
            <span>{user?.name || 'Admin'}</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="content-area">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: #f4f6f8;
        }

        /* Sidebar Styles */
        .admin-sidebar {
          background-color: #1a1a1a;
          color: white;
          width: 260px;
          transition: width 0.3s ease;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
        }

        .admin-sidebar.closed {
          width: 70px;
        }

        .admin-sidebar.closed .nav-text,
        .admin-sidebar.closed .sidebar-header h2,
        .admin-sidebar.closed .sidebar-header p {
          display: none;
        }

        .admin-sidebar.closed .sidebar-header {
          padding: 1rem;
          justify-content: center;
        }
        
        .sidebar-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-header h2 {
          color: #d32f2f;
          margin: 0;
          font-family: var(--font-playfair);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          color: #bdbdbd;
          text-decoration: none;
          transition: all 0.2s;
          gap: 1rem;
        }

        .nav-item:hover, .nav-item.active {
          background-color: #d32f2f;
          color: white;
        }

        .admin-sidebar.closed .nav-item {
          padding: 1rem;
          justify-content: center;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: none;
          border: none;
          color: #bdbdbd;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s;
        }

        .logout-btn:hover {
          color: white;
        }

        /* Main Content Styles */
        .admin-main {
          flex: 1;
          margin-left: 260px;
          transition: margin-left 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .admin-sidebar.closed ~ .admin-main {
          margin-left: 70px;
        }

        .admin-header {
          background: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .toggle-sidebar {
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar {
          width: 35px;
          height: 35px;
          background-color: #d32f2f;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .content-area {
          padding: 2rem;
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
