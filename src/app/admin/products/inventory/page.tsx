'use client';

import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';

export default function AdminInventory() {
  const { products, updateStock } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for quick stock edit
  const [editStockId, setEditStockId] = useState<number | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const filteredInventory = products.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (id: number, currentStock: number) => {
    setEditStockId(id);
    setTempStockValue(currentStock);
  };

  const saveStock = (id: number) => {
    updateStock(id, tempStockValue);
    setEditStockId(null);
  };

  const getStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1 className="page-title">Inventory Management</h1>
        <div className="search-box">
             <span className="material-symbols-outlined">search</span>
             <input 
               type="text" 
               placeholder="Search SKU or Product..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item.id}>
                <td className="fw-600">{item.sku}</td>
                <td>{item.name}</td>
                <td className="capitalize">{item.category}</td>
                <td className="fw-600">
                  {editStockId === item.id ? (
                    <input 
                      type="number" 
                      value={tempStockValue} 
                      onChange={(e) => setTempStockValue(Number(e.target.value))}
                      className="stock-input"
                      autoFocus
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td>
                  <span className={`status-badge ${getStatus(item.stock).toLowerCase().replace(/ /g, '-')}`}>
                    {getStatus(item.stock)}
                  </span>
                </td>
                <td>
                   {editStockId === item.id ? (
                     <div className="action-group">
                       <button className="icon-btn save" onClick={() => saveStock(item.id)} title="Save"><span className="material-symbols-outlined">check</span></button>
                       <button className="icon-btn cancel" onClick={() => setEditStockId(null)} title="Cancel"><span className="material-symbols-outlined">close</span></button>
                     </div>
                   ) : (
                     <button className="action-btn" onClick={() => startEdit(item.id, item.stock)}>Update Stock</button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        
        .search-box { background: white; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; width: 300px; }
        .search-box input { border: none; outline: none; width: 100%; font-size: 0.95rem; }

        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .fw-600 { font-weight: 600; }
        .capitalize { text-transform: capitalize; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .status-badge.in-stock { background: #ecfdf5; color: #047857; }
        .status-badge.low-stock { background: #fff7ed; color: #c2410c; }
        .status-badge.out-of-stock { background: #fef2f2; color: #b91c1c; }
        
        .action-btn { background: none; border: 1px solid #d32f2f; color: #d32f2f; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 0.85rem; transition: all 0.2s; }
        .action-btn:hover { background: #d32f2f; color: white; }

        .stock-input { width: 60px; padding: 0.3rem; border: 1px solid #d32f2f; border-radius: 4px; outline: none; }
        .action-group { display: flex; gap: 0.25rem; }
        .icon-btn { width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; color: white; }
        .icon-btn.save { background: #059669; }
        .icon-btn.cancel { background: #dc2626; }
      `}</style>
    </div>
  );
}
