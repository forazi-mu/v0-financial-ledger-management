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
import { Checkbox } from "@/components/ui/checkbox"

const bankData = [
  { name: "Primary", balance: 1250000, account: "DBBL - ********1234" },
  { name: "Savings", balance: 750000, account: "HSBC - ********5678" },
  { name: "Business", balance: 2100000, account: "BRAC - ********9012" },
]

const transactions = [
  {
    date: "15-10-2023",
    description: "Supplier Payment - ABC Suppliers",
    reference: "CHQ-123456",
    debit: 250000,
    credit: 0,
    balance: 1000000,
    status: "Cleared",
  },
  {
    date: "16-10-2023",
    description: "Customer Receipt - Best Retailers",
    reference: "TRF-789012",
    debit: 0,
    credit: 450000,
    balance: 1450000,
    status: "Cleared",
  },
  {
    date: "17-10-2023",
    description: "Salary Transfer",
    reference: "TRF-345678",
    debit: 120000,
    credit: 0,
    balance: 1330000,
    status: "Pending",
  },
]

const unreconciled = [
  { date: "17-10-2023", description: "Salary Transfer", amount: 120000 },
  { date: "18-10-2023", description: "Utility Bill Payment", amount: 25000 },
  { date: "19-10-2023", description: "Office Rent", amount: 80000 },
]

export function BankingReconciliation() {
  const [selectedAccount, setSelectedAccount] = useState("dbbl")
  const [statementBalance, setStatementBalance] = useState("")
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bankData.map((bank) => (
          <Card key={bank.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{bank.name} Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳ {bank.balance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">{bank.account}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bank Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
              <TabsTrigger value="transfers">Fund Transfers</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Search transactions..." className="flex-1" />
                <Button variant="outline">Search</Button>
                <Button>Export</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell>{tx.reference}</TableCell>
                      <TableCell className="text-right">
                        {tx.debit > 0 ? `৳ ${tx.debit.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {tx.credit > 0 ? `৳ ${tx.credit.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">৳ {tx.balance.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === "Cleared" ? "default" : "secondary"}>{tx.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="reconciliation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Bank Account</Label>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dbbl">DBBL - ********1234</SelectItem>
                      <SelectItem value="hsbc">HSBC - ********5678</SelectItem>
                      <SelectItem value="brac">BRAC - ********9012</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Statement Date</Label>
                  <Input type="date" defaultValue="2023-10-31" />
                </div>
                <div className="space-y-2">
                  <Label>Statement Balance</Label>
                  <Input
                    type="number"
                    placeholder="Enter statement balance"
                    value={statementBalance}
                    onChange={(e) => setStatementBalance(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Unreconciled Transactions</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unreconciled.map((tx, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Checkbox
                            checked={selectedTransactions.includes(idx)}
                            onChange={(checked) => {
                              if (checked) {
                                setSelectedTransactions([...selectedTransactions, idx])
                              } else {
                                setSelectedTransactions(selectedTransactions.filter((i) => i !== idx))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell className="text-right">৳ {tx.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Statement Balance:</span>
                  <span className="font-semibold">৳ 1,330,000</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Outstanding Deposits:</span>
                  <span>৳ 0</span>
                </div>
                <div className="flex justify-between">
                  <span>- Outstanding Checks:</span>
                  <span>৳ 225,000</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Adjusted Balance:</span>
                  <span>৳ 1,105,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Book Balance:</span>
                  <span>৳ 1,105,000</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold text-green-600">
                  <span>Difference:</span>
                  <span>৳ 0</span>
                </div>
              </div>

              <Button className="w-full">Reconcile Now</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
