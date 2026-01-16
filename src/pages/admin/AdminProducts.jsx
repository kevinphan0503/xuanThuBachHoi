import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { API_BASE_URL } from '../../config/api'
import './AdminProducts.css'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: 'boardgame',
    image_url: '',
    stock_quantity: '',
    is_active: true
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingProduct
        ? `${API_BASE_URL}/api/admin/products/${editingProduct.product_id}`
        : `${API_BASE_URL}/api/admin/products`

      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          original_price: formData.original_price ? parseFloat(formData.original_price) : null,
          stock_quantity: parseInt(formData.stock_quantity)
        })
      })

      if (response.ok) {
        setShowModal(false)
        setEditingProduct(null)
        resetForm()
        fetchProducts()
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      original_price: product.original_price || '',
      category: product.category,
      image_url: product.image_url || '',
      stock_quantity: product.stock_quantity,
      is_active: product.is_active
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return

    try {
      await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'DELETE'
      })
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      category: 'boardgame',
      image_url: '',
      stock_quantity: '',
      is_active: true
    })
  }

  const getCategoryLabel = (cat) => {
    const labels = {
      boardgame: 'Board Game',
      keychain: 'Móc khóa',
      towel: 'Khăn',
      other: 'Khác'
    }
    return labels[cat] || cat
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-products">
      <div className="page-header">
        <h1>Quản lý sản phẩm</h1>
        <button className="btn-primary" onClick={() => {
          setEditingProduct(null)
          resetForm()
          setShowModal(true)
        }}>
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.product_id}>
                <td>
                  <img
                    src={product.image_url || '/assets/logo.png'}
                    alt={product.name}
                    className="product-thumb"
                    onError={(e) => e.target.src = '/assets/logo.png'}
                  />
                </td>
                <td>
                  <strong>{product.name}</strong>
                  {product.description && (
                    <div className="product-desc">{product.description.substring(0, 50)}...</div>
                  )}
                </td>
                <td>{getCategoryLabel(product.category)}</td>
                <td>
                  <div className="price-cell">
                    <span className="current-price">{parseInt(product.price).toLocaleString('vi-VN')}đ</span>
                    {product.original_price && (
                      <span className="old-price">{parseInt(product.original_price).toLocaleString('vi-VN')}đ</span>
                    )}
                  </div>
                </td>
                <td>{product.stock_quantity}</td>
                <td>
                  <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                    {product.is_active ? 'Hoạt động' : 'Ngừng bán'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(product)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(product.product_id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tên sản phẩm *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Danh mục *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="boardgame">Board Game</option>
                    <option value="keychain">Móc khóa</option>
                    <option value="towel">Khăn</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giá gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng tồn kho *</label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>URL hình ảnh</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  Hoạt động
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
