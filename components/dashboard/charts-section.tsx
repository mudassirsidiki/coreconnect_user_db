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
  LabelList,
} from "recharts"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useMemo, useState } from "react"
import { getChartData, getProjectStatusData } from "@/lib/mock-data"
import { Search, ArrowUp, ArrowDown } from "lucide-react"

interface ChartsSectionProps {
  onDrillDown: (data: any) => void
  filters?: any
}

export default function ChartsSection({ onDrillDown, filters }: ChartsSectionProps) {
  const [trendFilter, setTrendFilter] = useState<"companies" | "industries" | "contacts">("companies")
  const [industrySearch, setIndustrySearch] = useState("")
  const [industrySortBy, setIndustrySortBy] = useState<"industry" | "companies" | "contacts">("companies")
  const [industrySortOrder, setIndustrySortOrder] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "In Progress" | "On Hold" | "Not Started">("All")
  
  const { companiesByLocation, industriesData, trendData, monthlyTrendData } = useMemo(() => {
    return getChartData(filters || { industries: [], locations: [], jobTitles: [], dateRange: "today" })
  }, [filters])

  const projectStatusData = useMemo(() => {
    const allProjects = getProjectStatusData(filters || { industries: [], locations: [], jobTitles: [], dateRange: "today" })
    if (statusFilter === "All") return allProjects
    return allProjects.filter(p => p.status === statusFilter)
  }, [filters, statusFilter])

  // Filter and sort industries data
  const filteredAndSortedIndustries = useMemo(() => {
    let filtered = industriesData.filter((item) =>
      item.industry.toLowerCase().includes(industrySearch.toLowerCase())
    )

    filtered.sort((a, b) => {
      let aVal: any = a[industrySortBy]
      let bVal: any = b[industrySortBy]

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (industrySortOrder === "asc") {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
      }
    })

    return filtered
  }, [industriesData, industrySearch, industrySortBy, industrySortOrder])

  // Filter monthly trend data based on selected metric
  const filteredMonthlyTrend = useMemo(() => {
    if (!monthlyTrendData) return []

    const metricMap = {
      companies: {
        usa: "USA Companies",
        canada: "Canada Companies",
        uae: "UAE Companies",
        colors: ["#3b82f6", "#60a5fa"]
      },
      industries: {
        usa: "USA Industries",
        canada: "Canada Industries",
        uae: "UAE Industries",
        colors: ["#8b5cf6", "#a78bfa"]
      },
      contacts: {
        usa: "USA Contacts",
        canada: "Canada Contacts",
        uae: "UAE Contacts",
        colors: ["#06b6d4", "#22d3ee"]
      }
    }

    const metric = metricMap[trendFilter]

    return monthlyTrendData.map(item => ({
      month: item.month,
      USA: item[metric.usa as keyof typeof item] as number,
      Canada: item[metric.canada as keyof typeof item] as number,
      UAE: item[metric.uae as keyof typeof item] as number,
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
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                      <p className="font-semibold text-gray-900 mb-2">{data.location}</p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Companies:</span> {data.companies.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Contacts:</span> {data.contacts.toLocaleString()}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="companies" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-3">Click to view detailed breakdown by region</p>
      </div>

      {/* Industries Bar Chart */}
      {industriesData.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industries • Companies/Contacts</h3>

          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search industries..."
              value={industrySearch}
              onChange={(e) => setIndustrySearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          {/* Horizontal Bar Chart - Scrollable */}
          <div className="overflow-y-auto max-h-[280px] pr-2">
            <ResponsiveContainer width="100%" height={filteredAndSortedIndustries.length * 45 + 50}>
              <BarChart
                data={filteredAndSortedIndustries}
                layout="vertical"
                margin={{ top: 20, right: 20, left: 60, bottom: 5 }}
                barCategoryGap="15%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis
                  type="category"
                  dataKey="industry"
                  stroke="#6b7280"
                  width={70}
                  tick={{ fontSize: 13, fontWeight: 500 }}
                  tickFormatter={(value) => value.length > 18 ? value.substring(0, 18) + '...' : value}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value.toLocaleString(),
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <Legend />
                <Bar dataKey="companies" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Companies" maxBarSize={60}>
                  <LabelList dataKey="companies" position="right" />
                </Bar>
                <Bar dataKey="contacts" fill="#10b981" radius={[0, 4, 4, 0]} name="Contacts" maxBarSize={60}>
                  <LabelList dataKey="contacts" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Footer */}
          <div className="mt-3 text-center text-xs text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAndSortedIndustries.length}</span> industries
            {industrySearch && ` (filtered from ${industriesData.length} total)`}
          </div>
        </div>
      )}

      {/* Region Trend */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trends by Region</h3>
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setTrendFilter("companies")
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
          <ResponsiveContainer width="100%" height={260}>
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
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                name="USA"
              />
              <Line
                type="monotone"
                dataKey="Canada"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                name="Canada"
              />
              <Line
                type="monotone"
                dataKey="UAE"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                name="UAE"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Click to view detailed breakdown</p>
      </div>

      {/* Projects Status Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>

        {/* Projects Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Project Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Company Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projectStatusData.slice(0, 5).map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-900 font-medium">{project.name}</td>
                  <td className="px-4 py-3 text-gray-600">{project.client}</td>
                  <td className="px-4 py-3 text-gray-600">{project.industry}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "On Hold"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
              {projectStatusData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No projects found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-3 text-xs text-gray-600 text-center">
          Showing <span className="font-semibold text-gray-900">{Math.min(projectStatusData.length, 5)}</span> projects
          {statusFilter !== "All" && ` (${statusFilter})`}
        </div>
      </div>
    </div>
  )
}
