"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InventoryItem {
  id: number
  sku: string
  name: string
  category: string
  quantity: number
  reorderLevel: number
  unitCost: number
  totalValue: number
  lastUpdated: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

interface StockMovement {
  id: number
  date: string
  itemId: number
  itemName: string
  type: "In" | "Out"
  quantity: number
  reference: string
  notes: string
}

export function InventoryManagement() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 1,
      sku: "SKU-001",
      name: "Raw Material A",
      category: "Raw Materials",
      quantity: 500,
      reorderLevel: 100,
      unitCost: 50,
      totalValue: 25000,
      lastUpdated: "2024-10-20",
      status: "In Stock",
    },
    {
      id: 2,
      sku: "SKU-002",
      name: "Raw Material B",
      category: "Raw Materials",
      quantity: 45,
      reorderLevel: 100,
      unitCost: 75,
      totalValue: 3375,
      lastUpdated: "2024-10-19",
      status: "Low Stock",
    },
    {
      id: 3,
      sku: "SKU-003",
      name: "Finished Product X",
      category: "Finished Goods",
      quantity: 0,
      reorderLevel: 50,
      unitCost: 200,
      totalValue: 0,
      lastUpdated: "2024-10-18",
      status: "Out of Stock",
    },
  ])

  const [movements, setMovements] = useState<StockMovement[]>([
    {
      id: 1,
      date: "2024-10-20",
      itemId: 1,
      itemName: "Raw Material A",
      type: "In",
      quantity: 200,
      reference: "PO-2024-001",
      notes: "Purchase order received",
    },
    {
      id: 2,
      date: "2024-10-19",
      itemId: 2,
      itemName: "Raw Material B",
      type: "Out",
      quantity: 50,
      reference: "MO-2024-005",
      notes: "Manufacturing order",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    sku: "",
    name: "",
    category: "Raw Materials",
    quantity: 0,
    reorderLevel: 0,
    unitCost: 0,
  })

  const [movementForm, setMovementForm] = useState({
    itemId: "",
    type: "In" as "In" | "Out",
    quantity: 0,
    reference: "",
    notes: "",
  })

  const [isMovementOpen, setIsMovementOpen] = useState(false)

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalInventoryValue = items.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = items.filter((item) => item.quantity <= item.reorderLevel).length
  const outOfStockItems = items.filter((item) => item.quantity === 0).length

  const handleAddClick = () => {
    setEditingId(null)
    setFormData({
      sku: "",
      name: "",
      category: "Raw Materials",
      quantity: 0,
      reorderLevel: 0,
      unitCost: 0,
    })
    setIsOpen(true)
  }

  const handleEditClick = (item: InventoryItem) => {
    setEditingId(item.id)
    setFormData(item)
    setIsOpen(true)
  }

  const handleSave = () => {
    if (!formData.sku || !formData.name || !formData.unitCost) {
      alert("Please fill in all required fields")
      return
    }

    const totalValue = (formData.quantity || 0) * (formData.unitCost || 0)
    const status: "In Stock" | "Low Stock" | "Out of Stock" =
      formData.quantity === 0 ? "Out of Stock" : formData.quantity! <= formData.reorderLevel! ? "Low Stock" : "In Stock"

    if (editingId) {
      setItems(
        items.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
                totalValue,
                status,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : item,
        ),
      )
    } else {
      const newItem: InventoryItem = {
        id: Math.max(...items.map((i) => i.id), 0) + 1,
        sku: formData.sku || "",
        name: formData.name || "",
        category: formData.category || "Raw Materials",
        quantity: formData.quantity || 0,
        reorderLevel: formData.reorderLevel || 0,
        unitCost: formData.unitCost || 0,
        totalValue,
        lastUpdated: new Date().toISOString().split("T")[0],
        status,
      }
      setItems([...items, newItem])
    }
    setIsOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const handleAddMovement = () => {
    if (!movementForm.itemId || movementForm.quantity <= 0) {
      alert("Please fill in all required fields")
      return
    }

    const item = items.find((i) => i.id === Number(movementForm.itemId))
    if (!item) return

    // Update inventory
    const newQuantity =
      movementForm.type === "In" ? item.quantity + movementForm.quantity : item.quantity - movementForm.quantity

    if (newQuantity < 0) {
      alert("Insufficient stock for this operation")
      return
    }

    setItems(
      items.map((i) =>
        i.id === Number(movementForm.itemId)
          ? {
              ...i,
              quantity: newQuantity,
              totalValue: newQuantity * i.unitCost,
              status: newQuantity === 0 ? "Out of Stock" : newQuantity <= i.reorderLevel ? "Low Stock" : "In Stock",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : i,
      ),
    )

    // Add movement record
    const newMovement: StockMovement = {
      id: Math.max(...movements.map((m) => m.id), 0) + 1,
      date: new Date().toISOString().split("T")[0],
      itemId: Number(movementForm.itemId),
      itemName: item.name,
      type: movementForm.type,
      quantity: movementForm.quantity,
      reference: movementForm.reference,
      notes: movementForm.notes,
    }
    setMovements([...movements, newMovement])

    setMovementForm({
      itemId: "",
      type: "In",
      quantity: 0,
      reference: "",
      notes: "",
    })
    setIsMovementOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary-light" onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Item" : "Add New Item"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku || ""}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="e.g., SKU-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                    <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                    <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity || ""}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderLevel">Reorder Level</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  value={formData.reorderLevel || ""}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitCost">Unit Cost *</Label>
                <Input
                  id="unitCost"
                  type="number"
                  value={formData.unitCost || ""}
                  onChange={(e) => setFormData({ ...formData, unitCost: Number(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-secondary hover:bg-secondary-light" onClick={handleSave}>
                {editingId ? "Update" : "Add"} Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Total Inventory Value</p>
            <p className="text-2xl font-bold text-primary mt-2">৳ {totalInventoryValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Low Stock Items</p>
            <p className="text-2xl font-bold text-warning mt-2">{lowStockItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Out of Stock</p>
            <p className="text-2xl font-bold text-danger mt-2">{outOfStockItems}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search by name or SKU..."
                  className="max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                    <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                    <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-text">SKU</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Item Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Unit Cost</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Total Value</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <tr key={item.id} className="border-b border-border hover:bg-surface-secondary">
                          <td className="py-3 px-4 font-mono text-accent">{item.sku}</td>
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">
                            {item.quantity}
                            {item.quantity <= item.reorderLevel && item.quantity > 0 && (
                              <AlertTriangle className="w-4 h-4 inline ml-2 text-warning" />
                            )}
                          </td>
                          <td className="py-3 px-4">৳ {item.unitCost.toLocaleString()}</td>
                          <td className="py-3 px-4 font-medium">৳ {item.totalValue.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.status === "In Stock"
                                  ? "bg-success/10 text-success"
                                  : item.status === "Low Stock"
                                    ? "bg-warning/10 text-warning"
                                    : "bg-danger/10 text-danger"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditClick(item)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-danger bg-transparent hover:bg-danger/10"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-text-secondary">
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isMovementOpen} onOpenChange={setIsMovementOpen}>
              <DialogTrigger asChild>
                <Button className="bg-secondary hover:bg-secondary-light">
                  <Plus className="w-4 h-4 mr-2" />
                  Record Movement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record Stock Movement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="item">Item *</Label>
                    <Select
                      value={movementForm.itemId}
                      onValueChange={(value) => setMovementForm({ ...movementForm, itemId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.name} ({item.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={movementForm.type}
                      onValueChange={(value) => setMovementForm({ ...movementForm, type: value as "In" | "Out" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In">Stock In</SelectItem>
                        <SelectItem value="Out">Stock Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={movementForm.quantity || ""}
                      onChange={(e) => setMovementForm({ ...movementForm, quantity: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference</Label>
                    <Input
                      id="reference"
                      value={movementForm.reference}
                      onChange={(e) => setMovementForm({ ...movementForm, reference: e.target.value })}
                      placeholder="e.g., PO-2024-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      value={movementForm.notes}
                      onChange={(e) => setMovementForm({ ...movementForm, notes: e.target.value })}
                      placeholder="Additional notes"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsMovementOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-secondary hover:bg-secondary-light" onClick={handleAddMovement}>
                      Record Movement
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stock Movement History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-text">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Item</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Reference</th>
                      <th className="text-left py-3 px-4 font-semibold text-text">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map((movement) => (
                      <tr key={movement.id} className="border-b border-border hover:bg-surface-secondary">
                        <td className="py-3 px-4">{new Date(movement.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 font-medium">{movement.itemName}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              movement.type === "In" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                            }`}
                          >
                            {movement.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">{movement.quantity}</td>
                        <td className="py-3 px-4 font-mono text-accent">{movement.reference}</td>
                        <td className="py-3 px-4 text-text-secondary">{movement.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
