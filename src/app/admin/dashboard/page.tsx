'use client';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Sales', value: '₹ 1,24,500', icon: 'payments', color: '#10b981' },
    { title: 'New Orders', value: '18', icon: 'shopping_bag', color: '#3b82f6' },
    { title: 'Total Products', value: '45', icon: 'inventory', color: '#f59e0b' },
    { title: 'Customers', value: '1,203', icon: 'group', color: '#8b5cf6' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Rahul K.', amount: '₹ 2,499', status: 'Pending', date: 'Today' },
    { id: '#ORD-002', customer: 'Sarah J.', amount: '₹ 1,299', status: 'Shipped', date: 'Yesterday' },
    { id: '#ORD-003', customer: 'Mohammed A.', amount: '₹ 5,999', status: 'Delivered', date: 'Jan 10' },
    { id: '#ORD-004', customer: 'Priya S.', amount: '₹ 899', status: 'Cancelled', date: 'Jan 09' },
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button className="view-all">View All</button>
        </div>
        
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-title {
          font-family: var(--font-playfair);
          font-size: 1.8rem;
          color: #1a1a1a;
          margin-bottom: 2rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h3 {
          font-size: 1.5rem;
          margin: 0;
          color: #1a1a1a;
        }

        .stat-info p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        /* Recent Orders */
        .recent-orders {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.25rem;
          margin: 0;
        }

        .view-all {
          background: none;
          border: none;
          color: #d32f2f;
          cursor: pointer;
          font-weight: 600;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th, .orders-table td {
          text-align: left;
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .orders-table th {
          color: #666;
          font-weight: 500;
          font-size: 0.9rem;
        }

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

        .action-btn {
          padding: 0.4rem 0.8rem;
          background: #f4f4f5;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: background 0.2s;
        }

        .action-btn:hover {
          background: #e4e4e7;
        }
      `}</style>
    </div>
  );
}
