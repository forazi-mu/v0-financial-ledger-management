"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Save, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface VoucherEntry {
  id: number
  account: string
  debit: number
  credit: number
}

interface Voucher {
  id: string
  voucherNo: string
  date: string
  type: string
  narration: string
  entries: VoucherEntry[]
  totalDebit: number
  totalCredit: number
  status: "Draft" | "Saved" | "Posted"
}

const ACCOUNT_HEADS = [
  "Purchase",
  "Sales",
  "Salary",
  "Rent",
  "Utilities",
  "Office Supplies",
  "Bank",
  "Cash",
  "Accounts Receivable",
  "Accounts Payable",
]

export function VoucherEntry() {
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: "1",
      voucherNo: "JV-2024-001",
      date: "2024-10-15",
      type: "Journal Voucher",
      narration: "Opening balance entry",
      entries: [
        { id: 1, account: "Bank", debit: 500000, credit: 0 },
        { id: 2, account: "Capital", debit: 0, credit: 500000 },
      ],
      totalDebit: 500000,
      totalCredit: 500000,
      status: "Posted",
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [viewingVoucher, setViewingVoucher] = useState<Voucher | null>(null)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [voucherType, setVoucherType] = useState("Journal Voucher")
  const [narration, setNarration] = useState("")
  const [entries, setEntries] = useState<VoucherEntry[]>([{ id: 1, account: "", debit: 0, credit: 0 }])

  const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0)
  const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0)
  const balance = totalDebit - totalCredit

  const addEntry = () => {
    setEntries([...entries, { id: Math.max(...entries.map((e) => e.id), 0) + 1, account: "", debit: 0, credit: 0 }])
  }

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id))
    }
  }

  const updateEntry = (id: number, field: string, value: any) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const saveVoucher = () => {
    if (!narration.trim()) {
      alert("Please enter narration")
      return
    }

    if (entries.some((e) => !e.account)) {
      alert("Please select account for all entries")
      return
    }

    if (Math.abs(balance) > 0.01) {
      alert("Voucher is not balanced. Debit and Credit must be equal.")
      return
    }

    const newVoucher: Voucher = {
      id: String(vouchers.length + 1),
      voucherNo: `JV-2024-${String(vouchers.length + 1).padStart(3, "0")}`,
      date,
      type: voucherType,
      narration,
      entries,
      totalDebit,
      totalCredit,
      status: "Saved",
    }

    setVouchers([...vouchers, newVoucher])
    resetForm()
    setIsCreating(false)
  }

  const resetForm = () => {
    setDate(new Date().toISOString().split("T")[0])
    setVoucherType("Journal Voucher")
    setNarration("")
    setEntries([{ id: 1, account: "", debit: 0, credit: 0 }])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Voucher Entry</h1>
        <Button className="bg-secondary hover:bg-secondary-light" onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Voucher
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Voucher</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Voucher Type</label>
                <Select value={voucherType} onValueChange={setVoucherType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Journal Voucher">Journal Voucher</SelectItem>
                    <SelectItem value="Payment Voucher">Payment Voucher</SelectItem>
                    <SelectItem value="Receipt Voucher">Receipt Voucher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Voucher No.</label>
                <Input value={`JV-2024-${String(vouchers.length + 1).padStart(3, "0")}`} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Narration</label>
              <Textarea
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                placeholder="Enter transaction description..."
                rows={3}
              />
            </div>

            <div>
              <h3 className="font-semibold text-text mb-4">Transaction Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-text">Account Head</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Debit Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Credit Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-border">
                        <td className="py-3 px-4">
                          <Select
                            value={entry.account}
                            onValueChange={(value) => updateEntry(entry.id, "account", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Account" />
                            </SelectTrigger>
                            <SelectContent>
                              {ACCOUNT_HEADS.map((head) => (
                                <SelectItem key={head} value={head}>
                                  {head}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={entry.debit || ""}
                            onChange={(e) => updateEntry(entry.id, "debit", Number.parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={entry.credit || ""}
                            onChange={(e) => updateEntry(entry.id, "credit", Number.parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-danger bg-transparent hover:bg-danger/10"
                            onClick={() => removeEntry(entry.id)}
                            disabled={entries.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button onClick={addEntry} variant="outline" className="mt-4 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Total Debit</label>
                <Input value={`৳ ${totalDebit.toLocaleString()}`} readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Total Credit</label>
                <Input value={`৳ ${totalCredit.toLocaleString()}`} readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Balance</label>
                <Input
                  value={`৳ ${balance.toLocaleString()}`}
                  readOnly
                  className={balance === 0 ? "bg-success/10" : "bg-danger/10"}
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button className="bg-success hover:bg-success-light" onClick={saveVoucher}>
                <Save className="w-4 h-4 mr-2" />
                Save Voucher
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Saved Vouchers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text">Voucher No.</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Narration</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher.id} className="border-b border-border hover:bg-surface-secondary">
                    <td className="py-3 px-4 font-medium text-accent">{voucher.voucherNo}</td>
                    <td className="py-3 px-4">{new Date(voucher.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{voucher.type}</td>
                    <td className="py-3 px-4 text-text-secondary">{voucher.narration}</td>
                    <td className="py-3 px-4 font-medium">৳ {voucher.totalDebit.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          voucher.status === "Posted" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}
                      >
                        {voucher.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setViewingVoucher(voucher)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Voucher Details - {viewingVoucher?.voucherNo}</DialogTitle>
                            </DialogHeader>
                            {viewingVoucher && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-text-secondary">Date</p>
                                    <p className="font-medium">{new Date(viewingVoucher.date).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-text-secondary">Type</p>
                                    <p className="font-medium">{viewingVoucher.type}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-text-secondary">Narration</p>
                                  <p className="font-medium">{viewingVoucher.narration}</p>
                                </div>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-border">
                                        <th className="text-left py-2 px-2">Account</th>
                                        <th className="text-right py-2 px-2">Debit</th>
                                        <th className="text-right py-2 px-2">Credit</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {viewingVoucher.entries.map((entry) => (
                                        <tr key={entry.id} className="border-b border-border">
                                          <td className="py-2 px-2">{entry.account}</td>
                                          <td className="text-right py-2 px-2">
                                            {entry.debit > 0 ? `৳ ${entry.debit.toLocaleString()}` : "-"}
                                          </td>
                                          <td className="text-right py-2 px-2">
                                            {entry.credit > 0 ? `৳ ${entry.credit.toLocaleString()}` : "-"}
                                          </td>
                                        </tr>
                                      ))}
                                      <tr className="border-t-2 border-border font-semibold">
                                        <td className="py-2 px-2">Total</td>
                                        <td className="text-right py-2 px-2">
                                          ৳ {viewingVoucher.totalDebit.toLocaleString()}
                                        </td>
                                        <td className="text-right py-2 px-2">
                                          ৳ {viewingVoucher.totalCredit.toLocaleString()}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
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
