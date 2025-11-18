"use client"

import React, { useMemo } from "react"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDrillDownData } from "@/lib/mock-data"

interface DrillDownModalProps {
  data: any
  filters?: any
  onClose: () => void
}

export default function DrillDownModal({ data, filters, onClose }: DrillDownModalProps) {
  const [sortField, setSortField] = React.useState("name")
  const [searchTerm, setSearchTerm] = React.useState("")

  const type = data?.type || "companies"
  const defaultFilters = { industries: [], locations: [], dateRange: "today" }
  const activeFilters = filters || defaultFilters

  const allData = useMemo(() => {
    return getDrillDownData(type, activeFilters)
  }, [type, activeFilters])

  const filteredAndSearchedData = useMemo(() => {
    return allData
      .filter((item) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(searchLower) ||
          (item.industry && item.industry.toLowerCase().includes(searchLower)) ||
          (item.location && item.location.toLowerCase().includes(searchLower))
        )
      })
      .sort((a, b) => {
        const field = sortField.startsWith("-") ? sortField.slice(1) : sortField
        const reverse = sortField.startsWith("-")
        let comparison = 0

        if (field === "name") comparison = a.name.localeCompare(b.name)
        else if (field === "industry") comparison = (a.industry || "").localeCompare(b.industry || "")
        else if (field === "location") comparison = (a.location || "").localeCompare(b.location || "")
        else if (field === "companies") comparison = a.companies - b.companies
        else if (field === "contacts") comparison = a.contacts - b.contacts
        else if (field === "status") comparison = (a.status || "").localeCompare(b.status || "")

        return reverse ? -comparison : comparison
      })
  }, [allData, searchTerm, sortField])

  const handleSort = (field: string) => {
    setSortField(sortField === field ? `-${field}` : field)
  }

  // Calculate totals
  const totals = useMemo(() => {
    return {
      companies: filteredAndSearchedData.reduce((sum, item) => sum + (item.companies || 0), 0),
      contacts: filteredAndSearchedData.reduce((sum, item) => sum + (item.contacts || 0), 0),
      count: filteredAndSearchedData.length,
    }
  }, [filteredAndSearchedData])

  // Determine which columns to show based on type
  const getColumns = () => {
    switch (type) {
      case "industries":
        return [
          { key: "name", label: "Industry" },
          { key: "companies", label: "Companies", align: "right" },
          { key: "contacts", label: "Contacts", align: "right" },
        ]
      case "locations":
        return [
          { key: "name", label: "Region" },
          { key: "companies", label: "Companies", align: "right" },
          { key: "contacts", label: "Contacts", align: "right" },
        ]
      case "contacts":
        return [
          { key: "name", label: "Company" },
          { key: "industry", label: "Industry" },
          { key: "location", label: "Region" },
          { key: "contacts", label: "Contacts", align: "right" },
        ]
      case "companies":
        return [
          { key: "name", label: "Company" },
          { key: "industry", label: "Industry" },
          { key: "location", label: "Region" },
          { key: "contacts", label: "Contacts", align: "right" },
        ]
      case "projects":
        return [
          { key: "name", label: "Project Name" },
          { key: "industry", label: "Industry" },
          { key: "location", label: "Region" },
          { key: "status", label: "Status" },
        ]
      default:
        return [
          { key: "name", label: "Name" },
          { key: "industry", label: "Industry" },
          { key: "location", label: "Region" },
          { key: "companies", label: "Companies", align: "right" },
          { key: "contacts", label: "Contacts", align: "right" },
        ]
    }
  }

  const columns = getColumns()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{data?.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {totals.count} {type === "industries" ? "industries" : type === "locations" ? "regions" : type === "contacts" ? "companies" : type === "companies" ? "companies" : "projects"}
              {type === "contacts" && ` • Total: ${totals.contacts.toLocaleString()} contacts`}
              {type === "companies" && ` • Total: ${totals.count} companies`}
              {type === "projects" && ` • Total: ${totals.count} projects`}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 gap-4">
          <input
            type="text"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-6 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {col.label}
                    {sortField === col.key && " ↑"}
                    {sortField === `-${col.key}` && " ↓"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSearchedData.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  {columns.map((col) => {
                    const value = row[col.key]
                    return (
                      <td
                        key={col.key}
                        className={`px-6 py-4 ${
                          col.align === "right" ? "text-right" : "text-left"
                        } ${
                          col.key === "name" ? "font-medium text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {col.key === "status" ? (
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              value === "Active"
                                ? "bg-green-100 text-green-800"
                                : value === "Upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {value}
                          </span>
                        ) : typeof value === "number" ? (
                          value.toLocaleString()
                        ) : (
                          value || "-"
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
            {/* Totals row for certain types */}
            {(type === "contacts" || type === "companies" || type === "industries" || type === "locations") && (
              <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                <tr>
                  {type === "contacts" && (
                    <>
                      <td className="px-6 py-3 font-bold text-gray-900" colSpan={3}>Total</td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900">{totals.contacts.toLocaleString()}</td>
                    </>
                  )}
                  {type === "companies" && (
                    <>
                      <td className="px-6 py-3 font-bold text-gray-900" colSpan={3}>Total</td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900">{totals.count}</td>
                    </>
                  )}
                  {(type === "industries" || type === "locations") && (
                    <>
                      <td className="px-6 py-3 font-bold text-gray-900">Total</td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900">{totals.companies}</td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900">{totals.contacts.toLocaleString()}</td>
                    </>
                  )}
                </tr>
              </tfoot>
            )}
          </table>
          {filteredAndSearchedData.length === 0 && <div className="text-center py-8 text-gray-500">No data found</div>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <span className="text-sm text-gray-600">
            Showing {filteredAndSearchedData.length} of {allData.length} results
          </span>
          <Button onClick={onClose} variant="default">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
