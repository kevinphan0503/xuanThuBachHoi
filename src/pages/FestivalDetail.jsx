import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const FestivalDetail = () => {
    const { id } = useParams()
    const [festival, setFestival] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true
        async function load() {
            try {
                setLoading(true)
                setError('')
                const res = await fetch(`http://localhost:5000/api/festivals/${id}`)
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
        <div className="section">
            <div className="container">
                <h2 className="section-title">Chi tiết Lễ hội</h2>
                <div style={{ marginBottom: 20 }}>
                    <Link to="/about" className="btn btn-secondary">← Quay lại</Link>
                </div>
                {loading && <p>Đang tải dữ liệu…</p>}
                {error && !loading && <p>Lỗi: {error}</p>}
                {!loading && !error && festival && (
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        padding: 24,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
                    }}>
                        {/* <h3 style={{ marginBottom: 12 }}>{festival.name || `Lễ hội #${festival.festival_id}`}</h3>
                        <div>
                            {Object.entries(festival).map(([key, value]) => (
                                <div key={key} style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <strong style={{ minWidth: 160, textTransform: 'capitalize' }}>{key}</strong>
                                    <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                                </div>

                            ))}
                        </div> */}

                        <h3 style={{ marginBottom: 12 }}>{festival?.name || `Lễ hội #${festival?.festival_id}`}</h3>
                        <div style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <strong style={{ minWidth: 160, textTransform: 'capitalize' }}>Information</strong>
                            {festival?.description && (
                                <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{festival.description}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FestivalDetail
