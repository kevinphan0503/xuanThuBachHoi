const LOCAL_API_BASE = 'http://localhost:5000'
const RENDER_API_BASE = 'https://xuanthubachhoi.onrender.com'

function normalizeBase(url) {
    return (url || '').replace(/\/+$/, '')
}

const API_BASE_URL = (() => {
    const fromEnv = normalizeBase(import.meta.env?.VITE_API_URL)
    if (fromEnv) return fromEnv
    const target = (import.meta.env?.VITE_API_TARGET || '').toLowerCase()
    if (target === 'render') return RENDER_API_BASE
    return LOCAL_API_BASE
})()

export { API_BASE_URL, LOCAL_API_BASE, RENDER_API_BASE }

export async function apiFetch(path, options = {}) {
    const suffix = String(path || '')
    const url = `${API_BASE_URL}${suffix.startsWith('/') ? '' : '/'}${suffix}`
    const opts = {
        ...options,
        credentials: 'include', // gửi cookie để session backend hoạt động
    };
    const res = await fetch(url, opts)
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `API error ${res.status}`)
    }
    return res.json()
}
