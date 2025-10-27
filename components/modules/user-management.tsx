"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const users = [
  { name: "Admin User", role: "System Administrator", initials: "AU" },
  { name: "Accountant", role: "Finance Department", initials: "AC" },
  { name: "Sales Manager", role: "Sales Department", initials: "SM" },
]

const permissions = [
  { id: "dashboard", label: "Dashboard", checked: true },
  { id: "vouchers", label: "Voucher Entry", checked: true },
  { id: "purchase", label: "Purchase Voucher", checked: true },
  { id: "sales", label: "Sales Voucher", checked: true },
  { id: "inventory", label: "Inventory", checked: false },
  { id: "financial", label: "Financial Statements", checked: false },
  { id: "reports", label: "Reports", checked: false },
  { id: "settings", label: "System Settings", checked: false },
]

export function UserManagement() {
  const [selectedRole, setSelectedRole] = useState("admin")
  const [userPermissions, setUserPermissions] = useState(permissions)

  const togglePermission = (id: string) => {
    setUserPermissions(userPermissions.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Search users..." className="flex-1" />
                <Button variant="outline">Search</Button>
              </div>

              <div className="space-y-3">
                {users.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>User Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">System Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="sales">Sales User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Module Permissions</h4>
                {userPermissions.map((perm) => (
                  <div key={perm.id} className="flex items-center gap-2">
                    <Checkbox checked={perm.checked} onCheckedChange={() => togglePermission(perm.id)} />
                    <Label className="cursor-pointer">{perm.label}</Label>
                  </div>
                ))}
              </div>

              <Button className="w-full">Save Permissions</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
