import { IconCirclePlusFilled } from "@tabler/icons-react";
import { AddEstudiante } from "./components/AddEstudiantes";
import { TableEstudiantes } from "./components/TableEstudiantes";

export const Estudiantes = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <AddEstudiante icon={<IconCirclePlusFilled />} mode="create" triggerMessage="Agregar nuevo Estudiante" />
      <TableEstudiantes />
    </div>
  );
};
