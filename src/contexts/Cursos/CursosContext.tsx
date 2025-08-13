import { createContext, useEffect, useState } from "react";
import type { Curso, CursoCreate, RoosterCreate } from "@/interfaces/Curso";
import {
  AddEstudianteCurso,
  createCurso,
  deleteCurso,
  DeleteInstructorCurso,
  getCursos,
  UpdateCurso,
} from "@/services/Cursos/CursosServices";
import { toast } from "sonner";
import { AddInstructorCurso } from "@/services/Cursos/CursosServices";
import { useEstudiantes } from "@/hooks/Estudiantes/Estudiantes";

interface CursosContextType {
  cursos: Curso[];
  loading: boolean;
  error: string | null;
  cursoCreate: (curso: CursoCreate) => void;
  cursoDelete: (id: number) => void;
  addInstructorCurso: (id: number, instructorID: number) => void;
  deleteIntructorCurso: (id: number, instructorID: number) => void;
  cursoUpdate: (id: number, curso: CursoCreate) =>void;
  addEstudianteCurso: (data:RoosterCreate) =>void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CursosContext = createContext<CursosContextType | undefined>(
  undefined
);

export const CursosProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchEstudiante } = useEstudiantes()

  useEffect(() => {
    if (cursos.length === 0) {
      fetch();
    }
  }, [cursos, setCursos]);

  const cursoCreate = async (curso: CursoCreate) => {
    try {
      const response = await createCurso(curso);
      if (response.status == 201) {
        console.log(response.data);
        fetch();
        toast.success("Curso creado correctamente");
      }
    } catch (error) {
      console.error("Error creando Curso:", error);
    }
  };
  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await getCursos();
      setCursos(data.data);
    } catch (err) {
      setError("Error cargando Cursos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cursoDelete = async (id: number) => {
    try {
      const response = await deleteCurso(id); 
      if (response.status === 204 || response.status === 200) {
        setCursos((prevCursos) => prevCursos.filter((e) => e.id !== id));
        fetchEstudiante();
        toast.success("Curso eliminado correctamente");
      } else {
        console.error("No se pudo eliminar el curso:", response);
        toast.error("No se pudo eliminar el curso");
      }
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      toast.error("Error al eliminar el curso");
    }
  };
  const cursoUpdate = async (id: number, curso: CursoCreate) => {
    try {
      const response = await UpdateCurso(id, curso);
      if (response.status === 200) {
        console.log(response.data);
        fetch();
        toast.success("Curso actualizado correctamente");
      }
    } catch (error) {
      console.error("Error actualizando Curso:", error);
      toast.error("Error al actualizar el curso");
    }
  };

  const addInstructorCurso = async (id: number, instructorID: number) => {
    try {
      const response = await AddInstructorCurso(id, instructorID); 
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        fetch();
        toast.success("Instructor agregado correctamente al curso");
      }
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
    }
  };

  const addEstudianteCurso = async (data: RoosterCreate) => {
    try {
      const response = await AddEstudianteCurso(data); 
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        fetchEstudiante()
        toast.success("Estudiante agregado correctamente al curso");
      }
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
      toast.error("No se pudo asignar el estudiante al curso");
    }
  };

  const deleteIntructorCurso = async (id: number, instructorID: number) => {
    try {
      const response = await DeleteInstructorCurso(id, instructorID);
      if (response.status == 204 || response.status == 200) {
        fetch();
        
        toast.success("Instructor eliminado correctamente al curso");
      }
    } catch (error) {
      console.error("Error al eliminar el instructor:", error);
      toast.error("Error al eliminar el instructor");
    }
  };

  return (
    <CursosContext.Provider
      value={{
        addInstructorCurso,
        cursos,
        loading,
        cursoCreate,
        error,
        cursoDelete,
        deleteIntructorCurso,
        cursoUpdate,
        addEstudianteCurso
      }}
    >
      {children}
    </CursosContext.Provider>
  );
};

