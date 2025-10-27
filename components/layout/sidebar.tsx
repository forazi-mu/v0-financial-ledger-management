"use client"

import {
  LayoutDashboard,
  Building2,
  Receipt,
  Calculator,
  BarChart3,
  Package,
  Banknote,
  Users,
  Briefcase,
  PieChart,
  UserCog,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: any) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { logout } = useAuth()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "vouchers", label: "Vouchers", icon: Receipt },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "banking", label: "Banking & Reconciliation", icon: Banknote },
    { id: "payroll", label: "Payroll Management", icon: Users },
    { id: "assets", label: "Fixed Assets", icon: Briefcase },
    { id: "budget", label: "Budgeting", icon: PieChart },
    { id: "tax", label: "VAT & Tax", icon: Calculator },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "users", label: "User Management", icon: UserCog },
    { id: "settings", label: "System Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-primary text-white flex flex-col h-screen">
      <div className="p-6 border-b border-primary-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">L</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">LedgerPro</h1>
            <p className="text-xs text-primary-lighter">Financial Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-secondary text-white" : "text-primary-lighter hover:bg-primary-light"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-primary-light">
        <Button
          variant="outline"
          className="w-full text-white border-primary-light hover:bg-primary-light bg-transparent"
          onClick={logout}
        >
          <span className="mr-2">↪</span>
          Logout
        </Button>
      </div>
    </div>
  )
}
