"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"

interface FilterBarProps {
  onFilterChange: (filters: any) => void
  onReset: () => void
  currentFilters?: any
}

export default function FilterBar({ onFilterChange, onReset, currentFilters }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<{
    industries: string[]
    locations: string[]
    jobTitles: string[]
    dateRange: string
  }>({
    industries: [],
    locations: [],
    jobTitles: [],
    dateRange: "today",
  })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const industryRef = useRef<HTMLDivElement>(null)
  const regionRef = useRef<HTMLDivElement>(null)
  const jobTitleRef = useRef<HTMLDivElement>(null)

  // Sync with parent state when it changes (e.g., on reset)
  useEffect(() => {
    if (currentFilters) {
      setActiveFilters(currentFilters)
    }
  }, [currentFilters])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        industryRef.current && !industryRef.current.contains(event.target as Node) &&
        regionRef.current && !regionRef.current.contains(event.target as Node) &&
        jobTitleRef.current && !jobTitleRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const industries = ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing"]
  const locations = ["USA", "Canada", "UAE"]
  const jobTitles = ["Project Manager", "Software Engineer", "Sales Manager", "Marketing Director", "Operations Manager"]

  const toggleFilter = (type: "industries" | "locations" | "jobTitles", value: string) => {
    const currentArray = activeFilters[type]
    const index = currentArray.indexOf(value)

    // Create a new array reference to avoid mutation issues
    const newArray = index > -1
      ? currentArray.filter((_, i) => i !== index)
      : [...currentArray, value]

    const newFilters = {
      ...activeFilters,
      [type]: newArray
    }

    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const selectAllFilter = (type: "industries" | "locations" | "jobTitles", options: string[]) => {
    const currentArray = activeFilters[type]
    const allSelected = options.every(option => currentArray.includes(option))

    const newArray = allSelected ? [] : [...options]

    const newFilters = {
      ...activeFilters,
      [type]: newArray
    }

    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const isAllSelected = (type: "industries" | "locations" | "jobTitles", options: string[]) => {
    return options.every(option => activeFilters[type].includes(option))
  }

  const handleReset = () => {
    setActiveFilters({
      industries: [],
      locations: [],
      jobTitles: [],
      dateRange: "today",
    })
    onReset()
  }

  const hasActiveFilters =
    activeFilters.industries.length > 0 || activeFilters.locations.length > 0 || activeFilters.jobTitles.length > 0

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Industry Filter */}
        <div className="relative" ref={industryRef}>
          <button 
            onClick={() => setOpenDropdown(openDropdown === "industry" ? null : "industry")}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full font-medium text-gray-700 transition-colors"
          >
            Industry
            {activeFilters.industries.length > 0 && (
              <span className="ml-2 inline-block w-5 h-5 bg-blue-500 text-white text-xs rounded-full">
                {activeFilters.industries.length}
              </span>
            )}
          </button>
          {openDropdown === "industry" && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-50">
              {/* Select All */}
              <label
                className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded border-b border-gray-100 mb-1"
              >
                <input
                  type="checkbox"
                  checked={isAllSelected("industries", industries)}
                  onChange={() => selectAllFilter("industries", industries)}
                  className="rounded"
                />
                <span className="text-sm font-semibold text-gray-700">Select All</span>
              </label>
              {industries.map((industry) => (
                <label
                  key={industry}
                  className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.industries.includes(industry)}
                    onChange={() => toggleFilter("industries", industry)}
                    className="rounded"
                  />
                  <span className="text-sm">{industry}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Region Filter */}
        <div className="relative" ref={regionRef}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "region" ? null : "region")}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full font-medium text-gray-700 transition-colors"
          >
            Regions
            {activeFilters.locations.length > 0 && (
              <span className="ml-2 inline-block w-5 h-5 bg-blue-500 text-white text-xs rounded-full">
                {activeFilters.locations.length}
              </span>
            )}
          </button>
          {openDropdown === "region" && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-50">
              {/* Select All */}
              <label
                className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded border-b border-gray-100 mb-1"
              >
                <input
                  type="checkbox"
                  checked={isAllSelected("locations", locations)}
                  onChange={() => selectAllFilter("locations", locations)}
                  className="rounded"
                />
                <span className="text-sm font-semibold text-gray-700">Select All</span>
              </label>
              {locations.map((location) => (
                <label
                  key={location}
                  className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.locations.includes(location)}
                    onChange={() => toggleFilter("locations", location)}
                    className="rounded"
                  />
                  <span className="text-sm">{location}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Job Title Filter */}
        <div className="relative" ref={jobTitleRef}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "jobTitle" ? null : "jobTitle")}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full font-medium text-gray-700 transition-colors"
          >
            Job Title
            {activeFilters.jobTitles.length > 0 && (
              <span className="ml-2 inline-block w-5 h-5 bg-blue-500 text-white text-xs rounded-full">
                {activeFilters.jobTitles.length}
              </span>
            )}
          </button>
          {openDropdown === "jobTitle" && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-50">
              {/* Select All */}
              <label
                className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded border-b border-gray-100 mb-1"
              >
                <input
                  type="checkbox"
                  checked={isAllSelected("jobTitles", jobTitles)}
                  onChange={() => selectAllFilter("jobTitles", jobTitles)}
                  className="rounded"
                />
                <span className="text-sm font-semibold text-gray-700">Select All</span>
              </label>
              {jobTitles.map((jobTitle) => (
                <label
                  key={jobTitle}
                  className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.jobTitles.includes(jobTitle)}
                    onChange={() => toggleFilter("jobTitles", jobTitle)}
                    className="rounded"
                  />
                  <span className="text-sm">{jobTitle}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-600 hover:text-gray-900">
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}
