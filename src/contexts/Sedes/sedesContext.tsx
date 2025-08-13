import { createContext, useEffect, useState } from "react";
import {
  createSede,
  getSedes,
  deleteSede,
  editSede,
  AsignEstudianteInSede,
} from "@/services/Sedes/SedesServices";
import type { Sede, SedeCreate } from "@/interfaces/Sede";
import { toast } from "sonner";
import type { estudianteAsignSede } from "@/interfaces/Estudiante";

interface SedesContextType {
  sedes: Sede[];
  loading: boolean;
  error: string | null;
  addNewSede: (SedeCreate: SedeCreate) => void;
  sedeDelete: (id: number) => void;
  updateSede: (id: number, sede: SedeCreate) => void;
  addEstudianteInSede: (data: estudianteAsignSede) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SedesContext = createContext<SedesContextType | undefined>(
  undefined
);

export const SedesProvider = ({ children }: { children: React.ReactNode }) => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sedes.length === 0) {
      const fetchSedes = async () => {
        setLoading(true);
        try {
          const { data } = await getSedes();
          setSedes(data.data);
        } catch (err) {
          setError("Error cargando géneros");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSedes();
    }
  }, [sedes, setSedes]);

  const addNewSede = async (sede: SedeCreate) => {
    try {
      const response = await createSede(sede);

      if (response.status === 201) {
        // Si la API devuelve la sede creada con ID
        const nuevaSede: Sede = response.data;
        setSedes((prevSedes) => [...prevSedes, nuevaSede]);
        toast.success("Sede creada correctamente");
      } else {
        console.error("No se pudo crear la sede:", response);
        toast.error("No se pudo crear la sede");
      }
    } catch (error) {
      console.error("Error al crear sede:", error);
    }
  };
  const addEstudianteInSede = async (data: estudianteAsignSede) => {
    try {
      const response = await AsignEstudianteInSede(data);

      if (response.status === 201) {
        toast.success("Estudiante agregado correctamente a la sede");
      } 

  
    } catch (error) {
      console.log(error)
      toast.error("No se pudo registrar en la sede el estudiante, verifique si ya esta inscrito en la sede");
      
    }
  };

  const updateSede = async (id: number, sede: SedeCreate) => {
    try {
      const response = await editSede(id, sede); // editSede sería tu función API (PUT/PATCH)

      if (response.status === 200) {
        const sedeActualizada: Sede = response.data;
        setSedes((prevSedes) =>
          prevSedes.map((s) =>
            s.id === sedeActualizada.id ? sedeActualizada : s
          )
        );
        toast.success("Sede actualizada correctamente");
      } else {
        console.error("No se pudo actualizar la sede:", response);
        toast.error("No se pudo actualizar la sede");
      }
    } catch (error) {
      console.error("Error al actualizar sede:", error);
      toast.error("Error al actualizar la sede");
    }
  };

  const sedeDelete = async (id: number) => {
    try {
      const response = await deleteSede(id);
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        setSedes((prevSedes) => prevSedes.filter((s) => s.id !== id));
        toast.success("Sede eliminada correctamente");
      } else {
        console.error("No se pudo eliminar la sede:", response);
        toast.error("No se pudo eliminar la sede");
      }
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
    }
  };

  return (
    <SedesContext.Provider
      value={{ sedes, loading, error, addNewSede, sedeDelete, updateSede, addEstudianteInSede }}
    >
      {children}
    </SedesContext.Provider>
  );
};
