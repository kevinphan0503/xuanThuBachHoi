import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, CalendarRange } from 'lucide-react'
import { API_BASE_URL } from '../../config/api'
import './AdminFestivals.css'

const defaultForm = {
    game_id: 1,
    name: '',
    description: '',
    image_url: '',
    link_video: '',
    festival_status: 'AVAILABLE'
}

const statusLabels = {
    AVAILABLE: 'Hoạt động',
    UNAVAILABLE: 'Tạm dừng',
    DELETED: 'Đã xóa'
}

const AdminFestivals = () => {
    const [festivals, setFestivals] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingFestival, setEditingFestival] = useState(null)
    const [formData, setFormData] = useState({ ...defaultForm })
    const [imageFile, setImageFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [gameSets, setGameSets] = useState([])
    const [loadingGameSets, setLoadingGameSets] = useState(true)

    useEffect(() => {
        fetchFestivals()
        fetchGameSets()
    }, [])

    const fetchGameSets = async () => {
        setLoadingGameSets(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/game-sets`)
            const data = await res.json()
            setGameSets(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching game sets:', error)
        } finally {
            setLoadingGameSets(false)
        }
    }

    const fetchFestivals = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/festivals`)
            const data = await res.json()
            setFestivals(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching festivals:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUploadError('')
        const payload = {
            ...formData,
            game_id: parseInt(formData.game_id) || 1
        }

        try {
            // If user selected a local file, upload to Cloudinary first
            if (imageFile) {
                setUploading(true)
                const base64 = await fileToBase64(imageFile)
                const uploadRes = await fetch(`${API_BASE_URL}/api/admin/upload/festival-image`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ file: base64 })
                })

                if (!uploadRes.ok) {
                    const err = await uploadRes.json().catch(() => ({}))
                    throw new Error(err.error || 'Upload thất bại')
                }

                const uploadData = await uploadRes.json()
                payload.image_url = uploadData.url
            }
        } catch (error) {
            console.error('Upload error:', error)
            setUploadError(error.message || 'Không thể tải ảnh lên Cloudinary')
            setUploading(false)
            return
        }

        try {
            const url = editingFestival
                ? `${API_BASE_URL}/api/admin/festivals/${editingFestival.festival_id}`
                : `${API_BASE_URL}/api/admin/festivals`
            const method = editingFestival ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                setShowModal(false)
                setEditingFestival(null)
                resetForm()
                fetchFestivals()
            }
        } catch (error) {
            console.error('Error saving festival:', error)
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (festival) => {
        setEditingFestival(festival)
        setFormData({
            game_id: festival.game_id,
            name: festival.name || '',
            description: festival.description || '',
            image_url: festival.image_url || '',
            link_video: festival.link_video || '',
            festival_status: festival.festival_status || 'AVAILABLE'
        })
        setImageFile(null)
        setUploadError('')
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!confirm('Bạn có chắc chắn muốn xóa lễ hội này?')) return

        try {
            await fetch(`${API_BASE_URL}/api/admin/festivals/${id}`, { method: 'DELETE' })
            fetchFestivals()
        } catch (error) {
            console.error('Error deleting festival:', error)
        }
    }

    const resetForm = () => {
        setFormData({ ...defaultForm })
        setImageFile(null)
        setUploadError('')
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        setImageFile(file || null)
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = (err) => reject(err)
            reader.readAsDataURL(file)
        })
    }

    const getStatusClass = (status) => {
        if (status === 'AVAILABLE') return 'active'
        if (status === 'UNAVAILABLE') return 'inactive'
        return 'inactive'
    }

    if (loading) {
        return <div className="admin-loading">Đang tải...</div>
    }

    return (
        <div className="admin-festivals">
            <div className="page-header">
                <h1>Quản lý lễ hội</h1>
                <button className="btn-primary" onClick={() => {
                    setEditingFestival(null)
                    resetForm()
                    setShowModal(true)
                }}>
                    <Plus size={20} />
                    Thêm lễ hội
                </button>
            </div>

            <div className="festivals-table-wrapper">
                <table className="festivals-table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên lễ hội</th>
                            <th>Bộ boardgame</th>
                            <th>Trạng thái</th>
                            <th>Video</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {festivals.map((festival) => (
                            <tr key={festival.festival_id}>
                                <td>
                                    <img
                                        src={festival.image_url || '/assets/logo.png'}
                                        alt={festival.name}
                                        className="festival-thumb"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = '/assets/logo.png'
                                        }}
                                    />
                                </td>
                                <td>
                                    <strong>{festival.name}</strong>
                                    {festival.description && (
                                        <div className="festival-desc">{festival.description.substring(0, 60)}...</div>
                                    )}
                                </td>
                                <td>{gameSets.find((g) => g.game_id === festival.game_id)?.name || `#${festival.game_id}`}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(festival.festival_status)}`}>
                                        {statusLabels[festival.festival_status] || festival.festival_status}
                                    </span>
                                </td>
                                <td>
                                    {festival.link_video ? (
                                        <a href={festival.link_video} target="_blank" rel="noreferrer" className="video-link">
                                            Xem video
                                        </a>
                                    ) : (
                                        <span className="muted">Chưa có</span>
                                    )}
                                </td>
                                <td>{festival.created_at ? new Date(festival.created_at).toLocaleDateString('vi-VN') : '-'}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-edit" onClick={() => handleEdit(festival)}>
                                            <Edit size={16} />
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(festival.festival_id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingFestival ? 'Chỉnh sửa lễ hội' : 'Thêm lễ hội mới'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Bộ boardgame *</label>
                                    <select
                                        value={formData.game_id}
                                        onChange={(e) => setFormData({ ...formData, game_id: parseInt(e.target.value) })}
                                        required
                                        disabled={loadingGameSets || gameSets.length === 0}
                                    >
                                        {loadingGameSets && <option>Đang tải...</option>}
                                        {!loadingGameSets && gameSets.length === 0 && <option>Chưa có bộ game</option>}
                                        {!loadingGameSets && gameSets.map((g) => (
                                            <option key={g.game_id} value={g.game_id}>{g.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Tên lễ hội *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Chọn ảnh từ máy</label>
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    <div className="upload-hint">Tải ảnh lên Cloudinary khi lưu.</div>
                                    {(imageFile || formData.image_url) && (
                                        <div className="upload-preview">
                                            <img
                                                src={imageFile ? URL.createObjectURL(imageFile) : formData.image_url}
                                                alt="Preview"
                                                onError={(e) => {
                                                    e.target.onerror = null
                                                    e.target.src = '/assets/logo.png'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Link video</label>
                                    <input
                                        type="text"
                                        value={formData.link_video}
                                        onChange={(e) => setFormData({ ...formData, link_video: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Trạng thái</label>
                                <select
                                    value={formData.festival_status}
                                    onChange={(e) => setFormData({ ...formData, festival_status: e.target.value })}
                                >
                                    <option value="AVAILABLE">Hoạt động</option>
                                    <option value="UNAVAILABLE">Tạm dừng</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="btn-save">
                                    {uploading ? 'Đang tải ảnh...' : (editingFestival ? 'Cập nhật' : 'Thêm mới')}
                                </button>
                            </div>
                            {uploadError && <div className="upload-error">{uploadError}</div>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminFestivals
