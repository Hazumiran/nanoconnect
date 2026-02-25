import React from 'react'
import { Link } from 'react-router-dom'

import mock from '../data/mockData'

export default function Home() {
  const influencers = mock.influencers.slice(0,3)

  return (
    <main>
      <section className="h-screen flex items-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">NanoConnect — Matching UMKM dengan Nano Influencer</h1>
          <p className="mt-4 text-gray-400 text-lg md:text-xl">Tinder for UMKM & nano influencers — budget-based, niche-aware, location-aware.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/influencers" className="bg-white text-black px-6 py-3 rounded font-semibold">Temukan Influencer</Link>
            <a href="#about" className="text-gray-300 px-6 py-3 rounded border border-gray-700">Pelajari Lebih Lanjut</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold">About</h2>
          <p className="mt-3 text-gray-400">Platform untuk mencocokkan UMKM/SME dengan nano influencers lokal berdasarkan budget, niche, dan target audience.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold mb-4">Influencer Listing (Preview)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {influencers.map(i => (
              <div key={i.id} className="bg-gray-900 p-4 rounded hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">{i.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm text-gray-400">{i.niche} • {i.sub_niche}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-gray-300">Rp {Number(i.price_per_post).toLocaleString()}</div>
                  <Link to={`/influencers/${i.id}`} className="text-indigo-400">Detail</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold">AI Recommendations</h3>
          <p className="mt-2 text-gray-400">Rekomendasi kampanye berbasis AI (placeholder).</p>
        </div>
      </section>
    </main>
  )
}
