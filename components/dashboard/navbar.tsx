"use client"

import { Search, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onMenuToggle: () => void
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm h-16 sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-6 gap-6">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Global search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Right: Icons & Avatar */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
