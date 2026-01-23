import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Lock, User, Eye } from 'lucide-react'
import { API_BASE_URL } from '../../config/api'
import './AdminLogin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('admin_token', 'logged_in')
        navigate('/admin')
      } else {
        setError(data.error || 'Đăng nhập thất bại')
      }
    } catch (err) {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="login-pattern" aria-hidden="true" />
      <div className="login-decor left" aria-hidden="true" />
      <div className="login-decor right" aria-hidden="true" />

      <div className="login-card">
        <div className="card-logo">
          <img src="/assets/logo.png" alt="Xuân Thu Bách Hội" />
        </div>
        <h2 className="card-title">Hệ Thống Quản Trị</h2>
        <p className="card-subtitle">Vui lòng đăng nhập để truy cập trung tâm quản lý Xuân Thu Bách Hội</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <label className="input-group">
            <span className="input-icon"><User size={16} /></span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nhập tên người dùng hoặc email"
            />
          </label>

          <label className="input-group">
            <span className="input-icon"><Lock size={16} /></span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
            />
            <span className="input-icon trailing" aria-hidden="true"><Eye size={16} /></span>
          </label>

          <div className="form-options">
            <label className="checkbox">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Ghi nhớ</span>
            </label>
            <button type="button" className="link-button">Quên mật khẩu?</button>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            <LogIn size={20} />
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập hệ thống'}
          </button>
        </form>

        <div className="card-footer">
          <Link to="/" className="back-link">← Quay lại trang chủ</Link>
          <p className="copyright">© 2024 Xuân Thu Bách Hội · Bảo mật bởi hệ thống quản trị</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
