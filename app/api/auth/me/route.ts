import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const sessionData = JSON.parse(session)

    // Mock user lookup - in production, query database
    const mockUsers: Record<string, any> = {
      "1": { id: "1", email: "admin@example.com", name: "Admin User", role: "admin" },
      "2": { id: "2", email: "accountant@example.com", name: "Accountant User", role: "accountant" },
    }

    const user = mockUsers[sessionData.userId]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Auth check failed" }, { status: 500 })
  }
}
