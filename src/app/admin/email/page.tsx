'use client';

export default function AdminEmail() {
  const emails = [
    { id: 1, from: 'Rahul Krishna', subject: 'Inquiry about order #7821', preview: 'Hi, I received my order but I have a question...', date: 'Jan 13' },
    { id: 2, from: 'Supplier ABC', subject: 'Invoice INV-2024-005', preview: 'Attached is the invoice for the recent shipment...', date: 'Jan 12' },
    { id: 3, from: 'System', subject: 'Stock Alert: Low Inventory', preview: 'SKU-002 is running low on stock. Please restock...', date: 'Jan 12' },
    { id: 4, from: 'Newsletter Team', subject: 'Weekly Performance Report', preview: 'Here are the stats for this week...', date: 'Jan 11' },
  ];

  return (
    <div className="email-app">
      <div className="email-sidebar">
        <button className="compose-btn">
          <span className="material-symbols-outlined">edit</span>
          Compose
        </button>
        <div className="nav-links">
          <a href="#" className="nav-link active"><span className="material-symbols-outlined">inbox</span> Inbox <span className="badge">4</span></a>
          <a href="#" className="nav-link"><span className="material-symbols-outlined">star</span> Starred</a>
          <a href="#" className="nav-link"><span className="material-symbols-outlined">send</span> Sent</a>
          <a href="#" className="nav-link"><span className="material-symbols-outlined">drafts</span> Drafts</a>
          <a href="#" className="nav-link"><span className="material-symbols-outlined">delete</span> Trash</a>
        </div>
      </div>

      <div className="email-list">
        <div className="list-header">
          <h2>Inbox</h2>
          <div className="header-actions">
            <input type="text" placeholder="Search mail..." />
          </div>
        </div>
        <div className="list-content">
          {emails.map(email => (
            <div key={email.id} className="email-item">
               <div className="checkbox"></div>
               <span className="star material-symbols-outlined">star_border</span>
               <span className="sender">{email.from}</span>
               <span className="subject">{email.subject} <span className="preview">- {email.preview}</span></span>
               <span className="date">{email.date}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .email-app { display: flex; height: calc(100vh - 100px); background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
        
        .email-sidebar { width: 240px; border-right: 1px solid #f0f0f0; padding: 1.5rem; background: #fafafa; }
        .compose-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem; background: #1a1a1a; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-bottom: 2rem; }
        .nav-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-link { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: #666; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.95rem; }
        .nav-link:hover { background: #f0f0f0; color: #333; }
        .nav-link.active { background: #eef2ff; color: #d32f2f; font-weight: 500; }
        .badge { margin-left: auto; font-size: 0.75rem; background: #fee2e2; color: #d32f2f; padding: 0.1rem 0.5rem; border-radius: 12px; }

        .email-list { flex: 1; display: flex; flex-direction: column; }
        .list-header { padding: 1rem 1.5rem; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; }
        .list-header h2 { font-size: 1.5rem; margin: 0; font-family: var(--font-playfair); color: #1a1a1a; }
        .header-actions input { padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 6px; width: 250px; }

        .list-content { overflow-y: auto; }
        .email-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1.5rem; border-bottom: 1px solid #f5f5f5; cursor: pointer; transition: background 0.1s; color: #333; }
        .email-item:hover { box-shadow: 0 2px 4px rgba(0,0,0,0.05); z-index: 1; background: white; }
        
        .checkbox { width: 18px; height: 18px; border: 1px solid #ddd; border-radius: 4px; }
        .star { color: #ccc; font-size: 1.25rem; }
        .sender { width: 180px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .subject { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
        .preview { font-weight: 400; color: #888; }
        .date { font-size: 0.85rem; color: #666; width: 60px; text-align: right; }
      `}</style>
    </div>
  );
}
