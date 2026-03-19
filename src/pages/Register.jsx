import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../config/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const isSuccessMessage = message.toLowerCase().includes('thành công');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await apiFetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setMessage('Đăng kí thành công!');
      setForm({ username: '', password: '', email: '', full_name: '', phone: '', address: '' });
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (err) {
      try {
        const parsed = JSON.parse(err.message || '{}');
        setMessage(parsed.error || 'Đăng kí thất bại!');
      } catch {
        setMessage('Lỗi kết nối máy chủ!');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card-wrap">
        <div className="register-container">
          <div className="register-header-row">
            <h1 className="register-title">Tạo tài khoản mới</h1>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-field">
              <label htmlFor="username">Tên đăng nhập</label>
              <div className="register-input-shell">
                <span className="register-input-icon" aria-hidden="true">👤</span>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Nhập tên đăng nhập"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="email">Email</label>
              <div className="register-input-shell">
                <span className="register-input-icon" aria-hidden="true">✉</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="password">Mật khẩu</label>
              <div className="register-input-shell">
                <span className="register-input-icon" aria-hidden="true">🔒</span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="full_name">Họ và tên</label>
              <div className="register-input-shell">
                <span className="register-input-icon" aria-hidden="true">🪪</span>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  placeholder="Nhập họ và tên"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="phone">Số điện thoại</label>
              <div className="register-input-shell">
                <span className="register-input-icon" aria-hidden="true">📞</span>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="address">Địa chỉ</label>
              <div className="register-input-shell">
                <span className="register-input-icon" aria-hidden="true">📍</span>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Nhập địa chỉ"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="register-submit-button">
              Đăng ký <span aria-hidden="true">→</span>
            </button>

            <div className="register-divider"><span>HOẶC</span></div>

            <button
              type="button"
              className="register-login-button"
              onClick={() => navigate('/login')}
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </form>

          {message && (
            <p className={`register-message ${isSuccessMessage ? 'success' : 'error'}`}>
              {message}
            </p>
          )}

          <div className="register-back-row">
            <button
              type="button"
              className="register-back-button"
              onClick={() => navigate(-1)}
            >
              ← Quay lại
            </button>
          </div>

          <div className="register-footnote">© 2026 Văn Hóa Việt. Mọi quyền được bảo lưu.</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
