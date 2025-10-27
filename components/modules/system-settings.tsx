"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const backups = [
  { date: "15-10-2023 18:30", file: "backup_20231015.zip", size: "45.2 MB", status: "Completed" },
  { date: "08-10-2023 18:30", file: "backup_20231008.zip", size: "44.8 MB", status: "Completed" },
  { date: "01-10-2023 18:30", file: "backup_20231001.zip", size: "44.5 MB", status: "Completed" },
]

export function SystemSettings() {
  const [systemName, setSystemName] = useState("LedgerPro Financial System")
  const [baseCurrency, setBaseCurrency] = useState("BDT")
  const [dateFormat, setDateFormat] = useState("dd-mm-yyyy")
  const [financialYear, setFinancialYear] = useState("july")
  const [standardVat, setStandardVat] = useState("15")
  const [reducedVat, setReducedVat] = useState("10")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
              <TabsTrigger value="tax">Tax</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>System Name</Label>
                  <Input value={systemName} onChange={(e) => setSystemName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Base Currency</Label>
                  <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">Bangladeshi Taka (BDT)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Financial Year Start</Label>
                  <Select value={financialYear} onValueChange={setFinancialYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>System Logo</Label>
                <Input type="file" />
              </div>
            </TabsContent>

            <TabsContent value="backup" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl">📥</div>
                    <h4 className="font-semibold">Backup Data</h4>
                    <p className="text-sm text-muted-foreground">Create a backup of all system data</p>
                    <Button className="w-full">Backup Now</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl">📤</div>
                    <h4 className="font-semibold">Restore Data</h4>
                    <p className="text-sm text-muted-foreground">Restore system from a backup file</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Restore
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl">☁️</div>
                    <h4 className="font-semibold">Cloud Backup</h4>
                    <p className="text-sm text-muted-foreground">Configure automatic cloud backups</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl">⏰</div>
                    <h4 className="font-semibold">Auto Backup</h4>
                    <p className="text-sm text-muted-foreground">Schedule automatic backups</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Schedule
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Backups</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup Date</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>{backup.file}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <Badge>{backup.status}</Badge>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="tax" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Standard VAT Rate (%)</Label>
                  <Input type="number" value={standardVat} onChange={(e) => setStandardVat(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Reduced VAT Rate (%)</Label>
                  <Input type="number" value={reducedVat} onChange={(e) => setReducedVat(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company TIN</Label>
                  <Input defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label>VAT Registration No.</Label>
                  <Input defaultValue="VAT-987654321" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tax Authority</Label>
                <Input defaultValue="Bangladesh NBR" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
