import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Influencers from './pages/Influencers'
import InfluencerDetail from './pages/InfluencerDetail'
import Booking from './pages/Booking'
import Terms from './pages/Terms'
import Auth from './pages/Auth'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/influencers" element={<Influencers />} />
        <Route path="/influencers/:id" element={<InfluencerDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}
