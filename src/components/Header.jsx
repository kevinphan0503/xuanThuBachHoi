import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiFetch } from '../config/api';
import './Header.css';
import BuyNowButton from './BuyNowButton';
import logo from '../../assets/logo2.png';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ session backend
    async function checkSession() {
      try {
        const data = await apiFetch('/api/session');
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch('/api/logout', { method: 'POST' });
    } catch { }
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navItems = [
    { path: '/', label: 'TRANG CHỦ' },
    { path: '/about', label: 'GIỚI THIỆU' },
    { path: '/shopping', label: 'CỬA HÀNG' },
    { path: '/contact', label: 'LIÊN HỆ' },
    { path: '/quiz', label: 'TRÒ CHƠI' }, // Added "Trò Chơi" button
    { path: '/leaderboard', label: 'BẢNG XẾP HẠNG' },
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
        <Link to="/" className="logo">
          <img src={logo} alt="Xuân Thu Bách Hội" className="logo-img" />
        </Link>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <span className="username">Xin chào, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>ĐĂNG XUẤT</button>
            </>
          ) : (
            <Link to="/login" className="login-btn">ĐĂNG NHẬP</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
