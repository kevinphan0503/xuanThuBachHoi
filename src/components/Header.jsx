import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogIn } from 'lucide-react'
import './Header.css'
import BuyNowButton from './BuyNowButton'
import logo from '../../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { path: '/', label: 'TRANG CHỦ' },
    { path: '/about', label: 'GIỚI THIỆU' },
    { path: '/shopping', label: 'CỬA HÀNG' },
    { path: '/contact', label: 'LIÊN HỆ' }
  ]

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="logo">
          <img src={logo} alt="Xuân Thu Bách Hội" className="logo-img" />
          <span className="logo-text">XUÂN THU BÁCH HỘI</span>
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
          <Link to="/admin/login" className="login-btn">
            ĐĂNG NHẬP
          </Link>
          
        </div>
      </div>
    </header>
  )
}

export default Header
