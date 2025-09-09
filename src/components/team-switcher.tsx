"use client"

import * as React from "react"

import {
  DropdownMenu,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent gap-3 mt-4 hover:bg-sidebar data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-primary text-black flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                <span className="truncate text-[20px] font-bold text-white">{activeTeam.name}</span>
                <span className="truncate text-md text-gray-500">{activeTeam.plan}</span>
              </div>
              
            </SidebarMenuButton>
          </DropdownMenuTrigger>
      
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
