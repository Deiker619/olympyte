
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { Ruta } from "@/interfaces/Ruta";
export function SiteHeader( {rutas} :{rutas: Ruta[]}) {

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 bg-black rounded-t-2xl  text-white border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium capitalize">
          {rutas.find(ruta => ruta.status === true)?.title} 
        </h1>
        <div className="ml-auto flex items-center gap-2">
          
        </div>
      </div>
    </header>
  )
}
