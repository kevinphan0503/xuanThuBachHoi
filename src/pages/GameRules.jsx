import React from 'react'
import './GameRules.css'
import heroImg from '../../assets/placeholder-game-hero.svg'
import thumb1 from '../../assets/placeholder-thumb-1.svg'
import thumb2 from '../../assets/placeholder-thumb-2.svg'

const GameRules = () => {
  return (
    <div className="game-rules-page">
      <section className="rules-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>🎯 HƯỚNG DẪN CÁCH CHƠI – CỜ LỄ HỘI VIỆT NAM</h1>
              <p>Người chơi thu thập vật phẩm lễ hội, xây dựng – nâng cấp lễ hội và kiếm xu qua việc tham gia, tổ chức và trao đổi trong suốt hành trình du xuân.</p>
            </div>

            {/* Image placeholders — you can replace these SVGs in /assets when ready */}
            <div className="hero-images">
              <img src={heroImg} alt="Hero placeholder" className="hero-image-main" />
              <div className="hero-image-thumbs">
                <img src={thumb1} alt="Thumb 1 placeholder" />
                <img src={thumb2} alt="Thumb 2 placeholder" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section rules-sections">
        <div className="container">
          <h2 className="section-title">1. Mục tiêu & Cấu trúc</h2>

          <h3>1.1 Mục tiêu trò chơi</h3>
          <p>Người chơi thu thập các vật phẩm lễ hội, xây dựng – nâng cấp lễ hội, và kiếm thật nhiều xu thông qua việc tham gia, tổ chức và trao đổi trong suốt hành trình du xuân.</p>

          <h3>1.2 Cấu trúc bàn cờ</h3>
          <p>Bàn cờ gồm <strong>36 ô</strong>, tượng trưng cho hành trình du xuân trải dài khắp đất nước:</p>
          <ul>
            <li><strong>16 ô Lễ hội</strong> – nơi người chơi có thể xây dựng và nâng cấp lễ hội.</li>
            <li><strong>6 ô Trống Đồng Tri Thức</strong> – thử thách trả lời câu hỏi văn hóa để nhận xu.</li>
            <li><strong>2 ô Gieo Quẻ</strong> và <strong>2 ô Lộc Xuân</strong> – rút thẻ ngẫu nhiên để nhận thưởng, vật phẩm hoặc hiệu ứng đặc biệt.</li>
            <li><strong>1 ô Cửa hàng</strong> – mua vật phẩm cần thiết.</li>
            <li><strong>1 ô Tết Nguyên Đán</strong> – nhận thưởng đầu năm.</li>
            <li><strong>1 ô Lỡ Hội</strong> – lỡ hội, phải đứng hóng đến khi cơ hội tiếp theo đến.</li>
            <li><strong>1 ô Xem Hội</strong> – ô nghỉ ngơi.</li>
            <li><strong>4 ô Cực Việt Nam</strong> (Bắc, Đông, Tây, Nam) – biểu trưng tinh thần và văn hóa.</li>
            <li><strong>1 ô Thuế Hội</strong> – người có lễ hội trả nhiều, chưa có trả ít.</li>
            <li><strong>1 ô Quỹ Hội</strong> – bước vào phải bỏ 150 xu vào quỹ chung; nếu bốc thẻ “Lộc Hội Chung” nhận toàn bộ quỹ.</li>
          </ul>

          <hr />

          <h2 className="section-title">2. Cách tổ chức & Sở hữu</h2>

          <h3>2.1 Cách tổ chức lễ hội</h3>
          <p>Để tổ chức (xây) lễ hội, người chơi phải đạt đủ 3 vật phẩm mà lễ hội đó yêu cầu (ví dụ: Bánh – Trang trí – Lá cờ lễ hội). Khi đủ điều kiện, người chơi được xây lễ hội và đặt thẻ sở hữu lên ô tương ứng.</p>

          <h3>2.2 Cách sở hữu vật phẩm</h3>
          <ul>
            <li><strong>Mua tại ô “Cửa hàng”</strong>: khi dừng đúng ô, người chơi được phép mua vật phẩm mình cần.</li>
            <li><strong>Mua của nhà nước</strong>: 1 năm 1 lần (mô phỏng sự hỗ trợ lễ hội).</li>
            <li><strong>Thẻ “Đặc quyền”</strong>: nếu bốc được thẻ này, được quyền lấy 1 vật phẩm bất kỳ từ người chơi khác mà họ không được từ chối.</li>
            <li><strong>Bốc từ “Lộc Xuân” / “Gieo Quẻ”</strong>: khi vào ô này, người chơi bốc thẻ ngẫu nhiên (có thể nhận vật phẩm hoặc thẻ cho phép chọn vật phẩm).</li>
          </ul>

          <hr />

          <h2 className="section-title">3. Kiếm xu & Nâng cấp</h2>

          <h3>3.1 Cách kiếm tiền</h3>
          <ul>
            <li><strong>Bước qua ô “Tết”</strong>: nhận thưởng xu đầu năm.</li>
            <li><strong>Trả lời tại “Trống Đồng Tri Thức”</strong>: trả lời đúng nhận xu.</li>
            <li><strong>Bốc thẻ “Gieo Quẻ” / “Lộc Xuân”</strong>: có thể nhận tiền, vật phẩm, hoặc hiệu ứng đặc biệt (trao đổi, miễn phí tham quan, v.v.).</li>
          </ul>

          <h3>3.2 Cách nâng cấp lễ hội</h3>
          <p>Sau khi xây lễ hội, người chơi có thể nâng cấp (ví dụ: bỏ ra <strong>1200 xu</strong> cho 1 lần nâng cấp). Khi nâng cấp, phí tham quan tăng lên (ví dụ: lễ hội cơ bản 150 xu → nâng cấp 400 xu).</p>

          <h3>3.3 Lợi ích khi nâng cấp</h3>
          <ul>
            <li>Sinh lời nhiều hơn: người khác phải trả phí cao hơn khi vào lễ hội bạn sở hữu.</li>
            <li>Tăng cơ hội thắng: lễ hội cấp cao giúp tăng tổng tài sản cuối game.</li>
          </ul>

          <hr />

          <h2 className="section-title">Chi tiết ô trên bàn cờ</h2>
          <p><strong>Số ô trên bàn cờ:</strong> 36 ô</p>
          <p><strong>Số ô Gieo quẻ:</strong> 2 ô (20 thẻ)</p>
          <p><strong>Số ô Lộc xuân:</strong> 2 ô (20 thẻ)</p>
          <p><strong>Số ô Lễ Hội:</strong> 16 ô</p>
          <p><strong>Số ô Cửa Hàng:</strong> 1 ô</p>
          <p><strong>Số ô Trống Đồng Tri Thức (câu hỏi):</strong> 6 ô</p>
          <p><strong>Số ô Lỡ Hội:</strong> 1 ô</p>
          <p><strong>Số ô Tết Nguyên Đán:</strong> 1 ô</p>
          <p><strong>Số ô Xem Hội:</strong> 1 ô</p>
          <p><strong>Số ô Cực:</strong> 4 ô</p>
          <p><strong>Số ô Thuế Hội:</strong> 1 ô</p>
          <p><strong>Số ô Quỹ Hội:</strong> 1 ô</p>

          <h3>Ghi chú “Cực”</h3>
          <ul>
            <li><strong>Cực Bắc (Lũng Cú)</strong> → Biểu trưng cho tinh thần tự hào, kiên cường.</li>
            <li><strong>Cực Đông (Mũi Đôi)</strong> → Biểu trưng cho khởi đầu, ánh sáng, hy vọng.</li>
            <li><strong>Cực Tây (A Pa Chải)</strong> → Biểu trưng cho đoàn kết, giao lưu biên giới.</li>
            <li><strong>Cực Nam (Mũi Cà Mau)</strong> → Biểu trưng cho phát triển, vươn ra biển lớn.</li>
          </ul>

          <hr />

          <h2 className="section-title">20 Thẻ LỘC XUÂN</h2>
          <ul className="cards-list">
            <li>Bạn giúp người khác gói bánh chưng – được tặng 1 bánh mứt 🍘.</li>
            <li>Nhặt được bao lì xì rơi – bên trong có 200 xu.</li>
            <li>Trên đường đi lễ hội, ngã xe làm rơi mâm lễ vật. - mất 1 vật phẩm ngẫu nhiên (vật phẩm gần nhất mới có được)</li>
            <li>Bạn tham gia trò chơi dân gian ở hội làng và thắng. Nhận 100 xu.</li>
            <li>Thẻ giảm giá 50%, giữ lại để sử dụng tại Cửa Hàng.</li>
            <li>Bạn được rút thêm 1 thẻ Lộc Xuân, cơ hội tăng gấp đôi!</li>
            <li>Vé miễn phí tham quan tại lễ hội. (sài 1 lần)</li>
            <li>Lộc Xuân đến, ngay lập tức nhận toàn bộ quỹ tiền trong ô Quỹ Hội.</li>
            <li>Bạn hỗ trợ dọn rác sau hội – nhận 1 thẻ Gieo Quẻ.</li>
            <li>Lì xì may mắn: nhân đôi tiền thưởng ở lượt sau.</li>
            <li>Bạn góp công tổ chức hội làng, được giảm 50% phí ở ô lễ hội kế tiếp.</li>
            <li>Người chơi khác chúc bạn “phát tài”! Nhận 100 xu từ mỗi người chơi.</li>
            <li>Bạn bị kẹt xe trước cổng hội! Di chuyển thẳng đến ô Lỡ Hội.</li>
            <li>“Vé Thông Hành” – giữ lại: vào hội mà không bị dừng lượt.</li>
            <li>Trang trí cổng hội gãy, bạn bỏ -100 xu thuê người sửa giúp.</li>
            <li>Đoàn múa lân gặp sự cố, mọi người cùng góp 80 xu để thuê nhóm khác.</li>
            <li>Bạn bị trượt chân khi múa lân, lùi lại 2 ô.</li>
            <li>Nghe tiếng trống hội rộn ràng, bạn đi tới 3 ô để nhập vui cùng mọi người.</li>
            <li>Bạn trúng giải bốc thăm may mắn ở hội chợ xuân → Nhận phiếu quà tặng, được chọn 1 vật phẩm bất kỳ từ cửa hàng.</li>
            <li>Thẻ Đặc Quyền - chọn 1 vật phẩm bất kỳ từ người chơi khác mà họ không thể từ chối.</li>
          </ul>

          <hr />

          <h2 className="section-title">20 THẺ GIEO QUẺ</h2>
          <ul className="cards-list">
            <li>Quẻ Đại Cát 🎋 – Phúc khí tràn đầy, nhận 400 xu.</li>
            <li>Quẻ Tiểu Cát 🍀 – Vận lành ghé thăm, nhận 200 xu.</li>
            <li>Quẻ Hung Nhẹ 😅 – Bị rơi ví khi đi lễ, mất 150 xu.</li>
            <li>Quẻ Mất Lộc 😢 – Trả lại 1 vật phẩm bất kỳ cho cửa hàng.</li>
            <li>Quẻ Tụ Tài 💰 – Nhận 100 xu từ mỗi người chơi khác.</li>
            <li>Quẻ An Nhiên 🕊️ – Không có gì xảy ra.</li>
            <li>Quẻ Tán Lộc 🎁 – Tặng 50 xu cho mỗi người chơi khác.</li>
            <li>Quẻ Phước Lành ✨ – Nhận 1 vật phẩm bất kỳ từ cửa hàng.</li>
            <li>Quẻ Bế Vận 🚫 – Phải quay lại 3 ô phía sau.</li>
            <li>Quẻ Cầu Tài Đắc Lộc 💫 – Nhận 300 xu và 1 vật phẩm bất kỳ.</li>
            <li>Quẻ Đổi Duyên 🔁 – Chọn 1 người chơi, đổi vị trí trên bàn cờ.</li>
            <li>Quẻ Hạn Nhẹ – Bỏ qua 1 lượt chơi kế tiếp.</li>
            <li>Quẻ Khai Hội 🎐 – Di chuyển đến ô Lễ Hội gần nhất phía trước; nếu ô đó chưa có chủ, bạn được xây miễn phí.</li>
            <li>Quẻ Trở Vận 🔮 – Bạn được tung xúc xắc thêm 1 lần ngay lập tức (đi thêm lượt).</li>
            <li>Quẻ Lộc Từ Trời Rơi 🌧️ – Một lễ hội của bạn được nâng cấp miễn phí; nếu chưa có lễ hội, nhận 200 xu.</li>
            <li>Quẻ Hữu Duyên Thiên Lý – Chọn 1 người chơi bất kỳ – cả hai cùng nhận 150 xu.</li>
            <li>Quẻ Thần Tài Viếng Thăm 🧧 – Mọi lễ hội bạn sở hữu tăng 100 xu phí tham quan cho 3 lượt kế tiếp.</li>
            <li>Quẻ Chuyển Họa Thành Phúc 🔥 – Chọn 1 người chơi: họ mất 100 xu, bạn nhận 100 xu.</li>
            <li>Quẻ Vượt Sóng Gió 🚤 – Di chuyển đến ô kế tiếp sau “Trống Đồng Tri Thức” gần nhất; nếu trả lời đúng → nhận gấp đôi phần thưởng.</li>
            <li>Quẻ Buôn May Bán Đắt 🛍️ – Nếu bạn đang sở hữu 1 lễ hội, nhận 100 xu/lễ hội; nếu chưa có, nhận 150 xu an ủi.</li>
          </ul>

        </div>
      </section>

    </div>
  )
}

export default GameRules
