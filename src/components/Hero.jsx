import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, Play } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-main">XUÂN THU</span>
              <span className="hero-title-sub">BÁCH HỘI</span>
            </h1>
            <p className="hero-subtitle">
              Khám phá lịch sử Việt Nam qua từng nước đi
            </p>
            <p className="hero-description">
              Trải nghiệm board game chiến thuật đầy thú vị, nơi bạn sẽ du hành qua 
              các thời kỳ lịch sử và học hỏi về những sự kiện quan trọng của dân tộc Việt Nam.
            </p>
            
            <div className="hero-actions">
              <Link to="/about" className="btn btn-primary">
                Khám phá ngay
              </Link>
              <Link to="/rules" className="btn btn-secondary">
                <Play size={20} />
                Hướng dẫn chơi
              </Link>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-number">2-6</span>
                <span className="feature-label">người chơi</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">45-60</span>
                <span className="feature-label">phút</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">12+</span>
                <span className="feature-label">tuổi</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="game-preview-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card-content">
                <div className="game-board-mini">
                  <div className="board-squares">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div key={i} className={`square square-${i % 4}`}></div>
                    ))}
                  </div>
                  <div className="game-pieces">
                    <div className="piece piece-1"></div>
                    <div className="piece piece-2"></div>
                    <div className="piece piece-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <ArrowDown size={24} />
          <span>Cuộn xuống để khám phá</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
