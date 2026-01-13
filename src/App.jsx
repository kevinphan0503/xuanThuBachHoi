import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PromoNotification from './components/PromoNotification'
import Home from './pages/Home'
import About from './pages/About'
import GameRules from './pages/GameRules'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import FestivalDetail from './pages/FestivalDetail'
import AdminLogin from './pages/AdminLogin'
import AdminHome from './pages/AdminHome'
import RequireAdminAuth from './components/RequireAdminAuth'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="App">
      {!isAdmin && <Header />}
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/festivals/:id" element={<FestivalDetail />} />
          <Route path="/rules" element={<GameRules />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdminAuth>
                <AdminHome />
              </RequireAdminAuth>
            }
          />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <PromoNotification />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
