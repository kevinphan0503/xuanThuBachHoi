import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, Play } from 'lucide-react'
import RotatableImage from './RotatableImage'
import biaImg from '../../assets/bia.png'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* TEXT */}
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-main">XUÂN THU </span>
              
              <span className="hero-title-sub">BÁCH HỘI</span>
            </h1>

            <p className="hero-subtitle">
              Khám phá văn hóa lễ hội Việt Nam qua từng nước đi
            </p>
            <p className="hero-description">
              Trải nghiệm board game chiến thuật đầy thú vị, nơi bạn sẽ du hành qua
              các lễ hội đặc trưng ở khắp đất nước và học hỏi về những kiến thức văn hóa.
            </p>

            <div className="hero-actions">
              <Link to="/about" className="btn btn-primary">
                Khám phá ngay
              </Link>
              <Link to="/rules" className="btn btn-secondary">
                <Play size={18} />
                Hướng dẫn chơi
              </Link>
            </div>

          
          </div>

          {/* IMAGE */}
          <div className="hero-visual">
            <RotatableImage
              src={biaImg}
              alt="Bàn cờ Xuân Thu Bách Hội"
              size="400%"
            />
          </div>
        </div>

        {/* Scroll */}
        <div className="scroll-indicator">
          <ArrowDown size={22} />
          <span>Cuộn xuống</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
