import React, { useState } from 'react';
import './Register.css';

const Register = () => {
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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Đăng kí thành công!');
          setForm({ username: '', password: '', email: '', full_name: '', phone: '', address: '' });
      } else {
        setMessage(data.error || 'Đăng kí thất bại!');
      }
    } catch (err) {
      setMessage('Lỗi kết nối máy chủ!');
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
