"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const assets = [
  {
    id: "AST-001",
    name: "Office Building",
    category: "Property",
    purchaseDate: "15-03-2020",
    purchaseValue: 3500000,
    depreciation: 700000,
    currentValue: 2800000,
    status: "Active",
  },
  {
    id: "AST-002",
    name: "Delivery Van",
    category: "Vehicle",
    purchaseDate: "20-06-2021",
    purchaseValue: 800000,
    depreciation: 320000,
    currentValue: 480000,
    status: "Active",
  },
  {
    id: "AST-003",
    name: "Production Machine",
    category: "Machinery",
    purchaseDate: "10-09-2022",
    purchaseValue: 900000,
    depreciation: 230000,
    currentValue: 670000,
    status: "Active",
  },
]

const depreciationSchedule = [
  { asset: "Office Building", rate: "5%", annual: 175000, accumulated: 700000, remaining: "16 years" },
  { asset: "Delivery Van", rate: "20%", annual: 160000, accumulated: 320000, remaining: "3 years" },
  { asset: "Production Machine", rate: "15%", annual: 135000, accumulated: 230000, remaining: "5 years" },
]

export function FixedAssets() {
  const [depreciationMethod, setDepreciationMethod] = useState("straight-line")
  const [financialYear, setFinancialYear] = useState("2023")

  const totalAssets = assets.length
  const totalValue = assets.reduce((sum, a) => sum + a.purchaseValue, 0)
  const totalDepreciation = assets.reduce((sum, a) => sum + a.depreciation, 0)
  const netValue = totalValue - totalDepreciation

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets}</div>
            <p className="text-xs text-muted-foreground mt-2">Registered Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {(totalValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-2">Current Book Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {(totalDepreciation / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-2">Accumulated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {(netValue / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-2">After Depreciation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fixed Assets Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead className="text-right">Purchase Value</TableHead>
                <TableHead className="text-right">Depreciation</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell className="text-right">৳ {asset.purchaseValue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">৳ {asset.depreciation.toLocaleString()}</TableCell>
                  <TableCell className="text-right">৳ {asset.currentValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge>{asset.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Depreciation Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Depreciation Method</Label>
              <Select value={depreciationMethod} onValueChange={setDepreciationMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-line">Straight Line</SelectItem>
                  <SelectItem value="reducing-balance">Reducing Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Financial Year</Label>
              <Select value={financialYear} onValueChange={setFinancialYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023-2024</SelectItem>
                  <SelectItem value="2022">2022-2023</SelectItem>
                  <SelectItem value="2021">2021-2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Depreciation Rate</TableHead>
                <TableHead className="text-right">Annual Depreciation</TableHead>
                <TableHead className="text-right">Accumulated Depreciation</TableHead>
                <TableHead>Remaining Life</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depreciationSchedule.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.asset}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell className="text-right">৳ {row.annual.toLocaleString()}</TableCell>
                  <TableCell className="text-right">৳ {row.accumulated.toLocaleString()}</TableCell>
                  <TableCell>{row.remaining}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button className="w-full">Calculate Depreciation</Button>
        </CardContent>
      </Card>
    </div>
  )
}
