import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Users, ShoppingBag, Package, DollarSign, TrendingUp } from 'lucide-react'
import { API_BASE_URL } from '../../config/api'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState('month')

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/statistics`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !stats) {
    return <div className="admin-dashboard-loading">Đang tải dữ liệu...</div>
  }

  const statCards = [
    {
      title: 'Tổng đơn hàng',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: '#3498db',
      chart: 'line'
    },
    {
      title: 'Tổng doanh thu',
      value: `${(stats.totalRevenue / 1000000).toFixed(1)}M đ`,
      icon: DollarSign,
      color: '#2ecc71',
      chart: 'line'
    },
    {
      title: 'Tổng sản phẩm',
      value: stats.totalProducts,
      icon: Package,
      color: '#f39c12',
      chart: 'area'
    },
    {
      title: 'Đơn hàng tuần này',
      value: stats.recentOrders,
      icon: TrendingUp,
      color: '#e74c3c',
      chart: 'bar'
    }
  ]

  // Prepare traffic data (mock data for now, will be replaced with real analytics)
  const trafficData = [
    { name: 'Mon', visits: 120, users: 98 },
    { name: 'Tue', visits: 150, users: 120 },
    { name: 'Wed', visits: 180, users: 145 },
    { name: 'Thu', visits: 165, users: 132 },
    { name: 'Fri', visits: 200, users: 165 },
    { name: 'Sat', visits: 175, users: 150 },
    { name: 'Sun', visits: 140, users: 118 }
  ]

  const statusData = [
    { name: 'Đã xác nhận', value: stats.ordersByStatus.find(s => s.status === 'confirmed')?.count || 0, color: '#2ecc71' },
    { name: 'Đang giao', value: stats.ordersByStatus.find(s => s.status === 'shipping')?.count || 0, color: '#3498db' },
    { name: 'Hoàn thành', value: stats.ordersByStatus.find(s => s.status === 'completed')?.count || 0, color: '#27ae60' },
    { name: 'Chờ xử lý', value: stats.ordersByStatus.find(s => s.status === 'pending')?.count || 0, color: '#f39c12' },
    { name: 'Đã hủy', value: stats.ordersByStatus.find(s => s.status === 'cancelled')?.count || 0, color: '#e74c3c' }
  ]

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <h3>{card.title}</h3>
                  <div className="stat-value">{card.value}</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                  <Icon size={32} />
                </div>
              </div>
              <div className="stat-chart">
                {card.chart === 'line' && (
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={trafficData.slice(0, 7)}>
                      <Line type="monotone" dataKey="visits" stroke={card.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                {card.chart === 'area' && (
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={trafficData.slice(0, 7)}>
                      <Area type="monotone" dataKey="visits" stroke={card.color} fill={card.color} fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
                {card.chart === 'bar' && (
                  <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={trafficData.slice(0, 7)}>
                      <Bar dataKey="visits" fill={card.color} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Traffic Chart */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Traffic Tháng 11 2025</h2>
          <div className="card-actions">
            <div className="time-filter">
              <button
                className={timeFilter === 'day' ? 'active' : ''}
                onClick={() => setTimeFilter('day')}
              >
                Day
              </button>
              <button
                className={timeFilter === 'month' ? 'active' : ''}
                onClick={() => setTimeFilter('month')}
              >
                Month
              </button>
              <button
                className={timeFilter === 'year' ? 'active' : ''}
                onClick={() => setTimeFilter('year')}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        <div className="card-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#3498db" strokeWidth={2} name="Lượt truy cập" />
              <Line type="monotone" dataKey="users" stroke="#2ecc71" strokeWidth={2} name="Người dùng" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="dashboard-card">
        <h2>Thống kê đơn hàng</h2>
        <div className="stats-bar">
          {statusData.map((item, index) => (
            <div key={index} className="stat-bar-item">
              <div className="stat-bar-header">
                <span className="stat-bar-label">{item.name}</span>
                <span className="stat-bar-value">{item.value}</span>
              </div>
              <div className="stat-bar-progress">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${(item.value / stats.totalOrders) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales by Product */}
      <div className="dashboard-card">
        <h2>Bán hàng theo sản phẩm</h2>
        <div className="sales-table">
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Đã bán</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {stats.salesByProduct.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.total_sold}</td>
                  <td>{parseInt(product.total_revenue).toLocaleString('vi-VN')}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
