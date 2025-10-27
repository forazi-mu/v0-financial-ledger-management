"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportData {
  name: string
  description: string
  data: any
}

export function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState("current-month")

  // Sample financial data
  const balanceSheetData = {
    assets: [
      { name: "Cash", amount: 250000 },
      { name: "Bank", amount: 500000 },
      { name: "Accounts Receivable", amount: 150000 },
      { name: "Inventory", amount: 300000 },
      { name: "Fixed Assets", amount: 1000000 },
    ],
    liabilities: [
      { name: "Accounts Payable", amount: 200000 },
      { name: "Short-term Loan", amount: 300000 },
      { name: "Long-term Loan", amount: 500000 },
    ],
    equity: [{ name: "Capital", amount: 1200000 }],
  }

  const incomeStatementData = {
    revenue: [
      { name: "Sales Revenue", amount: 1250000 },
      { name: "Service Income", amount: 150000 },
    ],
    expenses: [
      { name: "Cost of Goods Sold", amount: 500000 },
      { name: "Salary Expenses", amount: 350000 },
      { name: "Rent Expenses", amount: 100000 },
      { name: "Utilities", amount: 50000 },
      { name: "Office Supplies", amount: 30000 },
    ],
  }

  const trialBalanceData = [
    { account: "Cash", debit: 250000, credit: 0 },
    { account: "Bank", debit: 500000, credit: 0 },
    { account: "Accounts Receivable", debit: 150000, credit: 0 },
    { account: "Inventory", debit: 300000, credit: 0 },
    { account: "Fixed Assets", debit: 1000000, credit: 0 },
    { account: "Accounts Payable", debit: 0, credit: 200000 },
    { account: "Short-term Loan", debit: 0, credit: 300000 },
    { account: "Long-term Loan", debit: 0, credit: 500000 },
    { account: "Capital", debit: 0, credit: 1200000 },
    { account: "Sales Revenue", debit: 0, credit: 1250000 },
    { account: "COGS", debit: 500000, credit: 0 },
    { account: "Salary Expenses", debit: 350000, credit: 0 },
  ]

  const reports = [
    {
      name: "Balance Sheet",
      description: "Assets, Liabilities & Equity",
      id: "balance-sheet",
    },
    {
      name: "Income Statement",
      description: "Revenue & Expenses Summary",
      id: "income-statement",
    },
    {
      name: "Trial Balance",
      description: "All Account Balances",
      id: "trial-balance",
    },
    {
      name: "Cash Flow Statement",
      description: "Cash Inflows & Outflows",
      id: "cash-flow",
    },
    {
      name: "Ledger Report",
      description: "Detailed Account Transactions",
      id: "ledger",
    },
    {
      name: "VAT Report",
      description: "VAT Collection & Payment",
      id: "vat",
    },
  ]

  const exportToCSV = (reportName: string) => {
    let csvContent = `${reportName}\nGenerated on ${new Date().toLocaleDateString()}\n\n`

    if (reportName === "Balance Sheet") {
      csvContent += "ASSETS\n"
      balanceSheetData.assets.forEach((item) => {
        csvContent += `${item.name},${item.amount}\n`
      })
      csvContent += `Total Assets,${balanceSheetData.assets.reduce((sum, a) => sum + a.amount, 0)}\n\n`

      csvContent += "LIABILITIES\n"
      balanceSheetData.liabilities.forEach((item) => {
        csvContent += `${item.name},${item.amount}\n`
      })
      csvContent += `Total Liabilities,${balanceSheetData.liabilities.reduce((sum, a) => sum + a.amount, 0)}\n\n`

      csvContent += "EQUITY\n"
      balanceSheetData.equity.forEach((item) => {
        csvContent += `${item.name},${item.amount}\n`
      })
    }

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent))
    element.setAttribute("download", `${reportName.replace(/\s+/g, "-")}.csv`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const exportToPDF = (reportName: string) => {
    alert(`PDF export for ${reportName} would be generated here. In production, use a library like jsPDF.`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Financial Reports</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-month">Current Month</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
            <SelectItem value="current-year">Current Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-text">{report.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">{report.description}</p>
                </div>
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary-light">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{report.name}</DialogTitle>
                    </DialogHeader>

                    {report.id === "balance-sheet" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-lg mb-3">ASSETS</h3>
                          <table className="w-full text-sm">
                            <tbody>
                              {balanceSheetData.assets.map((item, idx) => (
                                <tr key={idx} className="border-b border-border">
                                  <td className="py-2">{item.name}</td>
                                  <td className="text-right py-2">৳ {item.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr className="font-bold border-t-2 border-border">
                                <td className="py-2">Total Assets</td>
                                <td className="text-right py-2">
                                  ৳ {balanceSheetData.assets.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-3">LIABILITIES</h3>
                          <table className="w-full text-sm">
                            <tbody>
                              {balanceSheetData.liabilities.map((item, idx) => (
                                <tr key={idx} className="border-b border-border">
                                  <td className="py-2">{item.name}</td>
                                  <td className="text-right py-2">৳ {item.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr className="font-bold border-t-2 border-border">
                                <td className="py-2">Total Liabilities</td>
                                <td className="text-right py-2">
                                  ৳{" "}
                                  {balanceSheetData.liabilities.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-3">EQUITY</h3>
                          <table className="w-full text-sm">
                            <tbody>
                              {balanceSheetData.equity.map((item, idx) => (
                                <tr key={idx} className="border-b border-border">
                                  <td className="py-2">{item.name}</td>
                                  <td className="text-right py-2">৳ {item.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {report.id === "income-statement" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-lg mb-3">REVENUE</h3>
                          <table className="w-full text-sm">
                            <tbody>
                              {incomeStatementData.revenue.map((item, idx) => (
                                <tr key={idx} className="border-b border-border">
                                  <td className="py-2">{item.name}</td>
                                  <td className="text-right py-2">৳ {item.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr className="font-bold border-t-2 border-border">
                                <td className="py-2">Total Revenue</td>
                                <td className="text-right py-2">
                                  ৳ {incomeStatementData.revenue.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-3">EXPENSES</h3>
                          <table className="w-full text-sm">
                            <tbody>
                              {incomeStatementData.expenses.map((item, idx) => (
                                <tr key={idx} className="border-b border-border">
                                  <td className="py-2">{item.name}</td>
                                  <td className="text-right py-2">৳ {item.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr className="font-bold border-t-2 border-border">
                                <td className="py-2">Total Expenses</td>
                                <td className="text-right py-2">
                                  ৳{" "}
                                  {incomeStatementData.expenses.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-success/10 p-4 rounded">
                          <p className="font-bold text-lg">
                            Net Income: ৳{" "}
                            {(
                              incomeStatementData.revenue.reduce((sum, a) => sum + a.amount, 0) -
                              incomeStatementData.expenses.reduce((sum, a) => sum + a.amount, 0)
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {report.id === "trial-balance" && (
                      <div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-border">
                              <th className="text-left py-2">Account</th>
                              <th className="text-right py-2">Debit</th>
                              <th className="text-right py-2">Credit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {trialBalanceData.map((item, idx) => (
                              <tr key={idx} className="border-b border-border">
                                <td className="py-2">{item.account}</td>
                                <td className="text-right py-2">
                                  {item.debit > 0 ? `৳ ${item.debit.toLocaleString()}` : "-"}
                                </td>
                                <td className="text-right py-2">
                                  {item.credit > 0 ? `৳ ${item.credit.toLocaleString()}` : "-"}
                                </td>
                              </tr>
                            ))}
                            <tr className="font-bold border-t-2 border-border">
                              <td className="py-2">Total</td>
                              <td className="text-right py-2">
                                ৳ {trialBalanceData.reduce((sum, a) => sum + a.debit, 0).toLocaleString()}
                              </td>
                              <td className="text-right py-2">
                                ৳ {trialBalanceData.reduce((sum, a) => sum + a.credit, 0).toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => exportToCSV(report.name)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
