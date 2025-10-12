import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Play, Users, Clock, Target } from 'lucide-react'
import './GameRules.css'

const GameRules = () => {
  const [openSection, setOpenSection] = useState(0)

  const sections = [
    {
      title: 'Giới thiệu game',
      content: 'Xuân Thu Bách Hội là board game chiến thuật dựa trên lịch sử Việt Nam. Người chơi sẽ đóng vai các triều đại khác nhau và cạnh tranh để trở thành triều đại vĩ đại nhất trong lịch sử.',
      icon: <Play size={24} />
    },
    {
      title: 'Mục tiêu game',
      content: 'Mục tiêu của game là tích lũy điểm danh vọng thông qua việc hoàn thành các nhiệm vụ lịch sử, xây dựng công trình, và đánh bại kẻ thù. Người chơi có điểm cao nhất khi kết thúc game sẽ thắng.',
      icon: <Target size={24} />
    },
    {
      title: 'Thiết lập game',
      content: 'Mỗi người chơi chọn một triều đại và nhận các quân cờ, thẻ bài tương ứng. Xáo trộn thẻ sự kiện và đặt bàn cờ ở giữa. Người chơi đầu tiên được chọn ngẫu nhiên.',
      icon: <Users size={24} />
    },
    {
      title: 'Luật chơi cơ bản',
      content: 'Mỗi lượt chơi gồm 3 giai đoạn: 1) Di chuyển quân cờ, 2) Thực hiện hành động, 3) Rút thẻ sự kiện. Người chơi có thể tấn công, xây dựng, hoặc thương mại tùy theo vị trí và tài nguyên.',
      icon: <Clock size={24} />
    },
    {
      title: 'Các loại thẻ',
      content: 'Thẻ sự kiện: Mô tả các sự kiện lịch sử, có thể có lợi hoặc bất lợi. Thẻ nhân vật: Cung cấp khả năng đặc biệt. Thẻ công trình: Cho phép xây dựng các kiến trúc lịch sử.',
      icon: <Target size={24} />
    },
    {
      title: 'Kết thúc game',
      content: 'Game kết thúc khi một trong các điều kiện được thỏa mãn: có người chơi đạt 50 điểm, hoặc đã chơi 10 vòng. Người chơi có tổng điểm cao nhất sẽ thắng.',
      icon: <Play size={24} />
    }
  ]

  const gameComponents = [
    'Bàn cờ chính với bản đồ Việt Nam',
    'Quân cờ đại diện cho các triều đại',
    'Thẻ sự kiện lịch sử (100 thẻ)',
    'Thẻ nhân vật lịch sử (30 thẻ)',
    'Thẻ công trình kiến trúc (20 thẻ)',
    'Con xúc xắc và đồng tiền',
    'Sách hướng dẫn chi tiết'
  ]

  return (
    <div className="game-rules-page">
      <section className="rules-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hướng dẫn chơi</h1>
            <p>Học cách chơi Xuân Thu Bách Hội một cách dễ dàng</p>
          </div>
        </div>
      </section>

      <section className="section rules-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-card">
              <Users size={48} />
              <h3>2-6 người chơi</h3>
              <p>Phù hợp cho gia đình và nhóm bạn</p>
            </div>
            <div className="overview-card">
              <Clock size={48} />
              <h3>45-60 phút</h3>
              <p>Thời gian chơi lý tưởng</p>
            </div>
            <div className="overview-card">
              <Target size={48} />
              <h3>Độ khó: Trung bình</h3>
              <p>Dễ học, khó thông thạo</p>
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
              <h4>🎯 Chiến thuật</h4>
              <p>Lập kế hoạch dài hạn và tận dụng các thẻ nhân vật để có lợi thế chiến thuật.</p>
            </div>
            <div className="tip-card">
              <h4>🤝 Đàm phán</h4>
              <p>Thương lượng với người chơi khác để tạo liên minh hoặc trao đổi tài nguyên.</p>
            </div>
            <div className="tip-card">
              <h4>📚 Học lịch sử</h4>
              <p>Hiểu biết về lịch sử Việt Nam sẽ giúp bạn đưa ra quyết định tốt hơn trong game.</p>
            </div>
            <div className="tip-card">
              <h4>⚡ Linh hoạt</h4>
              <p>Thích ứng với các sự kiện bất ngờ và thay đổi chiến thuật khi cần thiết.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GameRules
