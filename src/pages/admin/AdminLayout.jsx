import React, { useState } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import './AdminLayout.css'

const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', badge: 'NEW' },
    { path: '/admin/products', icon: Package, label: 'Sản phẩm' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Đơn hàng' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Thống kê' },
    { path: '/admin/settings', icon: Settings, label: 'Cài đặt' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>XTBH Admin</h2>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">UI ELEMENTS</h3>
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div className="breadcrumbs">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
            {location.pathname !== '/admin' && (
              <>
                <span>/</span>
                <span>{menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}</span>
              </>
            )}
          </div>
          <div className="header-actions">
            <Link to="/" className="header-link">Dashboard</Link>
            <Link to="/admin/settings" className="header-link">Settings</Link>
            <button className="header-link" onClick={handleLogout}>
              <LogOut size={18} />
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
