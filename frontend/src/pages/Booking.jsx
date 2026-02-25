import React from 'react'

export default function Booking(){
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="bg-gray-900 p-6 rounded">
        <h2 className="text-2xl font-bold">Booking</h2>
        <p className="text-gray-400 mt-2">Isi form booking untuk memulai kampanye.</p>

        <form className="mt-4 grid grid-cols-1 gap-4 max-w-lg">
          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Campaign Name</span>
            <input placeholder="Nama kampanye" className="mt-1 p-2 bg-gray-800 rounded outline-none" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Budget</span>
            <input placeholder="100" className="mt-1 p-2 bg-gray-800 rounded outline-none" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Notes</span>
            <textarea placeholder="Brief campaign" className="mt-1 p-2 bg-gray-800 rounded outline-none" />
          </label>

          <div>
            <button className="bg-indigo-600 px-4 py-2 rounded">Submit Booking</button>
          </div>
        </form>
      </div>
    </main>
  )
}
