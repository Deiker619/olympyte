import { AddGeneros } from "./components/AddGeneros";
import { TableGeneros } from "./components/TableGeneros";
import { IconPlus } from "@tabler/icons-react";
export const Generos = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="">
        <AddGeneros
          icon={<IconPlus />}
          mode="create"
          triggerMessage="Agregar Nuevo Género" />
      </div>
      <TableGeneros></TableGeneros>
    </div>
  );
};
