"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Navbar from "@/components/dashboard/navbar"
import FilterBar from "@/components/dashboard/filter-bar"
import KPICards from "@/components/dashboard/kpi-cards"
import ChartsSection from "@/components/dashboard/charts-section"
import DrillDownModal from "@/components/dashboard/drill-down-modal"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState({
    industries: [],
    locations: [],
    jobTitles: [],
    dateRange: "today",
  })
  const [drillDownData, setDrillDownData] = useState(null)
  const [showReportBanner, setShowReportBanner] = useState(false)

  const handleFilterChange = (filters: any) => {
    setSelectedFilters(filters)
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      industries: [],
      locations: [],
      jobTitles: [],
      dateRange: "today",
    })
  }

  const handleDrillDown = (data: any) => {
    setDrillDownData(data)
  }

  const closeDrillDown = () => {
    setDrillDownData(null)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Report Banner */}
        {showReportBanner && (
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex items-center justify-between">
            <span className="text-sm text-blue-900">Upload Report Ready</span>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Reports →</button>
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} onReset={handleResetFilters} currentFilters={selectedFilters} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-white to-gray-50">
          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <KPICards onDrillDown={handleDrillDown} filters={selectedFilters} />

            {/* Charts Section */}
            <ChartsSection onDrillDown={handleDrillDown} filters={selectedFilters} />
          </div>
        </div>
      </div>

      {/* Drill Down Modal */}
      {drillDownData && <DrillDownModal data={drillDownData} filters={selectedFilters} onClose={closeDrillDown} />}
    </div>
  )
}
