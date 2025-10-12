import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BuyNowButton from './components/BuyNowButton'
import PromoNotification from './components/PromoNotification'
import Home from './pages/Home'
import About from './pages/About'
import GameRules from './pages/GameRules'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rules" element={<GameRules />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <BuyNowButton />
        <PromoNotification />
      </div>
    </Router>
  )
}

export default App
