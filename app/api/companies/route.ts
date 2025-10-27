import { type NextRequest, NextResponse } from "next/server"

// Mock database for companies
const companies = [
  {
    id: "1",
    name: "Main Company",
    registrationNumber: "REG001",
    taxId: "TAX001",
    address: "123 Business St",
    city: "New York",
    country: "USA",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json(companies)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const data = await request.json()
    const newCompany = {
      id: String(companies.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
    }

    companies.push(newCompany)
    return NextResponse.json(newCompany, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
  }
}
