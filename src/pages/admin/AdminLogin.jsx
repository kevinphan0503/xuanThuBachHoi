import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Lock, User } from 'lucide-react'
import { API_BASE_URL } from '../../config/api'
import './AdminLogin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
      <div className="login-container">
        <div className="login-header">
          <h1>Xuân Thu Bách Hội</h1>
          
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>
              <User size={18} />
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={18} />
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            <LogIn size={20} />
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

       
      </div>
    </div>
  )
}

export default AdminLogin
