import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="py-4 border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div>
          <Link to="/" className="text-2xl md:text-3xl font-extrabold">NanoConnect</Link>
          <div className="text-xs text-gray-400">Matching UMKM & Nano Influencer</div>
        </div>

        <div className="md:hidden">
          <button aria-label="menu" onClick={() => setOpen(!open)} className="p-2 bg-gray-800 rounded">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <nav className={`hidden md:flex items-center gap-4 ${open ? 'block' : ''}`}>
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/influencers" className="text-gray-300 hover:text-white">Influencers</Link>
          <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
          <Link to="/auth" className="bg-white text-black px-3 py-1 rounded">Sign in</Link>
        </nav>
      </div>

      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-gray-300">Home</Link>
            <Link to="/influencers" className="block text-gray-300">Influencers</Link>
            <Link to="/terms" className="block text-gray-300">Terms</Link>
            <Link to="/auth" className="block bg-white text-black px-3 py-1 rounded w-max">Sign in</Link>
          </div>
        </div>
      )}
    </header>
  )
}
