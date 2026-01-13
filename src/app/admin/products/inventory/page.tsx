'use client';

export default function AdminInventory() {
  const inventory = [
    { id: 1, sku: 'SKU-001', product: 'Assam Silk Saree', category: 'Women', stock: 15, status: 'In Stock', lastUpdated: 'Jan 10, 2026' },
    { id: 2, sku: 'SKU-002', product: 'Banarasi Silk Saree', category: 'Women', stock: 8, status: 'Low Stock', lastUpdated: 'Jan 05, 2026' },
    { id: 3, sku: 'SKU-003', product: 'Checked Shirt', category: 'Men', stock: 0, status: 'Out of Stock', lastUpdated: 'Jan 12, 2026' },
    { id: 4, sku: 'SKU-004', product: 'Kids Frock', category: 'Kids', stock: 10, status: 'In Stock', lastUpdated: 'Jan 08, 2026' },
  ];

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1 className="page-title">Inventory Management</h1>
        <button className="export-btn"><span className="material-symbols-outlined">download</span> Export Report</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Category</th>
              <th>Stock Level</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                <td className="fw-600">{item.sku}</td>
                <td>{item.product}</td>
                <td>{item.category}</td>
                <td className="fw-600">{item.stock}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.lastUpdated}</td>
                <td><button className="action-btn">Update</button></td>
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
        .fw-600 { font-weight: 600; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .status-badge.in-stock { background: #ecfdf5; color: #047857; }
        .status-badge.low-stock { background: #fff7ed; color: #c2410c; }
        .status-badge.out-of-stock { background: #fef2f2; color: #b91c1c; }
        
        .action-btn { background: none; border: none; color: #d32f2f; cursor: pointer; font-weight: 500; }
        .action-btn:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
