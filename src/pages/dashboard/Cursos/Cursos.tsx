import { IconPlus } from "@tabler/icons-react";
import { CreateCurso } from "./components/CreateCurso";
import { TableCursos } from "./components/TableCursos";

export const Cursos = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div>
        <CreateCurso mode="create" triggerMessage="Crear Nuevo Curso" icon={<IconPlus></IconPlus>} />
      </div>
      <TableCursos></TableCursos>
    </div>
  );
};
