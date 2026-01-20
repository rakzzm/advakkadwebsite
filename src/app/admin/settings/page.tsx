'use client';

import { useState } from 'react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'Adavakkad Collections',
    adminEmail: 'abhilash@adavakkad.com',
    currency: 'INR',
    metaTitle: 'Adavakkad Collections - Premium Wedding Center',
    metaDescription: 'Shop the best wedding collections and ethnic wear.',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">General Settings</h1>
      </div>

      <div className="settings-container">
        {/* Tabs */}
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            SEO
          </button>
          <button 
            className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          <form onSubmit={(e) => e.preventDefault()}>
            
            {activeTab === 'general' && (
              <div className="form-section fade-in">
                <div className="form-group">
                  <label>Site Name</label>
                  <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Admin Email</label>
                  <input type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="form-control">
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="form-section fade-in">
                <div className="form-group">
                  <label>Meta Title</label>
                  <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="form-control" />
                </div>
                 <div className="form-group">
                  <label>Meta Description</label>
                  <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} className="form-control" rows={4} />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="form-section fade-in">
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input type="url" name="instagram" value={formData.instagram} onChange={handleChange} className="form-control" />
                </div>
              </div>
            )}

            <div className="form-actions">
              <button className="btn-save">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; }

        .settings-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .settings-tabs {
          display: flex;
          border-bottom: 1px solid #eee;
          background: #fafafa;
          padding: 0 1rem;
        }

        .tab-btn {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .tab-btn:hover { color: #333; }
        .tab-btn.active { color: #d32f2f; border-bottom-color: #d32f2f; background: white; }

        .tab-content { padding: 2rem; }

        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 500; }
        .form-control { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
        .form-control:focus { border-color: #d32f2f; outline: none; }

        .form-actions { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; text-align: right; }
        .btn-save { background: #d32f2f; color: white; border: none; padding: 0.75rem 2rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .btn-save:hover { background: #b71c1c; }

        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
