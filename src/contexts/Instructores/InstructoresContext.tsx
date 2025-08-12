import { createContext, useEffect, useState } from "react";
import type { Instructor, IntructorCreate } from "@/interfaces/Intructor";
import { getInstructores, createInstructor, deleteInstructor } from "@/services/Instructores/InstructoresServices";
import { toast } from "sonner";

interface InstructoresContextType {
  instructores: Instructor[];
  loading: boolean;
  error: string | null;
  intructorCreate: (instructor: IntructorCreate)=>void,
  instructorDelete: (id:number|string)=> void
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
          toast.success('Instructor creado correctamente')
        }
        // Aquí puedes agregar más lógica, p.ej. actualizar estado o mostrar mensaje
      } catch (error) {
        console.error("Error creando estudiante:", error);
      }
    };
  const instructorDelete = async (id: number|string) => {
      try {
        const response = await deleteInstructor(id);
        if (response.status == 204 || response.status == 200) {
          console.log("Instructor creado:", response);
          setInstructores((prevInstructores) =>
          prevInstructores.filter((e) => e.id !== id))
          toast.success('Instructor eliminado correctamente')
        
         
        }
        // Aquí puedes agregar más lógica, p.ej. actualizar estado o mostrar mensaje
      } catch (error) {
        console.error("Error creando estudiante:", error);
         toast.error('No se pudo eliminar el Instrucutor')
      }
    };


  return (
    <InstructoresContext.Provider
      value={{
        instructores,
        loading,
        error,
        intructorCreate,
        instructorDelete
      }}
    >
      {children}
    </InstructoresContext.Provider>
  );
};
