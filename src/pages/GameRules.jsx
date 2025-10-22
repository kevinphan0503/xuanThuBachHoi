import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Play, Users, Clock, Target } from 'lucide-react'
import './GameRules.css'

const GameRules = () => {
  const [openSection, setOpenSection] = useState(0)

  const sections = [
    {
      title: 'Giới thiệu game',
      content: 'Cờ Lễ Hội Việt Nam là board game chiến thuật, kết hợp yếu tố mô phỏng, thẻ kiến thức và thử thách vui nhộn. Mỗi người chơi đóng vai một "nhà tổ chức lễ hội" và cạnh tranh để trở thành người có quy mô, thương hiệu và tài sản lớn nhất.',
      icon: <Play size={24} />
    },
    {
      title: 'Mục tiêu game',
      content: 'Mục tiêu là trở thành nhà tổ chức lễ hội có quy mô, thương hiệu và tài sản lớn nhất khi ván chơi kết thúc. Người chơi tích lũy tài sản thông qua việc mua quyền tổ chức lễ hội, nâng cấp lễ hội và thu phí tham quan.',
      icon: <Target size={24} />
    },
    {
      title: 'Thiết lập game',
      content: 'Mỗi người chơi nhận 1500 Xu Hội ban đầu. Lần lượt gieo xúc xắc, người có điểm cao nhất đi trước; di chuyển theo chiều kim đồng hồ. Bàn cờ có 40 ô bao gồm ô Lễ hội, ô Lộc Xuân, ô Gieo Quẻ và các ô đặc biệt.',
      icon: <Users size={24} />
    },
    {
      title: 'Luật chơi cơ bản',
      content: 'Dừng ở ô Lễ hội: có thể mua quyền tổ chức nếu chưa có chủ, hoặc trả phí tham quan nếu đã có chủ. Dừng ở ô Lộc Xuân: rút thẻ nhận kiến thức và cơ hội. Dừng ở ô Gieo Quẻ: thực hiện thử thách hoặc chịu phạt.',
      icon: <Clock size={24} />
    },
    {
      title: 'Nâng cấp lễ hội',
      content: 'Mỗi lễ hội có 4 cấp độ nâng cấp: 1) Bánh – Mứt, 2) Trang trí, 3) Trang phục, 4) Tổ chức Đại Lễ Hội. Cấp càng cao thì phí tham quan càng lớn. Có thể mua lại ô đã bị người khác sở hữu nếu chủ hiện tại chưa nâng cấp lên mức cao nhất.',
      icon: <Target size={24} />
    },
    {
      title: 'Kết thúc game',
      content: 'Game kết thúc khi một người chơi phá sản (không còn tiền để tiếp tục) hoặc khi đạt điều kiện thời gian/vòng chơi đã thống nhất trước. Người chiến thắng là người có tổng tài sản (tiền + giá trị lễ hội + nâng cấp) và quy mô lễ hội lớn nhất.',
      icon: <Play size={24} />
    }
  ]

  const gameComponents = [
    'Bàn cờ 40 ô với các lễ hội Việt Nam',
    'Quân cờ đại diện cho nhà tổ chức lễ hội',
    '30 thẻ Lộc Xuân (kiến thức + cơ hội)',
    '30 thẻ Gieo Quẻ (thử thách + bất lợi)',
    'Con xúc xắc và Xu Hội',
    'Vật phẩm nâng cấp: Bánh, Mứt, Trang trí, Hoạt động',
    'Sách hướng dẫn chi tiết'
  ]

  return (
    <div className="game-rules-page">
      <section className="rules-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hướng dẫn chơi Cờ Lễ Hội Việt Nam</h1>
            <p>Học cách chơi và trở thành nhà tổ chức lễ hội giỏi nhất</p>
          </div>
        </div>
      </section>

      <section className="section rules-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-card">
              <Users size={48} />
              <h3>2-6 người chơi</h3>
              <p>Mỗi người đóng vai nhà tổ chức lễ hội</p>
            </div>
            <div className="overview-card">
              <Clock size={48} />
              <h3>40-60 phút</h3>
              <p>Thời gian chơi lý tưởng</p>
            </div>
            <div className="overview-card">
              <Target size={48} />
              <h3>Độ khó: Dễ</h3>
              <p>Dễ học, phù hợp mọi lứa tuổi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section rules-sections">
        <div className="container">
          <h2 className="section-title">Luật chơi chi tiết</h2>
          <div className="rules-accordion">
            {sections.map((section, index) => (
              <div key={index} className="rules-item">
                <button
                  className="rules-header"
                  onClick={() => setOpenSection(openSection === index ? -1 : index)}
                >
                  <div className="header-content">
                    <div className="header-icon">{section.icon}</div>
                    <h3>{section.title}</h3>
                  </div>
                  {openSection === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
                {openSection === index && (
                  <div className="rules-content">
                    <p>{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section components-section gradient-bg">
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Thành phần game</h2>
          <div className="components-grid">
            {gameComponents.map((component, index) => (
              <div key={index} className="component-item">
                <div className="component-icon">📦</div>
                <span>{component}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tips-section">
        <div className="container">
          <h2 className="section-title">Mẹo chơi hay</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>🎯 Chiến thuật mua lễ hội</h4>
              <p>Ưu tiên mua các lễ hội liền kề để tạo thành nhóm và tăng phí tham quan.</p>
            </div>
            <div className="tip-card">
              <h4>🎭 Nâng cấp thông minh</h4>
              <p>Nâng cấp lễ hội theo thứ tự: Bánh-Mứt → Trang trí → Trang phục → Đại Lễ Hội.</p>
            </div>
            <div className="tip-card">
              <h4>📚 Học văn hóa</h4>
              <p>Thẻ Lộc Xuân cung cấp kiến thức văn hóa và cơ hội kiếm tiền, hãy tận dụng!</p>
            </div>
            <div className="tip-card">
              <h4>⚡ Xử lý thử thách</h4>
              <p>Thẻ Gieo Quẻ có thể mang lại bất lợi, hãy chuẩn bị tinh thần và tiền bạc.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GameRules
