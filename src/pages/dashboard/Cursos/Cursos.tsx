import { IconPlus } from "@tabler/icons-react";
import { CreateCurso } from "./components/CreateCurso";
import { CardCurso } from "./components/CardCurso";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCursos } from "@/hooks/Cursos/useCursos";
import { PageDescription } from "@/components/ui/page-description";
import { useFilters } from "@/hooks/useFilter";

export const Cursos = () => {
  const { cursos } = useCursos();
  const { filteredData, search, setSearch} = useFilters(cursos);
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
        <div className=" col-span-3">
          <PageDescription
            title="Cursos"
            description="Gestiona todos los cursos de la academia"
          />
        </div>

        <div className="col-span-1">
          <CreateCurso
            mode="create"
            triggerMessage="Crear Nuevo Curso"
            icon={<IconPlus></IconPlus>}
          />
        </div>
      </div>
      <div className="grid gap-3 grid-cols-5 place-items-center-center place-content-center">
        <div className="col-span-2">
          <Input
            placeholder="Buscar cursos..."
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

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <CardCurso cursos={filteredData}></CardCurso>
      </div>
    </div>
  );
};
