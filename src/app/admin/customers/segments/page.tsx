'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomers } from '@/context/CustomerContext';

export default function AdminSegments() {
  const router = useRouter();
  const { segments, customers, addSegment, deleteSegment } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', criteria: '' });

  // Helper to count users in a segment
  const getCount = (segmentName: string) => {
    // Simple matching logic for mock purposes
    return customers.filter(c => c.segments.includes(segmentName)).length;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addSegment(formData);
    setIsModalOpen(false);
    setFormData({ name: '', criteria: '' });
  };

  const viewUsers = () => {
    // In a real app this would pass a query param
    router.push('/admin/customers'); 
  };

  return (
    <div className="segments-page">
      <div className="page-header">
        <h1 className="page-title">Customer Segments</h1>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <span className="material-symbols-outlined">add</span> Create Segment
        </button>
      </div>

      <div className="segments-grid">
        {segments.map(segment => (
          <div key={segment.id} className="segment-card">
            <button className="delete-icon" onClick={() => deleteSegment(segment.id)} title="Delete Segment">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="card-icon"><span className="material-symbols-outlined">groups</span></div>
            <div className="card-info">
              <h2>{segment.name}</h2>
              <p className="criteria">{segment.criteria}</p>
            </div>
            <div className="card-stat">
              <span className="count">{getCount(segment.name)}</span>
              <span className="label">Users</span>
            </div>
            <button className="view-btn" onClick={() => viewUsers()}>View Users</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Segment</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Segment Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Big Spenders" />
              </div>
              <div className="form-group">
                <label>Criteria Description</label>
                <input required type="text" value={formData.criteria} onChange={e => setFormData({...formData, criteria: e.target.value})} placeholder="e.g. Orders > 10" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }

        .segments-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        
        .segment-card { position: relative; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; transition: transform 0.2s; }
        .segment-card:hover { transform: translateY(-5px); }

        .delete-icon { position: absolute; top: 10px; right: 10px; background: none; border: none; color: #ddd; cursor: pointer; }
        .delete-icon:hover { color: #d32f2f; }

        .card-icon { width: 50px; height: 50px; background: #e0f2fe; color: #0284c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .card-icon span { font-size: 1.5rem; }

        .card-info h2 { font-size: 1.25rem; margin: 0; color: #333; }
        .criteria { color: #666; font-size: 0.9rem; margin: 0; }

        .card-stat { display: flex; flex-direction: column; }
        .count { font-size: 1.8rem; font-weight: 700; color: #1a1a1a; line-height: 1; }
        .label { font-size: 0.8rem; text-transform: uppercase; color: #888; font-weight: 600; letter-spacing: 1px; }

        .view-btn { width: 100%; border: 1px solid #ddd; background: transparent; padding: 0.6rem; border-radius: 6px; color: #555; cursor: pointer; font-weight: 500; transition: all 0.2s; }
        .view-btn:hover { background: #f9fafb; color: #1a1a1a; border-color: #ccc; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 400px; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        .form-group { margin-bottom: 1rem; text-align: left; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-save { background: #d32f2f; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: white; font-weight: 600; }
      `}</style>
    </div>
  );
}
