import React from 'react'
import { useParams, Link } from 'react-router-dom'
import mock from '../data/mockData'

export default function InfluencerDetail(){
  const { id } = useParams()
  // load from mock synchronously
  const influencer = mock.influencers.find(x => x.id === id)

  if (!influencer) return <main className="container mx-auto px-4 md:px-6 py-8">Influencer not found</main>

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="bg-gray-900 p-6 rounded">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-3xl">{influencer.name.split(' ').map(n=>n[0]).join('')}</div>
            <div className="mt-4 text-center md:text-left">
              <div className="font-semibold text-lg">@{influencer.username}</div>
              <div className="text-sm text-gray-400">{influencer.location || '—'}</div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{influencer.name}</h2>
            <p className="text-sm text-gray-400">{influencer.niche} • {influencer.sub_niche}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-300">Followers</div>
                <div className="font-bold">{influencer.followers_count.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Engagement</div>
                <div className="font-bold">{influencer.engagement_rate}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Rating</div>
                <div className="font-bold">{influencer.rating} ★</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">About</h4>
              <p className="text-gray-400 mt-2">{influencer.bio}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/booking" className="bg-indigo-600 px-4 py-2 rounded">Book</Link>
              <Link to="/influencers" className="px-4 py-2 rounded border border-gray-700">Back</Link>
            </div>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="font-semibold">Portfolio</h3>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1,2,3].map(n => (
              <div key={n} className="h-24 bg-gray-800 rounded flex items-center justify-center text-sm text-gray-400">Sample post {n}</div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
