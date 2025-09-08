import { PageDescription } from "@/components/ui/page-description";
import { AddInstructor } from "./components/AddInstructor";
import { TableInstructores } from "./components/TableInstructores";

import { IconPlus } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardInstructores } from "./components/CardInstructores";
export const Instructores = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
        <div className=" col-span-3">
          <PageDescription
            title="Instructores"
            description="Gestiona todos los instructores de la academia"
          />
        </div>

        <div className="col-span-1">
          <AddInstructor
        icon={<IconPlus />}
        triggerMessage="Registrar Nuevo Instructor"
        mode="create"
      />
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-5 md:grid-cols-2 place-items-center-center md:place-content-center">
        <div className="col-span-2">
          <Input placeholder="Buscar instructores..." />
        </div>
        <div className="col-span-1 flex gap-3">
          <Button
            type="button"
            className="hover:bg-primary active:bg-primary transition-colors ease-in-out duration-200"
            variant={"outline"}
          >
            Filtrar por Género{" "}
          </Button>
          <Button
            className="hover:bg-primary transition-colors ease-in-out duration-200"
            variant={"outline"}
          >
            Filtrar por Sede
          </Button>
        </div>
      </div>
      
      <div className="">
        <TableInstructores />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <CardInstructores/>
      </div>
    </div>
  );
};
