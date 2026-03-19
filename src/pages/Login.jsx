import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../config/api';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const isSuccessMessage = message.toLowerCase().includes('thành công');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const data = await apiFetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            setMessage('Đăng nhập thành công!');
            // Không lưu vào localStorage/sessionStorage nữa, session backend sẽ lưu
            setTimeout(() => {
                navigate('/');
            }, 800);
        } catch (err) {
            // Nếu backend trả về lỗi xác thực, hiển thị đúng thông báo
            if (err.message && err.message.includes('Tên đăng nhập hoặc mật khẩu không đúng.')) {
                setMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
            } else {
                setMessage('Lỗi kết nối máy chủ!');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card-wrap">
                <div className="login-container">
                    <div className="login-header-row">
                        <h1 className="login-title">Chào mừng trở lại</h1>
                        
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="login-field">
                            <label htmlFor="username">Email hoặc Số điện thoại</label>
                            <div className="login-input-shell">
                                <span className="login-input-icon" aria-hidden="true">✉</span>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="example@gmail.com"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="login-input-shell">
                                <span className="login-input-icon" aria-hidden="true">🔒</span>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="login-input-icon trailing" aria-hidden="true">◉</span>
                            </div>
                            <button type="button" className="login-forgot-btn">Quên mật khẩu?</button>
                        </div>

                        <button type="submit" className="login-submit-button">
                            Đăng nhập <span aria-hidden="true">→</span>
                        </button>

                        <div className="login-divider"><span>HOẶC</span></div>

                        <button
                            type="button"
                            className="register-button"
                            onClick={() => navigate('/register')}
                        >
                            Đăng ký tài khoản <span aria-hidden="true">➕</span>
                        </button>
                    </form>

                    {message && (
                        <p className={`login-message ${isSuccessMessage ? 'success' : 'error'}`}>
                            {message}
                        </p>
                    )}

                    <div className="login-back-row">
                       <button
              type="button"
              className="register-back-button"
              onClick={() => navigate(-1)}
            >
              ← Quay lại
            </button>
                       
                    </div>

                    <div className="login-footnote">© 2026 Văn Hóa Việt. Mọi quyền được bảo lưu.</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
