'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'Order': false,
    'Products': false,
    'Customer': false
  });

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const menuGroups = [
    {
      title: 'Sales product manager',
      items: [
        { name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard', type: 'link' },
        { 
          name: 'Order', 
          icon: 'shopping_cart', 
          type: 'sub',
          subItems: [
            { name: 'Order List', path: '/admin/orders' },
            { name: 'Returns', path: '/admin/orders/returns' },
          ]
        },
        { 
          name: 'Products', 
          icon: 'inventory_2', 
          type: 'sub',
          subItems: [
            { name: 'Product List', path: '/admin/products' },
            { name: 'Inventory', path: '/admin/products/inventory' },
          ]
        },
        { 
          name: 'Customer', 
          icon: 'group', 
          type: 'sub',
          subItems: [
            { name: 'Customer List', path: '/admin/customers' },
            { name: 'Segments', path: '/admin/customers/segments' },
          ] 
        },
        { 
          name: 'Buyer', 
          icon: 'account_balance_wallet', 
          type: 'sub',
          subItems: [{ name: 'Buyer List', path: '/admin/buyers' }] 
        },
        { 
          name: 'Invoices', 
          icon: 'receipt', 
          type: 'sub',
          subItems: [{ name: 'Invoice List', path: '/admin/invoices' }] 
        },
      ]
    },
    {
      title: 'Support Apps',
      items: [
        { name: 'Chats', icon: 'chat', type: 'sub', subItems: [{ name: 'Inbox', path: '/admin/chat' }] },
        { name: 'Email', icon: 'mail', type: 'sub', subItems: [{ name: 'Inbox', path: '/admin/email' }] },
        { name: 'Todo App', icon: 'check_circle', type: 'sub', subItems: [{ name: 'Task List', path: '/admin/todo' }] },
      ]
    },
    {
      title: 'All Pages',
      items: [
        { name: 'Profile', icon: 'person', type: 'sub', subItems: [{ name: 'My Profile', path: '/admin/profile' }] },
        { name: 'User', icon: 'manage_accounts', type: 'sub', subItems: [{ name: 'User List', path: '/admin/users' }] },
        { name: 'Setting', icon: 'settings', type: 'sub', subItems: [{ name: 'General Settings', path: '/admin/settings' }] },
        { name: 'FAQ', icon: 'help', type: 'sub', subItems: [{ name: 'FAQ List', path: '/admin/faq' }] },
      ]
    },
    {
      title: 'User Interface',
      items: [
        { name: 'Components', icon: 'layers', type: 'sub', subItems: [{ name: 'UI Elements', path: '/admin/ui' }] },
      ]
    }
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
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="menu-group">
              <h3 className="group-title">{group.title}</h3>
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="menu-item-container">
                  {item.type === 'link' ? (
                    <Link 
                      href={item.path || '#'}
                      className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined icon">{item.icon}</span>
                      <span className="nav-text">{item.name}</span>
                    </Link>
                  ) : (
                    <>
                      <div 
                        className={`nav-item ${expandedMenus[item.name] ? 'expanded' : ''}`}
                        onClick={() => toggleMenu(item.name)}
                        style={{ cursor: 'pointer', justifyContent: 'space-between' }}
                      >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                           <span className="material-symbols-outlined icon">{item.icon}</span>
                           <span className="nav-text">{item.name}</span>
                         </div>
                         <span className="material-symbols-outlined chevron">expand_more</span>
                      </div>
                      {/* Submenu */}
                      <div className={`submenu ${expandedMenus[item.name] ? 'open' : ''}`}>
                        {item.subItems?.map((sub, sIdx) => (
                          <Link key={sIdx} href={sub.path} className="sub-nav-item">
                            <span className="bullet">•</span>
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
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
          width: 280px;
          transition: width 0.3s ease;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
          overflow-y: auto; 
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }

        .admin-sidebar.closed {
          width: 70px;
          overflow: hidden;
        }

        .admin-sidebar.closed .nav-text,
        .admin-sidebar.closed .group-title,
        .admin-sidebar.closed .chevron,
        .admin-sidebar.closed .submenu,
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
          padding: 0.85rem 1.5rem;
          color: #bdbdbd;
          text-decoration: none;
          transition: all 0.2s;
          gap: 12px;
          font-size: 0.95rem;
          width: 100%;
          box-sizing: border-box;
        }

        .nav-item:hover, .nav-item.active, .nav-item.expanded {
          background-color: rgba(211, 47, 47, 0.1);
          color: #d32f2f;
          border-right: 3px solid #d32f2f;
        }

        .nav-item .icon {
          font-size: 1.25rem;
          min-width: 24px; /* Prevent shrinking */
        }

        .chevron {
          font-size: 1.1rem;
          transition: transform 0.2s;
          margin-left: auto; /* Push to right */
        }

        .nav-item.expanded .chevron {
          transform: rotate(180deg);
        }

        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
          background: #0f0f0f;
          display: flex;
          flex-direction: column;
        }

        .submenu.open {
          max-height: 1000px; /* Increased to accommodate many items */
        }

        .sub-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.75rem 1.5rem 0.75rem 3rem;
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .sub-nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.03);
        }

        .bullet {
          font-size: 1.2rem;
          line-height: 0;
          color: #444;
        }
        
        .sub-nav-item:hover .bullet {
           color: #d32f2f;
        }

        .admin-sidebar.closed .nav-item {
          padding: 1rem;
          justify-content: center;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: auto;
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
          margin-left: 280px;
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
