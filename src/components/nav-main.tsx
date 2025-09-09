import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"


export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}

          >

            <SidebarMenuItem>

              <NavLink to={item.url} >
                {({ isActive }) => (
                  <SidebarMenuButton asChild
                    className={` active:bg-[#26262ec8] hover:transition-colors hover:duration-300 ease-in-out py-6 px-5 text-md border-r-primary flex gap-3 items-center
                         ${isActive ? "bg-primary/40 text-white hover:bg-primary/40 border-r-3 border-r-primary" : "text-[#fafafacc] hover:bg-[#26262ec8]"}`}>
                    <div className="flex gap-3 items-center">
                      {item.icon && (
                        <item.icon
                          style={{ width: "18px", height: "18px" }}
                          className={isActive ? "text-primary" : "group-hover/menu-item:text-primary"}
                        />
                      )}
                      <span className={isActive ? "text-primary font-semibold" : "text-white"}>
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                )}
              </NavLink>




            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
