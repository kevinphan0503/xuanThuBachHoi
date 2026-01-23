import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, ChevronDown } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'
import { API_BASE_URL } from '../config/api'
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

  const [status, setStatus] = useState({ loading: false, success: '', error: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: '', error: '' })

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        let message = `API error ${res.status}`
        try {
          const data = await res.json()
          if (data && (data.error || data.detail)) {
            message = `${data.error || 'API error'}${data.detail ? ' - ' + data.detail : ''}`
          }
        } catch {
          const text = await res.text().catch(() => '')
          if (text) message = text
        }
        throw new Error(message)
      }

      setStatus({ loading: false, success: 'Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm.', error: '' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.message || 'Gửi thất bại. Vui lòng thử lại.' })
    }
  }

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      content: 'xuanthubachhoi@gmail.com',
      description: 'Gửi email cho chúng tôi'
    },
    {
      icon: <Phone size={20} />,
      title: 'Điện thoại',
      content: '+84 931663455',
      description: 'Gọi điện trực tiếp Tina Phùng'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Địa chỉ',
      content: 'Quận Ninh Kiều, Cần Thơ',
      description: 'Trụ sở chính'
    },
    {
      icon: <Clock size={20} />,
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Thứ 6: 09:00 - 18:00',
      description: 'Hỗ trợ nhanh chóng'
    }
  ]

  const faqs = [
    {
      question: 'Khi nào trò chơi chính thức phát hành?',
      answer: 'Chúng tôi sẽ công bố lịch phát hành sớm, hãy theo dõi fanpage và website để nhận thông báo mới nhất.'
    },
    {
      question: 'Làm thế nào để trở thành đối tác phân phối?',
      answer: 'Gửi thông tin liên hệ qua form hoặc email, chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.'
    },
    {
      question: 'Trò chơi có yếu tố lịch sử thật sự không?',
      answer: 'Nội dung được nghiên cứu cùng các cố vấn văn hóa để đảm bảo tính chân thật và sinh động.'
    }
  ]

  const teamMembers = [
    { name: 'Lê Minh', role: 'Giám đốc Sáng tạo', image: TM },
    { name: 'Trần Thu Thảo', role: 'Người dẫn lối văn hóa', image: BT },
    { name: 'Nguyễn Tiến', role: 'Nghiên cứu Văn hóa', image: HP },
    { name: 'Phạm Lan Anh', role: 'Thiết kế Gameplay', image: NQ },
    { name: 'Hoàng Long', role: 'Quản lý Sản xuất', image: CT3 },
    { name: 'Đỗ Kim Ngân', role: 'Truyền thông & Cộng đồng', image: CT }
  ]

  const heroRef = useScrollReveal()
  const infoRef = useScrollReveal()
  const formRef = useScrollReveal()
  const teamRef = useScrollReveal()
  const faqRef = useScrollReveal()

  return (
    <div className="contact-page">
      <section className="contact-header" ref={heroRef}>
        <div className="container">
          <h1>Kết Nối Với Chúng Tôi</h1>
          <p>Chào mừng bạn đến với Xuân Thu Bách Hội. Chúng tôi luôn sẵn sàng lắng nghe ý kiến từ cộng đồng yêu mến di sản văn hóa và các chiến thuật gia bản đồ.</p>
        </div>
      </section>

      <section className="contact-info" ref={infoRef}>
        <div className="container info-grid">
          {contactInfo.map((info, index) => (
            <div key={info.title} className={`info-card reveal-text reveal-delay-${index + 1}`}>
              <div className="icon-box">{info.icon}</div>
              <div className="info-text">
                <h3>{info.title}</h3>
                <p className="info-main">{info.content}</p>
                <p className="info-desc">{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-main" ref={formRef}>
        <div className="container contact-grid">
          <div className="form-card">
            <h2>Gửi Tin Nhắn</h2>
            <p className="form-sub">Bạn có thắc mắc về luật chơi hoặc muốn hợp tác? Hãy để lại lời nhắn.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="a.nguyen@example.com"
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
                    placeholder="09x 123 4567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Chủ đề</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Vì sao chung</option>
                    <option value="preorder">Đặt hàng trước</option>
                    <option value="partnership">Hợp tác</option>
                    <option value="support">Hỗ trợ</option>
                    <option value="feedback">Phản hồi</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Lời nhắn</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit" disabled={status.loading}>
                <Send size={18} />
                {status.loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
              </button>

              {status.success && (
                <div className="status-message success">
                  <MessageCircle size={20} />
                  <p>{status.success}</p>
                </div>
              )}

              {status.error && (
                <div className="status-message error">
                  <MessageCircle size={20} />
                  <p>{status.error}</p>
                </div>
              )}
            </form>
          </div>

        
        </div>
      </section>

      <section className="faq-section" ref={faqRef}>
        <div className="container">
          <h2>Câu Hỏi Thường Gặp</h2>
          <p className="faq-sub">Giải đáp các thắc mắc phổ biến về dự án Xuân Thu Bách Hội.</p>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} className={`faq-item reveal-text reveal-delay-${(index % 3) + 1}`}>
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown size={16} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  )
}

export default Contact
