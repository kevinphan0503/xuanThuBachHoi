import React from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import './AdminSettings.css'

const AdminSettings = () => {
  return (
    <div className="admin-settings">
      <div className="settings-header">
        <SettingsIcon size={32} />
        <h1>Cài đặt</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Thông tin hệ thống</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Phiên bản</label>
              <span>1.0.0</span>
            </div>
            <div className="info-item">
              <label>Database</label>
              <span>MySQL</span>
            </div>
            <div className="info-item">
              <label>Framework</label>
              <span>React + Express</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Hướng dẫn</h2>
          <div className="guide-content">
            <p>Trang cài đặt này sẽ được mở rộng trong tương lai với các tính năng:</p>
            <ul>
              <li>Quản lý tài khoản admin</li>
              <li>Cấu hình hệ thống</li>
              <li>Thông báo và cảnh báo</li>
              <li>Xuất dữ liệu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
