"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const budgetAllocation = [
  { name: "Salaries", value: 45 },
  { name: "Marketing", value: 15 },
  { name: "Utilities", value: 10 },
  { name: "Maintenance", value: 8 },
  { name: "Office Supplies", value: 7 },
  { name: "Other", value: 15 },
]

const COLORS = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6", "#34495e"]

const budgetItems = [
  { head: "Salaries & Wages", previous: 6500000, current: 7200000, proposed: 7800000, variance: "+8.3%" },
  { head: "Marketing", previous: 1200000, current: 1500000, proposed: 1650000, variance: "+10.0%" },
  { head: "Office Supplies", previous: 350000, current: 400000, proposed: 380000, variance: "-5.0%" },
  { head: "Utilities", previous: 600000, current: 650000, proposed: 700000, variance: "+7.7%" },
  { head: "Maintenance", previous: 450000, current: 500000, proposed: 550000, variance: "+10.0%" },
]

export function Budgeting() {
  const [budgetYear, setBudgetYear] = useState("2024")
  const [budgetDepartment, setBudgetDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Budget Overview</TabsTrigger>
              <TabsTrigger value="planning">Budget Planning</TabsTrigger>
              <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">৳ 2.5M</div>
                    <p className="text-xs text-muted-foreground mt-2">FY 2023-2024</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Actual Spending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">৳ 1.85M</div>
                    <p className="text-xs text-muted-foreground mt-2">YTD</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Remaining Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">৳ 650K</div>
                    <p className="text-xs text-muted-foreground mt-2">Available</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">74%</div>
                    <p className="text-xs text-muted-foreground mt-2">Of Total Budget</p>
                  </CardContent>
                </Card>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Financial Year</Label>
                  <Select value={budgetYear} onValueChange={setBudgetYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024-2025</SelectItem>
                      <SelectItem value="2023">2023-2024</SelectItem>
                      <SelectItem value="2022">2022-2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={budgetDepartment} onValueChange={setBudgetDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Budget Allocation</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Head</TableHead>
                      <TableHead className="text-right">Previous Year</TableHead>
                      <TableHead className="text-right">Current Budget</TableHead>
                      <TableHead className="text-right">Proposed Budget</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetItems.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.head}</TableCell>
                        <TableCell className="text-right">৳ {item.previous.toLocaleString()}</TableCell>
                        <TableCell className="text-right">৳ {item.current.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Input type="number" defaultValue={item.proposed} className="text-right" />
                        </TableCell>
                        <TableCell className="text-right">{item.variance}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-semibold bg-muted">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">৳ 9,100,000</TableCell>
                      <TableCell className="text-right">৳ 10,250,000</TableCell>
                      <TableCell className="text-right">৳ 11,130,000</TableCell>
                      <TableCell className="text-right">+8.6%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit for Approval</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
