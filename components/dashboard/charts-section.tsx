"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { useMemo, useState } from "react"
import { getChartData } from "@/lib/mock-data"

interface ChartsSectionProps {
  onDrillDown: (data: any) => void
  filters?: any
}

export default function ChartsSection({ onDrillDown, filters }: ChartsSectionProps) {
  const [trendFilter, setTrendFilter] = useState<"companies" | "industries" | "contacts">("companies")
  
  const { companiesByLocation, industriesData, trendData, monthlyTrendData } = useMemo(() => {
    return getChartData(filters || { industries: [], locations: [], dateRange: "today" })
  }, [filters])

  // Filter monthly trend data based on selected metric
  const filteredMonthlyTrend = useMemo(() => {
    if (!monthlyTrendData) return []
    
    const metricMap = {
      companies: {
        usa: "USA Companies",
        canada: "Canada Companies",
        colors: ["#3b82f6", "#60a5fa"]
      },
      industries: {
        usa: "USA Industries",
        canada: "Canada Industries",
        colors: ["#8b5cf6", "#a78bfa"]
      },
      contacts: {
        usa: "USA Contacts",
        canada: "Canada Contacts",
        colors: ["#06b6d4", "#22d3ee"]
      }
    }

    const metric = metricMap[trendFilter]
    
    return monthlyTrendData.map(item => ({
      month: item.month,
      USA: item[metric.usa as keyof typeof item] as number,
      Canada: item[metric.canada as keyof typeof item] as number,
      colors: metric.colors
    }))
  }, [monthlyTrendData, trendFilter])

  if (companiesByLocation.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center text-gray-500">
          No data available for the selected filters. Try adjusting your filters.
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Companies by Region */}
      <div
        onClick={() => onDrillDown({ type: "companies", title: "Companies by Region" })}
        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Companies & Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companiesByLocation}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Bar dataKey="companies" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-3">Click to view detailed breakdown by region</p>
      </div>

      {/* Industries Chart */}
      {industriesData.length > 0 && (
        <div
          onClick={() => onDrillDown({ type: "industries", title: "Industries Breakdown" })}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industries • Companies/Contacts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industriesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="industry" type="category" width={100} />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar 
                dataKey="companies" 
                fill="#8b5cf6" 
                radius={[0, 8, 8, 0]}
                label={{ 
                  position: "right", 
                  formatter: (value: number) => value.toLocaleString(),
                  style: { fill: "#8b5cf6", fontSize: "12px", fontWeight: "bold" }
                }}
              >
                {industriesData.map((entry, index) => (
                  <Cell 
                    key={`companies-cell-${index}`} 
                    fill="#8b5cf6"
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="contacts" 
                fill="#06b6d4" 
                radius={[0, 8, 8, 0]}
                label={{ 
                  position: "right", 
                  formatter: (value: number) => value.toLocaleString(),
                  style: { fill: "#06b6d4", fontSize: "12px", fontWeight: "bold" }
                }}
              >
                {industriesData.map((entry, index) => (
                  <Cell 
                    key={`contacts-cell-${index}`} 
                    fill="#06b6d4"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">Showing top 5 industries</p>
        </div>
      )}

      {/* Region Trend */}
      <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trends by Region</h3>
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setTrendFilter("companies")
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                trendFilter === "companies"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Companies
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setTrendFilter("industries")
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                trendFilter === "industries"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Industries
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setTrendFilter("contacts")
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                trendFilter === "contacts"
                  ? "bg-cyan-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Contacts
            </button>
          </div>
        </div>
        <div onClick={() => onDrillDown({ type: "trends", title: "Monthly Trends", filter: trendFilter })}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredMonthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey="USA"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7 }}
                name="USA"
              />
              <Line
                type="monotone"
                dataKey="Canada"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7 }}
                name="Canada"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">Click to view detailed breakdown</p>
      </div>
    </div>
  )
}
