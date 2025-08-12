import { createContext, useEffect, useState } from "react";
import {
  createSede,
  getSedes,
  deleteSede,
} from "@/services/Sedes/SedesServices";
import type { Sede, SedeCreate } from "@/interfaces/Sede";
import { toast } from "sonner";

interface SedesContextType {
  sedes: Sede[];
  loading: boolean;
  error: string | null;
  addNewSede: (SedeCreate: SedeCreate) => void;
  sedeDelete: (id: number) => void;
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
        toast.success('Sede creada correctamente')
      } else {
        console.error("No se pudo crear la sede:", response);
        toast.error('No se pudo crear la sede')
      }
    } catch (error) {
      console.error("Error al crear sede:", error);
    }
  };

  const sedeDelete = async (id: number) => {
    try {
      const response = await deleteSede(id);
      console.log(response);
      if (response.status === 200 ||response.status === 204 ) {
        setSedes((prevSedes) => prevSedes.filter((s) => s.id !== id));
        toast.success('Sede eliminada correctamente')
      } else {
        console.error("No se pudo eliminar la sede:", response);
        toast.error('No se pudo eliminar la sede')
      }
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
    }
  };

  return (
    <SedesContext.Provider
      value={{ sedes, loading, error, addNewSede, sedeDelete }}
    >
      {children}
    </SedesContext.Provider>
  );
};
