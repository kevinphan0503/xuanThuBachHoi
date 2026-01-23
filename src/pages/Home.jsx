import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Clock, Baby, BookOpen, Codepen } from 'lucide-react'
import './Home.css'

const Home = () => {
  const featureCards = [
    {
      title: 'Hành Trình Bốn Mùa',
      description: 'Hành trình khám phá văn hóa trải dài từ Bắc vào Nam qua bốn mùa lễ hội.',
      icon: '🌸'
    },
    {
      title: 'Chiến Thuật Lộc Xuân',
      description: 'Kết hợp thú vị giữa vận may và chiến thuật, mỗi nước đi là một câu chuyện.',
      icon: '🧧'
    },
    {
      title: 'Học mà chơi - Chơi mà học',
      description: 'Tiếp thu kiến thức về lễ hội, trò chơi dân gian và nghi thức truyền thống.',
      icon: '🎴'
    }
  ]

  const stats = [
    { icon: <Codepen size={24} />, label: 'Thể loại', value: 'Chiến thuật' },
    { icon: <Users size={24} />, label: 'Số người chơi', value: '2-6 người' },
    { icon: <Clock size={24} />, label: 'Thời gian chơi', value: '40-60 phút' },
    { icon: <BookOpen size={24} />, label: 'Độ tuổi', value: '12+' },
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
        <div className="hero-backdrop" ></div>
      </section>
      <section className="section intro-block" style={{ background: '#fefbd9' }}>
        <div className="container">
          <h2 className="section-heading">Xuân Thu Bách Hội</h2>
          <p className="section-lead">
            Boardgame trải nghiệm lấy cảm hứng từ các lễ hội truyền thống Việt Nam.
          </p>
          <p className="section-lead" style={{ marginTop: '-40px', width: '80%', maxWidth: '820px' }}>
            Thông qua tương tác và những lựa chọn trong quá trình chơi, người chơi sẽ cùng nhau khám phá văn hoá, kết nối và trải nghiệm vào không gian lễ hội theo cách gần gũi và sống động.
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

      <section className="section testimonial-block" style={{ background: '#fefbd9' }}>
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
