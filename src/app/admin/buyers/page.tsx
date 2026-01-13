'use client';

export default function AdminBuyers() {
  const buyers = [
    { id: 1, name: 'Rahul Krishna', location: 'Kerala, India', totalOrders: 12, totalSpent: 45000, lastActive: '2 mins ago' },
    { id: 2, name: 'Sarah Jones', location: 'London, UK', totalOrders: 5, totalSpent: 12500, lastActive: '1 hr ago' },
    { id: 3, name: 'Mohammed Ali', location: 'Dubai, UAE', totalOrders: 8, totalSpent: 3000, lastActive: '1 day ago' },
    { id: 4, name: 'Priya S.', location: 'Bangalore, India', totalOrders: 3, totalSpent: 8500, lastActive: '3 days ago' },
  ];

  return (
    <div className="buyers-page">
      <div className="page-header">
        <h1 className="page-title">Buyer List</h1>
        <button className="export-btn"><span className="material-symbols-outlined">download</span> Export CSV</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map(buyer => (
              <tr key={buyer.id}>
                <td className="fw-600">{buyer.name}</td>
                <td>{buyer.location}</td>
                <td>{buyer.totalOrders}</td>
                <td className="fw-600">₹ {buyer.totalSpent.toLocaleString()}</td>
                <td>{buyer.lastActive}</td>
                <td><button className="action-btn">History</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .export-btn { background: white; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: #333; font-weight: 500; }
        
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .fw-600 { font-weight: 600; }
        .action-btn { background: none; border: none; color: #d32f2f; cursor: pointer; font-weight: 500; }
        .action-btn:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
