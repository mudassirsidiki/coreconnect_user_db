"use client"

import { useMemo } from "react"
import { getKPIValues } from "@/lib/mock-data"

interface KPICardsProps {
  onDrillDown: (data: any) => void
  filters?: any
}

const kpiConfig = [
  {
    title: "Industries",
    subtitle: "All industries we are working with",
    type: "industries",
    icon: "🏭",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    lightGradient: "from-blue-50 to-blue-100",
    accent: "blue",
  },
  {
    title: "Regions",
    subtitle: "Total regions",
    type: "locations",
    icon: "📍",
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    lightGradient: "from-purple-50 to-purple-100",
    accent: "purple",
  },
  {
    title: "Contacts",
    subtitle: "Total contacts",
    type: "contacts",
    icon: "👥",
    gradient: "from-green-500 via-green-600 to-green-700",
    lightGradient: "from-green-50 to-green-100",
    accent: "green",
  },
  {
    title: "Companies",
    subtitle: "Total companies",
    type: "companies",
    icon: "🏢",
    gradient: "from-orange-500 via-orange-600 to-orange-700",
    lightGradient: "from-orange-50 to-orange-100",
    accent: "orange",
  },
  {
    title: "Projects",
    subtitle: "Active & Upcoming",
    type: "projects",
    icon: "📊",
    gradient: "from-pink-500 via-pink-600 to-pink-700",
    lightGradient: "from-pink-50 to-pink-100",
    accent: "pink",
  },
]

export default function KPICards({ onDrillDown, filters }: KPICardsProps) {
  const kpiValues = useMemo(() => {
    return getKPIValues(filters || { industries: [], locations: [], jobTitles: [], dateRange: "today" })
  }, [filters])

  const kpiData = [
    { ...kpiConfig[0], value: kpiValues.industries },
    { ...kpiConfig[1], value: kpiValues.locations },
    { ...kpiConfig[2], value: kpiValues.contacts },
    { ...kpiConfig[3], value: kpiValues.companies },
    { ...kpiConfig[4], value: kpiValues.projects },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      {kpiData.map((kpi) => (
        <button
          key={kpi.type}
          onClick={() => onDrillDown({ type: kpi.type, title: kpi.title })}
          className="group cursor-pointer text-left relative"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/20">
            {/* Main card with gradient */}
            <div
              className={`relative bg-gradient-to-br ${kpi.gradient} p-6 text-white shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1`}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl opacity-15" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1">
                      {kpi.subtitle}
                    </p>
                    <h3 className="text-xl font-bold leading-tight">{kpi.title}</h3>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-2.5 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <span className="text-2xl block transform group-hover:scale-110 transition-transform duration-300">
                        {kpi.icon}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Value section */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold tracking-tight">
                      {kpi.value.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Action indicator */}
                  <div className="flex items-center gap-2 text-xs opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>View details</span>
                  </div>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
