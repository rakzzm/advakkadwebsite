'use client';

import { useState } from 'react';

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'What is the return policy?', answer: 'We accept returns within 7 days of delivery.' },
    { id: 2, question: 'Do you ship internationally?', answer: 'Currently, we only ship within India.' },
    { id: 3, question: 'How can I track my order?', answer: 'You can track your order from the My Orders section.' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure?')) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  return (
    <div className="faq-page">
      <div className="page-header">
        <h1 className="page-title">FAQ Manager</h1>
        <button className="add-btn">
          <span className="material-symbols-outlined">add</span>
          Add New FAQ
        </button>
      </div>

      <div className="faq-list">
        {faqs.map(faq => (
          <div key={faq.id} className="faq-card">
            <div className="faq-content">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
            <div className="faq-actions">
              <button className="icon-btn edit"><span className="material-symbols-outlined">edit</span></button>
              <button className="icon-btn delete" onClick={() => handleDelete(faq.id)}><span className="material-symbols-outlined">delete</span></button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; display: flex; gap: 0.5rem; align-items: center; font-weight: 600; cursor: pointer; }

        .faq-list { display: flex; flex-direction: column; gap: 1rem; }
        
        .faq-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: flex-start; }
        
        .faq-content h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #333; }
        .faq-content p { color: #666; margin: 0; line-height: 1.5; }

        .faq-actions { display: flex; gap: 0.5rem; }
        .icon-btn { width: 36px; height: 36px; border-radius: 4px; border: 1px solid #ddd; background: white; color: #666; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .icon-btn:hover { background: #f5f5f5; color: #333; }
        .icon-btn.delete:hover { background: #fee2e2; border-color: #fee2e2; color: #dc2626; }
      `}</style>
    </div>
  );
}
