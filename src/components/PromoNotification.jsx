import React, { useState, useEffect } from 'react'
import { X, Gift, Clock, Users } from 'lucide-react'
import './PromoNotification.css'

const PromoNotification = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    // Show notification after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="promo-notification">
      <button className="promo-close" onClick={handleClose}>
        <X size={16} />
      </button>
      
      <div className="promo-content">
        <div className="promo-icon">
          <Gift size={24} />
        </div>
        
        <div className="promo-text">
          <h4>🎉 Ưu đãi đặc biệt!</h4>
          <p>Giảm <strong>25%</strong> - Chỉ còn <strong>299.000đ</strong></p>
          <div className="promo-timer">
            <Clock size={14} />
            <span>Còn lại: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
        
        <div className="promo-stats">
          <div className="stat-item">
            <Users size={14} />
            <span>127 người đang xem</span>
          </div>
          <div className="stock-info">
            <span>Chỉ còn 15 bộ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoNotification
