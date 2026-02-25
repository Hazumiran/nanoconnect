import React, { useState } from 'react'

export default function Auth(){
  const [mode, setMode] = useState('login')
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded">
        <div className="flex gap-2 mb-4">
          <button onClick={()=>setMode('login')} className={`flex-1 py-2 ${mode==='login' ? 'bg-white text-black' : 'bg-gray-800'}`}>Login</button>
          <button onClick={()=>setMode('signup')} className={`flex-1 py-2 ${mode==='signup' ? 'bg-white text-black' : 'bg-gray-800'}`}>Sign up</button>
        </div>

        {mode === 'login' ? (
          <form className="space-y-3">
            <input placeholder="email" className="w-full p-2 bg-gray-800 rounded" />
            <input placeholder="password" type="password" className="w-full p-2 bg-gray-800 rounded" />
            <button className="w-full bg-indigo-600 py-2 rounded">Login</button>
          </form>
        ) : (
          <form className="space-y-3">
            <input placeholder="name" className="w-full p-2 bg-gray-800 rounded" />
            <input placeholder="email" className="w-full p-2 bg-gray-800 rounded" />
            <input placeholder="password" type="password" className="w-full p-2 bg-gray-800 rounded" />
            <button className="w-full bg-indigo-600 py-2 rounded">Sign up</button>
          </form>
        )}
      </div>
    </main>
  )
}
