"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const employees = [
  {
    id: "EMP-001",
    name: "John Smith",
    department: "Finance",
    designation: "Accountant",
    salary: 45000,
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Sarah Johnson",
    department: "Sales",
    designation: "Sales Manager",
    salary: 60000,
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Michael Brown",
    department: "Production",
    designation: "Supervisor",
    salary: 35000,
    status: "On Leave",
  },
]

const payrollData = [
  {
    employee: "John Smith",
    basic: 45000,
    overtime: 5000,
    bonus: 2000,
    deductions: 3500,
    net: 48500,
    status: "Pending",
  },
  {
    employee: "Sarah Johnson",
    basic: 60000,
    overtime: 0,
    bonus: 5000,
    deductions: 4200,
    net: 60800,
    status: "Pending",
  },
  {
    employee: "Michael Brown",
    basic: 35000,
    overtime: 7500,
    bonus: 1000,
    deductions: 2800,
    net: 40700,
    status: "Pending",
  },
]

export function PayrollManagement() {
  const [payrollMonth, setPayrollMonth] = useState("2023-10")
  const [paymentDate, setPaymentDate] = useState("2023-10-31")
  const [paymentMethod, setPaymentMethod] = useState("bank")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search employees..." className="flex-1" />
            <Button variant="outline">Search</Button>
            <Button>Export</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead className="text-right">Basic Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell className="text-right">৳ {emp.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={emp.status === "Active" ? "default" : "secondary"}>{emp.status}</Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Payroll Month</Label>
              <Input type="month" value={payrollMonth} onChange={(e) => setPayrollMonth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Employee Salary Details</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Basic</TableHead>
                  <TableHead className="text-right">Overtime</TableHead>
                  <TableHead className="text-right">Bonus</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.employee}</TableCell>
                    <TableCell className="text-right">৳ {row.basic.toLocaleString()}</TableCell>
                    <TableCell className="text-right">৳ {row.overtime.toLocaleString()}</TableCell>
                    <TableCell className="text-right">৳ {row.bonus.toLocaleString()}</TableCell>
                    <TableCell className="text-right">৳ {row.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold">৳ {row.net.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-muted">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">৳ 140,000</TableCell>
                  <TableCell className="text-right">৳ 12,500</TableCell>
                  <TableCell className="text-right">৳ 8,000</TableCell>
                  <TableCell className="text-right">৳ 10,500</TableCell>
                  <TableCell className="text-right">৳ 150,000</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline">Print Payslips</Button>
            <Button>Submit for Approval</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
