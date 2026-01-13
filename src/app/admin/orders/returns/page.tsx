'use client';

export default function AdminReturns() {
  const returns = [
    { id: 'RET-001', orderId: '#ORD-7821', customer: 'Rahul Krishna', reason: 'Size too small', status: 'Pending', date: 'Jan 13, 2026' },
    { id: 'RET-002', orderId: '#ORD-7815', customer: 'Priya S.', reason: 'Defective Item', status: 'Approved', date: 'Jan 10, 2026' },
  ];

  return (
    <div className="returns-page">
      <div className="page-header">
        <h1 className="page-title">Returns</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Return ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(ret => (
              <tr key={ret.id}>
                <td className="fw-600">{ret.id}</td>
                <td className="fw-600">{ret.orderId}</td>
                <td>{ret.customer}</td>
                <td>{ret.reason}</td>
                <td>{ret.date}</td>
                <td><span className={`status-badge ${ret.status.toLowerCase()}`}>{ret.status}</span></td>
                <td><button className="action-btn">Manage</button></td>
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
        .status-badge.pending { background: #fff7ed; color: #c2410c; }
        .status-badge.approved { background: #ecfdf5; color: #047857; }
        .action-btn { background: none; border: none; color: #d32f2f; cursor: pointer; font-weight: 500; }
        .action-btn:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
