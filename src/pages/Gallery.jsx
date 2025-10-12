import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Download, Heart, Share2 } from 'lucide-react'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryImages = [
    {
      id: 1,
      src: '/api/placeholder/400/300',
      alt: 'Bàn cờ chính của Xuân Thu Bách Hội',
      title: 'Bàn cờ chính',
      description: 'Bản đồ Việt Nam với các vùng lãnh thổ của các triều đại'
    },
    {
      id: 2,
      src: '/api/placeholder/400/300',
      alt: 'Quân cờ các triều đại',
      title: 'Quân cờ triều đại',
      description: 'Các quân cờ đại diện cho từng triều đại lịch sử'
    },
    {
      id: 3,
      src: '/api/placeholder/400/300',
      alt: 'Thẻ sự kiện lịch sử',
      title: 'Thẻ sự kiện',
      description: 'Những thẻ bài mô tả các sự kiện quan trọng trong lịch sử'
    },
    {
      id: 4,
      src: '/api/placeholder/400/300',
      alt: 'Thẻ nhân vật lịch sử',
      title: 'Thẻ nhân vật',
      description: 'Các nhân vật lịch sử nổi tiếng với khả năng đặc biệt'
    },
    {
      id: 5,
      src: '/api/placeholder/400/300',
      alt: 'Thẻ công trình kiến trúc',
      title: 'Thẻ công trình',
      description: 'Các công trình kiến trúc nổi tiếng của Việt Nam'
    },
    {
      id: 6,
      src: '/api/placeholder/400/300',
      alt: 'Hộp đựng game',
      title: 'Hộp game',
      description: 'Thiết kế hộp đựng đẹp mắt và tiện dụng'
    },
    {
      id: 7,
      src: '/api/placeholder/400/300',
      alt: 'Người chơi đang chơi game',
      title: 'Trải nghiệm chơi',
      description: 'Khoảnh khắc vui vẻ khi chơi cùng gia đình và bạn bè'
    },
    {
      id: 8,
      src: '/api/placeholder/400/300',
      alt: 'Chi tiết thiết kế game',
      title: 'Chi tiết thiết kế',
      description: 'Những chi tiết tinh xảo trong thiết kế game'
    },
    {
      id: 9,
      src: '/api/placeholder/400/300',
      alt: 'Sách hướng dẫn',
      title: 'Sách hướng dẫn',
      description: 'Sách hướng dẫn chi tiết và dễ hiểu'
    }
  ]

  const openModal = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(galleryImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedImage(galleryImages[prevIndex])
  }

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hình ảnh game</h1>
            <p>Khám phá thiết kế đẹp mắt và chi tiết của Xuân Thu Bách Hội</p>
          </div>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="gallery-item" onClick={() => openModal(image, index)}>
                <div className="gallery-image">
                  <div className="image-placeholder">
                    <span>📸</span>
                    <p>{image.title}</p>
                  </div>
                  <div className="gallery-overlay">
                    <div className="gallery-actions">
                      <button className="action-btn">
                        <Heart size={20} />
                      </button>
                      <button className="action-btn">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <button className="modal-nav modal-nav-left" onClick={prevImage}>
              <ChevronLeft size={24} />
            </button>
            
            <button className="modal-nav modal-nav-right" onClick={nextImage}>
              <ChevronRight size={24} />
            </button>

            <div className="modal-image">
              <div className="image-placeholder-large">
                <span>📸</span>
                <p>{selectedImage.title}</p>
              </div>
            </div>

            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="modal-actions">
                <button className="btn">
                  <Download size={20} />
                  Tải xuống
                </button>
                <button className="btn btn-secondary">
                  <Share2 size={20} />
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
