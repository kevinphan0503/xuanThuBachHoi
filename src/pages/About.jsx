import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, Users, MapPin, Shield, Sparkles, GraduationCap, Play } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'
import { API_BASE_URL } from '../config/api'
import './About.css'
import f1 from '../../assets/hoi3.png'
import f2 from '../../assets/hoi4.png'
import f3 from '../../assets/festival-placeholder-3.svg'
import f4 from '../../assets/festival-placeholder-4.svg'
import f5 from '../../assets/festival-placeholder-5.svg'
import f6 from '../../assets/anhhdsd.jpg'
const About = () => {
  const heroRef = useScrollReveal()
  const introRef = useScrollReveal()
  const featuresRef = useScrollReveal()
  const missionRef = useScrollReveal()

  const [festivals, setFestivals] = useState([])
  const [loadingFestivals, setLoadingFestivals] = useState(true)
  const [festivalError, setFestivalError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      try {
        setLoadingFestivals(true)
        setFestivalError('')
        const res = await fetch(`${API_BASE_URL}/api/festivals`)
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data = await res.json()
        if (active) setFestivals(Array.isArray(data) ? data : [])
      } catch (err) {
        if (active) setFestivalError(err.message || 'Failed to load festivals')
      } finally {
        if (active) setLoadingFestivals(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const coreGoals = [
    {
      icon: <Shield size={26} />,
      title: 'Gìn giữ truyền thống',
      description: 'Mỗi ô lễ hội, thẻ kiến thức và thử thách đều phản ánh nét đẹp phong tục Việt.'
    },
    {
      icon: <Target size={26} />,
      title: 'Học mà chơi',
      description: 'Người chơi tiếp thu kiến thức về lễ hội, trò chơi dân gian và nghi thức truyền thống.'
    },
    {
      icon: <Users size={26} />,
      title: 'Kết nối cộng đồng',
      description: 'Thử thách tương tác như hát dân ca, múa, nhảy dân gian tạo không khí vui vẻ.'
    }
  ]

  const journeySteps = [
    { label: 'Giai đoạn 1', title: 'Bắt đầu', desc: 'Chọn gia tộc và làng xuất phát', icon: <Play size={18} /> },
    { label: 'Giai đoạn 2', title: 'Du hành', desc: 'Khám phá bản đồ lễ hội theo mùa', icon: <MapPin size={18} /> },
    { label: 'Giai đoạn 3', title: 'Lễ hội', desc: 'Hoàn tất nghi lễ và thu thập bùa may', icon: <Sparkles size={18} /> },
    { label: 'Về đích', title: 'Chiến thắng', desc: 'Trở thành Bậc thầy Thủ hộ', icon: <GraduationCap size={18} /> }
  ]

  const showcaseFestivals = festivals.slice(0, 4)

  const fallbackFestivals = [
    { name: 'Hội Lim', description: 'Cái nôi của những làn điệu Quan họ' },
    { name: 'Chọi Trâu', description: 'Sức mạnh và tinh thần đoàn kết' },
    { name: 'Hội Gióng', description: 'Huyền thoại người anh hùng ngựa sắt' },
    { name: 'Chùa Hương', description: 'Hành trình trảy hội mùa xuân' }
  ]

  const festivalsToRender = showcaseFestivals.length ? showcaseFestivals : fallbackFestivals
  const fallbackDescriptions = [
    'Khám phá làn điệu Quan họ say đắm lòng người',
    'Không khí hào hùng của lễ hội đấu trí và sức mạnh',
    'Truyền thuyết người anh hùng cưỡi ngựa sắt',
    'Hành trình trẩy hội trên non nước hữu tình'
  ]
  const placeholders = [f1, f2, f3, f4, f5, f6  ]

  return (
    <div className="about-page">
      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-card">
            <div className="hero-content">
              <h1>Xuân Thu Bách Hội: Board game Văn hóa Truyền thống</h1>
              <p>
                Trải nghiệm tìm hiểu trực quan và thú vị về Việt Nam thông qua hành trình chiến thuật của bộ sưu tập lễ hội truyền thống.
              </p>
              <div className="hero-actions">
                <Link to="/" className="btn-secondary">Xem Trailer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="story-panel" ref={introRef}>
        <div className="container">
          <div className="story-banner">
            <div className="story-overlay">
              <h2>Giai thoại lịch sử</h2>
              <p>
                Xuân Thu Bách Hội gợi cảm hứng từ cộng đồng ASEAN chung bước xây dựng tương lai, với mỗi bước đi là một câu chuyện lịch sử.
              </p>
              <div className="story-badge">100+ sự kiện di sản</div>
            </div>
          </div>
        </div>
      </section>

      <section className="core-goals" ref={featuresRef}>
        <div className="container">
          <h2 className="section-title">Mục tiêu Cốt lõi</h2>
          <div className="goals-grid">
            {coreGoals.map((item) => (
              <div className="goal-card" key={item.title}>
                <div className="goal-icon">{item.icon}</div>
                <div className="goal-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="components-section">
        <div className="container components-grid">
          <div className="components-text">
            <h2>Thành phần Trò chơi</h2>
            <p>
              Mỗi lá bài trong Xuân Thu Bách Hội là một tác phẩm nghệ thuật, được thiết kế tỉ mỉ để phản ánh linh hồn Việt Nam.
              Từ vùng cao phía Bắc đến đồng bằng sông Cửu Long, hãy khám phá sự đa dạng của đất nước.
            </p>
            <div className="stat-cards">
              <div className="stat-card orange">
                <span className="stat-value">15+</span>
                <span className="stat-label">Lễ hội độc đáo</span>
              </div>
              <div className="stat-card blue">
                <span className="stat-value">20+</span>
                <span className="stat-label">Thẻ thử thách</span>
              </div>
            </div>
          </div>
          <div className="components-visual">
            <div className="visual-item large">
              <img src={f1} alt="Lễ hội" />
            </div>
            <div className="visual-item">
              <img src={f2} alt="Lễ hội" />
            </div>
          </div>
        </div>
      </section>

     

   

      <section className="howto-video-section">
        <div className="container">
          <div className="howto-header">
            <h2>Video Hướng dẫn Chơi</h2>
            <p>Chỉ mất vài phút để nắm vững các quy tắc cơ bản và bắt đầu hành trình bảo tồn di sản của riêng bạn.</p>
          </div>
          <div className="howto-video-shell">
            <div className="howto-video-frame">
              <video
                src="/assets/HDSD.mov"
                controls
                poster={f6}
              >
                Trình duyệt của bạn không hỗ trợ video.
              </video>
              <div className="howto-video-label">Khám phá luật chơi Xuân Thu Bách Hội</div>
            </div>
            <div className="howto-video-meta">
              <span className="howto-video-caption">
                Tải xuống bản PDF luật chơi chi tiết từ mục Tài liệu nếu bạn muốn xem lại ngoại tuyến.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-section" ref={missionRef}>
        <div className="container">
          <div className="section-heading">
            <h2>Hành trình Trò chơi</h2>
            <p>Con đường từ người học việc đến Bậc thầy Thủ hộ</p>
          </div>
          <div className="journey-track">
            {journeySteps.map((step, index) => (
              <div className="journey-step" key={step.title}>
                <div className="journey-dot" />
                <div className="journey-card">
                  <h4>{step.label}</h4>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {index < journeySteps.length - 1 && <div className="journey-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-card">
          <h2>Sẵn sàng bảo tồn lịch sử?</h2>
          <p>Tham gia cùng những người yêu di sản để khám phá vẻ đẹp của lễ hội truyền thống Việt Nam.</p>
          <div className="cta-actions">
            <Link to="/shopping" className="btn-solid">Đặt trước Board Game</Link>
            <Link to="/about" className="btn-ghost">Tham gia Cộng đồng</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
