"use client"

import * as React from "react"
import {

  Home,
  LibraryBig,
  LocateIcon,

  Music,

  UserCheck,
  Users,
} from "lucide-react"


import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { rutas } from "@/routes/Rutas"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Olimpo",
      logo: Music,
      plan: "Venezuela",
    }
  ],
  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: Home,
    },
    {
      name: "Cursos",
      url: "#",
      icon: LibraryBig,
    },
    {
      name: "Géneros",
      url: "#",
      icon: Music,
    },
    {
      name: "Estudiantes",
      url: "#",
      icon: Users,
    },
    {
      name: "Instructores",
      url: "#",
      icon: UserCheck,
    },
    {
      name: "Sedes",
      url: "#",
      icon: LocateIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavProjects projects={data.projects} /> */}
        <div className="mt-4">
          <NavMain items={rutas} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
