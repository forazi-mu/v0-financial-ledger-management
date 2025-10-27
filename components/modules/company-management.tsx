"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Company {
  id: number
  name: string
  type: string
  nature: string
  reg: string
  taxId: string
  address: string
  city: string
  status: "Active" | "Inactive"
}

export function CompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "ABC Manufacturing Ltd.",
      type: "Limited Company",
      nature: "Manufacturer",
      reg: "C-123456",
      taxId: "TAX-001",
      address: "123 Industrial Area",
      city: "Dhaka",
      status: "Active",
    },
    {
      id: 2,
      name: "XYZ Traders",
      type: "Partnership",
      nature: "Import & Wholesale",
      reg: "P-789012",
      taxId: "TAX-002",
      address: "456 Trade Center",
      city: "Chittagong",
      status: "Active",
    },
    {
      id: 3,
      name: "Best Electronics",
      type: "Sole Proprietorship",
      nature: "Retail",
      reg: "S-345678",
      taxId: "TAX-003",
      address: "789 Market Street",
      city: "Sylhet",
      status: "Inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Company>>({
    name: "",
    type: "Limited Company",
    nature: "",
    reg: "",
    taxId: "",
    address: "",
    city: "",
    status: "Active",
  })

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.reg.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddClick = () => {
    setEditingId(null)
    setFormData({
      name: "",
      type: "Limited Company",
      nature: "",
      reg: "",
      taxId: "",
      address: "",
      city: "",
      status: "Active",
    })
    setIsOpen(true)
  }

  const handleEditClick = (company: Company) => {
    setEditingId(company.id)
    setFormData(company)
    setIsOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.reg) {
      alert("Please fill in all required fields")
      return
    }

    if (editingId) {
      setCompanies(companies.map((c) => (c.id === editingId ? { ...c, ...formData } : c)))
    } else {
      const newCompany: Company = {
        id: Math.max(...companies.map((c) => c.id), 0) + 1,
        name: formData.name || "",
        type: formData.type || "Limited Company",
        nature: formData.nature || "",
        reg: formData.reg || "",
        taxId: formData.taxId || "",
        address: formData.address || "",
        city: formData.city || "",
        status: formData.status as "Active" | "Inactive",
      }
      setCompanies([...companies, newCompany])
    }
    setIsOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter((c) => c.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Company Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary-light" onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Company" : "Add New Company"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Entity Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Limited Company">Limited Company</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="NGO">NGO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nature">Nature of Business</Label>
                <Input
                  id="nature"
                  value={formData.nature || ""}
                  onChange={(e) => setFormData({ ...formData, nature: e.target.value })}
                  placeholder="e.g., Manufacturing, Retail"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg">Registration Number *</Label>
                <Input
                  id="reg"
                  value={formData.reg || ""}
                  onChange={(e) => setFormData({ ...formData, reg: e.target.value })}
                  placeholder="e.g., C-123456"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={formData.taxId || ""}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  placeholder="e.g., TAX-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Inactive" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-secondary hover:bg-secondary-light" onClick={handleSave}>
                {editingId ? "Update" : "Add"} Company
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by company name or registration..."
              className="max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text">Company Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Entity Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Nature</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Registration</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Tax ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-border hover:bg-surface-secondary">
                      <td className="py-3 px-4 font-medium">{company.name}</td>
                      <td className="py-3 px-4">{company.type}</td>
                      <td className="py-3 px-4">{company.nature}</td>
                      <td className="py-3 px-4 font-mono text-accent">{company.reg}</td>
                      <td className="py-3 px-4 font-mono">{company.taxId}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            company.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          }`}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditClick(company)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-danger bg-transparent hover:bg-danger/10"
                            onClick={() => handleDelete(company.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-text-secondary">
                      No companies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
