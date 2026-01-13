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
      title: 'Sales Management',
      items: [
        { name: 'Dashboard', icon: 'grid_view', path: '/admin/dashboard', type: 'link' },
        { 
          name: 'Orders', 
          icon: 'local_mall', 
          type: 'sub',
          subItems: [
            { name: 'Order List', path: '/admin/orders' },
            { name: 'Returns', path: '/admin/orders/returns' },
          ]
        },
        { 
          name: 'Products', 
          icon: 'checkroom', 
          type: 'sub',
          subItems: [
            { name: 'Product List', path: '/admin/products' },
            { name: 'Inventory', path: '/admin/products/inventory' },
          ]
        },
        { 
          name: 'Customers', 
          icon: 'sentiment_satisfied', 
          type: 'sub',
          subItems: [
            { name: 'Customer List', path: '/admin/customers' },
            { name: 'Segments', path: '/admin/customers/segments' },
          ] 
        },
        { 
          name: 'Buyers', 
          icon: 'storefront', 
          type: 'sub',
          subItems: [{ name: 'Buyer List', path: '/admin/buyers' }] 
        },
        { 
          name: 'Invoices', 
          icon: 'receipt_long', 
          type: 'sub',
          subItems: [{ name: 'Invoice List', path: '/admin/invoices' }] 
        },
      ]
    },
    {
      title: 'Support Apps',
      items: [
        { name: 'Communications', icon: 'forum', type: 'sub', subItems: [{ name: 'Chat Inbox', path: '/admin/chat' }, { name: 'Email Inbox', path: '/admin/email' }] },
        { name: 'Tasks', icon: 'checklist', type: 'sub', subItems: [{ name: 'To-Do List', path: '/admin/todo' }] },
        { name: 'Finance', icon: 'calculate', type: 'sub', subItems: [{ name: 'Tax Calculator', path: '/admin/tax' }] },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Management', icon: 'manage_accounts', type: 'sub', subItems: [
          { name: 'My Profile', path: '/admin/profile' },
          { name: 'User Access', path: '/admin/users' }
        ]},
        { name: 'Configuration', icon: 'tune', type: 'sub', subItems: [
          { name: 'General Settings', path: '/admin/settings' },
          { name: 'FAQ Manager', path: '/admin/faq' }
        ]},
      ]
    },
    {
      title: 'Interface',
      items: [
        { name: 'UI Components', icon: 'style', type: 'sub', subItems: [{ name: 'Elements Guide', path: '/admin/ui' }] },
      ]
    }
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
           <div className="brand-logo">
             {/* <span className="material-symbols-outlined logo-icon">diamond</span> */}
             <div className="brand-text">
                <img src="/logo/admin-logo.jpg" alt="Advakkad Admin" style={{ maxWidth: '180px', width: '100%', height: 'auto', borderRadius: '4px' }} />
             </div>
           </div>
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
                            <span className="dot"></span>
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
            <span className="nav-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="toggle-sidebar"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-symbols-outlined">menu_open</span>
            </button>
            <h1 className="header-title">
              {menuGroups.flatMap(g => g.items).find(i => i.path === pathname)?.name || 
               menuGroups.flatMap(g => g.items).flatMap(i => i.subItems || []).find(s => s.path === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{user?.name || 'Administrator'}</span>
              <span className="user-role">Super Admin</span>
            </div>
            <div className="avatar">
               {user?.name?.[0] || 'A'}
            </div>
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
          background-color: #f8fafc;
          font-family: var(--font-outfit), sans-serif;
        }

        /* Sidebar Styles */
        .admin-sidebar {
          background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%);
          color: white;
          width: 280px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
          overflow-y: auto;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          border-right: 1px solid #333;
        }

        .admin-sidebar::-webkit-scrollbar { width: 5px; }
        .admin-sidebar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

        .admin-sidebar.closed { width: 80px; }
        .admin-sidebar.closed .nav-text, 
        .admin-sidebar.closed .group-title, 
        .admin-sidebar.closed .chevron, 
        .admin-sidebar.closed .submenu,
        .admin-sidebar.closed .brand-text,
        .admin-sidebar.closed .sidebar-footer .nav-text { display: none; }
        
        .sidebar-header {
          padding: 1.5rem 1rem;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .brand-logo { display: flex; align-items: center; justify-content: center; width: 100%; overflow: hidden; }
        .brand-text { display: flex; justify-content: center; width: 100%; }
        /* .logo-icon { color: #d32f2f; font-size: 2rem; min-width: 32px; } */
        /* .brand-text h2 { margin: 0; font-family: var(--font-playfair); font-size: 1.4rem; letter-spacing: 0.5px; white-space: nowrap; } */
        /* .brand-text p { margin: 0; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; } */

        .admin-sidebar.closed .sidebar-header { padding: 1rem 0; min-height: 80px; }

        .sidebar-nav { flex: 1; padding: 1.5rem 1rem; }
        .menu-group { margin-bottom: 2rem; }
        .group-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 0.8rem;
          padding-left: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .menu-item-container { margin-bottom: 0.25rem; }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          color: #a3a3a3;
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          user-select: none;
        }

        .nav-item:hover {
          background-color: rgba(255,255,255,0.05);
          color: white;
        }

        .nav-item.active, .nav-item.expanded {
          background: linear-gradient(90deg, rgba(211, 47, 47, 0.15), rgba(211, 47, 47, 0.05));
          color: #ef5350;
          font-weight: 600;
        }

        .nav-item .icon { font-size: 1.3rem; min-width: 24px; transition: color 0.2s; }
        .nav-item.active .icon { color: #d32f2f; }
        
        .chevron { font-size: 1.2rem; color: #666; transition: transform 0.3s ease; }
        .nav-item.expanded .chevron { transform: rotate(180deg); color: #ef5350; }

        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
        }
        .submenu.open { max-height: 500px; padding-top: 0.25rem; padding-bottom: 0.5rem; }

        .sub-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
          border-radius: 6px;
          position: relative;
        }

        .sub-nav-item:hover { color: white; background: rgba(255,255,255,0.03); }
        
        .dot {
          width: 5px;
          height: 5px;
          background-color: #555;
          border-radius: 50%;
          transition: all 0.2s;
        }
        
        .sub-nav-item:hover .dot { background-color: #d32f2f; transform: scale(1.2); }

        .sidebar-footer { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          background: rgba(211, 47, 47, 0.1);
          border: 1px solid rgba(211, 47, 47, 0.2);
          color: #ef5350;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 8px;
          transition: all 0.2s;
          font-weight: 500;
        }
        .logout-btn:hover { background: #d32f2f; color: white; border-color: #d32f2f; }
        .admin-sidebar.closed .logout-btn { padding: 0.75rem; }

        /* Main Content */
        .admin-main {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          width: calc(100% - 280px);
        }
        .admin-sidebar.closed ~ .admin-main { margin-left: 80px; width: calc(100% - 80px); }

        .admin-header {
          background: white;
          padding: 0 2rem;
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-left { display: flex; align-items: center; gap: 1.5rem; }
        .toggle-sidebar { background: none; border: none; cursor: pointer; color: #555; padding: 0.5rem; border-radius: 50%; transition: background 0.2s; }
        .toggle-sidebar:hover { background: #f0f0f0; color: #1a1a1a; }
        .header-title { font-size: 1.5rem; font-family: var(--font-playfair); color: #1a1a1a; margin: 0; }

        .user-profile { display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border-radius: 50px; transition: background 0.2s; cursor: pointer; }
        .user-profile:hover { background: #f5f5f5; }
        .user-info { text-align: right; line-height: 1.2; }
        .user-name { display: block; font-weight: 600; color: #333; font-size: 0.95rem; }
        .user-role { display: block; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .avatar {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(211, 47, 47, 0.3);
        }

        .content-area { padding: 2.5rem; flex: 1; overflow-y: auto; max-width: 1600px; margin: 0 auto; width: 100%; }
      `}</style>
    </div>
  );
}
