import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Gamepad2 } from 'lucide-react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { path: '/', label: 'TRANG CHỦ' },
    { path: '/about', label: 'GIỚI THIỆU' },
    { path: '/rules', label: 'HƯỚNG DẪN CHƠI' },
    { path: '/gallery', label: 'HÌNH ẢNH GAME' },
    { path: '/contact', label: 'LIÊN HỆ' }
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Gamepad2 size={32} />
            <span>XUÂN THU BÁCH HỘI</span>
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

          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
