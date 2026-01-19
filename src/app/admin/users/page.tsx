'use client';

import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Customer';
  status: 'Active' | 'Inactive';
  joined: string;
};

const INITIAL_USERS: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@adavakkad.com', role: 'Admin', status: 'Active', joined: '2024-01-01' },
  { id: 2, name: 'Rahul Krishna', email: 'rahul@example.com', role: 'Customer', status: 'Active', joined: '2026-01-10' },
  { id: 3, name: 'Sarah Jones', email: 'sarah@example.com', role: 'Customer', status: 'Inactive', joined: '2026-01-12' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    const saved = localStorage.getItem('advakkad_users');
    if (saved) {
        // Fix: Avoid synchronous setState in effect
        const timer = setTimeout(() => {
            setUsers(JSON.parse(saved));
        }, 0);
        return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('advakkad_users', JSON.stringify(users));
  }, [users]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ role: 'Customer', status: 'Active', joined: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u));
    } else {
      const newUser = { ...formData, id: Date.now() } as User;
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <button className="add-btn" onClick={handleAdd}>
          <span className="material-symbols-outlined">person_add</span> Add User
        </button>
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
                <td>
                  <div className="actions">
                    <button className="action-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete(user.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as User['role']})}>
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as User['status']})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save User</button>
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

        .actions { display: flex; gap: 10px; }
        .action-btn { background: none; border: none; color: #2563eb; cursor: pointer; font-weight: 500; }
        .action-btn.delete { color: #d32f2f; }
        .action-btn:hover { text-decoration: underline; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 500px; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        
        .form-group { margin-bottom: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; }

        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-save { background: #d32f2f; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: white; font-weight: 600; }
      `}</style>
    </div>
  );
}
