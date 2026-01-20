// Mock database with full data
export interface Company {
  id: number
  name: string
  industry: string
  location: string
  jobTitle: string
  companies: number
  contacts: number
}

export const allCompanies: Company[] = [
  { id: 1, name: "Acme Corp", industry: "Technology", location: "USA", jobTitle: "Project Manager", companies: 12, contacts: 45 },
  { id: 2, name: "Global Health Inc", industry: "Healthcare", location: "Canada", jobTitle: "Software Engineer", companies: 8, contacts: 32 },
  { id: 3, name: "FinServe Solutions", industry: "Finance", location: "USA", jobTitle: "Sales Manager", companies: 15, contacts: 58 },
  { id: 4, name: "RetailHub Ltd", industry: "Retail", location: "USA", jobTitle: "Marketing Director", companies: 6, contacts: 24 },
  { id: 5, name: "ManuTech Global", industry: "Manufacturing", location: "Canada", jobTitle: "Operations Manager", companies: 4, contacts: 16 },
  { id: 6, name: "TechVision Labs", industry: "Technology", location: "USA", jobTitle: "Project Manager", companies: 10, contacts: 38 },
  { id: 7, name: "MediCare Systems", industry: "Healthcare", location: "USA", jobTitle: "Software Engineer", companies: 9, contacts: 35 },
  { id: 8, name: "Capital Ventures", industry: "Finance", location: "Canada", jobTitle: "Sales Manager", companies: 11, contacts: 42 },
  { id: 9, name: "ShopHub International", industry: "Retail", location: "USA", jobTitle: "Marketing Director", companies: 7, contacts: 28 },
  { id: 10, name: "IndustrialMax", industry: "Manufacturing", location: "USA", jobTitle: "Operations Manager", companies: 5, contacts: 20 },
  { id: 11, name: "CloudSync Solutions", industry: "Technology", location: "Canada", jobTitle: "Project Manager", companies: 14, contacts: 52 },
  { id: 12, name: "WellnessPlus", industry: "Healthcare", location: "Canada", jobTitle: "Software Engineer", companies: 6, contacts: 25 },
  { id: 13, name: "EduTech Academy", industry: "Education", location: "USA", jobTitle: "Sales Manager", companies: 9, contacts: 34 },
  { id: 14, name: "PowerGrid Energy", industry: "Energy", location: "USA", jobTitle: "Marketing Director", companies: 12, contacts: 48 },
  { id: 15, name: "PropertyPro Realty", industry: "Real Estate", location: "Canada", jobTitle: "Operations Manager", companies: 8, contacts: 31 },
  { id: 16, name: "LogiTrans Global", industry: "Transportation", location: "USA", jobTitle: "Project Manager", companies: 11, contacts: 44 },
  { id: 17, name: "FoodCorp International", industry: "Food & Beverage", location: "USA", jobTitle: "Software Engineer", companies: 13, contacts: 51 },
  { id: 18, name: "MediaStream Entertainment", industry: "Entertainment", location: "Canada", jobTitle: "Sales Manager", companies: 7, contacts: 29 },
  { id: 19, name: "AgriTech Solutions", industry: "Agriculture", location: "USA", jobTitle: "Marketing Director", companies: 6, contacts: 23 },
  { id: 20, name: "BuildCorp Construction", industry: "Construction", location: "Canada", jobTitle: "Operations Manager", companies: 10, contacts: 39 },
  { id: 21, name: "DataFlow Analytics", industry: "Technology", location: "USA", jobTitle: "Project Manager", companies: 16, contacts: 62 },
  { id: 22, name: "HealthFirst Medical", industry: "Healthcare", location: "USA", jobTitle: "Software Engineer", companies: 11, contacts: 43 },
  { id: 23, name: "BankTrust Financial", industry: "Finance", location: "Canada", jobTitle: "Sales Manager", companies: 9, contacts: 36 },
  { id: 24, name: "MarketPlace Retail", industry: "Retail", location: "USA", jobTitle: "Marketing Director", companies: 8, contacts: 30 },
  { id: 25, name: "AutoManufacturing Co", industry: "Manufacturing", location: "USA", jobTitle: "Operations Manager", companies: 14, contacts: 55 },
  { id: 26, name: "LearnOnline Education", industry: "Education", location: "Canada", jobTitle: "Project Manager", companies: 7, contacts: 27 },
  { id: 27, name: "SolarPower Energy", industry: "Energy", location: "USA", jobTitle: "Software Engineer", companies: 10, contacts: 40 },
  { id: 28, name: "HomesRealty Group", industry: "Real Estate", location: "USA", jobTitle: "Sales Manager", companies: 9, contacts: 35 },
  { id: 29, name: "FleetMasters Transport", industry: "Transportation", location: "Canada", jobTitle: "Marketing Director", companies: 8, contacts: 32 },
  { id: 30, name: "FreshFood Markets", industry: "Food & Beverage", location: "Canada", jobTitle: "Operations Manager", companies: 11, contacts: 42 },
  { id: 31, name: "CinemaMax Entertainment", industry: "Entertainment", location: "USA", jobTitle: "Project Manager", companies: 6, contacts: 24 },
  { id: 32, name: "FarmTech Innovations", industry: "Agriculture", location: "USA", jobTitle: "Software Engineer", companies: 9, contacts: 34 },
  { id: 33, name: "SteelBuild Construction", industry: "Construction", location: "USA", jobTitle: "Sales Manager", companies: 12, contacts: 47 },
  { id: 34, name: "AI Solutions Inc", industry: "Technology", location: "Canada", jobTitle: "Marketing Director", companies: 13, contacts: 50 },
  { id: 35, name: "PharmaCare Health", industry: "Healthcare", location: "Canada", jobTitle: "Operations Manager", companies: 10, contacts: 38 },
  { id: 36, name: "Investment Partners", industry: "Finance", location: "USA", jobTitle: "Project Manager", companies: 12, contacts: 46 },
  { id: 37, name: "MegaStore Retail", industry: "Retail", location: "USA", jobTitle: "Software Engineer", companies: 9, contacts: 33 },
  { id: 38, name: "Precision Manufacturing", industry: "Manufacturing", location: "Canada", jobTitle: "Sales Manager", companies: 7, contacts: 28 },
  { id: 39, name: "University Online", industry: "Education", location: "USA", jobTitle: "Marketing Director", companies: 8, contacts: 31 },
  { id: 40, name: "WindPower Energy", industry: "Energy", location: "Canada", jobTitle: "Operations Manager", companies: 11, contacts: 41 },
  { id: 41, name: "Commercial Realty", industry: "Real Estate", location: "USA", jobTitle: "Project Manager", companies: 10, contacts: 37 },
  { id: 42, name: "Express Logistics", industry: "Transportation", location: "USA", jobTitle: "Software Engineer", companies: 13, contacts: 49 },
  { id: 43, name: "BeverageCo Brands", industry: "Food & Beverage", location: "Canada", jobTitle: "Sales Manager", companies: 8, contacts: 30 },
  { id: 44, name: "MusicStream Platform", industry: "Entertainment", location: "USA", jobTitle: "Marketing Director", companies: 7, contacts: 26 },
  { id: 45, name: "Organic Farms Co", industry: "Agriculture", location: "Canada", jobTitle: "Operations Manager", companies: 9, contacts: 33 },
  { id: 46, name: "InfraBuild Construction", industry: "Construction", location: "USA", jobTitle: "Project Manager", companies: 11, contacts: 41 },
  { id: 47, name: "CyberSec Tech", industry: "Technology", location: "USA", jobTitle: "Software Engineer", companies: 15, contacts: 57 },
  { id: 48, name: "Hospital Network", industry: "Healthcare", location: "USA", jobTitle: "Sales Manager", companies: 14, contacts: 53 },
  { id: 49, name: "Credit Union Financial", industry: "Finance", location: "Canada", jobTitle: "Marketing Director", companies: 6, contacts: 22 },
  { id: 50, name: "Fashion Retail Chain", industry: "Retail", location: "USA", jobTitle: "Operations Manager", companies: 10, contacts: 38 },
  { id: 51, name: "Desert Tech Solutions", industry: "Technology", location: "UAE", jobTitle: "Project Manager", companies: 9, contacts: 36 },
  { id: 52, name: "Gulf Finance Hub", industry: "Finance", location: "UAE", jobTitle: "Sales Manager", companies: 12, contacts: 48 },
  { id: 53, name: "Emirates Retail Group", industry: "Retail", location: "UAE", jobTitle: "Marketing Director", companies: 8, contacts: 32 },
  { id: 54, name: "Arabian Health Care", industry: "Healthcare", location: "UAE", jobTitle: "Software Engineer", companies: 11, contacts: 44 },
  { id: 55, name: "Dubai Construction Co", industry: "Construction", location: "UAE", jobTitle: "Operations Manager", companies: 14, contacts: 55 },
  { id: 56, name: "Middle East Logistics", industry: "Transportation", location: "UAE", jobTitle: "Project Manager", companies: 10, contacts: 40 },
  { id: 57, name: "Oman Manufacturing", industry: "Manufacturing", location: "UAE", jobTitle: "Sales Manager", companies: 7, contacts: 28 },
  { id: 58, name: "Abu Dhabi Energy", industry: "Energy", location: "UAE", jobTitle: "Software Engineer", companies: 15, contacts: 58 },
  { id: 59, name: "Gulf Real Estate", industry: "Real Estate", location: "UAE", jobTitle: "Marketing Director", companies: 9, contacts: 35 },
  { id: 60, name: "Sharjah Education", industry: "Education", location: "UAE", jobTitle: "Operations Manager", companies: 6, contacts: 24 },
  { id: 61, name: "Ras Al Khaimah Tech", industry: "Technology", location: "UAE", jobTitle: "Project Manager", companies: 8, contacts: 31 },
  { id: 62, name: "Fujairah Food Industries", industry: "Food & Beverage", location: "UAE", jobTitle: "Sales Manager", companies: 7, contacts: 27 },
]

export function getFilteredData(filters: { industries: string[]; locations: string[]; jobTitles: string[]; dateRange: string }) {
  let filtered = allCompanies

  if (filters.industries.length > 0) {
    filtered = filtered.filter((c) => filters.industries.includes(c.industry))
  }

  if (filters.locations.length > 0) {
    filtered = filtered.filter((c) => filters.locations.includes(c.location))
  }

  if (filters.jobTitles.length > 0) {
    filtered = filtered.filter((c) => filters.jobTitles.includes(c.jobTitle))
  }

  return filtered
}

export function getKPIValues(filters: { industries: string[]; locations: string[]; jobTitles: string[]; dateRange: string }) {
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

export function getChartData(filters: { industries: string[]; locations: string[]; jobTitles: string[]; dateRange: string }) {
  const filtered = getFilteredData(filters)

  // Companies by region
  const locationMap: Record<string, { companies: number; contacts: number }> = {}
  filtered.forEach((c) => {
    if (!locationMap[c.location]) {
      locationMap[c.location] = { companies: 0, contacts: 0 }
    }
    locationMap[c.location].companies += 1
    locationMap[c.location].contacts += c.contacts
  })

  const companiesByLocation = Object.entries(locationMap)
    .map(([location, data]) => ({ location, companies: data.companies, contacts: data.contacts, fill: "#3b82f6" }))
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

  // Calculate totals for percentage calculations
  const totalCompanies = filtered.length
  const totalContacts = filtered.reduce((sum, c) => sum + c.contacts, 0)

  const industriesData = Object.entries(industriesMap)
    .map(([industry, data]) => ({
      industry,
      companies: data.companies,
      contacts: data.contacts,
      avgContactsPerCompany: data.companies > 0 ? Math.round((data.contacts / data.companies) * 10) / 10 : 0,
      companyPercentage: totalCompanies > 0 ? Math.round((data.companies / totalCompanies) * 100) : 0,
      contactPercentage: totalContacts > 0 ? Math.round((data.contacts / totalContacts) * 100) : 0,
    }))
    .sort((a, b) => b.companies - a.companies)

  // Trend data based on date range
  const trendData = generateTrendData(filters.dateRange, locationMap)

  // Monthly trend data for both regions with metrics
  const monthlyTrendData = generateMonthlyTrendData(filtered)

  return { companiesByLocation, industriesData, trendData, monthlyTrendData }
}

// Generate monthly trend data for USA, Canada, and UAE with companies, industries, and contacts
export function generateMonthlyTrendData(filtered: Company[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Calculate base values
  const usaCompanies = filtered.filter(c => c.location === "USA").length
  const canadaCompanies = filtered.filter(c => c.location === "Canada").length
  const uaeCompanies = filtered.filter(c => c.location === "UAE").length
  const usaContacts = filtered.filter(c => c.location === "USA").reduce((sum, c) => sum + c.contacts, 0)
  const canadaContacts = filtered.filter(c => c.location === "Canada").reduce((sum, c) => sum + c.contacts, 0)
  const uaeContacts = filtered.filter(c => c.location === "UAE").reduce((sum, c) => sum + c.contacts, 0)
  const usaIndustries = new Set(filtered.filter(c => c.location === "USA").map(c => c.industry)).size
  const canadaIndustries = new Set(filtered.filter(c => c.location === "Canada").map(c => c.industry)).size
  const uaeIndustries = new Set(filtered.filter(c => c.location === "UAE").map(c => c.industry)).size

  // Generate monthly trends with variation
  return months.map((month, index) => {
    // Apply growth/decline pattern across months
    const variation = (index + 1) * 0.05 + Math.sin(index * 0.5) * 0.1

    return {
      month,
      "USA Companies": Math.round(usaCompanies * (1 + variation)),
      "Canada Companies": Math.round(canadaCompanies * (1 + variation)),
      "UAE Companies": Math.round(uaeCompanies * (1 + variation)),
      "USA Industries": Math.round(usaIndustries * (1 + variation * 0.3)),
      "Canada Industries": Math.round(canadaIndustries * (1 + variation * 0.3)),
      "UAE Industries": Math.round(uaeIndustries * (1 + variation * 0.3)),
      "USA Contacts": Math.round(usaContacts * (1 + variation)),
      "Canada Contacts": Math.round(canadaContacts * (1 + variation)),
      "UAE Contacts": Math.round(uaeContacts * (1 + variation)),
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
  filters: { industries: string[]; locations: string[]; jobTitles: string[]; dateRange: string }
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
  const uaeData: { industries: Set<string>; companies: number; contacts: number } = {
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
    } else if (c.location === "UAE") {
      uaeData.industries.add(c.industry)
      uaeData.companies += 1
      uaeData.contacts += c.contacts
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
  const uaeValue = getValue(uaeData)
  const maxValue = Math.max(usaValue, canadaValue, uaeValue, 1)

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
    UAE: {
      value: uaeValue,
      percentage: maxValue > 0 ? (uaeValue / maxValue) * 100 : 0,
      industries: Array.from(uaeData.industries),
      companies: uaeData.companies,
      contacts: uaeData.contacts,
    },
  }
}

// Get project status data for table display
export interface Project {
  id: number
  name: string
  client: string
  status: "Completed" | "In Progress" | "On Hold" | "Not Started"
  industry: string
}

const allProjects: Project[] = [
  { id: 1, name: "Cloud Migration Project", client: "Acme Corp", status: "Completed", industry: "Technology" },
  { id: 2, name: "Data Analytics Platform", client: "FinServe Solutions", status: "In Progress", industry: "Finance" },
  { id: 3, name: "Mobile App Redesign", client: "RetailHub Ltd", status: "In Progress", industry: "Retail" },
  { id: 4, name: "ERP Implementation", client: "ManuTech Global", status: "On Hold", industry: "Manufacturing" },
  { id: 5, name: "Security Audit", client: "TechVision Labs", status: "Completed", industry: "Technology" },
  { id: 6, name: "E-commerce Integration", client: "ShopHub International", status: "In Progress", industry: "Retail" },
  { id: 7, name: "CRM System Upgrade", client: "MediCare Systems", status: "Not Started", industry: "Healthcare" },
  { id: 8, name: "Infrastructure Scaling", client: "Capital Ventures", status: "Completed", industry: "Finance" },
  { id: 9, name: "AI Chatbot Development", client: "EduTech Academy", status: "In Progress", industry: "Education" },
  { id: 10, name: "Blockchain Integration", client: "PowerGrid Energy", status: "On Hold", industry: "Energy" },
  { id: 11, name: "Website Overhaul", client: "PropertyPro Realty", status: "Completed", industry: "Real Estate" },
  { id: 12, name: "Supply Chain System", client: "LogiTrans Global", status: "In Progress", industry: "Transportation" },
  { id: 13, name: "Inventory Management", client: "FoodCorp International", status: "Not Started", industry: "Food & Beverage" },
  { id: 14, name: "Video Streaming Platform", client: "MediaStream Entertainment", status: "In Progress", industry: "Entertainment" },
  { id: 15, name: "Smart Farming Solution", client: "AgriTech Solutions", status: "On Hold", industry: "Agriculture" },
  { id: 16, name: "Construction Management", client: "BuildCorp Construction", status: "Completed", industry: "Construction" },
  { id: 17, name: "ML Pipeline Setup", client: "DataFlow Analytics", status: "In Progress", industry: "Technology" },
  { id: 18, name: "Telemedicine Platform", client: "HealthFirst Medical", status: "Completed", industry: "Healthcare" },
  { id: 19, name: "Trading System", client: "BankTrust Financial", status: "In Progress", industry: "Finance" },
  { id: 20, name: "POS System Upgrade", client: "MarketPlace Retail", status: "On Hold", industry: "Retail" },
]

export function getProjectStatusData(filters: { industries: string[]; locations: string[]; jobTitles: string[]; dateRange: string }) {
  const filtered = getFilteredData(filters)
  const filteredCompanies = new Set(filtered.map(c => c.name))

  // Filter projects based on company filters
  let projects = allProjects.filter(p => filteredCompanies.has(p.client))

  // If no companies match, show all projects
  if (projects.length === 0) {
    projects = allProjects
  }

  return projects
}

// Contact data for drill-down
export interface Contact {
  id: number
  name: string
  department: string
  email: string
  jobTitle: string
  managementLevel: string
  company: string
}

const allContacts: Contact[] = [
  { id: 1, name: "John Smith", department: "Engineering", email: "john.smith@acmecorp.com", jobTitle: "Project Manager", managementLevel: "Senior", company: "Acme Corp" },
  { id: 2, name: "Sarah Johnson", department: "Sales", email: "sarah.j@acmecorp.com", jobTitle: "Sales Manager", managementLevel: "Mid", company: "Acme Corp" },
  { id: 3, name: "Mike Chen", department: "Engineering", email: "mike.chen@acmecorp.com", jobTitle: "Software Engineer", managementLevel: "Junior", company: "Acme Corp" },
  { id: 4, name: "Emily Davis", department: "Marketing", email: "emily.d@acmecorp.com", jobTitle: "Marketing Director", managementLevel: "Senior", company: "Acme Corp" },
  { id: 5, name: "Robert Wilson", department: "Operations", email: "robert.w@acmecorp.com", jobTitle: "Operations Manager", managementLevel: "Senior", company: "Acme Corp" },
  { id: 6, name: "Lisa Anderson", department: "Medical", email: "lisa.a@globalhealth.com", jobTitle: "Project Manager", managementLevel: "Mid", company: "Global Health Inc" },
  { id: 7, name: "David Brown", department: "Engineering", email: "david.b@globalhealth.com", jobTitle: "Software Engineer", managementLevel: "Senior", company: "Global Health Inc" },
  { id: 8, name: "Jennifer Lee", department: "Finance", email: "jennifer.l@finserv.com", jobTitle: "Sales Manager", managementLevel: "Senior", company: "FinServe Solutions" },
  { id: 9, name: "Tom Martinez", department: "IT", email: "tom.m@finserv.com", jobTitle: "Software Engineer", managementLevel: "Mid", company: "FinServe Solutions" },
  { id: 10, name: "Amanda White", department: "Sales", email: "amanda.w@retailhub.com", jobTitle: "Marketing Director", managementLevel: "Senior", company: "RetailHub Ltd" },
  { id: 11, name: "Chris Taylor", department: "Production", email: "chris.t@manutech.com", jobTitle: "Operations Manager", managementLevel: "Mid", company: "ManuTech Global" },
  { id: 12, name: "Jessica Garcia", department: "Engineering", email: "jessica.g@techvision.com", jobTitle: "Project Manager", managementLevel: "Senior", company: "TechVision Labs" },
  { id: 13, name: "Ryan Moore", department: "Medical", email: "ryan.m@medicare.com", jobTitle: "Software Engineer", managementLevel: "Junior", company: "MediCare Systems" },
  { id: 14, name: "Michelle Clark", department: "Finance", email: "michelle.c@capitalv.com", jobTitle: "Sales Manager", managementLevel: "Senior", company: "Capital Ventures" },
  { id: 15, name: "Kevin Rodriguez", department: "Sales", email: "kevin.r@shophub.com", jobTitle: "Marketing Director", managementLevel: "Mid", company: "ShopHub International" },
  { id: 16, name: "Nicole Thompson", department: "Engineering", email: "nicole.t@acmecorp.com", jobTitle: "Software Engineer", managementLevel: "Mid", company: "Acme Corp" },
  { id: 17, name: "Daniel Harris", department: "Sales", email: "daniel.h@finserv.com", jobTitle: "Sales Manager", managementLevel: "Senior", company: "FinServe Solutions" },
  { id: 18, name: "Laura Martinez", department: "HR", email: "laura.m@techvision.com", jobTitle: "Operations Manager", managementLevel: "Mid", company: "TechVision Labs" },
  { id: 19, name: "James Anderson", department: "Engineering", email: "james.a@medicare.com", jobTitle: "Software Engineer", managementLevel: "Senior", company: "MediCare Systems" },
  { id: 20, name: "Sophie Wilson", department: "Finance", email: "sophie.w@capitalv.com", jobTitle: "Project Manager", managementLevel: "Senior", company: "Capital Ventures" },
]

// Extended company data for drill-down
export interface CompanyDetails {
  id: number
  name: string
  region: string
  employeeCount: number
  revenue: string
}

const allCompanyDetails: CompanyDetails[] = [
  { id: 1, name: "Acme Corp", region: "USA", employeeCount: 1250, revenue: "$45.2M" },
  { id: 2, name: "Global Health Inc", region: "Canada", employeeCount: 890, revenue: "$32.5M" },
  { id: 3, name: "FinServe Solutions", region: "USA", employeeCount: 2100, revenue: "$78.9M" },
  { id: 4, name: "RetailHub Ltd", region: "USA", employeeCount: 560, revenue: "$21.3M" },
  { id: 5, name: "ManuTech Global", region: "Canada", employeeCount: 420, revenue: "$15.8M" },
  { id: 6, name: "TechVision Labs", region: "USA", employeeCount: 1580, revenue: "$62.4M" },
  { id: 7, name: "MediCare Systems", region: "USA", employeeCount: 920, revenue: "$35.7M" },
  { id: 8, name: "Capital Ventures", region: "Canada", employeeCount: 1340, revenue: "$51.2M" },
  { id: 9, name: "ShopHub International", region: "USA", employeeCount: 780, revenue: "$28.9M" },
  { id: 10, name: "Desert Tech Solutions", region: "UAE", employeeCount: 650, revenue: "$24.5M" },
  { id: 11, name: "Gulf Finance Hub", region: "UAE", employeeCount: 980, revenue: "$42.8M" },
  { id: 12, name: "Emirates Retail Group", region: "UAE", employeeCount: 520, revenue: "$19.2M" },
  { id: 13, name: "DataFlow Analytics", region: "USA", employeeCount: 1850, revenue: "$72.4M" },
  { id: 14, name: "HealthFirst Medical", region: "USA", employeeCount: 1100, revenue: "$41.8M" },
  { id: 15, name: "BankTrust Financial", region: "Canada", employeeCount: 980, revenue: "$38.5M" },
  { id: 16, name: "MarketPlace Retail", region: "USA", employeeCount: 690, revenue: "$26.7M" },
  { id: 17, name: "AutoManufacturing Co", region: "USA", employeeCount: 2400, revenue: "$95.2M" },
]

export function getContactsByIndustry(industry: string): Contact[] {
  const filtered = allCompanies.filter(c => c.industry === industry)
  const companyNames = new Set(filtered.map(c => c.name))
  return allContacts.filter(c => companyNames.has(c.company))
}

export function getCompaniesByIndustry(industry: string): CompanyDetails[] {
  const filtered = allCompanies.filter(c => c.industry === industry)
  const companyNames = new Set(filtered.map(c => c.name))
  return allCompanyDetails.filter(c => companyNames.has(c.name))
}

export function getContactsByRegion(region: string): Contact[] {
  const filtered = allCompanies.filter(c => c.location === region)
  const companyNames = new Set(filtered.map(c => c.name))
  return allContacts.filter(c => companyNames.has(c.company))
}

export function getCompaniesByRegion(region: string): CompanyDetails[] {
  const filtered = allCompanies.filter(c => c.location === region)
  const companyNames = new Set(filtered.map(c => c.name))
  return allCompanyDetails.filter(c => companyNames.has(c.name))
}

// Get all contacts for contacts card drill-down
export function getAllContacts(): Contact[] {
  return allContacts
}

// Get all companies for companies card drill-down
export function getAllCompanies(): CompanyDetails[] {
  return allCompanyDetails
}

// Get all projects for projects card drill-down
export function getAllProjects(): Project[] {
  return allProjects
}
