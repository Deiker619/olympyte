import { PageDescription } from "@/components/ui/page-description";
import { AddGeneros } from "./components/AddGeneros";
import { IconPlus } from "@tabler/icons-react";
import { CardGeneros } from "./components/CardGeneros";
import { useGeneros } from "@/hooks/Generos/useGeneros";
import { Input } from "@/components/ui/input";

export const Generos = () => {
  const { generos } = useGeneros();
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
        <div className=" col-span-3">
          <PageDescription
            title="Géneros Musicales"
            description="Gestiona todos los Géneros de la academia"
          />
        </div>

        <div className="col-span-1">
          <AddGeneros
            icon={<IconPlus />}
            mode="create"
            triggerMessage="Agregar Nuevo Género"
          />
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-5 grid-cols-2 place-items-center-center place-content-center">
        <div className="col-span-2">
          <Input
            placeholder="Buscar generos..."
   
          />
        </div>
        <div className="col-span-1 flex gap-3">
          
        </div>
      </div>
      <div className=""></div>
      {/* <TableGeneros></TableGeneros> */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <CardGeneros generos={generos}></CardGeneros>
      </div>
    </div>
  );
};
