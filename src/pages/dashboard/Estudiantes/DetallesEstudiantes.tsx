import { Separator } from "@/components/ui/separator";
import { IconCashBanknote } from "@tabler/icons-react";
import { TableDetallesPagos } from "./components/TableDetallesPagos";
import { useNavigate } from "react-router-dom";
import type {  CursoEstududianteDetalles, EstudianteDetalles, PagoReciente } from "@/interfaces/Estudiante";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  getEstudiante,
  getEstudiantesCursos,
  getEstudiantesPagos,
} from "@/services/Estudiantes/EstudiantesServices";
import { TableDetallesCursos } from "./components/TableDetallesCursos";
import { TableDetallesSedes } from "./components/TableDetallesSedes";

export const DetallesEstudiantes = () => {
  const { id } = useParams<{ id: string }>();
  const [estudiante, setEstudiante] = useState<EstudianteDetalles | null>(null);
  const [cursosEstudiante, setCursosEstudiante] = useState<CursoEstududianteDetalles[]>();
  const [pagosEstudiante, setPagosEstudiante] = useState<PagoReciente[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchEstudiante = async () => {
      try {
        const [resEstudiante, resCursos, resPagos] = await Promise.all([
          getEstudiante(id),
          getEstudiantesCursos(id),
          getEstudiantesPagos(id),
        ]);

        setEstudiante(resEstudiante.data);
        setCursosEstudiante(resCursos.data.data);
        setPagosEstudiante(resPagos.data);
      } catch (error) {
        console.error("Error cargando detalles estudiante:", error);
        setEstudiante(null);
      }
    };

    fetchEstudiante();
  }, [id, navigate]);

  if (!id) return <Navigate to="/estudiantes" replace />;
  if (!estudiante) return <p>Cargando estudiante...</p>;

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="w-full flex flex-col h-20">
        <div className="w-full h-full flex justify-center items-center">
          <p className="md:text-xl text-sm">
            {estudiante.nombre} {estudiante.apellido}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 h-auto md:h-150  gap-4">
        <div className="border rounded-2xl md:col-span-1 col-span-2 flex flex-col p-2">
          <div className="p-4 text-lg flex items-center gap-4">
            <IconCashBanknote />
            <p>Pagos Recientes</p>
          </div>
          <Separator />
          <TableDetallesPagos pagos={pagosEstudiante ?? []} />
        </div>

        <div className="border rounded-2xl md:col-span-1 col-span-2 flex flex-col p-2">
          <div className="p-4 text-lg flex items-center gap-4">
            <IconCashBanknote />
            <p>Cursos</p>
          </div>
          <Separator />
          <TableDetallesCursos cursos={cursosEstudiante ?? []} />
        </div>
        <div className="border col-span-2 rounded-2xl flex flex-col p-2">
          <div className="p-4 text-lg flex items-center gap-4">
            <IconCashBanknote />
            <p>Sedes</p>
          </div>
          <Separator />
          <TableDetallesSedes sedes={estudiante.sedes_inscritas} />
        </div>
      </div>
    </div>
  );
};
