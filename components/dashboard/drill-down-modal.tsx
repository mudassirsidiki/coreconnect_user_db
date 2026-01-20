"use client"

import React, { useMemo, useState, useEffect } from "react"
import { X, Download, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getDrillDownData,
  getContactsByIndustry,
  getCompaniesByIndustry,
  getContactsByRegion,
  getCompaniesByRegion,
  getAllContacts,
  getAllCompanies,
  getAllProjects,
  type Contact,
  type CompanyDetails,
  type Project
} from "@/lib/mock-data"

interface DrillDownModalProps {
  data: any
  filters?: any
  onClose: () => void
}

export default function DrillDownModal({ data, filters, onClose }: DrillDownModalProps) {
  const [sortField, setSortField] = React.useState("name")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [viewContactsList, setViewContactsList] = useState(false)
  const [viewCompaniesList, setViewCompaniesList] = useState(false)
  const [viewProjectsList, setViewProjectsList] = useState(false)

  const type = data?.type || "companies"

  // Auto-set view state for contacts, companies, and projects types
  useEffect(() => {
    if (type === "contacts") setViewContactsList(true)
    else if (type === "companies") setViewCompaniesList(true)
    else if (type === "projects") setViewProjectsList(true)
    else {
      setViewContactsList(false)
      setViewCompaniesList(false)
      setViewProjectsList(false)
    }
  }, [type])
  const defaultFilters = { industries: [], locations: [], jobTitles: [], dateRange: "today" }
  const activeFilters = filters || defaultFilters

  const allData = useMemo(() => {
    return getDrillDownData(type, activeFilters)
  }, [type, activeFilters])

  // Get contacts and companies for selected industry or region
  const detailContacts = useMemo(() => {
    if (selectedIndustry) return getContactsByIndustry(selectedIndustry)
    if (selectedRegion) return getContactsByRegion(selectedRegion)
    return []
  }, [selectedIndustry, selectedRegion])

  const detailCompanies = useMemo(() => {
    if (selectedIndustry) return getCompaniesByIndustry(selectedIndustry)
    if (selectedRegion) return getCompaniesByRegion(selectedRegion)
    return []
  }, [selectedIndustry, selectedRegion])

  // Get the display name for the selected item
  const selectedItemName = selectedIndustry || selectedRegion

  // Determine if showing detail view (industry/region drill-down or direct list view)
  const showDetailView = selectedItemName || viewContactsList || viewCompaniesList || viewProjectsList

  // Get all contacts, companies, and projects for card drill-down
  const allContactsList = useMemo(() => getAllContacts(), [])
  const allCompaniesList = useMemo(() => getAllCompanies(), [])
  const allProjectsList = useMemo(() => getAllProjects(), [])

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

  const handleRowClick = (row: any) => {
    // Allow clicking on industry or location rows to drill down
    if (type === "industries" && row.name) {
      setSelectedIndustry(row.name)
      setSearchTerm("")
    } else if (type === "locations" && row.name) {
      setSelectedRegion(row.name)
      setSearchTerm("")
    }
  }

  const handleBack = () => {
    setSelectedIndustry(null)
    setSelectedRegion(null)
    setViewContactsList(false)
    setViewCompaniesList(false)
    setViewProjectsList(false)
    setSearchTerm("")
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
          <div className="flex items-center gap-3">
            {showDetailView && (
              <Button variant="ghost" size="icon" onClick={handleBack} className="text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedItemName || (viewContactsList ? "All Contacts" : viewCompaniesList ? "All Companies" : viewProjectsList ? "All Projects" : data?.title)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {viewContactsList
                  ? `Showing ${allContactsList.length} contacts`
                  : viewCompaniesList
                  ? `Showing ${allCompaniesList.length} companies`
                  : viewProjectsList
                  ? `Showing ${allProjectsList.length} projects`
                  : selectedItemName
                  ? `Contacts and Companies in this ${selectedIndustry ? 'industry' : 'region'}`
                  : `${totals.count} ${type === "industries" ? "industries" : type === "locations" ? "regions" : type === "contacts" ? "companies" : type === "companies" ? "companies" : "projects"}`
                }
                {!showDetailView && type === "contacts" && ` • Total: ${totals.contacts.toLocaleString()} contacts`}
                {!showDetailView && type === "companies" && ` • Total: ${totals.count} companies`}
                {!showDetailView && type === "projects" && ` • Total: ${totals.count} projects`}
                {!showDetailView && (type === "industries" || type === "locations") && " • Click on a row to view details"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Controls */}
        {!showDetailView && (
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
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {showDetailView ? (
            <div className="p-6 space-y-8">
              {/* All Contacts View */}
              {viewContactsList && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contacts ({allContactsList.length})</h3>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Job Title</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Management Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {allContactsList.slice(0, 5).map((contact) => (
                          <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{contact.name}</td>
                            <td className="px-4 py-3 text-gray-600">{contact.department}</td>
                            <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                            <td className="px-4 py-3 text-gray-600">{contact.jobTitle}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                contact.managementLevel === "Senior"
                                  ? "bg-purple-100 text-purple-700"
                                  : contact.managementLevel === "Mid"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}>
                                {contact.managementLevel}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {allContactsList.length > 5 && (
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                        Showing 5 of {allContactsList.length} contacts
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* All Companies View */}
              {viewCompaniesList && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Companies ({allCompaniesList.length})</h3>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Company Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Region</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Employee Count</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {allCompaniesList.slice(0, 5).map((company) => (
                          <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{company.name}</td>
                            <td className="px-4 py-3 text-gray-600">{company.region}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{company.employeeCount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{company.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {allCompaniesList.length > 5 && (
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                        Showing 5 of {allCompaniesList.length} companies
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* All Projects View */}
              {viewProjectsList && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Projects ({allProjectsList.length})</h3>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Project Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Company Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {allProjectsList.slice(0, 5).map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{project.name}</td>
                            <td className="px-4 py-3 text-gray-600">{project.client}</td>
                            <td className="px-4 py-3 text-gray-600">{project.industry}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : project.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : project.status === "On Hold"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                              }`}>
                                {project.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {allProjectsList.length > 5 && (
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                        Showing 5 of {allProjectsList.length} projects
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Industry/Region Drill-down View */}
              {selectedItemName && (
                <>
                  {/* Contacts Table */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Contacts ({detailContacts.length})</h3>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Job Title</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Management Level</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {detailContacts.slice(0, 5).map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-900">{contact.name}</td>
                              <td className="px-4 py-3 text-gray-600">{contact.department}</td>
                              <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                              <td className="px-4 py-3 text-gray-600">{contact.jobTitle}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  contact.managementLevel === "Senior"
                                    ? "bg-purple-100 text-purple-700"
                                    : contact.managementLevel === "Mid"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}>
                                  {contact.managementLevel}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {detailContacts.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No contacts found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {detailContacts.length > 5 && (
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                          Showing 5 of {detailContacts.length} contacts
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Companies Table */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Companies ({detailCompanies.length})</h3>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Company Name</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Region</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">Employee Count</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {detailCompanies.slice(0, 5).map((company) => (
                            <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-900">{company.name}</td>
                              <td className="px-4 py-3 text-gray-600">{company.region}</td>
                              <td className="px-4 py-3 text-right text-gray-600">{company.employeeCount.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right text-gray-600">{company.revenue}</td>
                            </tr>
                          ))}
                          {detailCompanies.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No companies found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {detailCompanies.length > 5 && (
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                          Showing 5 of {detailCompanies.length} companies
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
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
                  <tr key={row.id || index} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleRowClick(row)}>
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
          )}
          {!showDetailView && filteredAndSearchedData.length === 0 && <div className="text-center py-8 text-gray-500">No data found</div>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <span className="text-sm text-gray-600">
            {viewContactsList
              ? `Showing ${allContactsList.length} contacts`
              : viewCompaniesList
              ? `Showing ${allCompaniesList.length} companies`
              : viewProjectsList
              ? `Showing ${allProjectsList.length} projects`
              : selectedItemName
              ? `${detailContacts.length} contacts • ${detailCompanies.length} companies`
              : `Showing ${filteredAndSearchedData.length} of ${allData.length} results`
            }
          </span>
          <Button onClick={onClose} variant="default">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
