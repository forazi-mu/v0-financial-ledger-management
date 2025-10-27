import { type NextRequest, NextResponse } from "next/server"

// Mock database for vouchers
const vouchers = [
  {
    id: "1",
    voucherNumber: "V001",
    date: new Date().toISOString(),
    companyId: "1",
    description: "Office supplies",
    amount: 500,
    category: "Expenses",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json(vouchers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vouchers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const data = await request.json()
    const newVoucher = {
      id: String(vouchers.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
    }

    vouchers.push(newVoucher)
    return NextResponse.json(newVoucher, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create voucher" }, { status: 500 })
  }
}
