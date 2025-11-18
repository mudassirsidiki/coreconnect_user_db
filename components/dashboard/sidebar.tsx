"use client"

import { ChevronDown, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState({
    dashboard: true,
    company: false,
    contacts: false,
    projects: false,
    technologies: false,
  })

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const menuItems = [
    { label: "Dashboard", group: "dashboard", icon: "📊" },
    {
      label: "Company",
      group: "company",
      items: [
        { label: "Add New Company", icon: "➕" },
        { label: "Companies", icon: "🏢" },
      ],
    },
    {
      label: "Contacts",
      group: "contacts",
      items: [
        { label: "Add New Contacts", icon: "➕" },
        { label: "Contacts", icon: "👥" },
      ],
    },
    {
      label: "Projects",
      group: "projects",
      items: [
        { label: "Add New Projects", icon: "➕" },
        { label: "Projects", icon: "📋" },
      ],
    },
    {
      label: "Technologies",
      group: "technologies",
      items: [
        { label: "Add New Technologies", icon: "➕" },
        { label: "Technologies", icon: "⚙️" },
      ],
    },
    { label: "Reports", group: "reports", icon: "📈" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white transition-all duration-300 z-40 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-blue-800 md:hidden">
          <h2 className="font-bold">CORECONNECT</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-800">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Logo - Desktop */}
        <div className="hidden md:flex items-center gap-2 p-6 border-b border-blue-800">
          <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-950">
            CC
          </div>
          <h1 className="font-bold text-lg">CORECONNECT</h1>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6">
          {menuItems.map((item) => (
            <div key={item.group}>
              {!item.items ? (
                <button className="w-full text-left px-6 py-3 hover:bg-blue-800 transition-colors flex items-center gap-3 text-sm font-medium">
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => toggleGroup(item.group)}
                    className="w-full text-left px-6 py-3 hover:bg-blue-800 transition-colors flex items-center justify-between text-sm font-medium group"
                  >
                    <span className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedGroups[item.group as keyof typeof expandedGroups] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedGroups[item.group as keyof typeof expandedGroups] && (
                    <div className="bg-blue-800 bg-opacity-50">
                      {item.items.map((subitem, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left px-12 py-2 hover:bg-blue-700 transition-colors text-xs font-medium text-blue-100"
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Go Back */}
        <div className="border-t border-blue-800 p-4">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-800 rounded transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>
      </aside>
    </>
  )
}
