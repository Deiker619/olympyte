import { AppSidebar } from "@/components/app-sidebar";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Ruta } from "@/interfaces/Ruta";
import { IconBooks, IconBuildings, IconDashboard, IconChalkboardTeacher, IconDirections, IconFriends, IconListDetails } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const rutas = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
    status: false
  },
  {
    title: "Catálogos",
    url: "/catalogos",
    icon: IconListDetails,
    status: false
  },
  {
    title: "Cursos",
    url: "/cursos",
    icon: IconBooks,
    status: false
  },
  {
    title: "Géneros",
    url: "/generos",
    icon: IconDirections,
    status: false
  },
  {
    title: "Estudiantes",
    url: "/estudiantes",
    icon: IconFriends,
    status: false
  },
  {
    title: "Instructores",
    url: "/instructores",
    icon: IconChalkboardTeacher,
    status: false
  },
  {
    title: "Sedes",
    url: "/sedes",
    icon: IconBuildings,
    status: false
  },
]
export const MainLayout = () => {
  const location = useLocation()
  useEffect(() => {

    setUseRutas((prevRutas) =>
      prevRutas.map((ruta) =>
      ({
        ...ruta,
        status: ruta.url === location.pathname
      })
      )
    )
  }, [location.pathname])
  const [useRuta, setUseRutas] = useState<Ruta[]>(rutas)
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" rutas={useRuta} />
      <SidebarInset >
        <SiteHeader rutas={useRuta} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
