import { Button } from "@/components/ui/button";
import { AddSedes } from "./components/AddSedes";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { PageDescription } from "@/components/ui/page-description";
import { CardSedes } from "./components/CardSedes";
import { useSedes } from "@/hooks/Sedes/useSedes";
import { useFilters } from "@/hooks/useFilter";
export const Sedes = () => {
  const { sedes } = useSedes();
  const { filteredData, search, setSearch } = useFilters(sedes);
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
        <div className=" col-span-3">
          <PageDescription
            title="Sedes"
            description="Gestiona todas las Sedes de la academia"
          />
        </div>

        <div className="col-span-1">
          <AddSedes
            icon={<IconPlus />}
            triggerMessage="Agregar Nueva Sede"
            mode="create"
          ></AddSedes>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-5 md:grid-cols-2 place-items-center-center md:place-content-center">
        <div className="col-span-2">
          <Input
            placeholder="Buscar sedes..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
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

      <div className="grid lg:grid-cols-2 gap-3 grid-cols-1">
        <CardSedes sedes={filteredData} />
      </div>
    </div>
  );
};
