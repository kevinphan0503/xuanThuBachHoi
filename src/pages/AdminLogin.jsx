import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simple client-side auth stub; replace with server call as needed
        setTimeout(() => {
            const isValid = email === 'admin@example.com' && password === 'admin123'
            if (isValid) {
                localStorage.setItem('adminAuth', 'true')
                navigate('/admin')
            } else {
                setError('Thông tin đăng nhập không đúng. Vui lòng thử lại.')
            }
            setLoading(false)
        }, 600)
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h1>Đăng nhập Admin</h1>
                <p className="admin-login-subtitle">Chỉ dành cho quản trị viên</p>

                {error && <div className="admin-login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                        />
                    </label>

                    <label>
                        Mật khẩu
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </label>

                    <button type="submit" className="admin-login-button" disabled={loading}>
                        {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="admin-login-hint">
                    Tài khoản demo: admin@example.com / admin123
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
