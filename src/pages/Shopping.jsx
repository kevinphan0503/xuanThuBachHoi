import React, { useState, useEffect } from 'react'
import { ShoppingCart, Package, Star } from 'lucide-react'
import './Shopping.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Shopping = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`)
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
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 30000
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
                    <span>{(getTotal() - 30000).toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="total-row">
                    <span>Phí vận chuyển:</span>
                    <span>30.000đ</span>
                  </div>
                  <div className="total-row total">
                    <span>Tổng cộng:</span>
                    <span>{getTotal().toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                <button className="btn-checkout" onClick={() => {
                  // Navigate to checkout - you can implement this
                  alert('Tính năng thanh toán sẽ được triển khai')
                }}>
                  Thanh toán
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shopping
