import { createContext, useEffect, useState } from "react";
import type {
  EstudianteDetalles,
  EstudianteHasCurso,
} from "@/interfaces/Estudiante";
import {
  createEstudiante,
  deleteEstudiantes,
  editEstudiante,
  getEstudiantes,
  getEstudiantesCursos,
} from "@/services/Estudiantes/EstudiantesServices";
import { toast } from "sonner";

interface EstudiantesContextType {
  estudiantes: EstudianteHasCurso[];
  loading: boolean;
  error: string | null;
  estudianteDelete: (id: number) => void;
  getEstudiante: (id: string) => Promise<EstudianteDetalles | null>; // 👈 async
  estudianteCreate: (estudiante: EstudianteHasCurso) => void;
  updateEstudiante: (id: number, estudiante: EstudianteHasCurso)=> void;
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
  const [estudiantes, setEstudiantes] = useState<EstudianteHasCurso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (estudiantes.length === 0) {
      const fetch = async () => {
        setLoading(true);
        try {
          const { data } = await getEstudiantes();
          setEstudiantes(data.data);
        } catch (err) {
          setError("Error cargando Estudiantes");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [estudiantes, setEstudiantes]);

  const estudianteDelete = async (id: number) => {
    try {
      const response = await deleteEstudiantes (id); // función que hace la llamada API para eliminar
      if (response.status === 204 || response.status === 200 ) {
        setEstudiantes((prevEstudiantes) =>
          prevEstudiantes.filter((e) => e.id !== id)
        );
      } else {
        console.error("No se pudo eliminar el estudiante:", response);
      }
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
    }
  };

  const getEstudiante = async (
    id: string
  ): Promise<EstudianteDetalles | null> => {
    try {
      const { data } = await getEstudiantesCursos(id);
      const detalles: EstudianteDetalles[] = data.data ?? [];
      return detalles.find((detalle) => detalle.id === Number(id)) ?? null;
    } catch (err) {
      console.error("Error obteniendo detalles del estudiante:", err);
      return null;
    }
  };

  const estudianteCreate = async (estudiante: EstudianteHasCurso) => {
    try {
      const response = await createEstudiante(estudiante);
      if (response.status == 201) {
        console.log("Estudiante creado:", response);
        setEstudiantes((prevEstudiantes) => [
          ...prevEstudiantes,
          response.data,
        ]);
        toast.success('Estudiante registrado correctamente')
      }
    } catch (error) {
      console.error("Error creando estudiante:", error);
      toast.success('Error al crear estudiante')
    }
  };
  const updateEstudiante = async (id: number, estudiante: EstudianteHasCurso) => {
  try {
    const response = await editEstudiante(id, estudiante); // aquí usarías PATCH o PUT según tu API

    if (response.status === 200) {
      console.log("Estudiante actualizado:", response);

      // Actualizar el estado local
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.map((e) =>
          e.id === id ? response.data : e
        )
      );

      toast.success("Estudiante actualizado correctamente");
    } else {
      console.error("No se pudo actualizar el estudiante:", response);
      toast.error("No se pudo actualizar el estudiante");
    }
  } catch (error) {
    console.error("Error actualizando estudiante:", error);
    toast.error("Error al actualizar estudiante");
  }
};


  return (
    <EstudiantesContext.Provider
      value={{
        estudiantes,
        loading,
        error,
        estudianteDelete,
        getEstudiante,
        estudianteCreate,
        updateEstudiante
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};
