import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Clock, BookOpen } from 'lucide-react'
import './GamePreview.css'

const GamePreview = () => {
  const gameInfo = [
    {
      icon: <Users size={24} />,
      title: 'Số người chơi',
      value: '2-6 người',
      description: 'Phù hợp cho gia đình và nhóm bạn'
    },
    {
      icon: <Clock size={24} />,
      title: 'Thời gian chơi',
      value: '45-60 phút',
      description: 'Thời gian lý tưởng cho một buổi tối'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Độ tuổi',
      value: '12+',
      description: 'Phù hợp với mọi lứa tuổi'
    }
  ]

  return (
    <section className="section game-preview-section">
      <div className="container">
        <div className="game-preview-content">
          <div className="game-preview-text">
            <h2 className="section-title">Board Game "Xuân Thu Bách Hội"</h2>
            <p className="game-preview-description">
              Người chơi đóng vai là những nhà sử học và chiến lược gia, đang thực hiện một 
              hành trình xuyên thời gian để khám phá và bảo vệ những giá trị lịch sử của 
              dân tộc Việt Nam. Mỗi người chơi đại diện cho một triều đại hoặc thời kỳ lịch sử. 
              Họ sẽ cùng nhau đối mặt với các thử thách lịch sử, hoàn thành nhiệm vụ và 
              giải mã các bí ẩn văn hóa, mang về danh hiệu "Xuân Thu Bách Hội" cho triều đại của mình.
            </p>
            
            <div className="game-info-grid">
              {gameInfo.map((info, index) => (
                <div key={index} className="game-info-item">
                  <div className="game-info-icon">
                    {info.icon}
                  </div>
                  <div className="game-info-content">
                    <h4>{info.title}</h4>
                    <span className="game-info-value">{info.value}</span>
                    <p>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="game-preview-actions">
              <Link to="/rules" className="btn">
                Xem luật chơi
                <ArrowRight size={20} />
              </Link>
              <Link to="/gallery" className="btn btn-secondary">
                Hình ảnh game
              </Link>
            </div>
          </div>

          <div className="game-preview-visual">
            <div className="game-board-large">
              <div className="board-background">
                <div className="board-grid-large">
                  {Array.from({ length: 36 }, (_, i) => (
                    <div key={i} className={`grid-cell cell-${i % 6}`}></div>
                  ))}
                </div>
                <div className="game-elements">
                  <div className="element element-1">
                    <div className="element-icon">🏰</div>
                    <span>Triều Lý</span>
                  </div>
                  <div className="element element-2">
                    <div className="element-icon">⚔️</div>
                    <span>Triều Trần</span>
                  </div>
                  <div className="element element-3">
                    <div className="element-icon">📜</div>
                    <span>Triều Lê</span>
                  </div>
                  <div className="element element-4">
                    <div className="element-icon">👑</div>
                    <span>Triều Nguyễn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GamePreview
