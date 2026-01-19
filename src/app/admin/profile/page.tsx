'use client';

import { useAuth } from '@/context/AuthContext';

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
      </div>

      <div className="profile-grid">
        <div className="profile-card info-card">
          <div className="avatar-large">A</div>
          <h2>{user?.name || 'Admin User'}</h2>
          <p className="role">Administrator</p>
          <p className="email">{user?.email || 'admin@adavakkad.com'}</p>
        </div>

        <div className="profile-card form-card">
          <h3>Edit Profile</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={user?.name} className="form-control" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" defaultValue={user?.email} className="form-control" disabled />
              <small>Email cannot be changed.</small>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="form-control" />
            </div>
            <button className="btn-save">Update Profile</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }

        .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 2rem; }
        @media(max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } }

        .profile-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        
        .info-card { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .avatar-large { width: 100px; height: 100px; background: #d32f2f; color: white; border-radius: 50%; font-size: 3rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-family: var(--font-playfair); }
        .info-card h2 { margin: 0.5rem 0; color: #333; }
        .role { color: #d32f2f; font-weight: 600; margin: 0; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
        .email { color: #666; margin-top: 0.5rem; }

        .form-card h3 { margin-top: 0; margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 500; }
        .form-control { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
        .form-control:disabled { background: #f9fafb; cursor: not-allowed; }
        small { color: #888; font-size: 0.8rem; }

        .btn-save { background: #1a1a1a; color: white; border: none; padding: 0.75rem 2rem; border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%; transition: background 0.2s; }
        .btn-save:hover { background: #d32f2f; }
      `}</style>
    </div>
  );
}
