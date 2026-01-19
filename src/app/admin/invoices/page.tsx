'use client';

import { useState } from 'react';
import { useInvoices, Invoice } from '@/context/InvoiceContext';

export default function AdminInvoices() {
  const { invoices, addInvoice, updateInvoice, deleteInvoice } = useInvoices();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'Pending' as 'Paid' | 'Pending' | 'Overdue'
  });

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ orderId: '', customer: '', amount: 0, date: new Date().toISOString().split('T')[0], status: 'Pending' });
    setIsModalOpen(true);
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingId(invoice.id);
    setFormData({
      orderId: invoice.orderId,
      customer: invoice.customer,
      amount: invoice.amount,
      date: invoice.date,
      status: invoice.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if(confirm('Delete this invoice?')) {
      deleteInvoice(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateInvoice(editingId, formData);
    } else {
      addInvoice(formData);
    }
    setIsModalOpen(false);
  };

  const handleDownload = (invoice: Invoice) => {
    // Generate a printable window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert('Please allow popups to download invoices');

    const htmlContent = `
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
            .company h1 { margin: 0; color: #d32f2f; }
            .meta { text-align: right; }
            .invoice-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .bill-to { margin-bottom: 30px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table th { text-align: left; padding: 10px; border-bottom: 2px solid #ddd; }
            .table td { padding: 10px; border-bottom: 1px solid #eee; }
            .total-row { font-weight: bold; font-size: 18px; }
            .footer { margin-top: 50px; text-align: center; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company">
              <h1>Adavakkad Collections</h1>
              <p>Wedding Center<br>Kerala, India</p>
            </div>
            <div class="meta">
              <div class="invoice-title">INVOICE</div>
              <p><strong>ID:</strong> ${invoice.id}</p>
              <p><strong>Date:</strong> ${invoice.date}</p>
              <p><strong>Status:</strong> ${invoice.status}</p>
            </div>
          </div>

          <div class="bill-to">
            <h3>Bill To:</h3>
            <p>${invoice.customer}</p>
            <p>Order Ref: ${invoice.orderId}</p>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order Charges (${invoice.orderId})</td>
                <td>₹ ${invoice.amount.toLocaleString()}</td>
              </tr>
              <tr class="total-row">
                <td style="text-align: right">Total</td>
                <td>₹ ${invoice.amount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>For questions, contact support@adavakkad.com</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="invoices-page">
      <div className="page-header">
        <h1 className="page-title">Invoices</h1>
        <div className="header-actions">
           {/* Upload simulates adding a new invoice manually for now */}
           <button className="add-btn" onClick={handleAddNew}>
             <span className="material-symbols-outlined">upload_file</span> Upload Invoice
           </button>
        </div>
      </div>

      <div className="table-container">
        <div className="toolbar">
           <div className="search-bar">
             <span className="material-symbols-outlined">search</span>
             <input type="text" placeholder="Search by ID, Order, or Customer..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
           </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(inv => (
              <tr key={inv.id}>
                <td className="fw-600">{inv.id}</td>
                <td>{inv.orderId}</td>
                <td>{inv.customer}</td>
                <td className="fw-600">₹ {inv.amount.toLocaleString()}</td>
                <td>{inv.date}</td>
                <td><span className={`status-badge ${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                <td>
                  <div className="action-row">
                    <button className="icon-btn download" onClick={() => handleDownload(inv)} title="Download PDF"><span className="material-symbols-outlined">description</span></button>
                    <button className="icon-btn edit" onClick={() => handleEdit(inv)} title="Edit"><span className="material-symbols-outlined">edit</span></button>
                    <button className="icon-btn delete" onClick={() => handleDelete(inv.id)} title="Delete"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? 'Edit Invoice' : 'Upload Invoice Details'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Order ID</label>
                  <input required type="text" value={formData.orderId} onChange={e => setFormData({...formData, orderId: e.target.value})} placeholder="#ORD-..." />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label>Customer Name</label>
                <input required type="text" value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} />
              </div>

              <div className="form-row">
                 <div className="form-group">
                  <label>Amount (₹)</label>
                  <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as 'Paid' | 'Pending' | 'Overdue'})}>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Mock File Upload Field */}
              {!editingId && (
                <div className="form-group">
                  <label>Invoice File (PDF/Image)</label>
                  <input type="file" accept=".pdf,image/*" className="file-input" />
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }
        
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .toolbar { padding: 1rem; border-bottom: 1px solid #f0f0f0; }
        .search-bar { width: 350px; background: white; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; }
        .search-bar input { border: none; outline: none; width: 100%; }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .fw-600 { font-weight: 600; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .status-badge.paid { background: #ecfdf5; color: #047857; }
        .status-badge.pending { background: #fff7ed; color: #c2410c; }
        .status-badge.overdue { background: #fef2f2; color: #dc2626; }

        .action-row { display: flex; gap: 0.5rem; }
        .icon-btn { width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; border: 1px solid #eee; background: white; color: #666; cursor: pointer; }
        .icon-btn:hover { background: #f5f5f5; color: #333; }
        .icon-btn.delete:hover { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }
        .icon-btn.download:hover { color: #2563eb; background: #eff6ff; border-color: #dbeafe; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 500px; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        .form-group { margin-bottom: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; }
        .file-input { padding: 0.5rem 0; border: none; }
        
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-save { background: #d32f2f; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: white; font-weight: 600; }
      `}</style>
    </div>
  );
}
