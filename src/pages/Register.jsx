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
    <div className="register-container">
      <h2>Đăng kí tài khoản</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="full_name"
          placeholder="Họ và tên"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng kí</button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
};

export default Register;
