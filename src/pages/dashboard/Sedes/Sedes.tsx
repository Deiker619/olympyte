import { AddSedes } from "./components/AddSedes";
import { TableSedes } from "./components/TableSedes";
import { IconPlus } from "@tabler/icons-react";
export const Sedes = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <AddSedes
        icon={<IconPlus />}
        triggerMessage="Agregar Nueva Sede"
        mode="create"
      ></AddSedes>
      <TableSedes />
    </div>
  );
};
