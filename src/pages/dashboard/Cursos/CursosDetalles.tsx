import { Separator } from "@/components/ui/separator";
import { IconCashBanknote } from "@tabler/icons-react";

import { useParams, Navigate, useNavigate } from "react-router-dom";

import { RoosterDetalles } from "./components/Rooster";
import { useCursoDetalles } from "@/hooks/Cursos/rooster/useCursoDetalles";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const DetallesCursos = () => {
  const { id } = useParams<{ id: string }>();
  const { detallesCurso } = useCursoDetalles(id);
  const navigate = useNavigate();
  if (!id) return <Navigate to="/cursos" replace />;
  if (!detallesCurso) return <p>Cargando Curso...</p>;

  return (
    <div className="px-4 lg:px-6 space-y-8">
      <div className="w-full flex flex-col h-auto">
        <div className="flex w-60 mb-4 md:mb-0">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </Button>

        </div>
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm">
              {" "}
              <b>Género: </b> {detallesCurso.curso.genero.nombre}
            </p>{" "}
            <Separator orientation="vertical"> </Separator>
            <p className="text-sm">
              <b>Sede: </b>
              {detallesCurso.curso.sede.nombre}
            </p>
          </div>
          <p className="md:text-2xl text-sm">{detallesCurso.curso.nombre}</p>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm">
              {" "}
              <b>Costo normal: </b> {detallesCurso.curso.precio_normal}$
            </p>{" "}
            <Separator orientation="vertical"> </Separator>
            <p className="text-sm">
              <b>Costo apoyo: </b>
              {detallesCurso.curso.precio_apoyo}$
            </p>
          </div>
        </div>
      </div>

      <div className="grid  grid-cols-2 h-auto md:h-max-150  gap-4">
        <div className="border col-span-2 rounded-2xl flex flex-col bg-white shadow p-2">
          <div className="p-4 text-lg flex items-center gap-4">
            <IconCashBanknote />
            <p>Rooster</p>
          </div>
          <Separator />
          <RoosterDetalles rooster={detallesCurso.roster ?? []} />
        </div>
      </div>
    </div>
  );
};
