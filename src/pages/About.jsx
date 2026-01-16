import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Target, Users, Award, Clock, MapPin } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'
import { API_BASE_URL } from '../config/api'
import './About.css'
import f1 from '../../assets/festival-placeholder-1.svg'
import f2 from '../../assets/festival-placeholder-2.svg'
import f3 from '../../assets/festival-placeholder-3.svg'
import f4 from '../../assets/festival-placeholder-4.svg'
import f5 from '../../assets/festival-placeholder-5.svg'

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
          <div className="hero-content" ref={heroRef}>
            <h1>Xuân Thu Bách Hội — Board game Văn hóa Truyền thống</h1>
            <p>
              Xuân Thu Bách Hội là board game chiến thuật, kết hợp yếu tố mô phỏng, thẻ kiến thức và thử thách vui nhộn.
              Trò chơi lấy cảm hứng từ lễ hội truyền thống khắp ba miền, được thiết kế vui tươi, đậm chất dân gian và phù hợp với mọi lứa tuổi.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      {/* Introduction Section */}
      <section className="section intro-section">
        <div className="container">
          <h2 className="section-title center">Giới thiệu</h2>

          <div className="intro-grid" ref={introRef}>
            {/* LEFT CONTENT */}
            <div className="intro-cards">
              <div className="intro-card highlight">
                <h3>🌸 Xuân Thu Bách Hội</h3>
                <p>
                  Không chỉ là trò chơi giải trí, Xuân Thu Bách Hội còn là hành trình khám phá
                  lễ hội truyền thống Việt Nam. Mỗi lượt đi là một câu chuyện văn hóa – nơi
                  chiến thuật song hành cùng tri thức dân gian.
                </p>
              </div>

              <div className="intro-card">
                <h3>🎯 Mục tiêu</h3>
                <ul>
                  <li>Trở thành nhà tổ chức lễ hội thành công nhất</li>
                  <li>Gìn giữ & lan tỏa giá trị truyền thống</li>
                  <li>Kết nối cộng đồng qua thử thách tương tác</li>
                </ul>
              </div>

              <div className="intro-card">
                <h3>✨ Điểm nổi bật</h3>
                <ul>
                  <li>40 lễ hội tiêu biểu khắp Việt Nam</li>
                  <li>60 thẻ kiến thức & thử thách dân gian</li>
                  <li>Nâng cấp lễ hội bằng Bánh – Mứt – Trang trí</li>
                </ul>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="festival-panel">
              <h3 className="panel-title">📍 Lễ hội trong trò chơi</h3>

              <div className="festival-scroll">
                {loadingFestivals && <p>Đang tải lễ hội…</p>}
                {festivalError && <p className="error">{festivalError}</p>}

                {!loadingFestivals &&
                  !festivalError &&
                  festivals.map((f, idx) => (
                    <Link
                      to={`/festivals/${f.festival_id}`}
                      key={f.festival_id ?? idx}
                      className="festival-item-card"
                    >
                      <span className="dot" />
                      <span>{f.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container" ref={featuresRef}>
          <h2 className="section-title reveal-text">Tại sao chọn XUÂN THU BÁCH HỘI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card reveal-text reveal-delay-${index + 1}`}>
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
        <div className="container" ref={missionRef}>
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title reveal-text">Ý nghĩa của trò chơi</h2>
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



    </div>
  )
}

export default About
