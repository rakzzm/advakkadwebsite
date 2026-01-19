'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomers } from '@/context/CustomerContext';

export default function AdminCustomers() {
  const router = useRouter();
  const { customers, addCustomer } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Customer Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    segments: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      segments: formData.segments.split(',').map(s => s.trim()).filter(s => s)
    });
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', address: '', segments: '' });
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
        <div className="header-actions">
           <div className="search-bar">
             <span className="material-symbols-outlined">search</span>
             <input 
               type="text" 
               placeholder="Search customers..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="add-btn" onClick={() => setIsModalOpen(true)}>
             <span className="material-symbols-outlined">add</span>
             Add Customer
           </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Segments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>
                  <div className="user-info">
                    <span className="name">{customer.name}</span>
                    <span className="email">{customer.email}</span>
                  </div>
                </td>
                <td>
                   <span className={`status-dot ${customer.status.toLowerCase()}`}></span> {customer.status}
                </td>
                <td>{customer.orders}</td>
                <td className="fw-600">₹ {customer.spent.toLocaleString()}</td>
                <td>
                  <div className="segments-list">
                    {customer.segments.map((seg, idx) => (
                      <span key={idx} className="segment-tag">{seg}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <button className="action-btn" onClick={() => router.push(`/admin/customers/${customer.id}`)}>
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Add Customer Modal */}
       {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Segments (comma separated)</label>
                <input type="text" placeholder="e.g. VIP, Wholesale" value={formData.segments} onChange={e => setFormData({...formData, segments: e.target.value})} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Add Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        
        .header-actions { display: flex; gap: 1rem; }
        .search-bar { background: white; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; }
        .search-bar input { border: none; outline: none; }
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }

        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        
        .user-info { display: flex; flex-direction: column; }
        .user-info .name { font-weight: 500; color: #333; }
        .user-info .email { font-size: 0.85rem; color: #888; }
        
        .fw-600 { font-weight: 600; }
        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
        .status-dot.active { background: #10b981; }
        .status-dot.inactive { background: #ef4444; }

        .segments-list { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .segment-tag { background: #f3f4f6; color: #4b5563; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px; }
        
        .action-btn { background: none; border: 1px solid #d32f2f; color: #d32f2f; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 0.85rem; transition: all 0.2s; }
        .action-btn:hover { background: #d32f2f; color: white; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 500px; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-save { background: #d32f2f; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: white; font-weight: 600; }
      `}</style>
    </div>
  );
}
