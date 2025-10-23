import React from 'react'
import { Star, Quote } from 'lucide-react'
import './TestimonialSection.css'

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Huỳnh Như',
      role: 'Sinh Viên ',
      content: 'Xuân Thu Bách Hội là một cách tuyệt vời để học sinh tiếp cận lịch sử Việt Nam. Game giúp các em hiểu sâu hơn về các triều đại và sự kiện quan trọng.',
      rating: 5
    },
    {
      name: 'Phúc Tuệ',
      role: 'Phụ huynh',
      content: 'Cả gia đình tôi đều thích chơi game này. Không chỉ giải trí mà còn học được nhiều điều về lịch sử nước nhà. Rất bổ ích!',
      rating: 5
    },
    {
      name: 'Huỳnh Thương',
      role: 'Sinh viên',
      content: 'Board game này thực sự thú vị! Cách thiết kế game và tích hợp kiến thức lịch sử rất sáng tạo. Tôi đã giới thiệu cho nhiều bạn.',
      rating: 5
    },
    {
      name: 'Kiều Văn Huy',
      role: 'Nhà sử học',
      content: 'Một sản phẩm giáo dục xuất sắc! Xuân Thu Bách Hội giúp người chơi hiểu rõ hơn về lịch sử Việt Nam một cách sinh động và hấp dẫn.',
      rating: 5
    }
  ]

  return (
    <section className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">Người chơi nói gì về chúng tôi</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="quote-icon">
                  <Quote size={32} />
                </div>
                <div className="rating">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} size={16} className="star" />
                  ))}
                </div>
              </div>
              
              <p className="testimonial-content">
                "{testimonial.content}"
              </p>
              
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Đánh giá trung bình</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Người chơi</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Hài lòng</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
