'use client';

import { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [orders, setOrders] = useState([
    { id: '#ORD-7821', customer: 'Rahul Krishna', email: 'rahul@example.com', date: 'Jan 12, 2026', amount: 2499, status: 'Pending', items: 2 },
    { id: '#ORD-7820', customer: 'Sarah Jones', email: 'sarah@example.com', date: 'Jan 11, 2026', amount: 1299, status: 'Shipped', items: 1 },
    { id: '#ORD-7819', customer: 'Mohammed Ali', email: 'pli@example.com', date: 'Jan 10, 2026', amount: 5999, status: 'Delivered', items: 4 },
    { id: '#ORD-7818', customer: 'Priya S.', email: 'priya@example.com', date: 'Jan 09, 2026', amount: 899, status: 'Cancelled', items: 1 },
    { id: '#ORD-7817', customer: 'Amit Verma', email: 'amit@example.com', date: 'Jan 08, 2026', amount: 3200, status: 'Delivered', items: 3 },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<typeof orders[0] | null>(null);
  const [newStatus, setNewStatus] = useState('');

  // Load from Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('advakkad_orders');
      if (saved) {
        try {
          setOrders(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse orders", e);
        }
      }
    }
  }, []);

  // Save to Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('advakkad_orders', JSON.stringify(orders));
    }
  }, [orders]);

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleManage = (order: typeof orders[0]) => {
    setEditingOrder(order);
    setNewStatus(order.status);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingOrder) {
      const updatedOrders = orders.map(order => 
        order.id === editingOrder.id ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      setIsModalOpen(false);
      setEditingOrder(null);
    }
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <button className="export-btn">
          <span className="material-symbols-outlined">download</span>
          Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
          <button 
            key={status}
            className={`tab-btn ${filterStatus === status ? 'active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="fw-600">{order.id}</td>
                <td>
                  <div className="customer-cell">
                    <span className="name">{order.customer}</span>
                    <span className="email">{order.email}</span>
                  </div>
                </td>
                <td>{order.date}</td>
                <td>{order.items} items</td>
                <td className="fw-600">₹ {order.amount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="action-link" onClick={() => handleManage(order)}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Order Modal */}
      {isModalOpen && editingOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Manage Order {editingOrder.id}</h2>
            
            <div className="modal-details">
              <p><strong>Customer:</strong> {editingOrder.customer}</p>
              <p><strong>Amount:</strong> ₹ {editingOrder.amount}</p>
              <p><strong>Date:</strong> {editingOrder.date}</p>
            </div>

            <div className="form-group">
              <label htmlFor="status-select">Update Status</label>
              <select 
                id="status-select"
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: var(--font-playfair);
          font-size: 1.8rem;
          color: #1a1a1a;
          margin: 0;
        }

        .export-btn {
          background: white;
          border: 1px solid #ddd;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #333;
          font-weight: 500;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 1.5rem;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 0.75rem 0;
          margin-right: 1rem;
          font-size: 1rem;
          color: #666;
          cursor: pointer;
          position: relative;
        }

        .tab-btn.active {
          color: #d32f2f;
          font-weight: 600;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #d32f2f;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
        }

        .data-table th {
          background-color: #f9fafb;
          color: #666;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .customer-cell {
          display: flex;
          flex-direction: column;
        }

        .customer-cell .name { font-weight: 500; color: #333; }
        .customer-cell .email { font-size: 0.85rem; color: #888; }

        .fw-600 { font-weight: 600; }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-badge.pending { background: #fff7ed; color: #c2410c; }
        .status-badge.shipped { background: #eff6ff; color: #1d4ed8; }
        .status-badge.delivered { background: #ecfdf5; color: #047857; }
        .status-badge.cancelled { background: #fef2f2; color: #b91c1c; }

        .action-link {
          background: none;
          border: none;
          color: #d32f2f;
          font-weight: 500;
          cursor: pointer;
        }
        
        .action-link:hover {
          text-decoration: underline;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .modal-content h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-family: var(--font-playfair);
          color: #1a1a1a;
        }

        .modal-details {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .modal-details p {
          margin: 0.5rem 0;
          color: #555;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        .status-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .btn-cancel {
          background: #f5f5f5;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          color: #666;
          font-weight: 600;
        }

        .btn-save {
          background: #d32f2f;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
