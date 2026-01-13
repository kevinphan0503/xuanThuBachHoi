


import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'
import './Contact.css'

// images (imported so Vite bundles them during build)
import BT from '../../assets/BT.jpg'
import TM from '../../assets/TM.png'
import CT from '../../assets/CT.jpg'
import CT3 from '../../assets/CT3.png'
import HV3 from '../../assets/HV5.jpg'
import NQ from '../../assets/NQ.png'
import HP from '../../assets/HP.jpg'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'xuanthubachhoi@gmail.com',
      description: 'Gửi email cho chúng tôi'
    },
    {
      icon: <Phone size={24} />,
      title: 'Điện thoại',
      content: '+84 931663455',
      description: 'Gọi điện trực tiếp Tina Phùng'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Địa chỉ',
      content: '144B CMT8,P.Cái Khế,Q.Ninh Kiều,Cần Thơ, Việt Nam',
      description: 'Văn phòng chính'
    },
    {
      icon: <Clock size={24} />,
      title: 'Giờ làm việc',
      content: '8:00 - 17:00',
      description: 'Thứ 2 - Thứ 6'
    }
  ]

  const faqs = [
    {
      question: 'Khi nào Xuân Thu Bách Hội sẽ chính thức ra mắt?',
      answer: 'Xuân Thu Bách Hội đang hoàn tất những bước cuối cùng và sẽ ra mắt vào quý 1 năm 2026. Chúng tôi sẽ cập nhật thông tin chi tiết trên website và fanpage.'
    },
    {
      question: 'Board game dành cho đối tượng nào?',
      answer: 'Dành cho tất cả mọi người từ 12 tuổi trở lên! Đặc biệt phù hợp với các bạn trẻ yêu thích khám phá lịch sử, gia đình muốn có trải nghiệm ý nghĩa, và các trường học muốn đưa yếu tố lịch sử vào hoạt động giáo dục.'
    },
    {
      question: 'Game chơi bao nhiêu người là đẹp?',
      answer: 'Trò chơi phù hợp với 2–6 người chơi, nhưng lý tưởng nhất là 4–5 người để đảm bảo vừa đủ tương tác, cạnh tranh, và teamwork.'
    },
    {
      question: 'Một ván chơi mất bao lâu?',
      answer: 'Thông thường khoảng 45–60 phút tùy vào số người chơi và độ "máu lửa" trong mỗi lượt đi.'
    },
    {
      question: 'Làm sao để trở thành đối tác của Xuân Thu Bách Hội?',
      answer: 'Chúng tôi luôn chào đón những đối tác mang trong mình tình yêu lịch sử và khát khao lan tỏa bản sắc Việt! Bạn có thể gửi tin nhắn qua form liên hệ hoặc email trực tiếp.'
    }
  ]

  // 👇 Phần đội ngũ
  const teamMembers = [
    { name: 'Nguyễn Hoàng Phúc', image: HP },
    
    { name: 'Nguyễn Thị Bảo Trân', image: BT },
    { name: 'Lê Tuyết Minh', image: TM },
    { name: 'Phùng Cẩm Thi', image: CT },
    { name: 'Phan Hữu Văn', image: HV3 },
    { name: 'Phan Nhật Quý', image: NQ }
   
  ]

  const heroRef = useScrollReveal()
  const infoRef = useScrollReveal()
  const formRef = useScrollReveal()
  const teamRef = useScrollReveal()
  const faqRef = useScrollReveal()

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content" ref={heroRef}>
            <h1>Liên hệ với chúng tôi</h1>
            <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
          </div>
        </div>
      </section>

      <section className="section contact-info-section">
        <div className="container" ref={infoRef}>
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className={`contact-info-card reveal-text reveal-delay-${index + 1}`}>
                <div className="info-icon">{info.icon}</div>
                <div className="info-content">
                  <h3>{info.title}</h3>
                  <p className="info-main">{info.content}</p>
                  <p className="info-desc">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="container" ref={formRef}>
          <div className="contact-content">
            <div className="contact-form-container">
              <h2 className="section-title reveal-text">Gửi tin nhắn cho chúng tôi</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Họ và tên *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Chủ đề *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="preorder">Đặt hàng trước</option>
                      <option value="partnership">Hợp tác</option>
                      <option value="support">Hỗ trợ</option>
                      <option value="feedback">Phản hồi</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tin nhắn *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Nhập tin nhắn của bạn..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-submit">
                  <Send size={20} />
                  Gửi tin nhắn
                </button>

                {isSubmitted && (
                  <div className="success-message">
                    <MessageCircle size={24} />
                    <p>Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm.</p>
                  </div>
                )}
              </form>
            </div>

            <div className="contact-map-container">
              <h3>Vị trí của chúng tôi</h3>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.634!2d105.7855!3d10.0456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAyJzQ0LjIiTiAxMDVcwjQ3JzA3LjgiRQ!5e0!3m2!1svi!2s!4v1234567890!5m2!1svi!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vị trí Xuân Thu Bách Hội - 144B CMT8, P.Cái Khế, Q.Ninh Kiều, Cần Thơ"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👇 Thêm section đội ngũ ở đây */}
      <section className="section team-section">
        <div className="container" ref={teamRef}>
          <h2 className="section-title reveal-text">Đội ngũ của chúng tôi</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className={`team-card reveal-text reveal-delay-${(index % 3) + 1}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                  loading="lazy"
                  decoding="async"
                />
                <h4 className="team-name">{member.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container" ref={faqRef}>
          <h2 className="section-title reveal-text">Câu hỏi thường gặp</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item reveal-text reveal-delay-${(index % 3) + 1}`}>
                <h4 className="faq-question">{faq.question}</h4>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
