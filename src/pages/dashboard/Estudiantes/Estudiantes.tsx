import { IconCirclePlusFilled } from "@tabler/icons-react";
import { AddEstudiante } from "./components/AddEstudiantes";
import { Input } from "@/components/ui/input";
import { PageDescription } from "@/components/ui/page-description";
import { Button } from "@/components/ui/button";
import { CardEstudiantes } from "./components/CardEstudiantes";
import { useEstudiantes } from "@/hooks/Estudiantes/Estudiantes";
import { useFilters } from "@/hooks/useFilter";

export const Estudiantes = () => {
  const { estudiantes } = useEstudiantes();
  const { filteredData, search, setSearch } = useFilters(estudiantes);
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
        <div className=" col-span-3">
          <PageDescription
            title="Estudiantes"
            description="Gestiona todos los estudiantes de la academia"
          />
        </div>

        <div className="col-span-1">
          <AddEstudiante
            icon={<IconCirclePlusFilled />}
            mode="create"
            triggerMessage="Agregar nuevo Estudiante"
          />
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-5 md:grid-cols-2 place-items-center-center md:place-content-center">
        <div className="col-span-2">
          <Input
            placeholder="Buscar estudiantes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

      <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 col-span-1">
        <CardEstudiantes estudiantes={filteredData}></CardEstudiantes>
      </div>
    </div>
  );
};
