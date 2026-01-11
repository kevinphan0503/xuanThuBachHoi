import React, { useState, useEffect } from 'react'
import './GameRules.css'
import heroImg from '../../assets/placeholder-game-hero.svg'
import thumb1 from '../../assets/placeholder-thumb-1.svg'
import thumb2 from '../../assets/placeholder-thumb-2.svg'

const GameRules = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [openSections, setOpenSections] = useState({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="game-rules-page">
     <section className="rules-hero">
  {/* Decorations */}
  
  <span className="hero-decoration deco-2">🎋</span>
  <span className="hero-decoration deco-3">🎊</span>

  <div className="container">
    <div className="rules-hero-content">

      {/* TEXT */}
      <div className="hero-text">
        <h1 className="hero-title">
          <span className="title-icon">🎯</span>
          <span className="title-text">
            HƯỚNG DẪN CÁCH CHƠI
           
          </span>
        </h1>

        <p className="hero-subtitle">
            Người chơi thu thập vật phẩm lễ hội, xây dựng và nâng cấp lễ hội,
            kiếm xu thông qua việc tham gia, tổ chức và trao đổi trong suốt hành trình du xuân.
        </p>

        {/* STATS */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">36</span>
            <span className="stat-label">Ô bàn cờ</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">2–6</span>
            <span className="stat-label">Người chơi</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">40–60</span>
            <span className="stat-label">Phút / ván</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


      <section className="section rules-sections">
        <div className="container">
          <div className="section-header">
            <h2 
              className="section-title clickable-section"
              onClick={() => toggleSection('section1')}
            >
              <span className="section-number">1</span>
              Mục tiêu & Cấu trúc
              <span className={`section-toggle ${openSections.section1 ? 'open' : ''}`}>▼</span>
            </h2>
          </div>

          <div className={`rules-grid accordion-content ${openSections.section1 ? 'open' : 'closed'}`}>
            <div className="rule-card card-highlight">
              <div className="card-icon">🎯</div>
              <h3>1.1 Mục tiêu trò chơi</h3>
              <p>Người chơi thu thập các vật phẩm lễ hội, xây dựng – nâng cấp lễ hội, và kiếm thật nhiều xu thông qua việc tham gia, tổ chức và trao đổi trong suốt hành trình du xuân.</p>
            </div>

            <div className="rule-card card-expanded">
              <div className="card-icon">🗺️</div>
              <h3>1.2 Cấu trúc bàn cờ</h3>
              <p className="intro-text">Bàn cờ gồm <strong className="highlight-number">36 ô</strong>, tượng trưng cho hành trình du xuân trải dài khắp đất nước:</p>
              <div className="board-structure-grid">
                <div className="structure-item">
                  <span className="structure-icon">🏛️</span>
                  <div className="structure-content">
                    <strong>16 ô Lễ hội</strong>
                    <span>Nơi người chơi có thể xây dựng và nâng cấp lễ hội</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">📚</span>
                  <div className="structure-content">
                    <strong>6 ô Trống Đồng Tri Thức</strong>
                    <span>Thử thách trả lời câu hỏi văn hóa để nhận xu</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">🎴</span>
                  <div className="structure-content">
                    <strong>2 ô Gieo Quẻ & 2 ô Lộc Xuân</strong>
                    <span>Rút thẻ ngẫu nhiên để nhận thưởng, vật phẩm hoặc hiệu ứng đặc biệt</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">🛒</span>
                  <div className="structure-content">
                    <strong>1 ô Cửa hàng</strong>
                    <span>Mua vật phẩm cần thiết</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">🧧</span>
                  <div className="structure-content">
                    <strong>1 ô Tết Nguyên Đán</strong>
                    <span>Nhận thưởng đầu năm</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">⏸️</span>
                  <div className="structure-content">
                    <strong>1 ô Lỡ Hội</strong>
                    <span>Lỡ hội, phải đứng hóng đến khi cơ hội tiếp theo đến</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">😌</span>
                  <div className="structure-content">
                    <strong>1 ô Xem Hội</strong>
                    <span>Ô nghỉ ngơi, không làm gì</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">🗺️</span>
                  <div className="structure-content">
                    <strong>4 ô Cực Việt Nam</strong>
                    <span>Biểu trưng tinh thần và văn hóa (Bắc, Đông, Tây, Nam)</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">💰</span>
                  <div className="structure-content">
                    <strong>1 ô Thuế Hội</strong>
                    <span>Người có lễ hội trả nhiều, chưa có trả ít</span>
                  </div>
                </div>
                <div className="structure-item">
                  <span className="structure-icon">🏦</span>
                  <div className="structure-content">
                    <strong>1 ô Quỹ Hội</strong>
                    <span>Bỏ 150 xu vào quỹ chung; bốc thẻ "Lộc Hội Chung" nhận toàn bộ quỹ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2 
              className="section-title clickable-section"
              onClick={() => toggleSection('section2')}
            >
              <span className="section-number">2</span>
              Cách tổ chức & Sở hữu
              <span className={`section-toggle ${openSections.section2 ? 'open' : ''}`}>▼</span>
            </h2>
          </div>

          <div className={`rules-grid accordion-content ${openSections.section2 ? 'open' : 'closed'}`}>
            <div className="rule-card">
              <div className="card-icon">🏗️</div>
              <h3>2.1 Cách tổ chức lễ hội</h3>
              <div className="card-content">
                <p>Để tổ chức (xây) lễ hội, người chơi phải đạt đủ <strong className="highlight">3 vật phẩm</strong> mà lễ hội đó yêu cầu.</p>
                <div className="example-box">
                  <div className="example-label">Ví dụ:</div>
                  <div className="example-items">
                    <span className="item-badge">🍘 Bánh</span>
                    <span className="item-badge">🎨 Trang trí</span>
                    <span className="item-badge">🚩 Lá cờ lễ hội</span>
                  </div>
                </div>
                <p className="note-text">Khi đủ điều kiện, người chơi được xây lễ hội và đặt thẻ sở hữu lên ô tương ứng.</p>
              </div>
            </div>

            <div className="rule-card">
              <div className="card-icon">🎁</div>
              <h3>2.2 Cách sở hữu vật phẩm</h3>
              <div className="card-content">
                <div className="method-list">
                  <div className="method-item">
                    <span className="method-icon">🛒</span>
                    <div className="method-content">
                      <strong>Mua tại ô "Cửa hàng"</strong>
                      <p>Khi dừng đúng ô, người chơi được phép mua vật phẩm mình cần.</p>
                    </div>
                  </div>
                  <div className="method-item">
                    <span className="method-icon">🏛️</span>
                    <div className="method-content">
                      <strong>Mua của nhà nước</strong>
                      <p>1 năm 1 lần (mô phỏng sự hỗ trợ lễ hội).</p>
                    </div>
                  </div>
                  <div className="method-item">
                    <span className="method-icon">👑</span>
                    <div className="method-content">
                      <strong>Thẻ "Đặc quyền"</strong>
                      <p>Nếu bốc được thẻ này, được quyền lấy 1 vật phẩm bất kỳ từ người chơi khác mà họ không được từ chối.</p>
                    </div>
                  </div>
                  <div className="method-item">
                    <span className="method-icon">🎴</span>
                    <div className="method-content">
                      <strong>Bốc từ "Lộc Xuân" / "Gieo Quẻ"</strong>
                      <p>Khi vào ô này, người chơi bốc thẻ ngẫu nhiên (có thể nhận vật phẩm hoặc thẻ cho phép chọn vật phẩm).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2 
              className="section-title clickable-section"
              onClick={() => toggleSection('section3')}
            >
              <span className="section-number">3</span>
              Kiếm xu & Nâng cấp
              <span className={`section-toggle ${openSections.section3 ? 'open' : ''}`}>▼</span>
            </h2>
          </div>

          <div className={`rules-grid accordion-content ${openSections.section3 ? 'open' : 'closed'}`}>
            <div className="rule-card">
              <div className="card-icon">💵</div>
              <h3>3.1 Cách kiếm tiền</h3>
              <div className="card-content">
                <div className="method-list">
                  <div className="method-item method-earn">
                    <span className="method-icon">🧧</span>
                    <div className="method-content">
                      <strong>Bước qua ô "Tết Nguyên Đán"</strong>
                      <p>Nhận thưởng xu đầu năm</p>
                    </div>
                  </div>
                  <div className="method-item method-earn">
                    <span className="method-icon">📚</span>
                    <div className="method-content">
                      <strong>Trả lời tại "Trống Đồng Tri Thức"</strong>
                      <p>Trả lời đúng → nhận xu. Trả lời sai → không nhận thưởng</p>
                    </div>
                  </div>
                  <div className="method-item method-earn">
                    <span className="method-icon">🎴</span>
                    <div className="method-content">
                      <strong>Bốc thẻ "Gieo Quẻ" / "Lộc Xuân"</strong>
                      <p>Có thể nhận tiền, vật phẩm, hoặc hiệu ứng đặc biệt (trao đổi, miễn phí tham quan, v.v.)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rule-card card-upgrade">
              <div className="card-icon">⬆️</div>
              <h3>3.2 Cách nâng cấp lễ hội</h3>
              <div className="card-content">
                <p>Sau khi xây lễ hội, người chơi có thể nâng cấp bằng cách bỏ ra <strong className="highlight-price">1200 xu</strong> cho 1 lần nâng cấp.</p>
                <div className="upgrade-comparison">
                  <div className="upgrade-level">
                    <div className="level-badge level-basic">Cơ bản</div>
                    <div className="level-price">150 xu</div>
                    <p>Phí tham quan</p>
                  </div>
                  <div className="upgrade-arrow">→</div>
                  <div className="upgrade-level">
                    <div className="level-badge level-upgraded">Nâng cấp</div>
                    <div className="level-price">400 xu</div>
                    <p>Phí tham quan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rule-card card-benefits">
              <div className="card-icon">✨</div>
              <h3>3.3 Lợi ích khi nâng cấp</h3>
              <div className="card-content">
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-icon">💰</span>
                    <div>
                      <strong>Sinh lời nhiều hơn</strong>
                      <p>Người khác phải trả phí cao hơn khi vào lễ hội bạn sở hữu</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🏆</span>
                    <div>
                      <strong>Tăng cơ hội thắng</strong>
                      <p>Lễ hội cấp cao giúp tăng tổng tài sản cuối game</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2 
              className="section-title clickable-section"
              onClick={() => toggleSection('section4')}
            >
              <span className="section-number">4</span>
              Chi tiết ô trên bàn cờ
              <span className={`section-toggle ${openSections.section4 ? 'open' : ''}`}>▼</span>
            </h2>
          </div>

          <div className={`board-details-section accordion-content ${openSections.section4 ? 'open' : 'closed'}`}>
            <div className="board-summary-card">
              <h3 className="summary-title">📊 Tổng quan bàn cờ</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-number">36</div>
                  <div className="summary-label">Tổng số ô</div>
                </div>
                <div className="summary-item">
                  <div className="summary-number">16</div>
                  <div className="summary-label">Ô Lễ Hội</div>
                </div>
                <div className="summary-item">
                  <div className="summary-number">6</div>
                  <div className="summary-label">Ô Trống Đồng Tri Thức</div>
                </div>
                <div className="summary-item">
                  <div className="summary-number">4</div>
                  <div className="summary-label">Ô Gieo Quẻ & Lộc Xuân</div>
                </div>
                <div className="summary-item">
                  <div className="summary-number">4</div>
                  <div className="summary-label">Ô Cực Việt Nam</div>
                </div>
                <div className="summary-item">
                  <div className="summary-number">6</div>
                  <div className="summary-label">Ô đặc biệt khác</div>
                </div>
              </div>
            </div>

            <div className="board-breakdown">
              <div className="breakdown-card">
                <h4>📋 Chi tiết từng loại ô</h4>
                <div className="breakdown-list">
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🎴</span>
                    <span><strong>Gieo quẻ:</strong> 2 ô (20 thẻ)</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🎋</span>
                    <span><strong>Lộc xuân:</strong> 2 ô (20 thẻ)</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🏛️</span>
                    <span><strong>Lễ Hội:</strong> 16 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🛒</span>
                    <span><strong>Cửa Hàng:</strong> 1 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">📚</span>
                    <span><strong>Trống Đồng Tri Thức:</strong> 6 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">⏸️</span>
                    <span><strong>Lỡ Hội:</strong> 1 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🧧</span>
                    <span><strong>Tết Nguyên Đán:</strong> 1 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">😌</span>
                    <span><strong>Xem Hội:</strong> 1 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🗺️</span>
                    <span><strong>Cực:</strong> 4 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">💰</span>
                    <span><strong>Thuế Hội:</strong> 1 ô</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-icon">🏦</span>
                    <span><strong>Quỹ Hội:</strong> 1 ô</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cuc-section">
              <h3 className="cuc-title">🗺️ Ghi chú về 4 Cực Việt Nam</h3>
              <div className="cuc-grid">
                <div className="cuc-card cuc-north">
                  <div className="cuc-icon">🧭</div>
                  <h4>Cực Bắc (Lũng Cú)</h4>
                  <p>Biểu trưng cho tinh thần tự hào, kiên cường</p>
                </div>
                <div className="cuc-card cuc-east">
                  <div className="cuc-icon">🌅</div>
                  <h4>Cực Đông (Mũi Đôi)</h4>
                  <p>Biểu trưng cho khởi đầu, ánh sáng, hy vọng</p>
                </div>
                <div className="cuc-card cuc-west">
                  <div className="cuc-icon">🤝</div>
                  <h4>Cực Tây (A Pa Chải)</h4>
                  <p>Biểu trưng cho đoàn kết, giao lưu biên giới</p>
                </div>
                <div className="cuc-card cuc-south">
                  <div className="cuc-icon">🌊</div>
                  <h4>Cực Nam (Mũi Cà Mau)</h4>
                  <p>Biểu trưng cho phát triển, vươn ra biển lớn</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2 
              className="section-title clickable-section"
              onClick={() => toggleSection('section5')}
            >
              <span className="section-number">5</span>
              20 Thẻ LỘC XUÂN
              <span className={`section-toggle ${openSections.section5 ? 'open' : ''}`}>▼</span>
            </h2>
            <p className="section-subtitle">Những thẻ may mắn mang đến cơ hội và phần thưởng</p>
          </div>

          <div className={`cards-section accordion-content ${openSections.section5 ? 'open' : 'closed'}`}>
            <div className="cards-grid">
              <div className="card-item card-positive">
                <div className="card-number">1</div>
                <div className="card-content-text">Bạn giúp người khác gói bánh chưng – được tặng 1 bánh mứt 🍘</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">2</div>
                <div className="card-content-text">Nhặt được bao lì xì rơi – bên trong có 200 xu</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">3</div>
                <div className="card-content-text">Trên đường đi lễ hội, ngã xe làm rơi mâm lễ vật - mất 1 vật phẩm ngẫu nhiên (vật phẩm gần nhất mới có được)</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">4</div>
                <div className="card-content-text">Bạn tham gia trò chơi dân gian ở hội làng và thắng. Nhận 100 xu</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">5</div>
                <div className="card-content-text">Thẻ giảm giá 50%, giữ lại để sử dụng tại Cửa Hàng</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">6</div>
                <div className="card-content-text">Bạn được rút thêm 1 thẻ Lộc Xuân, cơ hội tăng gấp đôi!</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">7</div>
                <div className="card-content-text">Vé miễn phí tham quan tại lễ hội (sử dụng 1 lần)</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">8</div>
                <div className="card-content-text">Lộc Xuân đến, ngay lập tức nhận toàn bộ quỹ tiền trong ô Quỹ Hội</div>
              </div>
              <div className="card-item card-neutral">
                <div className="card-number">9</div>
                <div className="card-content-text">Bạn hỗ trợ dọn rác sau hội – nhận 1 thẻ Gieo Quẻ</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">10</div>
                <div className="card-content-text">Lì xì may mắn: nhân đôi tiền thưởng ở lượt sau</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">11</div>
                <div className="card-content-text">Bạn góp công tổ chức hội làng, được giảm 50% phí ở ô lễ hội kế tiếp</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">12</div>
                <div className="card-content-text">Người chơi khác chúc bạn "phát tài"! Nhận 100 xu từ mỗi người chơi</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">13</div>
                <div className="card-content-text">Bạn bị kẹt xe trước cổng hội! Di chuyển thẳng đến ô Lỡ Hội</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">14</div>
                <div className="card-content-text">"Vé Thông Hành" – giữ lại: vào hội mà không bị dừng lượt</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">15</div>
                <div className="card-content-text">Trang trí cổng hội gãy, bạn bỏ -100 xu thuê người sửa giúp</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">16</div>
                <div className="card-content-text">Đoàn múa lân gặp sự cố, mọi người cùng góp 80 xu để thuê nhóm khác</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">17</div>
                <div className="card-content-text">Bạn bị trượt chân khi múa lân, lùi lại 2 ô</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">18</div>
                <div className="card-content-text">Nghe tiếng trống hội rộn ràng, bạn đi tới 3 ô để nhập vui cùng mọi người</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">19</div>
                <div className="card-content-text">Bạn trúng giải bốc thăm may mắn ở hội chợ xuân → Nhận phiếu quà tặng, được chọn 1 vật phẩm bất kỳ từ cửa hàng</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">20</div>
                <div className="card-content-text">Thẻ Đặc Quyền - chọn 1 vật phẩm bất kỳ từ người chơi khác mà họ không thể từ chối</div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2 
              className="section-title clickable-section"
              onClick={() => toggleSection('section6')}
            >
              <span className="section-number">6</span>
              20 THẺ GIEO QUẺ
              <span className={`section-toggle ${openSections.section6 ? 'open' : ''}`}>▼</span>
            </h2>
            <p className="section-subtitle">Những thẻ thử thách và cơ hội bất ngờ</p>
          </div>

          <div className={`cards-section accordion-content ${openSections.section6 ? 'open' : 'closed'}`}>
            <div className="cards-grid">
              <div className="card-item card-positive">
                <div className="card-number">1</div>
                <div className="card-content-text">Quẻ Đại Cát 🎋 – Phúc khí tràn đầy, nhận 400 xu</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">2</div>
                <div className="card-content-text">Quẻ Tiểu Cát 🍀 – Vận lành ghé thăm, nhận 200 xu</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">3</div>
                <div className="card-content-text">Quẻ Hung Nhẹ 😅 – Bị rơi ví khi đi lễ, mất 150 xu</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">4</div>
                <div className="card-content-text">Quẻ Mất Lộc 😢 – Trả lại 1 vật phẩm bất kỳ cho cửa hàng</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">5</div>
                <div className="card-content-text">Quẻ Tụ Tài 💰 – Nhận 100 xu từ mỗi người chơi khác</div>
              </div>
              <div className="card-item card-neutral">
                <div className="card-number">6</div>
                <div className="card-content-text">Quẻ An Nhiên 🕊️ – Không có gì xảy ra</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">7</div>
                <div className="card-content-text">Quẻ Tán Lộc 🎁 – Tặng 50 xu cho mỗi người chơi khác</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">8</div>
                <div className="card-content-text">Quẻ Phước Lành ✨ – Nhận 1 vật phẩm bất kỳ từ cửa hàng</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">9</div>
                <div className="card-content-text">Quẻ Bế Vận 🚫 – Phải quay lại 3 ô phía sau</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">10</div>
                <div className="card-content-text">Quẻ Cầu Tài Đắc Lộc 💫 – Nhận 300 xu và 1 vật phẩm bất kỳ</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">11</div>
                <div className="card-content-text">Quẻ Đổi Duyên 🔁 – Chọn 1 người chơi, đổi vị trí trên bàn cờ</div>
              </div>
              <div className="card-item card-negative">
                <div className="card-number">12</div>
                <div className="card-content-text">Quẻ Hạn Nhẹ – Bỏ qua 1 lượt chơi kế tiếp</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">13</div>
                <div className="card-content-text">Quẻ Khai Hội 🎐 – Di chuyển đến ô Lễ Hội gần nhất phía trước; nếu ô đó chưa có chủ, bạn được xây miễn phí</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">14</div>
                <div className="card-content-text">Quẻ Trở Vận 🔮 – Bạn được tung xúc xắc thêm 1 lần ngay lập tức (đi thêm lượt)</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">15</div>
                <div className="card-content-text">Quẻ Lộc Từ Trời Rơi 🌧️ – Một lễ hội của bạn được nâng cấp miễn phí; nếu chưa có lễ hội, nhận 200 xu</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">16</div>
                <div className="card-content-text">Quẻ Hữu Duyên Thiên Lý – Chọn 1 người chơi bất kỳ – cả hai cùng nhận 150 xu</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">17</div>
                <div className="card-content-text">Quẻ Thần Tài Viếng Thăm 🧧 – Mọi lễ hội bạn sở hữu tăng 100 xu phí tham quan cho 3 lượt kế tiếp</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">18</div>
                <div className="card-content-text">Quẻ Chuyển Họa Thành Phúc 🔥 – Chọn 1 người chơi: họ mất 100 xu, bạn nhận 100 xu</div>
              </div>
              <div className="card-item card-special">
                <div className="card-number">19</div>
                <div className="card-content-text">Quẻ Vượt Sóng Gió 🚤 – Di chuyển đến ô kế tiếp sau "Trống Đồng Tri Thức" gần nhất; nếu trả lời đúng → nhận gấp đôi phần thưởng</div>
              </div>
              <div className="card-item card-positive">
                <div className="card-number">20</div>
                <div className="card-content-text">Quẻ Buôn May Bán Đắt 🛍️ – Nếu bạn đang sở hữu 1 lễ hội, nhận 100 xu/lễ hội; nếu chưa có, nhận 150 xu an ủi</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default GameRules
