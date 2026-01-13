import React, { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import './AdminOrders.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/orders`)
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })
      fetchOrders()
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Chờ xử lý',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy'
    }
    return labels[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      confirmed: '#3498db',
      shipping: '#9b59b6',
      completed: '#2ecc71',
      cancelled: '#e74c3c'
    }
    return colors[status] || '#666'
  }

  const viewOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`)
      const data = await response.json()
      setSelectedOrder(data)
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-orders">
      <h1 className="page-title">Quản lý đơn hàng</h1>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>#{order.order_id}</td>
                <td>
                  <div>
                    <strong>{order.customer_name}</strong>
                    <div className="customer-info">{order.customer_phone}</div>
                  </div>
                </td>
                <td>{new Date(order.order_date).toLocaleDateString('vi-VN')}</td>
                <td>{parseInt(order.total_amount).toLocaleString('vi-VN')}đ</td>
                <td>
                  <select
                    className="status-select"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                    style={{ borderColor: getStatusColor(order.status) }}
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="shipping">Đang giao</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn-view"
                    onClick={() => viewOrderDetails(order.order_id)}
                  >
                    <Eye size={16} />
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Chi tiết đơn hàng #{selectedOrder.order_id}</h2>
            
            <div className="order-details">
              <div className="detail-section">
                <h3>Thông tin khách hàng</h3>
                <p><strong>Tên:</strong> {selectedOrder.customer_name}</p>
                <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                <p><strong>Điện thoại:</strong> {selectedOrder.customer_phone}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.customer_address}</p>
              </div>

              <div className="detail-section">
                <h3>Sản phẩm</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>{parseInt(item.price).toLocaleString('vi-VN')}đ</td>
                        <td>{parseInt(item.subtotal).toLocaleString('vi-VN')}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="detail-section">
                <h3>Thanh toán</h3>
                <p><strong>Phương thức:</strong> {selectedOrder.payment_method}</p>
                <p><strong>Phí vận chuyển:</strong> {parseInt(selectedOrder.shipping_fee).toLocaleString('vi-VN')}đ</p>
                <p className="total-amount">
                  <strong>Tổng cộng:</strong> {parseInt(selectedOrder.total_amount).toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>

            <button className="btn-close" onClick={() => setSelectedOrder(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
