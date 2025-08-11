import { createContext, useEffect, useState } from "react";
import { getSedes } from "@/services/Sedes/SedesServices";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Sede, SedeCreate } from "@/interfaces/Sede";

interface SedesContextType {
  sedes: Sede[];
  loading: boolean;
  error: string | null;
  addNewSede: (SedeCreate: SedeCreate) => void;
  deleteSedes: (id: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SedesContext = createContext<SedesContextType | undefined>(
  undefined
);

export const SedesProvider = ({ children }: { children: React.ReactNode }) => {
  const [sedes, setSedes] = useLocalStorage<Sede[]>("sedes", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sedes.length === 0) {
      const fetchSedes = async () => {
        setLoading(true);
        try {
          const { data } = await getSedes();
          setSedes("sedes", data.data);
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

  const addNewSede = (sede: SedeCreate) => {
    setSedes("sedes", (prevSedes) => {
      const nextId = (prevSedes.at(-1)?.id ?? 0) + 1;
      return [
        ...prevSedes,
        {
          id: nextId,
          nombre: sede.nombre,
          direccion: sede.direccion,
          telefono: sede.telefono,
        } as Sede,
      ];
    });
  };

  const deleteSedes = (id: number) => {
    setSedes("sedes", (prevGeneros) => prevGeneros.filter((g) => g.id !== id));
  };

  return (
    <SedesContext.Provider
      value={{ sedes, loading, error, addNewSede, deleteSedes }}
    >
      {children}
    </SedesContext.Provider>
  );
};
