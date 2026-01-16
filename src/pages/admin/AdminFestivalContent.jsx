import React, { useEffect, useMemo, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { API_BASE_URL } from '../../config/api'
import './AdminFestivalContent.css'

const AdminFestivalContent = () => {
    const [festivals, setFestivals] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        loadFestivals()
    }, [])

    const loadFestivals = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/festivals`)
            const data = await res.json()
            const list = Array.isArray(data) ? data : []
            setFestivals(list)
            if (list.length > 0) {
                const first = list[0]
                setSelectedId(first.festival_id)
                setContent(first.description || '')
            }
        } catch (err) {
            setError(err.message || 'Không tải được danh sách lễ hội')
        } finally {
            setLoading(false)
        }
    }

    const currentFestival = useMemo(() => {
        return festivals.find((f) => f.festival_id === selectedId) || null
    }, [festivals, selectedId])

    const handleSelect = (id) => {
        setSelectedId(id)
        const fest = festivals.find((f) => f.festival_id === id)
        setContent(fest?.description || '')
        setMessage('')
        setError('')
    }

    const handleSave = async () => {
        if (!currentFestival) return
        setSaving(true)
        setMessage('')
        setError('')
        try {
            const payload = {
                game_id: currentFestival.game_id,
                name: currentFestival.name,
                description: content,
                image_url: currentFestival.image_url,
                link_video: currentFestival.link_video,
                festival_status: currentFestival.festival_status || 'AVAILABLE'
            }

            const res = await fetch(`${API_BASE_URL}/api/admin/festivals/${currentFestival.festival_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || 'Lưu thất bại')
            }

            setMessage('Đã lưu nội dung lễ hội')
            // update local list
            setFestivals((prev) => prev.map((f) => f.festival_id === currentFestival.festival_id ? { ...f, description: content } : f))
        } catch (err) {
            setError(err.message || 'Không lưu được nội dung')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="admin-loading">Đang tải lễ hội...</div>
    if (error && festivals.length === 0) return <div className="admin-loading">{error}</div>

    return (
        <div className="admin-festival-content">
            <div className="page-header">
                <h1>Soạn thảo thông tin lễ hội</h1>
            </div>

            <div className="editor-card">
                <div className="editor-top">
                    <div className="form-group">
                        <label>Chọn lễ hội</label>
                        <select
                            value={selectedId || ''}
                            onChange={(e) => handleSelect(Number(e.target.value))}
                        >
                            {festivals.map((f) => (
                                <option key={f.festival_id} value={f.festival_id}>{f.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn-save" onClick={handleSave} disabled={saving || !currentFestival}>
                        {saving ? 'Đang lưu...' : 'Lưu nội dung'}
                    </button>
                </div>

                <ReactQuill theme="snow" value={content} onChange={setContent} className="editor" />

                <div className="live-preview">
                    <h3>Xem trước</h3>
                    {content ? (
                        <div className="preview-box" dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <div className="preview-empty">Chưa có nội dung</div>
                    )}
                </div>

                {message && <div className="alert success">{message}</div>}
                {error && <div className="alert error">{error}</div>}
            </div>
        </div>
    )
}

export default AdminFestivalContent
