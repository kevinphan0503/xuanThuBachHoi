import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminHome.css'

function AdminHome() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  return (
    <div className="admin-home-container">
      <div className="admin-home-header">
        <h1>Bảng điều khiển Admin</h1>
        <button className="admin-logout-button" onClick={logout}>Đăng xuất</button>
      </div>

      <div className="admin-home-grid">
        <section className="admin-card">
          <h2>Thống kê nhanh</h2>
          <ul>
            <li>Người dùng: 128</li>
            <li>Sự kiện: 24</li>
            <li>Đơn hàng: 56</li>
          </ul>
        </section>

        <section className="admin-card">
          <h2>Hành động nhanh</h2>
          <div className="admin-actions">
            <button>Thêm sự kiện</button>
            <button>Quản lý người dùng</button>
            <button>Xem báo cáo</button>
          </div>
        </section>

        <section className="admin-card">
          <h2>Nhật ký hệ thống</h2>
          <div className="admin-log">
            <p>[10:15] User A tạo sự kiện mới</p>
            <p>[09:48] Admin cập nhật quy tắc game</p>
            <p>[08:22] Hệ thống sao lưu dữ liệu</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminHome
