const LOCAL_API_BASE = 'http://localhost:5001'
const RENDER_API_BASE = 'http://localhost:5000'

const API_BASE_URL = (() => {
    if (import.meta.env?.VITE_API_URL) return import.meta.env.VITE_API_URL
    const target = import.meta.env?.VITE_API_TARGET || ''
    if (target.toLowerCase() === 'render') return RENDER_API_BASE
    return LOCAL_API_BASE
})()

export { API_BASE_URL, LOCAL_API_BASE, RENDER_API_BASE }

export async function apiFetch(path, options = {}) {
    const url = `${API_BASE_URL}${path}`
    const res = await fetch(url, options)
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `API error ${res.status}`)
    }
    return res.json()
}
