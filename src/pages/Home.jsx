import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Clock, Target, BookOpen, Trophy, Star } from 'lucide-react'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import GamePreview from '../components/GamePreview'
import TestimonialSection from '../components/TestimonialSection'
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: <Users size={48} />,
      title: 'Đa người chơi',
      description: 'Chơi cùng 2-6 người, tạo không khí vui vẻ và cạnh tranh'
    },
    {
      icon: <Clock size={48} />,
      title: 'Thời gian linh hoạt',
      description: 'Mỗi ván chơi kéo dài 45-60 phút, phù hợp cho mọi lứa tuổi'
    },
    {
      icon: <BookOpen size={48} />,
      title: 'Giáo dục lịch sử',
      description: 'Học hỏi về lịch sử và văn hóa Việt Nam qua từng nước đi'
    },
    {
      icon: <Target size={48} />,
      title: 'Chiến thuật',
      description: 'Rèn luyện tư duy chiến thuật và khả năng ra quyết định'
    }
  ]

  const gameStats = [
    { number: '54', label: 'Tỉnh thành Việt Nam' },
    { number: '1000+', label: 'Sự kiện lịch sử' },
    { number: '50+', label: 'Nhân vật lịch sử' },
    { number: '4.8/5', label: 'Đánh giá từ người chơi' }
  ]

  return (
    <div className="home">
      <Hero />
      
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2 className="section-title">Xuân Thu Bách Hội</h2>
              <h3 className="intro-subtitle">Lịch sử còn - Dân tộc còn</h3>
              <p className="intro-description">
                Với "XUÂN THU BÁCH HỘI", chúng tôi mang đến một trải nghiệm giải trí độc đáo, 
                gắn liền với các giá trị về lịch sử, văn hóa và di sản Việt Nam. Người chơi sẽ 
                du hành qua các thời kỳ lịch sử và tiếp cận những sự kiện quan trọng của dân tộc, 
                đồng thời được giáo dục về giá trị truyền thống và tinh thần yêu nước.
              </p>
              <p className="intro-description">
                "XUÂN THU BÁCH HỘI" không chỉ là trò chơi mà còn là kết tinh của tinh thần 
                tri thức & sáng tạo, khơi gợi tư duy và phát triển những ý tưởng đóng góp vào 
                sự hiểu biết về lịch sử nước nhà.
              </p>
              <div className="intro-actions">
                <Link to="/about" className="btn">
                  Tìm hiểu thêm
                  <ArrowRight size={20} />
                </Link>
                <Link to="/rules" className="btn btn-secondary">
                  Hướng dẫn chơi
                </Link>
              </div>
            </div>
            <div className="intro-image">
              <div className="game-board-preview">
                <div className="board-grid">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="board-cell">
                      <div className="cell-content">
                        {i === 2 && <Trophy className="cell-icon" />}
                        {i === 5 && <Star className="cell-icon" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureSection features={features} />

      <section className="section stats-section gradient-bg">
        <div className="container">
          <div className="stats-grid">
            {gameStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GamePreview />

      <TestimonialSection />

      <section className="section cta-section gradient-bg-2">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn sàng trải nghiệm?</h2>
            <p>Hãy bắt đầu hành trình khám phá lịch sử Việt Nam ngay hôm nay!</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn">
                Liên hệ mua game
              </Link>
              <Link to="/gallery" className="btn btn-secondary">
                Xem hình ảnh
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
