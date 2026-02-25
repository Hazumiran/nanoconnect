import React from 'react'
import { Link } from 'react-router-dom'
import { influencers as mockInfluencers } from '../data/mockData'

function Badge({ children, color = 'gray' }){
  const base = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium'
  const colors = {
    gray: 'bg-gray-800 text-gray-300',
    green: 'bg-emerald-600 text-white',
    red: 'bg-red-600 text-white'
  }
  return <span className={`${base} ${colors[color] || colors.gray}`}>{children}</span>
}

export default function Influencers(){
  const influencers = mockInfluencers

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Influencer Listing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map(i=> (
          <article key={i.id} className="bg-gray-900 p-4 rounded hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-lg font-semibold">{i.name.split(' ').map(n=>n[0]).join('')}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-base">{i.name} <span className="text-sm text-gray-400">@{i.username}</span></div>
                    <div className="text-sm text-gray-400">{i.niche} • {i.sub_niche}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">{i.followers_count.toLocaleString()} followers</div>
                    <div className="text-sm text-yellow-400">★ {i.rating}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Badge color={i.availability_status === 'available' ? 'green' : 'red'}>{i.availability_status}</Badge>
                  <div className="text-sm text-gray-400">ER {i.engagement_rate}%</div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-300">Price</div>
                    <div className="font-bold">Rp {Number(i.price_per_post).toLocaleString()}</div>
                  </div>
                  <Link to={`/influencers/${i.id}`} className="text-indigo-400">Detail</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
