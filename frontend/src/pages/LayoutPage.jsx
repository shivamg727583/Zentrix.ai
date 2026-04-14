import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/react'

function LayoutPage() {
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <SignIn />
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col bg-blue-50 overflow-hidden">

      {/* Navbar */}
      <nav className="w-full h-16 px-4 sm:px-8 flex items-center justify-between bg-white border-b shadow-sm z-50">
        <img src={assets.logo} alt="Quick AI" className="h-8 object-contain" />

        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebar(!sidebar)}
          className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          {sidebar ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Sidebar */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Overlay (Mobile) */}
        {sidebar && (
          <div
            onClick={() => setSidebar(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden z-30 transition"
          />
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutPage