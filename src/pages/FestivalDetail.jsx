import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './FestivalDetail.css'

const FestivalDetail = () => {
  const { id } = useParams()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const [festival, setFestival] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${API_URL}/api/festivals/${id}`)
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data = await res.json()
        if (active) setFestival(data)
      } catch (err) {
        if (active) setError(err.message || 'Failed to load festival')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => { active = false }
  }, [id])

  return (
    <div className="section festival-detail-page">
      <div className="container">

        {/* HEADER */}
        <div className="festival-header">
          <Link to="/about" className="back-btn">← Quay lại</Link>
          <h2 className="section-title center">Chi tiết Lễ hội</h2>
        </div>

        {loading && <p>Đang tải dữ liệu…</p>}
        {error && !loading && <p>Lỗi: {error}</p>}

        {!loading && !error && festival && (
          <>
            {/* MAIN DETAIL */}
            <div className="festival-detail-card">

              {/* LEFT */}
              <div className="festival-left">
                <h3 className="festival-title center">
                  {festival.name}
                </h3>

                <div className="festival-image">
                  {festival.image_url ? (
                    <img
                      src={festival.image_url}
                      alt={festival.name}
                    />
                  ) : (
                    <span>Ảnh lễ hội</span>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="festival-right">
                <h4>📜 Thông tin lễ hội</h4>
                <p className="festival-description">
                  {festival.description}
                </p>
              </div>

            </div>

            {/* VIDEO – CHUNG BACKGROUND */}
            {festival.video_url && (
              <div className="festival-video-section">
                <div className="video-wrapper">
                  <iframe
                    src={festival.video_url}
                    title={festival.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FestivalDetail
