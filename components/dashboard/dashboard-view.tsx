"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", income: 450000, expenses: 300000 },
  { month: "Feb", income: 520000, expenses: 350000 },
  { month: "Mar", income: 480000, expenses: 320000 },
  { month: "Apr", income: 610000, expenses: 380000 },
  { month: "May", income: 750000, expenses: 420000 },
  { month: "Jun", income: 890000, expenses: 480000 },
  { month: "Jul", income: 1050000, expenses: 550000 },
  { month: "Aug", income: 1100000, expenses: 600000 },
  { month: "Sep", income: 1250000, expenses: 850000 },
]

const categoryData = [
  { name: "Salaries", value: 350000, color: "#0f766e" },
  { name: "Utilities", value: 120000, color: "#2563eb" },
  { name: "Supplies", value: 180000, color: "#d97706" },
  { name: "Rent", value: 200000, color: "#dc2626" },
]

export function DashboardView() {
  const [stats, setStats] = useState([
    {
      title: "Total Income",
      value: "৳ 1,250,000",
      change: "+12.5%",
      icon: TrendingUp,
      color: "bg-success",
    },
    {
      title: "Total Expenses",
      value: "৳ 850,000",
      change: "+8.2%",
      icon: TrendingDown,
      color: "bg-danger",
    },
    {
      title: "Net Profit",
      value: "৳ 400,000",
      change: "+15.3%",
      icon: DollarSign,
      color: "bg-secondary",
    },
    {
      title: "VAT Collected",
      value: "৳ 75,000",
      change: "+5.1%",
      icon: Percent,
      color: "bg-accent",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-secondary font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
                    <p className="text-xs text-success mt-2">This Month</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Expenses Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  formatter={(value) => `৳ ${value.toLocaleString()}`}
                />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="var(--color-success)" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="var(--color-danger)" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ৳${(value / 1000).toFixed(0)}K`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `৳ ${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Profit Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                formatter={(value) => `৳ ${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="income" fill="var(--color-success)" name="Income" />
              <Bar dataKey="expenses" fill="var(--color-danger)" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Voucher No.</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Debit</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Credit</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Balance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: "15-10-2024",
                    voucher: "PV-2024-001",
                    desc: "Purchase of raw materials",
                    debit: "৳ 250,000",
                    credit: "-",
                    balance: "৳ 250,000",
                  },
                  {
                    date: "16-10-2024",
                    voucher: "SV-2024-045",
                    desc: "Sale of finished goods",
                    debit: "-",
                    credit: "৳ 450,000",
                    balance: "৳ 200,000",
                  },
                  {
                    date: "17-10-2024",
                    voucher: "JV-2024-012",
                    desc: "Salary payment",
                    debit: "৳ 120,000",
                    credit: "-",
                    balance: "৳ 320,000",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-surface-secondary">
                    <td className="py-3 px-4">{row.date}</td>
                    <td className="py-3 px-4 font-medium text-accent">{row.voucher}</td>
                    <td className="py-3 px-4">{row.desc}</td>
                    <td className="py-3 px-4 text-danger">{row.debit}</td>
                    <td className="py-3 px-4 text-success">{row.credit}</td>
                    <td className="py-3 px-4 font-medium">{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
