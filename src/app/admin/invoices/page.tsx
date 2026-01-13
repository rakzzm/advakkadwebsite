'use client';

export default function AdminInvoices() {
  const invoices = [
    { id: 'INV-2024-001', orderId: '#ORD-7821', customer: 'Rahul Krishna', amount: 2499, date: 'Jan 12, 2026', status: 'Paid' },
    { id: 'INV-2024-002', orderId: '#ORD-7820', customer: 'Sarah Jones', amount: 1299, date: 'Jan 11, 2026', status: 'Paid' },
    { id: 'INV-2024-003', orderId: '#ORD-7819', customer: 'Mohammed Ali', amount: 5999, date: 'Jan 10, 2026', status: 'Pending' },
  ];

  return (
    <div className="invoices-page">
      <div className="page-header">
        <h1 className="page-title">Invoices</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td className="fw-600">{inv.id}</td>
                <td>{inv.orderId}</td>
                <td>{inv.customer}</td>
                <td className="fw-600">₹ {inv.amount}</td>
                <td>{inv.date}</td>
                <td><span className={`status-badge ${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                <td>
                  <button className="icon-btn" title="Download PDF">
                    <span className="material-symbols-outlined">description</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .fw-600 { font-weight: 600; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .status-badge.paid { background: #ecfdf5; color: #047857; }
        .status-badge.pending { background: #fff7ed; color: #c2410c; }

        .icon-btn { border: none; background: transparent; color: #666; cursor: pointer; transition: color 0.2s; }
        .icon-btn:hover { color: #d32f2f; }
      `}</style>
    </div>
  );
}
