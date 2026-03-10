import React from 'react'

export const ProfileView: React.FC = () => (
  <div className="min-h-screen bg-[#0A0A0F] px-4 pt-8 pb-24 text-white">
    <h1 className="text-2xl font-bold text-yellow-400 mb-6">Profile</h1>
    <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-yellow-500/20">
      <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-3xl">👤</div>
      <div>
        <p className="font-semibold text-white">Guest User</p>
        <p className="text-sm text-white/50">Sign in to save your favorites</p>
      </div>
    </div>
    <button className="w-full py-3 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all">
      Sign In
    </button>
  </div>
)
