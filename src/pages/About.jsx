import React from 'react'
import { BookOpen, Target, Users, Award, Clock, MapPin } from 'lucide-react'
import './About.css'

const About = () => {
  const features = [
    {
      icon: <BookOpen size={48} />,
      title: 'Giáo dục lịch sử',
      description: 'Học hỏi về các triều đại, sự kiện và nhân vật lịch sử Việt Nam một cách sinh động và thú vị.'
    },
    {
      icon: <Target size={48} />,
      title: 'Tư duy chiến thuật',
      description: 'Rèn luyện khả năng lập kế hoạch, ra quyết định và tư duy logic thông qua các nước đi.'
    },
    {
      icon: <Users size={48} />,
      title: 'Tương tác xã hội',
      description: 'Tăng cường gắn kết gia đình và bạn bè thông qua hoạt động chơi game cùng nhau.'
    },
    {
      icon: <Award size={48} />,
      title: 'Giải trí chất lượng',
      description: 'Trải nghiệm giải trí lành mạnh, bổ ích và phù hợp với mọi lứa tuổi.'
    }
  ]

  const gameSpecs = [
    { icon: <Users size={24} />, label: 'Số người chơi', value: '2-6 người' },
    { icon: <Clock size={24} />, label: 'Thời gian chơi', value: '45-60 phút' },
    { icon: <BookOpen size={24} />, label: 'Độ tuổi', value: '12+ tuổi' },
    { icon: <MapPin size={24} />, label: 'Thể loại', value: 'Chiến thuật, Lịch sử' }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Về Xuân Thu Bách Hội</h1>
            <p>Khám phá lịch sử Việt Nam qua board game chiến thuật đầy thú vị</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2 className="section-title">Lịch sử còn - Dân tộc còn</h2>
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
            </div>
            <div className="intro-visual">
              <div className="history-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Triều Lý (1009-1225)</h4>
                    <p>Thời kỳ thịnh vượng của Đại Việt</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Triều Trần (1225-1400)</h4>
                    <p>Kháng chiến chống quân Nguyên Mông</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Triều Lê (1428-1789)</h4>
                    <p>Thời kỳ phục hưng và mở rộng lãnh thổ</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Triều Nguyễn (1802-1945)</h4>
                    <p>Triều đại cuối cùng của chế độ phong kiến</p>
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
          <h2 className="section-title">Tại sao chọn Xuân Thu Bách Hội?</h2>
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
              <h2 className="section-title">Sứ mệnh của chúng tôi</h2>
              <p>
                Chúng tôi tin rằng việc học lịch sử không nhất thiết phải khô khan và nhàm chán. 
                Thông qua "Xuân Thu Bách Hội", chúng tôi mong muốn:
              </p>
              <ul className="mission-list">
                <li>Khơi gợi niềm yêu thích lịch sử Việt Nam trong thế hệ trẻ</li>
                <li>Tạo ra một phương pháp giáo dục tương tác và thú vị</li>
                <li>Bảo tồn và lan tỏa những giá trị văn hóa truyền thống</li>
                <li>Xây dựng cầu nối giữa quá khứ và hiện tại</li>
              </ul>
            </div>
            <div className="mission-visual">
              <div className="mission-card">
                <div className="card-header">
                  <h3>Hành trình lịch sử</h3>
                </div>
                <div className="card-body">
                  <div className="journey-path">
                    <div className="path-point active">
                      <span className="point-icon">🏛️</span>
                      <span className="point-label">Bắt đầu</span>
                    </div>
                    <div className="path-line"></div>
                    <div className="path-point">
                      <span className="point-icon">⚔️</span>
                      <span className="point-label">Chiến tranh</span>
                    </div>
                    <div className="path-line"></div>
                    <div className="path-point">
                      <span className="point-icon">👑</span>
                      <span className="point-label">Thống nhất</span>
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
    </div>
  )
}

export default About
