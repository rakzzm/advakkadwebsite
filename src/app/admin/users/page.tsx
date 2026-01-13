'use client';

export default function AdminUsers() {
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@advakkad.com', role: 'Admin', status: 'Active', joined: 'Jan 01, 2024' },
    { id: 2, name: 'Rahul Krishna', email: 'rahul@example.com', role: 'Customer', status: 'Active', joined: 'Jan 10, 2026' },
    { id: 3, name: 'Sarah Jones', email: 'sarah@example.com', role: 'Customer', status: 'Inactive', joined: 'Jan 12, 2026' },
  ];

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <span className="name">{user.name}</span>
                    <span className="email">{user.email}</span>
                  </div>
                </td>
                <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                <td><span className={`status-dot ${user.status.toLowerCase()}`}></span> {user.status}</td>
                <td>{user.joined}</td>
                <td><button className="action-btn">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }

        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .user-table { width: 100%; border-collapse: collapse; }
        .user-table th, .user-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .user-table th { background: #f9fafb; color: #666; font-weight: 600; }

        .user-info { display: flex; flex-direction: column; }
        .user-info .name { font-weight: 500; color: #333; }
        .user-info .email { font-size: 0.85rem; color: #888; }

        .role-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .role-badge.admin { background: #e0e7ff; color: #4338ca; }
        .role-badge.customer { background: #f3f4f6; color: #374151; }

        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
        .status-dot.active { background: #10b981; }
        .status-dot.inactive { background: #ef4444; }

        .action-btn { background: none; border: none; color: #d32f2f; cursor: pointer; font-weight: 500; }
        .action-btn:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
