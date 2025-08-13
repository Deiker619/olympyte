import { createContext, useEffect, useState } from "react";
import type { Instructor, IntructorCreate } from "@/interfaces/Intructor";
import {
  getInstructores,
  createInstructor,
  deleteInstructor,
  editInstructor,
} from "@/services/Instructores/InstructoresServices";
import { toast } from "sonner";

interface InstructoresContextType {
  instructores: Instructor[];
  loading: boolean;
  error: string | null;
  intructorCreate: (instructor: IntructorCreate) => void;
  instructorDelete: (id: number | string) => void;
  updateInstructor: (id: number, Intructor: IntructorCreate) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const InstructoresContext = createContext<
  InstructoresContextType | undefined
>(undefined);

export const InstructoresProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (instructores.length === 0) {
      const fetch = async () => {
        setLoading(true);
        try {
          const { data } = await getInstructores();
          setInstructores(data.data);
        } catch (err) {
          setError("Error cargando instructores");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [instructores, setInstructores]);

  const intructorCreate = async (instructor: IntructorCreate) => {
    try {
      const response = await createInstructor(instructor);
      if (response.status == 201) {
        console.log("Instructor creado:", response);
        setInstructores((prevInstructores) => [
          ...prevInstructores,
          response.data,
        ]);
        toast.success("Instructor creado correctamente");
      }
    } catch (error) {
      console.error("Error creando estudiante:", error);
    }
  };

  const updateInstructor = async (id: number, instructor: IntructorCreate) => {
    try {
      const response = await editInstructor(id, instructor);

      if (response.status === 200) {
        console.log("Instructor actualizado:", response);

        setInstructores((prevInstructores) =>
          prevInstructores.map((inst) =>
            inst.id === id ? response.data : inst
          )
        );

        toast.success("Instructor actualizado correctamente");
      } else {
        toast.error("No se pudo actualizar el instructor");
      }
    } catch (error) {
      console.error("Error actualizando instructor:", error);
      toast.error("Error al actualizar el instructor");
    }
  };

  const instructorDelete = async (id: number | string) => {
    try {
      const response = await deleteInstructor(id);
      if (response.status == 204 || response.status == 200) {
        console.log("Instructor creado:", response);
        setInstructores((prevInstructores) =>
          prevInstructores.filter((e) => e.id !== id)
        );
        toast.success("Instructor eliminado correctamente");
      }
    } catch (error) {
      console.error("Error creando estudiante:", error);
      toast.error("No se pudo eliminar el Instrucutor");
    }
  };

  return (
    <InstructoresContext.Provider
      value={{
        instructores,
        loading,
        error,
        intructorCreate,
        instructorDelete,
        updateInstructor
      }}
    >
      {children}
    </InstructoresContext.Provider>
  );
};
