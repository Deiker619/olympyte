import { useEffect, useState } from "react";
import type { CursoDetalles } from "@/interfaces/Curso";
import { GetDetallesCurso } from "@/services/Cursos/CursosServices";

export function useCursoDetalles(id?: string) {
  const [detallesCurso, setDetallesCurso] = useState<CursoDetalles | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCursoDetalles = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const detalles = await GetDetallesCurso(id);
      setDetallesCurso(detalles.data);
    } catch (error) {
      console.error("Error cargando detalles curso:", error);
      setDetallesCurso(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursoDetalles();
  }, [id]);

  return { detallesCurso, loading, refetch: fetchCursoDetalles };
}
