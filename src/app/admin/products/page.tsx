'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProducts, Product } from '@/context/ProductContext';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'women',
    subcategory: 'women',
    price: '',
    stock: '',
    image: '',
    sku: '',
    sizes: 'Free Size',
    delivery: 'Standard: 5-7 days'
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      sku: product.sku,
      sizes: product.sizes.join(', '),
      delivery: product.delivery
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'women',
      subcategory: 'women',
      price: '',
      stock: '',
      image: '',
      sku: `SKU-${Date.now()}`,
      sizes: 'Free Size',
      delivery: 'Standard: 5-7 days'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image || '/Products/placeholder.png', // Fallback
      sku: formData.sku,
      sizes: formData.sizes.split(',').map(s => s.trim()),
      delivery: formData.delivery
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="add-btn" onClick={handleAddNew}>
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>SKU</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-thumb">
                    {product.image && (
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={40} 
                        height={40} 
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                      />
                    )}
                  </div>
                </td>
                <td className="fw-500">{product.name}</td>
                <td>{product.category}</td>
                <td>₹ {product.price}</td>
                <td>
                  <span className={`stock-badge ${product.stock < 10 ? 'low' : 'good'}`}>
                    {product.stock} in stock
                  </span>
                </td>
                 <td>{product.sku}</td>
                <td>
                  <div className="actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => handleEdit(product)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(product.id)}>
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                 <div className="form-group">
                  <label>SKU</label>
                  <input required type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="women">Women</option>
                    <option value="mens">Men&apos;s</option>
                    <option value="kids">Kids</option>
                    <option value="silk-sarees">Silk Sarees</option>
                    <option value="traditional">Traditional</option>
                    <option value="wedding">Wedding</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
                 <div className="form-group">
                  <label>Sizes (comma separated)</label>
                  <input type="text" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Product Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {formData.image && <Image src={formData.image} alt="Preview" width={100} height={100} style={{ objectFit: 'cover', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }} />}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Existing Styles ... */
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .add-btn { background-color: #d32f2f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .add-btn:hover { background-color: #b71c1c; }
        .toolbar { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .search-bar { flex: 1; background: white; display: flex; align-items: center; padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid #e0e0e0; }
        .search-bar input { border: none; outline: none; width: 100%; margin-left: 0.5rem; font-size: 1rem; }
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background-color: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .product-thumb { width: 40px; height: 40px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
        .fw-500 { font-weight: 500; }
        .stock-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .stock-badge.good { background: #ecfdf5; color: #047857; }
        .stock-badge.low { background: #fff7ed; color: #c2410c; }
        .actions { display: flex; gap: 0.5rem; }
        .icon-btn { width: 32px; height: 32px; border-radius: 4px; border: 1px solid #e0e0e0; background: white; color: #666; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .icon-btn:hover { background: #f5f5f5; color: #333; }
        .icon-btn.delete:hover { background: #fef2f2; border-color: #fee2e2; color: #dc2626; }

        /* Modal Styles */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { margin-bottom: 1rem; }
        .full-width { grid-column: 1 / -1; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        .form-group input, .form-group select { width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 6px; }
        .img-preview { width: 100px; height: 100px; object-fit: cover; margin-top: 0.5rem; border-radius: 4px; border: 1px solid #ddd; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; border-top: 1px solid #eee; padding-top: 1rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-cancel:hover { background: #e5e5e5; }
        .btn-save { background: #d32f2f; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: white; font-weight: 600; }
        .btn-save:hover { background: #b71c1c; }
      `}</style>
    </div>
  );
}
