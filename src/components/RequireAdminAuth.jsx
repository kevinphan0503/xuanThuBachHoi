import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAdminAuth({ children }) {
    const location = useLocation()
    const isAuthed = typeof window !== 'undefined' && localStorage.getItem('adminAuth') === 'true'

    if (!isAuthed) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return children
}

export default RequireAdminAuth
