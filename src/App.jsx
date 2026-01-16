import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PromoNotification from './components/PromoNotification'
import PageTracker from './components/PageTracker'
import Home from './pages/Home'
import About from './pages/About'
import GameRules from './pages/GameRules'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Shopping from './pages/Shopping'
import FestivalDetail from './pages/FestivalDetail'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'
import AdminFestivals from './pages/admin/AdminFestivals'
import AdminFestivalContent from './pages/admin/AdminFestivalContent'
import './App.css'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin_token')
  return isAuthenticated ? children : <Navigate to="/admin/login" />
}

// Public layout component
const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <PromoNotification />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <PageTracker />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="festivals" element={<AdminFestivals />} />
            <Route path="festival-content" element={<AdminFestivalContent />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/festivals/:id" element={<PublicLayout><FestivalDetail /></PublicLayout>} />
          <Route path="/rules" element={<PublicLayout><GameRules /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/shopping" element={<PublicLayout><Shopping /></PublicLayout>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
