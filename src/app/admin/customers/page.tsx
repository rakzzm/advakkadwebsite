'use client';

export default function AdminCustomers() {
  const customers = [
    { id: 1, name: 'Rahul Krishna', email: 'rahul@example.com', orders: 12, spent: 45000, status: 'Active' },
    { id: 2, name: 'Sarah Jones', email: 'sarah@example.com', orders: 5, spent: 12500, status: 'Active' },
    { id: 3, name: 'Mohammed Ali', email: 'pli@example.com', orders: 2, spent: 3000, status: 'Inactive' },
  ];

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
        <button className="export-btn"><span className="material-symbols-outlined">download</span> Export CSV</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>
                  <div className="user-info">
                    <span className="name">{customer.name}</span>
                    <span className="email">{customer.email}</span>
                  </div>
                </td>
                <td>{customer.orders}</td>
                <td className="fw-600">₹ {customer.spent.toLocaleString()}</td>
                <td><span className={`status-dot ${customer.status.toLowerCase()}`}></span> {customer.status}</td>
                <td><button className="action-btn">View Profile</button></td>
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
        
        .user-info { display: flex; flex-direction: column; }
        .user-info .name { font-weight: 500; color: #333; }
        .user-info .email { font-size: 0.85rem; color: #888; }
        
        .fw-600 { font-weight: 600; }
        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
        .status-dot.active { background: #10b981; }
        .status-dot.inactive { background: #ef4444; }
        
        .action-btn { background: none; border: none; color: #d32f2f; cursor: pointer; font-weight: 500; }
        .action-btn:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
