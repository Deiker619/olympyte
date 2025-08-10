import { useState, useEffect } from "react";
import { getCursos } from "@/services/Cursos/CursosServices";
import type{ CursoRequest } from "@/interfaces/Curso";

export const useInstructores = () => {
  const [instructores, setInstructores] = useState<CursoRequest[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data } = await getCursos();
        setInstructores(data.data);
      } catch (err) {
        setError("Error cargando cursos");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return { instructores, loading, error };
};
