import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Clock, Baby } from 'lucide-react'
import './Home.css'

const Home = () => {
  const featureCards = [
    {
      title: 'Hành Trình Bốn Mùa',
      description: 'Hành trình khám phá văn hóa Việt từ đền Hùng đến miền Tây Nam Bộ',
      icon: '🌸'
    },
    {
      title: 'Chiến Thuật Lộc Xuân',
      description: 'Kết hợp thú vị giữa vận may và chiến thuật, mỗi nước đi là một câu chuyện',
      icon: '🧧'
    },
    {
      title: 'Tuyệt Tác Dân Gian',
      description: 'Chất liệu giấy mỹ thuật, hộp tranh khắc gỗ, mang đậm nét văn hóa Việt',
      icon: '🎴'
    }
  ]

  const stats = [
    { label: 'Số người chơi', value: '2 - 6', icon: <Users size={24} /> },
    { label: 'Thời lượng', value: '45-60 m', icon: <Clock size={24} /> },
    { label: 'Độ tuổi', value: '12+', icon: <Baby size={24} /> }
  ]

  const testimonials = [
    {
      name: 'Thế Văn',
      role: 'Sinh viên',
      quote: 'Là một sinh viên, mình thấy trò chơi cực kỳ cuốn hút, mang lại sự tìm tòi và giúp mình hiểu sâu hơn về ý nghĩa của các lễ hội truyền thống hay những câu lạc bộ “khám phá lịch sử”.'
    },
    {
      name: 'Huỳnh Châu',
      role: 'Phụ huynh',
      quote: 'Tôi rất yêu thích những món quà ý nghĩa cho gia đình. Xuân Thu Bách Hội giúp gắn kết các thành viên và lưu giữ giá trị cội nguồn cho lũ trẻ.'
    }
  ]

  return (
    <div className="home">
      <section className="hero-banner">
        <div className="hero-backdrop"/>
        <div className="container">
          <div className="hero-content">
            <div className="hero-pill">KHƠI DẬY DI SẢN - KẾT NỐI TƯƠNG LAI</div>
            <h1 className="hero-title">
              <span className="hero-title-main">XUÂN THU</span>
              <span className="hero-title-sub">BÁCH HỘI</span>
            </h1>
            <p className="hero-subtitle">
              Hóa thân thành nhà tổ chức lễ hội tài ba, du hành qua bốn mùa di sản Việt Nam trên bàn cờ chiến thuật đỉnh cao.
            </p>
            <div className="hero-actions">
              <Link to="/shopping" className="btn hero-btn-primary">
                Sở hữu báu vật - 299.000đ
              </Link>
              <Link to="/about" className="btn hero-btn-ghost">
                Khám phá hành trình
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro-block">
        <div className="container">
          <h2 className="section-heading">Nơi Tinh Hoa Hội Tụ</h2>
          <p className="section-lead">
            Hơn cả một trò chơi, đây là bản giao hưởng giữa trí tuệ hiện đại và hồn cốt dân tộc, nơi mỗi nước đi đều thấm đượm phong vị quê hương.
          </p>
          <div className="feature-grid">
            {featureCards.map((card) => (
              <div className="feature-card-home" key={card.title}>
                <span className="feature-icon-home" aria-hidden="true">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section-home">
        <div className="container">
          <div className="stats-heading">
            <span className="stats-heading-icon" aria-hidden="true">✦</span>
            <span>Thông số cuộc chơi</span>
          </div>
          <div className="stats-grid-home">
            {stats.map((item) => (
              <div className="stat-card-home" key={item.label}>
                <div className="stat-icon">{item.icon}</div>
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial-block">
        <div className="container">
          <h2 className="section-heading">Chia Sẻ Từ Cộng Đồng</h2>
          <p className="section-lead subtle">Những cảm xúc thật từ những người đã chạm tay vào di sản.</p>
          <div className="testimonial-grid-home">
            {testimonials.map((item) => (
              <div className="testimonial-card-home" key={item.name}>
                <p className="testimonial-quote">“{item.quote}”</p>
                <div className="testimonial-author">
                  <div className="author-name">{item.name}</div>
                  <div className="author-role">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
