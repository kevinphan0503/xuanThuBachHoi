import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* <div className="footer-section brand">
            <h3>XUÂN THU BÁCH HỘI</h3>
            <p>
              Dự án Xuân Thu Bách Hội. Gìn giữ di sản, kiến tạo giải thưởng toàn cầu cho tinh thần văn hóa truyền thống.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div> */}

          <div className="footer-section">
            <h4>DNTN XUÂN THU BÁCH HỘI</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span style={{ marginLeft: '10px' }}>xuanthubachhoi@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span style={{ marginLeft: '10px' }}>+84 931663455</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span style={{ marginLeft: '10px' }} >Cần Thơ , Việt Nam</span>
              </div>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>LIÊN KẾT NHANH</h4>
            <ul>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/contact">Hỗ trợ</Link></li>
              <li><Link to="/shopping">Cửa hàng</Link></li>
              <li><a href="/contact">Liên hệ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            {/* <h4>THÔNG TIN KHÁC</h4> */}
            <h4 style={{ marginTop: '30px' }}></h4>
            <ul>
              <li><span className="footer-accent"></span>ĐIỀU KHOẢN GIAO DỊCH CHUNG</li>
              <li><span className="footer-accent"></span>CHÍNH SÁCH GIAO HÀNG</li>
              <li><span className="footer-accent"></span>CHÍNH SÁCH THANH TOÁN</li>
              <li><span className="footer-accent"></span>CHÍNH SÁCH HOÀN TIỀN</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Xuân Thu Bách Hội. Bản quyền thuộc về đội ngũ phát triển.</p>
          <div className="footer-links">
            <a href="#">Bảo mật</a>
            <a href="#">Điều khoản</a>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
