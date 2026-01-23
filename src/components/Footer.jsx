import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section brand">
            <h3>XUÂN THU BÁCH HỘI</h3>
            <p>
              Dự án Xuân Thu Bách Hội. Gìn giữ di sản, kiến tạo giải thưởng toàn cầu cho tinh thần văn hóa truyền thống.
            </p>

          </div>

          <div className="footer-section">
            <h4>LIÊN KẾT NHANH</h4>
            <ul>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
              <li><Link to="/shopping">Cộng đồng</Link></li>
              <li><a href="#">Hỗ trợ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>THÔNG SỐ GAME</h4>
            <ul>
              <li><span className="footer-accent"></span> 2-6 người</li>
              <li><span className="footer-accent"></span> 45-60 phút</li>
              <li><span className="footer-accent"></span> Tuổi: 12+</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>LIÊN HỆ</h4>
            <ul>
              <li><span className="footer-accent"></span> Cần Thơ, Việt Nam</li>
              <li><span className="footer-accent"></span> Dự án Di sản Việt</li>
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
