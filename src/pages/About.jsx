import React from 'react'
import { BookOpen, Target, Users, Award, Clock, MapPin } from 'lucide-react'
import './About.css'
import f1 from '../../assets/festival-placeholder-1.svg'
import f2 from '../../assets/festival-placeholder-2.svg'
import f3 from '../../assets/festival-placeholder-3.svg'
import f4 from '../../assets/festival-placeholder-4.svg'
import f5 from '../../assets/festival-placeholder-5.svg'

const About = () => {
  const features = [
    {
      icon: <BookOpen size={48} />,
      title: 'Gìn giữ truyền thống',
      description: 'Mỗi ô lễ hội, thẻ kiến thức và thử thách đều phản ánh nét đẹp phong tục Việt.'
    },
    {
      icon: <Target size={48} />,
      title: 'Học mà chơi',
      description: 'Người chơi tiếp thu kiến thức về lễ hội, trò chơi dân gian và nghi thức truyền thống.'
    },
    {
      icon: <Users size={48} />,
      title: 'Kết nối cộng đồng',
      description: 'Thử thách tương tác như hát dân ca, múa, nhảy dân gian tạo không khí vui vẻ.'
    }
  ]

  const gameSpecs = [
    { icon: <Users size={24} />, label: 'Số người chơi', value: '2-6 người' },
    { icon: <Clock size={24} />, label: 'Thời gian chơi', value: '40-60 phút' },
    { icon: <BookOpen size={24} />, label: 'Độ tuổi', value: 'Mọi lứa tuổi' },
    { icon: <MapPin size={24} />, label: 'Thể loại', value: 'Chiến thuật, Văn hóa' }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Xuân Thu Bách Hội — Board game Văn hóa Truyền thống</h1>
            <p>
              Xuân Thu Bách Hội là board game chiến thuật, kết hợp yếu tố mô phỏng, thẻ kiến thức và thử thách vui nhộn. 
              Trò chơi lấy cảm hứng từ lễ hội truyền thống khắp ba miền, được thiết kế vui tươi, đậm chất dân gian và phù hợp với mọi lứa tuổi.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2 className="section-title">Giới thiệu</h2>
              <p className="intro-description">
                XUÂN THU BÁCH HỘI không chỉ là trò chơi giải trí mà còn là phương tiện truyền tải giá trị văn hóa. 
                Mỗi lượt đi là một hành trình khám phá văn hóa — vừa chiến thuật để phát triển lễ hội, vừa học hỏi về phong tục, ẩm thực và truyền thống.
              </p>
              <h3>Mục tiêu</h3>
              <ul className="intro-description">
                <li>Trở thành nhà tổ chức lễ hội có quy mô, thương hiệu và tài sản lớn nhất khi ván chơi kết thúc.</li>
                <li>Gìn giữ và lan tỏa giá trị truyền thống qua từng ô lễ hội và thẻ kiến thức.</li>
                <li>Kết nối cộng đồng thông qua các thử thách tương tác vui nhộn.</li>
              </ul>
              <h3>Điểm nổi bật</h3>
              <ul className="intro-description">
                <li>40 ô trên bàn cờ bao gồm các lễ hội khắp Việt Nam.</li>
                <li>60 thẻ Lộc Xuân và Gieo Quẻ với kiến thức văn hóa và thử thách.</li>
                <li>Cơ chế nâng cấp lễ hội bằng Bánh, Mứt, Trang trí, Hoạt động.</li>
              </ul>
            </div>
            <div className="intro-visual">
              <div className="festival-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Hội Lim</h4>
                    <p>Lễ hội quan họ Bắc Ninh</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Chọi Trâu</h4>
                    <p>Lễ hội truyền thống Đồ Sơn</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Giỗ Tổ Hùng Vương</h4>
                    <p>Lễ hội đền Hùng Phú Thọ</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Lễ hội Cà phê</h4>
                    <p>Festival cà phê Buôn Ma Thuột</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Tại sao chọn XUÂN THU BÁCH HỘI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Specifications */}
      <section className="section specs-section gradient-bg">
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Thông số game</h2>
          <div className="specs-grid">
            {gameSpecs.map((spec, index) => (
              <div key={index} className="spec-item">
                <div className="spec-icon">
                  {spec.icon}
                </div>
                <div className="spec-content">
                  <h4>{spec.label}</h4>
                  <span>{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Ý nghĩa của trò chơi</h2>
              <p>
                XUÂN THU BÁCH HỘI không chỉ là trò chơi giải trí mà còn là phương tiện truyền tải giá trị văn hóa. 
                Thông qua trò chơi, chúng tôi mong muốn:
              </p>
              <ul className="mission-list">
                <li>Gìn giữ và lan tỏa giá trị truyền thống qua từng ô lễ hội và thẻ kiến thức</li>
                <li>Học mà chơi — chơi mà học: Tiếp thu kiến thức về lễ hội và nghi thức truyền thống</li>
                <li>Kết nối cộng đồng: Thử thách tương tác tạo không khí vui vẻ, khuyến khích giao lưu</li>
                <li>Truyền cảm hứng sáng tạo: Tự do nâng cấp và biến lễ hội trở nên độc đáo</li>
              </ul>
            </div>
            <div className="mission-visual">
              <div className="mission-card">
                <div className="card-header">
                  <h3>Hành trình lễ hội</h3>
                </div>
                <div className="card-body">
                  <div className="journey-path">
                    <div className="path-point active">
                      <span className="point-icon">🎉</span>
                      <span className="point-label">Bắt đầu</span>
                    </div>
                    <div className="path-line"></div>
                    <div className="path-point">
                      <span className="point-icon">🏮</span>
                      <span className="point-label">Mua lễ hội</span>
                    </div>
                    <div className="path-line"></div>
                    <div className="path-point">
                      <span className="point-icon">🎭</span>
                      <span className="point-label">Nâng cấp</span>
                    </div>
                    <div className="path-line"></div>
                    <div className="path-point">
                      <span className="point-icon">🏆</span>
                      <span className="point-label">Chiến thắng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Gallery Section */}
      <section className="section festival-gallery-section">
        <div className="container">
          <h2 className="section-title">Lễ hội tiêu biểu</h2>
          <p className="gallery-intro">Một số lễ hội tiêu biểu được truyền cảm hứng trong trò chơi — bạn có thể thay bằng ảnh thật.</p>
          <div className="festival-grid">
            <div className="festival-item"><img src={f1} alt="Lễ hội 1"/></div>
            <div className="festival-item"><img src={f2} alt="Lễ hội 2"/></div>
            <div className="festival-item"><img src={f3} alt="Lễ hội 3"/></div>
            <div className="festival-item"><img src={f4} alt="Lễ hội 4"/></div>
            <div className="festival-item"><img src={f5} alt="Lễ hội 5"/></div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
