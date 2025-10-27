"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardView } from "@/components/dashboard/dashboard-view"
import { CompanyManagement } from "@/components/modules/company-management"
import { VoucherEntry } from "@/components/modules/voucher-entry"
import { TaxCalculation } from "@/components/modules/tax-calculation"
import { Reports } from "@/components/modules/reports"
import { InventoryManagement } from "@/components/modules/inventory-management"
import { BankingReconciliation } from "@/components/modules/banking-reconciliation"
import { PayrollManagement } from "@/components/modules/payroll-management"
import { FixedAssets } from "@/components/modules/fixed-assets"
import { Budgeting } from "@/components/modules/budgeting"
import { UserManagement } from "@/components/modules/user-management"
import { SystemSettings } from "@/components/modules/system-settings"

type PageType =
  | "dashboard"
  | "companies"
  | "vouchers"
  | "tax"
  | "reports"
  | "inventory"
  | "banking"
  | "payroll"
  | "assets"
  | "budget"
  | "users"
  | "settings"

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "companies":
        return <CompanyManagement />
      case "vouchers":
        return <VoucherEntry />
      case "tax":
        return <TaxCalculation />
      case "reports":
        return <Reports />
      case "inventory":
        return <InventoryManagement />
      case "banking":
        return <BankingReconciliation />
      case "payroll":
        return <PayrollManagement />
      case "assets":
        return <FixedAssets />
      case "budget":
        return <Budgeting />
      case "users":
        return <UserManagement />
      case "settings":
        return <SystemSettings />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{renderPage()}</div>
        </main>
      </div>
    </div>
  )
}
