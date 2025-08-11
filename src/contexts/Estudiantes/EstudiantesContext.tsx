import { createContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type {
  EstudianteDetalles,
  EstudianteHasCurso,
} from "@/interfaces/Estudiante";
import {
  getEstudiantes,
  getEstudiantesDetalles,
} from "@/services/Estudiantes/EstudiantesServices";

interface EstudiantesContextType {
  estudiantes: EstudianteHasCurso[];
  loading: boolean;
  error: string | null;
  addNewEstudiante: (estudiante: EstudianteHasCurso) => void;
  deleteEstudiante: (id: number) => void;
  getEstudiante: (id: string) => Promise<EstudianteDetalles | null>; // 👈 async
}

// eslint-disable-next-line react-refresh/only-export-components
export const EstudiantesContext = createContext<
  EstudiantesContextType | undefined
>(undefined);

export const EstudiantesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [estudiantes, setEstudiantes] = useLocalStorage<EstudianteHasCurso[]>(
    "estudiantes",
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (estudiantes.length === 0) {
      const fetch = async () => {
        setLoading(true);
        try {
          const { data } = await getEstudiantes();
          setEstudiantes("estudiantes", data.data);
        } catch (err) {
          setError("Error cargando géneros");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [estudiantes, setEstudiantes]);

  const addNewEstudiante = (estudiante: EstudianteHasCurso) => {
    setEstudiantes("estudiantes", (prevEstudiantes) => {
      const nextId = (prevEstudiantes.at(-1)?.id ?? 0) + 1;
      return [
        ...prevEstudiantes,
        {
          id: nextId,
          nombre: estudiante.nombre,
          apellido: "",
        } as EstudianteHasCurso,
      ];
    });
  };

  const deleteEstudiante = (id: number) => {
    setEstudiantes("estudiantes", (prevGeneros) =>
      prevGeneros.filter((g) => g.id !== id)
    );
  };
  
  const getEstudiante = async (id: string): Promise<EstudianteDetalles | null> => {
  try {
    const { data } = await getEstudiantesDetalles();
    const detalles: EstudianteDetalles[] = data.data ?? [];

    return detalles.find((detalle) => detalle.id === Number(id)) ?? null;
  } catch (err) {
    console.error("Error obteniendo detalles del estudiante:", err);
    return null;
  }
};


  return (
    <EstudiantesContext.Provider
      value={{
        estudiantes,
        loading,
        error,
        addNewEstudiante,
        deleteEstudiante,
        getEstudiante,
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};
