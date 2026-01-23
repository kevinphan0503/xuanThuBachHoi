import React, { useState, useEffect, useMemo } from 'react'
import { ShoppingCart, Package, Minus, Plus, X, Filter, Truck, ShoppingBag } from 'lucide-react'
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
    if (!product || product.stock_quantity === 0) return
    const existingItem = cart.find(item => item.product_id === product.product_id)

    // Prevent adding beyond stock
    if (existingItem && existingItem.quantity >= product.stock_quantity) {
      setError(`Sản phẩm "${product.name}" không đủ tồn kho.`)
      return
    }

    if (existingItem) {
      setCart(cart.map(item =>
        item.product_id === product.product_id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock_quantity) }
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
      setCart(cart.map(item => {
        if (item.product_id !== productId) return item
        const clampedQty = Math.min(Math.max(quantity, 1), item.stock_quantity || quantity)
        return { ...item, quantity: clampedQty }
      }))
    }
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING_FEE
  }

  const formatCurrency = (value) => Number(value || 0).toLocaleString('vi-VN')

  const submitOrder = async (e) => {
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

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    if (selectedCategory === 'accessories') {
      return products.filter(p => p.category === 'keychain' || p.category === 'towel' || p.category === 'accessories')
    }
    return products.filter(p => p.category === selectedCategory)
  }, [products, selectedCategory])

  const getCategoryLabel = (category) => {
    if (category === 'keychain' || category === 'towel') {
      return 'Vật phẩm'
    }
    if (category === 'boardgame') {
      return 'Boardgame'
    }
    return category
  }

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart])
  const total = subtotal + SHIPPING_FEE

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
      <section className="shop-hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <span className="hero-pill">Hội Xuân rực rỡ</span>
          <h1>Cửa Hàng Xuân Thu Bách Hội</h1>
          <p>Nơi hội tụ tinh hoa văn hóa, mang nắng ấm ngày hội vào từng bảo vật di sản.</p>
          <button
            className="btn-primary-hero"
            onClick={() => document.getElementById('shop-products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Thỉnh Bảo Vật Ngay
          </button>
        </div>
      </section>

      <div className="container shop-layout" id="shop-products">
        <div className="products-column">
          <div className="toolbar">
            <div className="filters">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`chip ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="sorter">
              <Filter size={16} />
              <span>Sắp xếp:</span>
              <select>
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">Không có sản phẩm nào</div>
            ) : (
              filteredProducts.map(product => {
                const hasDiscount = product.original_price && product.original_price > product.price
                const discount = hasDiscount
                  ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                  : 0
                const outOfStock = product.stock_quantity === 0
                return (
                  <div key={product.product_id} className={`product-card ${outOfStock ? 'is-disabled' : ''}`}>
                    <div className="card-visual">
                      {hasDiscount && <span className="badge sale">-{discount}%</span>}
                      <span className={`badge stock ${outOfStock ? 'soldout' : 'available'}`}>
                        {outOfStock ? 'Hết hàng' : 'Sẵn có'}
                      </span>
                      <div className="product-thumb">
                        <img
                          src={product.image_url || '/assets/logo.png'}
                          alt={product.name}
                          onError={(e) => { e.target.src = '/assets/logo.png' }}
                        />
                        {outOfStock && <div className="soldout-overlay">Hết hàng</div>}
                      </div>
                    </div>

                    <div className="card-body">
                      <span className="pill-category">{getCategoryLabel(product.category)}</span>
                      <h3>{product.name}</h3>
                      <p className="card-desc">{product.description || 'Khám phá bảo vật di sản độc đáo.'}</p>
                      <div className="price-row">
                        <span className="price-current">{formatCurrency(product.price)}đ</span>
                        {hasDiscount && (
                          <span className="price-original">{formatCurrency(product.original_price)}đ</span>
                        )}
                      </div>
                      <div className="stock-note">
                        {outOfStock ? 'Tạm hết hàng' : `Còn ${product.stock_quantity ?? ''} sản phẩm`}
                      </div>
                      <button
                        className="btn-add"
                        onClick={() => addToCart(product)}
                        disabled={outOfStock}
                      >
                        <ShoppingCart size={16} /> Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <aside className="cart-panel">
          <div className="cart-head">
            <div className="cart-title">
              <ShoppingBag size={18} />
              <h3>Giỏ hàng của bạn</h3>
            </div>
            <span className="cart-count">{cart.length} món</span>
          </div>

          <div className="cod-banner">
            <Truck size={16} />
            <div>
              <p className="cod-title">Thanh toán khi nhận hàng (COD)</p>
              <p className="cod-sub">Không yêu cầu chuyển khoản trước</p>
            </div>
          </div>

          <div className="cart-items">
            {cart.length === 0 && <p className="empty-cart">Chưa có sản phẩm trong giỏ</p>}
            {cart.map(item => (
              <div key={item.product_id} className="cart-line">
                <div className="line-thumb">
                  <img src={item.image_url || '/assets/logo.png'} alt={item.name} onError={(e) => { e.target.src = '/assets/logo.png' }} />
                </div>
                <div className="line-info">
                  <p className="line-name">{item.name}</p>
                  <span className="line-price">{formatCurrency(item.price)}đ</span>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} aria-label="Giảm">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} aria-label="Tăng">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button className="remove-line" onClick={() => removeFromCart(item.product_id)} aria-label="Xóa">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="sum-row">
              <span>Tạm tính</span>
              <strong>{formatCurrency(subtotal)}đ</strong>
            </div>
            <div className="sum-row">
              <span>Phí vận chuyển</span>
              <strong>{formatCurrency(SHIPPING_FEE)}đ</strong>
            </div>
            <div className="sum-row total">
              <span>Tổng cộng</span>
              <strong>{formatCurrency(total)}đ</strong>
            </div>
          </div>

          <button className="btn-checkout" onClick={openCheckout} disabled={cart.length === 0}>
            Tiến hành đặt hàng
          </button>
        </aside>
      </div>

      {showCheckout && (
        <div className="checkout-overlay" role="dialog" aria-modal="true">
          <div className="checkout-modal">
            <h2>Thông tin giao hàng</h2>
            <p className="checkout-subtitle">Vui lòng nhập thông tin để đặt hàng. Thanh toán khi nhận (COD).</p>

            <form onSubmit={submitOrder} className="checkout-form">
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
                  placeholder="ban@example.com"
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
