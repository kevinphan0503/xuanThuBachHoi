import React, { useState, useEffect } from 'react'
import { ShoppingCart, Package } from 'lucide-react'
import { API_BASE_URL } from '../config/api'
import './Shopping.css'

const Shopping = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCheckout, setShowCheckout] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState(null)
  const [error, setError] = useState('')
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const SHIPPING_FEE = 30000

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product_id === product.product_id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING_FEE
  }

  const formatCurrency = (value) => Number(value || 0).toLocaleString('vi-VN')

  const handleCheckout = async (e) => {
    e.preventDefault()
    setError('')
    setOrderResult(null)

    if (cart.length === 0) {
      setError('Giỏ hàng trống, hãy thêm sản phẩm trước khi đặt hàng.')
      return
    }

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setError('Vui lòng điền đầy đủ thông tin liên hệ và địa chỉ giao hàng.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        customer_name: customer.name.trim(),
        customer_email: customer.email.trim(),
        customer_phone: customer.phone.trim(),
        customer_address: customer.address.trim(),
        items: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        })),
        payment_method: 'cod',
        shipping_fee: SHIPPING_FEE
      }

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || 'Đặt hàng thất bại, vui lòng thử lại.')
      }

      setOrderResult(data)
      setCart([])
      setCustomer({ name: '', email: '', phone: '', address: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCustomerChange = (field, value) => {
    setCustomer(prev => ({ ...prev, [field]: value }))
  }

  const openCheckout = () => {
    setError('')
    setOrderResult(null)
    setShowCheckout(true)
  }

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'boardgame', label: 'Boardgame' },
    { value: 'accessories', label: 'Vật phẩm' }
  ]

  const filteredProducts = selectedCategory === 'all'
    ? products
    : selectedCategory === 'accessories'
      ? products.filter(p => p.category === 'keychain' || p.category === 'towel')
      : products.filter(p => p.category === selectedCategory)

  const getCategoryLabel = (category) => {
    if (category === 'keychain' || category === 'towel') {
      return 'Vật phẩm'
    }
    if (category === 'boardgame') {
      return 'Boardgame'
    }
    return category
  }

  if (loading) {
    return (
      <div className="shopping-page">
        <div className="container">
          <div className="loading">Đang tải sản phẩm...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="shopping-page">
      <div className="shopping-hero">
        <div className="container">
          <h1>Cửa Hàng Xuân Thu Bách Hội</h1>
          <p>Khám phá bộ sưu tập sản phẩm độc đáo</p>
        </div>
      </div>

      <div className="container">
        <div className="shopping-content">
          <div className="products-section">
            <div className="category-filter">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <div className="no-products">Không có sản phẩm nào</div>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.product_id} className="product-card">
                    <div className="product-image">
                      <img
                        src={product.image_url || '/assets/logo.png'}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = '/assets/logo.png'
                        }}
                      />
                      {product.original_price && product.original_price > product.price && (
                        <span className="discount-badge">
                          -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="product-info">
                      <span className="product-category">{getCategoryLabel(product.category)}</span>
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-price">
                        <span className="current-price">
                          {parseInt(product.price).toLocaleString('vi-VN')}đ
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="original-price">
                            {parseInt(product.original_price).toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>
                      <div className="product-stock">
                        {product.stock_quantity > 0 ? (
                          <span className="in-stock">Còn {product.stock_quantity} sản phẩm</span>
                        ) : (
                          <span className="out-of-stock">Hết hàng</span>
                        )}
                      </div>
                      <button
                        className="btn-add-cart"
                        onClick={() => addToCart(product)}
                        disabled={product.stock_quantity === 0}
                      >
                        <ShoppingCart size={18} />
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div className="cart-sidebar">
              <div className="cart-header">
                <h3>Giỏ hàng ({cart.length})</h3>
                <button className="cart-close" onClick={() => setCart([])}>×</button>
              </div>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.product_id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <span className="cart-item-price">
                        {parseInt(item.price).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item.product_id)}>×</button>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <div className="total-row">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(getTotal() - SHIPPING_FEE)}đ</span>
                  </div>
                  <div className="total-row">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(SHIPPING_FEE)}đ</span>
                  </div>
                  <div className="total-row total">
                    <span>Tổng cộng:</span>
                    <span>{formatCurrency(getTotal())}đ</span>
                  </div>
                </div>
                <div className="cod-note">
                  <Package size={16} />
                  <div>
                    <strong>Thanh toán khi nhận hàng</strong>
                    <p>Chúng tôi chỉ nhận COD, không yêu cầu chuyển khoản.</p>
                  </div>
                </div>
                <button
                  className="btn-checkout"
                  onClick={openCheckout}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showCheckout && (
        <div className="checkout-overlay" onClick={() => { setShowCheckout(false); setError(''); }}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Thanh toán (COD)</h2>
            <p className="checkout-subtitle">Chỉ hỗ trợ thanh toán khi nhận hàng. Vui lòng điền thông tin để xác nhận đơn.</p>

            <form className="checkout-form" onSubmit={handleCheckout}>
              <label>
                Họ và tên
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => handleCustomerChange('name', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => handleCustomerChange('email', e.target.value)}
                  placeholder="email@domain.com"
                  required
                />
              </label>
              <label>
                Số điện thoại
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => handleCustomerChange('phone', e.target.value)}
                  placeholder="09xx xxx xxx"
                  required
                />
              </label>
              <label>
                Địa chỉ giao hàng
                <textarea
                  value={customer.address}
                  onChange={(e) => handleCustomerChange('address', e.target.value)}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  rows={3}
                  required
                />
              </label>

              <div className="checkout-summary">
                <div className="summary-row">
                  <span>Tạm tính</span>
                  <strong>{formatCurrency(getTotal() - SHIPPING_FEE)}đ</strong>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <strong>{formatCurrency(SHIPPING_FEE)}đ</strong>
                </div>
                <div className="summary-row total">
                  <span>Tổng cộng</span>
                  <strong>{formatCurrency(getTotal())}đ</strong>
                </div>
                <div className="summary-row payment-method">
                  <span>Phương thức</span>
                  <strong>COD (Thanh toán khi nhận hàng)</strong>
                </div>
              </div>

              {error && <div className="checkout-error">{error}</div>}
              {orderResult && (
                <div className="checkout-success">
                  Đặt hàng thành công! Mã đơn #{orderResult.order_id}. Chúng tôi sẽ gọi xác nhận trước khi giao.
                </div>
              )}

              <div className="checkout-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowCheckout(false); setError(''); }} disabled={submitting}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Đang tạo đơn...' : 'Xác nhận đặt hàng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shopping
