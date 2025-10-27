"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border bg-card h-16 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Financial Ledger Management</h2>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              <span className="text-xs text-text-secondary">{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <span className="text-xs">Role: {user?.role}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
