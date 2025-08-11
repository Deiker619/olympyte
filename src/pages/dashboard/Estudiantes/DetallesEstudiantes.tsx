import { Separator } from "@/components/ui/separator";
import { IconCashBanknote } from "@tabler/icons-react";
import { TableDetallesPagos } from "./components/TableDetallesPagos";
import { useNavigate } from "react-router-dom";
import type { EstudianteDetalles } from "@/interfaces/Estudiante";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getEstudiantesDetalles } from "@/services/Estudiantes/EstudiantesServices";

export const DetallesEstudiantes = () => {
  const { id } = useParams<{ id: string }>();
  const [estudiante, setEstudiante] = useState<EstudianteDetalles | null>(null);
   const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchEstudiante = async () => {
      try {
        const response = await getEstudiantesDetalles();
        const posiblesDetalles = response.data;
        if (Array.isArray(posiblesDetalles)) {
          console.log('es array')
          const estudianteEncontrado = posiblesDetalles.find(
            (detalle) => detalle.id === +id
          );
          if(estudianteEncontrado){
            return setEstudiante(estudianteEncontrado ?? null);
          }
          navigate("/estudiantes", { replace: true });
        } else {
          if(posiblesDetalles.id == +id){
            setEstudiante(posiblesDetalles)
          }else{
           navigate("/estudiantes", { replace: true });

          }
         
        }
      } catch (error) {
        console.error("Error cargando detalles estudiante:", error);
        setEstudiante(null);
      }
    };

    fetchEstudiante();
  }, [id]);

  if (!id ) return <Navigate to="/estudiantes" replace />;
  if (!estudiante) return <p>Cargando estudiante...</p>;
  console.log(estudiante.pagos_recientes)

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="w-full flex flex-col bg-red-300 h-20">
        <div className="w-full h-full flex justify-center items-center">
          <p className="md:text-xl text-sm">
            {estudiante.nombre} {estudiante.apellido}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 h-auto md:h-100 border p-2 gap-4">
        <div className="border rounded-2xl flex flex-col p-2">
          <div className="p-4 text-lg flex items-center gap-4">
            <IconCashBanknote />
            <p>Pagos Recientes</p>
          </div>
          <Separator />
          <TableDetallesPagos pagos={estudiante.pagos_recientes ?? []} />
        </div>
        <div className="border rounded-2xl"></div>
        <div className="border rounded-2xl"></div>
      </div>
    </div>
  );
};
