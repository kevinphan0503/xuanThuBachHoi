import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Eye, Users, TrendingUp, Globe } from 'lucide-react'
import { API_BASE_URL } from '../../config/api'
import './AdminAnalytics.css'

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/analytics/visits?period=${period}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
    return <div className="admin-loading">Đang tải dữ liệu...</div>
  }

  const statsCards = [
    {
      title: 'Tổng lượt truy cập',
      value: analytics.totalVisits,
      icon: Globe,
      color: '#3498db'
    },
    {
      title: 'Lượt truy cập hôm nay',
      value: analytics.todayVisits,
      icon: Eye,
      color: '#2ecc71'
    },
    {
      title: 'Trang duy nhất',
      value: analytics.uniquePages,
      icon: TrendingUp,
      color: '#f39c12'
    },
    {
      title: 'Người dùng',
      value: analytics.todayVisits,
      icon: Users,
      color: '#9b59b6'
    }
  ]

  return (
    <div className="admin-analytics">
      <div className="analytics-header">
        <h1>Thống kê truy cập</h1>
        <div className="period-selector">
          <label>Khoảng thời gian:</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7">7 ngày</option>
            <option value="30">30 ngày</option>
            <option value="90">90 ngày</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        {statsCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                <Icon size={32} />
              </div>
              <div className="stat-info">
                <h3>{card.title}</h3>
                <div className="stat-value">{card.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="analytics-chart">
        <div className="dashboard-card">
          <h2>Lượt truy cập theo ngày</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analytics.visits}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3498db"
                strokeWidth={3}
                name="Lượt truy cập"
                dot={{ fill: '#3498db', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics
