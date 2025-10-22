import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ShoppingCart, X, CreditCard, Package, Truck, CheckCircle } from 'lucide-react'
import './BuyNowButton.css'

const BuyNowButton = ({ variant = 'floating' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
    paymentMethod: 'bank_transfer'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showBadge, setShowBadge] = useState(true)

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isModalOpen])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order submission
    console.log('Order submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setIsModalOpen(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        quantity: 1,
        paymentMethod: 'bank_transfer'
      })
    }, 3000)
  }

  const productInfo = {
    name: 'Xuân Thu Bách Hội',
    price: 299000,
    originalPrice: 399000,
    discount: 25
  }

  return (
    <>
      {/* Inline variant for header only. Floating button removed. */}
      <button className="buy-now-inline" onClick={() => setIsModalOpen(true)}>
        <ShoppingCart size={18} />
        <span>Mua ngay</span>
      </button>

      {/* Order Modal rendered via portal so it escapes header stacking context */}
      {isModalOpen && createPortal(
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <h2>Đặt mua Xuân Thu Bách Hội</h2>
              <p>Hoàn tất đơn hàng của bạn</p>
            </div>

            <div className="modal-body">
              {!isSubmitted ? (
                <div className="order-form-container">
                  {/* Product Info */}
                  <div className="product-summary">
                    <div className="product-image">
                      <div className="image-placeholder">
                        <Package size={48} />
                      </div>
                    </div>
                    <div className="product-details">
                      <h3>{productInfo.name}</h3>
                      <div className="price-info">
                        <span className="current-price">
                          {productInfo.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="original-price">
                          {productInfo.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="discount">-{productInfo.discount}%</span>
                      </div>
                      <p className="product-description">
                        Board game chiến thuật dựa trên lịch sử Việt Nam
                      </p>
                    </div>
                  </div>

                  {/* Order Form */}
                  <form className="order-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                      <h4>Thông tin khách hàng</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Họ và tên *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập họ và tên"
                          />
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập số điện thoại"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Nhập email"
                        />
                      </div>

                      <div className="form-group">
                        <label>Địa chỉ giao hàng *</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          placeholder="Nhập địa chỉ giao hàng chi tiết"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>Thông tin đơn hàng</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Số lượng</label>
                          <select
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                          >
                            <option value={1}>1 bộ</option>
                            <option value={2}>2 bộ</option>
                            <option value={3}>3 bộ</option>
                            <option value={4}>4 bộ</option>
                            <option value={5}>5 bộ</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Phương thức thanh toán</label>
                          <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                          >
                            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                            <option value="cod">Thanh toán khi nhận hàng</option>
                            <option value="momo">Ví MoMo</option>
                            <option value="zalopay">Ví ZaloPay</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                      <div className="summary-row">
                        <span>Tạm tính:</span>
                        <span>{(productInfo.price * formData.quantity).toLocaleString('vi-VN')}đ</span>
                      </div>
                      <div className="summary-row">
                        <span>Phí vận chuyển:</span>
                        <span>30.000đ</span>
                      </div>
                      <div className="summary-row total">
                        <span>Tổng cộng:</span>
                        <span>{((productInfo.price * formData.quantity) + 30000).toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>

                    <button type="submit" className="submit-order-btn">
                      <CreditCard size={20} />
                      Đặt hàng ngay
                    </button>
                  </form>
                </div>
              ) : (
                <div className="success-message">
                  <CheckCircle size={64} className="success-icon" />
                  <h3>Đặt hàng thành công!</h3>
                  <p>Cảm ơn bạn đã đặt mua Xuân Thu Bách Hội. Chúng tôi sẽ liên hệ lại trong vòng 24h để xác nhận đơn hàng.</p>
                  <div className="success-details">
                    <div className="detail-item">
                      <Truck size={20} />
                      <span>Dự kiến giao hàng: 3-5 ngày làm việc</span>
                    </div>
                    <div className="detail-item">
                      <Package size={20} />
                      <span>Mã đơn hàng: #XTBH{Date.now().toString().slice(-6)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default BuyNowButton
