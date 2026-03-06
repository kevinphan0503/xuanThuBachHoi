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
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập"
                    value={form.username}
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
                <button type="submit">Đăng nhập</button>
                <button
                    type="button"
                    className="register-button"
                    onClick={() => navigate('/register')}
                >
                    Chưa có tài khoản? Đăng ký
                </button>
            </form>
            {message && <p className="login-message">{message}</p>}
        </div>
    );
};

export default Login;
