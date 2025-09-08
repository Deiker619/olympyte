import { IconPlus } from "@tabler/icons-react";
import { CreateCurso } from "./components/CreateCurso";
import { CardCurso } from "./components/CardCurso";

export const Cursos = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid grid-cols-4">
        <div className="space-y-2 col-span-3">
          <p className="md:text-4xl font-bold">Cursos</p>
          <p className="text-md text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="col-span-1">
          <CreateCurso mode="create" triggerMessage="Crear Nuevo Curso" icon={<IconPlus></IconPlus>} />
        </div>

      </div>

      <div className="grid grid-cols-3 gap-3">
        <CardCurso></CardCurso>
      </div>
    </div>
  );
};
