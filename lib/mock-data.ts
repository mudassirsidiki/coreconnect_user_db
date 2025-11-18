// Mock database with full data
export interface Company {
  id: number
  name: string
  industry: string
  location: string
  companies: number
  contacts: number
}

export const allCompanies: Company[] = [
  { id: 1, name: "Acme Corp", industry: "Technology", location: "USA", companies: 12, contacts: 45 },
  { id: 2, name: "Global Health Inc", industry: "Healthcare", location: "Canada", companies: 8, contacts: 32 },
  { id: 3, name: "FinServe Solutions", industry: "Finance", location: "USA", companies: 15, contacts: 58 },
  { id: 4, name: "RetailHub Ltd", industry: "Retail", location: "USA", companies: 6, contacts: 24 },
  { id: 5, name: "ManuTech Global", industry: "Manufacturing", location: "Canada", companies: 4, contacts: 16 },
  { id: 6, name: "TechVision Labs", industry: "Technology", location: "USA", companies: 10, contacts: 38 },
  { id: 7, name: "MediCare Systems", industry: "Healthcare", location: "USA", companies: 9, contacts: 35 },
  { id: 8, name: "Capital Ventures", industry: "Finance", location: "Canada", companies: 11, contacts: 42 },
  { id: 9, name: "ShopHub International", industry: "Retail", location: "USA", companies: 7, contacts: 28 },
  { id: 10, name: "IndustrialMax", industry: "Manufacturing", location: "USA", companies: 5, contacts: 20 },
  { id: 11, name: "CloudSync Solutions", industry: "Technology", location: "Canada", companies: 14, contacts: 52 },
  { id: 12, name: "WellnessPlus", industry: "Healthcare", location: "Canada", companies: 6, contacts: 25 },
]

export function getFilteredData(filters: { industries: string[]; locations: string[]; dateRange: string }) {
  let filtered = allCompanies

  if (filters.industries.length > 0) {
    filtered = filtered.filter((c) => filters.industries.includes(c.industry))
  }

  if (filters.locations.length > 0) {
    filtered = filtered.filter((c) => filters.locations.includes(c.location))
  }

  return filtered
}

export function getKPIValues(filters: { industries: string[]; locations: string[]; dateRange: string }) {
  const filtered = getFilteredData(filters)

  const industrySet = new Set(filtered.map((c) => c.industry))
  const locationSet = new Set(filtered.map((c) => c.location))
  const totalContacts = filtered.reduce((sum, c) => sum + c.contacts, 0)
  const totalCompanies = filtered.length
  const totalProjects = Math.floor(totalCompanies * 0.26)

  return {
    industries: industrySet.size,
    locations: locationSet.size,
    contacts: totalContacts,
    companies: totalCompanies,
    projects: totalProjects,
  }
}

export function getChartData(filters: { industries: string[]; locations: string[]; dateRange: string }) {
  const filtered = getFilteredData(filters)

  // Companies by region
  const locationMap: Record<string, number> = {}
  filtered.forEach((c) => {
    locationMap[c.location] = (locationMap[c.location] || 0) + 1
  })

  const companiesByLocation = Object.entries(locationMap)
    .map(([location, count]) => ({ location, companies: count, fill: "#3b82f6" }))
    .sort((a, b) => b.companies - a.companies)

  // Industries data
  const industriesMap: Record<string, { companies: number; contacts: number }> = {}
  filtered.forEach((c) => {
    if (!industriesMap[c.industry]) {
      industriesMap[c.industry] = { companies: 0, contacts: 0 }
    }
    industriesMap[c.industry].companies += 1
    industriesMap[c.industry].contacts += c.contacts
  })

  const industriesData = Object.entries(industriesMap)
    .map(([industry, data]) => ({ industry, ...data }))
    .sort((a, b) => b.companies - a.companies)
    .slice(0, 5) // Show only top 5 industries

  // Trend data based on date range
  const trendData = generateTrendData(filters.dateRange, locationMap)

  // Monthly trend data for both regions with metrics
  const monthlyTrendData = generateMonthlyTrendData(filtered)

  return { companiesByLocation, industriesData, trendData, monthlyTrendData }
}

// Generate monthly trend data for USA and Canada with companies, industries, and contacts
export function generateMonthlyTrendData(filtered: Company[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  // Calculate base values
  const usaCompanies = filtered.filter(c => c.location === "USA").length
  const canadaCompanies = filtered.filter(c => c.location === "Canada").length
  const usaContacts = filtered.filter(c => c.location === "USA").reduce((sum, c) => sum + c.contacts, 0)
  const canadaContacts = filtered.filter(c => c.location === "Canada").reduce((sum, c) => sum + c.contacts, 0)
  const usaIndustries = new Set(filtered.filter(c => c.location === "USA").map(c => c.industry)).size
  const canadaIndustries = new Set(filtered.filter(c => c.location === "Canada").map(c => c.industry)).size

  // Generate monthly trends with variation
  return months.map((month, index) => {
    // Apply growth/decline pattern across months
    const variation = (index + 1) * 0.05 + Math.sin(index * 0.5) * 0.1
    
    return {
      month,
      "USA Companies": Math.round(usaCompanies * (1 + variation)),
      "Canada Companies": Math.round(canadaCompanies * (1 + variation)),
      "USA Industries": Math.round(usaIndustries * (1 + variation * 0.3)),
      "Canada Industries": Math.round(canadaIndustries * (1 + variation * 0.3)),
      "USA Contacts": Math.round(usaContacts * (1 + variation)),
      "Canada Contacts": Math.round(canadaContacts * (1 + variation)),
    }
  })
}

function generateTrendData(dateRange: string, locationMap: Record<string, number>) {
  const locations = Object.keys(locationMap).slice(0, 3)
  const baseData = {
    today: [
      { label: "12 AM", values: { [locations[0]]: 12, [locations[1]]: 5, [locations[2]]: 3 } },
      { label: "4 AM", values: { [locations[0]]: 18, [locations[1]]: 8, [locations[2]]: 5 } },
      { label: "8 AM", values: { [locations[0]]: 35, [locations[1]]: 15, [locations[2]]: 8 } },
      { label: "12 PM", values: { [locations[0]]: 52, [locations[1]]: 22, [locations[2]]: 12 } },
      { label: "4 PM", values: { [locations[0]]: 68, [locations[1]]: 28, [locations[2]]: 15 } },
      { label: "8 PM", values: { [locations[0]]: 85, [locations[1]]: 35, [locations[2]]: 18 } },
    ],
    week: [
      { label: "Mon", values: { [locations[0]]: 120, [locations[1]]: 45, [locations[2]]: 35 } },
      { label: "Tue", values: { [locations[0]]: 140, [locations[1]]: 52, [locations[2]]: 42 } },
      { label: "Wed", values: { [locations[0]]: 165, [locations[1]]: 68, [locations[2]]: 58 } },
      { label: "Thu", values: { [locations[0]]: 192, [locations[1]]: 78, [locations[2]]: 71 } },
      { label: "Fri", values: { [locations[0]]: 215, [locations[1]]: 85, [locations[2]]: 88 } },
      { label: "Sat", values: { [locations[0]]: 185, [locations[1]]: 72, [locations[2]]: 65 } },
      { label: "Sun", values: { [locations[0]]: 155, [locations[1]]: 58, [locations[2]]: 48 } },
    ],
    month: [
      { label: "Week 1", values: { [locations[0]]: 420, [locations[1]]: 180, [locations[2]]: 120 } },
      { label: "Week 2", values: { [locations[0]]: 480, [locations[1]]: 210, [locations[2]]: 145 } },
      { label: "Week 3", values: { [locations[0]]: 560, [locations[1]]: 250, [locations[2]]: 180 } },
      { label: "Week 4", values: { [locations[0]]: 640, [locations[1]]: 290, [locations[2]]: 210 } },
    ],
    all: [
      { label: "Q1", values: { [locations[0]]: 1200, [locations[1]]: 450, [locations[2]]: 350 } },
      { label: "Q2", values: { [locations[0]]: 1400, [locations[1]]: 520, [locations[2]]: 420 } },
      { label: "Q3", values: { [locations[0]]: 1650, [locations[1]]: 680, [locations[2]]: 580 } },
      { label: "Q4", values: { [locations[0]]: 1920, [locations[1]]: 780, [locations[2]]: 710 } },
    ],
  }

  const data = baseData[dateRange as keyof typeof baseData] || baseData.today
  return data.map(({ label, values }) => ({
    [locations[0]]: values[locations[0]] || 0,
    [locations[1]]: values[locations[1]] || 0,
    [locations[2]]: values[locations[2]] || 0,
    time: label,
  }))
}

// Drill-down data functions
export function getDrillDownData(
  type: string,
  filters: { industries: string[]; locations: string[]; dateRange: string }
) {
  const filtered = getFilteredData(filters)

  switch (type) {
    case "industries": {
      const industriesMap: Record<string, { companies: number; contacts: number }> = {}
      filtered.forEach((c) => {
        if (!industriesMap[c.industry]) {
          industriesMap[c.industry] = { companies: 0, contacts: 0 }
        }
        industriesMap[c.industry].companies += 1
        industriesMap[c.industry].contacts += c.contacts
      })
      return Object.entries(industriesMap).map(([industry, data]) => ({
        id: industry,
        name: industry,
        industry: industry,
        location: "",
        companies: data.companies,
        contacts: data.contacts,
      }))
    }

    case "locations": {
      const locationsMap: Record<string, { companies: number; contacts: number }> = {}
      filtered.forEach((c) => {
        if (!locationsMap[c.location]) {
          locationsMap[c.location] = { companies: 0, contacts: 0 }
        }
        locationsMap[c.location].companies += 1
        locationsMap[c.location].contacts += c.contacts
      })
      return Object.entries(locationsMap).map(([location, data]) => ({
        id: location,
        name: location,
        industry: "",
        location: location,
        companies: data.companies,
        contacts: data.contacts,
      }))
    }

    case "contacts": {
      return filtered.map((c) => ({
        id: c.id,
        name: c.name,
        industry: c.industry,
        location: c.location,
        companies: 0,
        contacts: c.contacts,
      }))
    }

    case "companies": {
      return filtered.map((c) => ({
        id: c.id,
        name: c.name,
        industry: c.industry,
        location: c.location,
        companies: 1,
        contacts: c.contacts,
      }))
    }

    case "projects": {
      const totalProjects = Math.floor(filtered.length * 0.26)
      const projectNames = [
        "Q1 Marketing Campaign",
        "Product Launch Initiative",
        "Digital Transformation",
        "Customer Engagement Program",
        "Sales Optimization Project",
        "Brand Awareness Campaign",
        "Market Expansion Strategy",
        "Operational Efficiency Initiative",
      ]
      return filtered.slice(0, totalProjects).map((c, index) => ({
        id: c.id * 100 + index,
        name: projectNames[index % projectNames.length],
        industry: c.industry,
        location: c.location,
        companies: 1,
        contacts: Math.floor(c.contacts * 0.3),
        status: index % 3 === 0 ? "Active" : index % 3 === 1 ? "Upcoming" : "Planning",
      }))
    }

    default:
      return filtered
  }
}

// Map data functions
export function getMapData(
  type: "industries" | "companies" | "contacts",
  filters: { industries: string[]; locations: string[]; dateRange: string }
) {
  const filtered = getFilteredData(filters)

  const usaData: { industries: Set<string>; companies: number; contacts: number } = {
    industries: new Set(),
    companies: 0,
    contacts: 0,
  }
  const canadaData: { industries: Set<string>; companies: number; contacts: number } = {
    industries: new Set(),
    companies: 0,
    contacts: 0,
  }

  filtered.forEach((c) => {
    if (c.location === "USA") {
      usaData.industries.add(c.industry)
      usaData.companies += 1
      usaData.contacts += c.contacts
    } else if (c.location === "Canada") {
      canadaData.industries.add(c.industry)
      canadaData.companies += 1
      canadaData.contacts += c.contacts
    }
  })

  const getValue = (data: { industries: Set<string>; companies: number; contacts: number }) => {
    switch (type) {
      case "industries":
        return data.industries.size
      case "companies":
        return data.companies
      case "contacts":
        return data.contacts
    }
  }

  const usaValue = getValue(usaData)
  const canadaValue = getValue(canadaData)
  const maxValue = Math.max(usaValue, canadaValue, 1)

  return {
    USA: {
      value: usaValue,
      percentage: maxValue > 0 ? (usaValue / maxValue) * 100 : 0,
      industries: Array.from(usaData.industries),
      companies: usaData.companies,
      contacts: usaData.contacts,
    },
    Canada: {
      value: canadaValue,
      percentage: maxValue > 0 ? (canadaValue / maxValue) * 100 : 0,
      industries: Array.from(canadaData.industries),
      companies: canadaData.companies,
      contacts: canadaData.contacts,
    },
  }
}
