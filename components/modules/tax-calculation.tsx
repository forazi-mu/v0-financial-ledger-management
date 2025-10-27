"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TaxCalculation {
  id: string
  date: string
  type: "VAT" | "Income Tax" | "Corporate Tax"
  amount: number
  rate: number
  taxAmount: number
  totalAmount: number
}

export function TaxCalculation() {
  const [calculations, setCalculations] = useState<TaxCalculation[]>([
    {
      id: "1",
      date: "2024-10-15",
      type: "VAT",
      amount: 100000,
      rate: 15,
      taxAmount: 15000,
      totalAmount: 115000,
    },
    {
      id: "2",
      date: "2024-10-16",
      type: "Income Tax",
      amount: 500000,
      rate: 10,
      taxAmount: 50000,
      totalAmount: 550000,
    },
  ])

  // VAT Calculation State
  const [vatAmount, setVatAmount] = useState("")
  const [vatRate, setVatRate] = useState("15")
  const [transactionAmount, setTransactionAmount] = useState("")
  const [vatTotal, setVatTotal] = useState("")

  // Income Tax State
  const [taxableIncome, setTaxableIncome] = useState("")
  const [taxYear, setTaxYear] = useState("2024-2025")
  const [taxAmount, setTaxAmount] = useState("")
  const [taxSlab, setTaxSlab] = useState("")
  const [effectiveRate, setEffectiveRate] = useState("")

  // Corporate Tax State
  const [corporateIncome, setCorporateIncome] = useState("")
  const [corporateTax, setCorporateTax] = useState("")
  const [corporateRate, setCorporateRate] = useState("30")

  const calculateVAT = () => {
    const amount = Number.parseFloat(transactionAmount) || 0
    const rate = Number.parseFloat(vatRate) || 0

    if (amount <= 0) {
      alert("Please enter a valid amount")
      return
    }

    const vat = (amount * rate) / 100
    const total = amount + vat

    setVatAmount(vat.toFixed(2))
    setVatTotal(total.toFixed(2))

    // Add to history
    const newCalc: TaxCalculation = {
      id: String(calculations.length + 1),
      date: new Date().toISOString().split("T")[0],
      type: "VAT",
      amount,
      rate,
      taxAmount: vat,
      totalAmount: total,
    }
    setCalculations([...calculations, newCalc])
  }

  const calculateIncomeTax = () => {
    const income = Number.parseFloat(taxableIncome) || 0

    if (income <= 0) {
      alert("Please enter a valid income")
      return
    }

    let tax = 0
    let slab = ""
    let rate = 0

    // Bangladesh Income Tax Slabs (2024-2025)
    if (income <= 300000) {
      tax = 0
      slab = "No tax for income up to ৳3,00,000"
      rate = 0
    } else if (income <= 400000) {
      tax = (income - 300000) * 0.05
      slab = "5% on income between ৳3,00,000 - ৳4,00,000"
      rate = 5
    } else if (income <= 700000) {
      tax = 5000 + (income - 400000) * 0.1
      slab = "5% + 10% on income between ৳4,00,000 - ৳7,00,000"
      rate = 10
    } else if (income <= 1000000) {
      tax = 35000 + (income - 700000) * 0.15
      slab = "5% + 10% + 15% on income between ৳7,00,000 - ৳10,00,000"
      rate = 15
    } else {
      tax = 80000 + (income - 1000000) * 0.2
      slab = "5% + 10% + 15% + 20% on income above ৳10,00,000"
      rate = 20
    }

    const effectiveRate = ((tax / income) * 100).toFixed(2)

    setTaxAmount(tax.toFixed(2))
    setTaxSlab(slab)
    setEffectiveRate(effectiveRate)

    // Add to history
    const newCalc: TaxCalculation = {
      id: String(calculations.length + 1),
      date: new Date().toISOString().split("T")[0],
      type: "Income Tax",
      amount: income,
      rate,
      taxAmount: tax,
      totalAmount: income + tax,
    }
    setCalculations([...calculations, newCalc])
  }

  const calculateCorporateTax = () => {
    const income = Number.parseFloat(corporateIncome) || 0
    const rate = Number.parseFloat(corporateRate) || 30

    if (income <= 0) {
      alert("Please enter a valid income")
      return
    }

    const tax = (income * rate) / 100

    setCorporateTax(tax.toFixed(2))

    // Add to history
    const newCalc: TaxCalculation = {
      id: String(calculations.length + 1),
      date: new Date().toISOString().split("T")[0],
      type: "Corporate Tax",
      amount: income,
      rate,
      taxAmount: tax,
      totalAmount: income + tax,
    }
    setCalculations([...calculations, newCalc])
  }

  const deleteCalculation = (id: string) => {
    setCalculations(calculations.filter((c) => c.id !== id))
  }

  const totalVAT = calculations.filter((c) => c.type === "VAT").reduce((sum, c) => sum + c.taxAmount, 0)
  const totalIncomeTax = calculations.filter((c) => c.type === "Income Tax").reduce((sum, c) => sum + c.taxAmount, 0)
  const totalCorporateTax = calculations
    .filter((c) => c.type === "Corporate Tax")
    .reduce((sum, c) => sum + c.taxAmount, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">VAT & Tax Calculation Engine</h1>

      <Tabs defaultValue="vat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vat">VAT Calculator</TabsTrigger>
          <TabsTrigger value="income">Income Tax</TabsTrigger>
          <TabsTrigger value="corporate">Corporate Tax</TabsTrigger>
        </TabsList>

        <TabsContent value="vat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>VAT Calculation (Bangladesh NBR)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Transaction Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">VAT Rate (%)</label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">Standard Rate (15%)</SelectItem>
                      <SelectItem value="10">Reduced Rate (10%)</SelectItem>
                      <SelectItem value="5">Special Rate (5%)</SelectItem>
                      <SelectItem value="0">Exempt (0%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">VAT Amount</label>
                  <Input value={vatAmount ? `৳ ${Number.parseFloat(vatAmount).toLocaleString()}` : ""} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Total Amount (Incl. VAT)</label>
                  <Input value={vatTotal ? `৳ ${Number.parseFloat(vatTotal).toLocaleString()}` : ""} readOnly />
                </div>
                <Button onClick={calculateVAT} className="w-full bg-secondary hover:bg-secondary-light">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate VAT
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VAT Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Total VAT Collected</p>
                  <p className="text-2xl font-bold text-secondary">৳ {totalVAT.toLocaleString()}</p>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Total Transactions</p>
                  <p className="text-2xl font-bold text-accent">
                    {calculations.filter((c) => c.type === "VAT").length}
                  </p>
                </div>
                <div className="bg-success/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Average VAT Rate</p>
                  <p className="text-2xl font-bold text-success">
                    {calculations.filter((c) => c.type === "VAT").length > 0
                      ? (
                          calculations.filter((c) => c.type === "VAT").reduce((sum, c) => sum + c.rate, 0) /
                          calculations.filter((c) => c.type === "VAT").length
                        ).toFixed(1)
                      : "0"}
                    %
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Tax Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Taxable Income</label>
                  <Input
                    type="number"
                    placeholder="Enter taxable income"
                    value={taxableIncome}
                    onChange={(e) => setTaxableIncome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Tax Year</label>
                  <Select value={taxYear} onValueChange={setTaxYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Tax Amount</label>
                  <Input value={taxAmount ? `৳ ${Number.parseFloat(taxAmount).toLocaleString()}` : ""} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Effective Tax Rate</label>
                  <Input value={effectiveRate ? `${effectiveRate}%` : ""} readOnly />
                </div>
                <Button onClick={calculateIncomeTax} className="w-full bg-secondary hover:bg-secondary-light">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Slab Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-info/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-text">{taxSlab}</p>
                </div>
                <div className="bg-success/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Total Income Tax Collected</p>
                  <p className="text-2xl font-bold text-success">৳ {totalIncomeTax.toLocaleString()}</p>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Total Calculations</p>
                  <p className="text-2xl font-bold text-accent">
                    {calculations.filter((c) => c.type === "Income Tax").length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="corporate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Tax Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Corporate Income</label>
                  <Input
                    type="number"
                    placeholder="Enter corporate income"
                    value={corporateIncome}
                    onChange={(e) => setCorporateIncome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Tax Rate (%)</label>
                  <Select value={corporateRate} onValueChange={setCorporateRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">Standard Rate (30%)</SelectItem>
                      <SelectItem value="25">Reduced Rate (25%)</SelectItem>
                      <SelectItem value="20">Special Rate (20%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Corporate Tax Amount</label>
                  <Input value={corporateTax ? `৳ ${Number.parseFloat(corporateTax).toLocaleString()}` : ""} readOnly />
                </div>
                <Button onClick={calculateCorporateTax} className="w-full bg-secondary hover:bg-secondary-light">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Corporate Tax Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Total Corporate Tax</p>
                  <p className="text-2xl font-bold text-secondary">৳ {totalCorporateTax.toLocaleString()}</p>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Total Calculations</p>
                  <p className="text-2xl font-bold text-accent">
                    {calculations.filter((c) => c.type === "Corporate Tax").length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Calculation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Tax Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {calculations.map((calc) => (
                  <tr key={calc.id} className="border-b border-border hover:bg-surface-secondary">
                    <td className="py-3 px-4">{new Date(calc.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-medium">
                        {calc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">৳ {calc.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">{calc.rate}%</td>
                    <td className="py-3 px-4 font-medium">৳ {calc.taxAmount.toLocaleString()}</td>
                    <td className="py-3 px-4">৳ {calc.totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-danger bg-transparent hover:bg-danger/10"
                        onClick={() => deleteCalculation(calc.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
