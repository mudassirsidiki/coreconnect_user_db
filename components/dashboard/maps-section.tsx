"use client"

import { useMemo } from "react"
import { getMapData } from "@/lib/mock-data"

interface MapsSectionProps {
  onDrillDown: (data: any) => void
  filters?: any
}

interface MapVisualizationProps {
  title: string
  type: "industries" | "companies" | "contacts"
  data: {
    USA: { value: number; percentage: number; industries: string[]; companies: number; contacts: number }
    Canada: { value: number; percentage: number; industries: string[]; companies: number; contacts: number }
    UAE: { value: number; percentage: number; industries: string[]; companies: number; contacts: number }
  }
  onClick: () => void
}

const MapVisualization = ({ title, type, data, onClick }: MapVisualizationProps) => {
  const getGradientId = (region: string) => `gradient-${region}-${type}`
  const getShadowId = (region: string) => `shadow-${region}-${type}`

  const getColorStops = (percentage: number) => {
    if (percentage === 0) {
      return { start: "#e5e7eb", end: "#d1d5db", text: "#6b7280" }
    }
    if (percentage >= 80) {
      return { start: "#1e3a8a", end: "#1e40af", text: "#ffffff" }
    }
    if (percentage >= 50) {
      return { start: "#2563eb", end: "#3b82f6", text: "#ffffff" }
    }
    if (percentage >= 25) {
      return { start: "#3b82f6", end: "#60a5fa", text: "#ffffff" }
    }
    return { start: "#60a5fa", end: "#93c5fd", text: "#1f2937" }
  }

  const getFlagEmoji = (region: string) => {
    switch (region) {
      case "USA": return "🇺🇸"
      case "Canada": return "🇨🇦"
      case "UAE": return "🇦🇪"
      default: return "🌍"
    }
  }

  const regions = [
    { key: "USA", name: "USA", data: data.USA, colors: getColorStops(data.USA.percentage), flag: getFlagEmoji("USA") },
    { key: "Canada", name: "Canada", data: data.Canada, colors: getColorStops(data.Canada.percentage), flag: getFlagEmoji("Canada") },
    { key: "UAE", name: "UAE", data: data.UAE, colors: getColorStops(data.UAE.percentage), flag: getFlagEmoji("UAE") },
  ]

  const getLabel = () => {
    switch (type) {
      case "industries":
        return "Industries"
      case "companies":
        return "Companies"
      case "contacts":
        return "Contacts"
    }
  }

  const getValueLabel = (value: number) => {
    if (type === "contacts") return value.toLocaleString()
    return value.toString()
  }

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 w-full text-left transform hover:scale-[1.02] overflow-hidden"
    >
      <h3 className="text-lg font-bold text-gray-900 px-6 pt-6 pb-4">{title}</h3>

      {/* Split Map Card - USA, Canada, and UAE Side by Side */}
      <div className="grid grid-cols-3 h-64">
        {regions.map((region) => (
          <div
            key={region.key}
            className="relative overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-300 hover:brightness-110 border-r border-gray-100 last:border-r-0"
            style={{
              background: `linear-gradient(135deg, ${region.colors.start} 0%, ${region.colors.end} 100%)`
            }}
          >
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full blur-xl"></div>
            </div>

            {/* Region Content */}
            <div className="relative z-10 text-center">
              <div className="mb-2">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
                  <span className="text-white font-bold text-xs uppercase tracking-wider">{region.name}</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-white text-4xl font-bold drop-shadow-lg">
                  {getValueLabel(region.data.value)}
                </div>
              </div>
              <div className="text-white/90 text-xs font-medium">
                {getLabel()}
              </div>
            </div>

            {/* Corner Badge */}
            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center border border-white/30">
              <span className="text-white text-xs font-bold">{region.flag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Legend */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-4 flex-wrap">
            {regions.map((region) => (
              <div key={region.key} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-md shadow-sm border-2 border-white"
                  style={{
                    background: `linear-gradient(135deg, ${region.colors.start}, ${region.colors.end})`
                  }}
                ></div>
                <span className="text-gray-700 font-medium">
                  {region.name}: <span className="text-blue-700 font-semibold">{getValueLabel(region.data.value)}</span>
                </span>
              </div>
            ))}
          </div>
          <span className="text-blue-600 hover:text-blue-700 font-semibold text-xs">View Details →</span>
        </div>
      </div>
    </button>
  )
}

export default function MapsSection({ onDrillDown, filters }: MapsSectionProps) {
  const defaultFilters = { industries: [], locations: [], jobTitles: [], dateRange: "today" }
  const activeFilters = filters || defaultFilters

  const industriesMapData = useMemo(() => {
    return getMapData("industries", activeFilters)
  }, [activeFilters])

  const companiesMapData = useMemo(() => {
    return getMapData("companies", activeFilters)
  }, [activeFilters])

  const contactsMapData = useMemo(() => {
    return getMapData("contacts", activeFilters)
  }, [activeFilters])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Distribution</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MapVisualization
          title="Industries by Region"
          type="industries"
          data={industriesMapData}
          onClick={() => onDrillDown({ type: "map", title: "Industries by Region", mapType: "industries" })}
        />
        <MapVisualization
          title="Companies by Region"
          type="companies"
          data={companiesMapData}
          onClick={() => onDrillDown({ type: "map", title: "Companies by Region", mapType: "companies" })}
        />
        <MapVisualization
          title="Contacts by Region"
          type="contacts"
          data={contactsMapData}
          onClick={() => onDrillDown({ type: "map", title: "Contacts by Region", mapType: "contacts" })}
        />
      </div>
    </div>
  )
}
