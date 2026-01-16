import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import './FestivalDetail.css'
import QRCode from 'react-qr-code'

const getVideoEmbedUrl = (url) => {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    const host = parsed.hostname

    if (host.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`

      const pathParts = parsed.pathname.split('/').filter(Boolean)
      const last = pathParts[pathParts.length - 1]
      if (pathParts.includes('embed') && last) return `https://www.youtube.com/embed/${last}`
    }

    if (host.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '')
      if (id) return `https://www.youtube.com/embed/${id}`
    }

    return url
  } catch {
    return url
  }
}

const FestivalDetail = () => {
  const { id } = useParams()
  const [festival, setFestival] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const detailUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const host = window.location.origin
    const base = host.includes('localhost') ? 'https://xuan-thu-bach-hoi.vercel.app' : host
    return `${base}/festivals/${id}`
  }, [id])

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${API_BASE_URL}/api/festivals/${id}`)
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
                <div
                  className="festival-description"
                  dangerouslySetInnerHTML={{ __html: festival.description || '' }}
                />

                <div className="festival-share-card">
                  <div className="share-copy">
                    <h4>🔗 Chia sẻ trang</h4>
                    <p>Quét QR hoặc mở liên kết để xem trang chi tiết này trên thiết bị khác.</p>
                    <a className="share-link" href={detailUrl} target="_blank" rel="noreferrer">
                      {detailUrl}
                    </a>
                  </div>
                  <div className="qr-wrapper" aria-label="Mã QR dẫn tới trang chi tiết lễ hội">
                    {detailUrl && <QRCode value={detailUrl} size={148} />}
                    <span className="qr-caption">Quét để mở nhanh</span>
                  </div>
                </div>
              </div>

            </div>

            {/* VIDEO – CHUNG BACKGROUND */}
            {festival.link_video && (
              <div className="festival-video-section">
                <div className="video-wrapper">
                  <iframe
                    src={getVideoEmbedUrl(festival.link_video)}
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
