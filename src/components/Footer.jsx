import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>XUÂN THU BÁCH HỘI</h3>
            <p>Khám phá lịch sử và văn hóa Việt Nam qua từng nước đi trong board game đầy thú vị.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>LIÊN KẾT NHANH</h4>
            <ul>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/rules">Hướng dẫn chơi</Link></li>
              <li><Link to="/gallery">Hình ảnh game</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>THÔNG TIN GAME</h4>
            <ul>
              <li>Số người chơi: 2-6 người</li>
              <li>Thời gian: 45-60 phút</li>
              <li>Độ tuổi: 12+</li>
              <li>Thể loại: Chiến thuật, Lịch sử</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>LIÊN HỆ</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>xtbh@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+84 903781862</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Cần Thơ , Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Xuân Thu Bách Hội. Tất cả quyền được bảo lưu.</p>
          <div className="footer-links">
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
