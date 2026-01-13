'use client';

export default function AdminSegments() {
  const segments = [
    { id: 1, name: 'VIP Customers', count: 120, criteria: 'Spent > ₹50,000' },
    { id: 2, name: 'Repeat Buyers', count: 450, criteria: 'Orders > 3' },
    { id: 3, name: 'New Signups', count: 85, criteria: 'Joined < 30 days' },
    { id: 4, name: 'At Risk', count: 32, criteria: 'No order in 6 months' },
  ];

  return (
    <div className="segments-page">
      <div className="page-header">
        <h1 className="page-title">Customer Segments</h1>
        <button className="add-btn"><span className="material-symbols-outlined">add</span> Create Segment</button>
      </div>

      <div className="segments-grid">
        {segments.map(segment => (
          <div key={segment.id} className="segment-card">
            <div className="card-icon"><span className="material-symbols-outlined">groups</span></div>
            <div className="card-info">
              <h2>{segment.name}</h2>
              <p className="criteria">{segment.criteria}</p>
            </div>
            <div className="card-stat">
              <span className="count">{segment.count}</span>
              <span className="label">Users</span>
            </div>
            <button className="view-btn">View Users</button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }

        .segments-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        
        .segment-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; transition: transform 0.2s; }
        .segment-card:hover { transform: translateY(-5px); }

        .card-icon { width: 50px; height: 50px; background: #e0f2fe; color: #0284c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .card-icon span { font-size: 1.5rem; }

        .card-info h2 { font-size: 1.25rem; margin: 0; color: #333; }
        .criteria { color: #666; font-size: 0.9rem; margin: 0; }

        .card-stat { display: flex; flex-direction: column; }
        .count { font-size: 1.8rem; font-weight: 700; color: #1a1a1a; line-height: 1; }
        .label { font-size: 0.8rem; text-transform: uppercase; color: #888; font-weight: 600; letter-spacing: 1px; }

        .view-btn { width: 100%; border: 1px solid #ddd; background: transparent; padding: 0.6rem; border-radius: 6px; color: #555; cursor: pointer; font-weight: 500; transition: all 0.2s; }
        .view-btn:hover { background: #f9fafb; color: #1a1a1a; border-color: #ccc; }
      `}</style>
    </div>
  );
}
