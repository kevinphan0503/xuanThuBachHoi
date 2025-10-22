import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Clock, Target, BookOpen, Trophy, Star, Music, Camera, Gift, Heart } from 'lucide-react'
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
      description: 'Chơi cùng 2-6 người, mỗi người đóng vai một "nhà tổ chức lễ hội"'
    },
    {
      icon: <Clock size={48} />,
      title: 'Thời gian linh hoạt',
      description: 'Mỗi ván chơi kéo dài 40-60 phút, phù hợp cho mọi lứa tuổi'
    },
    {
      icon: <BookOpen size={48} />,
      title: 'Học mà chơi',
      description: 'Tiếp thu kiến thức về lễ hội, trò chơi dân gian và nghi thức truyền thống'
    },
    {
      icon: <Target size={48} />,
      title: 'Chiến thuật',
      description: 'Phát triển lễ hội bằng bánh mứt, trang trí và hoạt động để tăng thu nhập'
    }
  ]

  const gameStats = [
    { number: '40', label: 'Ô lễ hội trên bàn cờ' },
    { number: '60', label: 'Thẻ Lộc Xuân & Gieo Quẻ' },
    { number: '30+', label: 'Lễ hội truyền thống' },
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
              <h3 className="intro-subtitle">Khám phá văn hóa - Kết nối cộng đồng</h3>
              <p className="intro-description">
               Xuân Thu Bách Hội là một board game chiến thuật, kết hợp yếu tố mô phỏng, thẻ kiến thức và thử thách vui nhộn. 
                Trò chơi lấy cảm hứng từ lễ hội truyền thống khắp ba miền, được thiết kế vui tươi, đậm chất dân gian và phù hợp với mọi lứa tuổi.
              </p>
              <p className="intro-description">
                Trong trò chơi, bạn sẽ đi khắp các vùng miền để mua quyền tổ chức các lễ hội (Hội Lim, Chọi Trâu, Lễ hội Cà phê, Giỗ Tổ Hùng Vương...), 
                nâng cấp lễ hội bằng bánh mứt, trang trí, hoạt động, rút thẻ Lộc Xuân để nhận kiến thức văn hóa và cơ hội, 
                hoặc rút thẻ Gieo Quẻ để gặp những thử thách hài hước và kịch tính.
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
                        {i === 0 && <span className="festival-icon">🎭</span>}
                        {i === 1 && <span className="festival-icon">🏮</span>}
                        {i === 2 && <span className="festival-icon">🥁</span>}
                        {i === 3 && <span className="festival-icon">🎪</span>}
                        {i === 4 && <span className="festival-icon">🎨</span>}
                        {i === 5 && <span className="festival-icon">🎊</span>}
                        {i === 6 && <span className="festival-icon">🎵</span>}
                        {i === 7 && <span className="festival-icon">🎉</span>}
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

     

      <GamePreview />

      <TestimonialSection />

      <section className="section cta-section gradient-bg-2">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn sàng trải nghiệm?</h2>
            <p>Hãy bắt đầu hành trình khám phá lễ hội truyền thống Việt Nam ngay hôm nay!</p>
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
