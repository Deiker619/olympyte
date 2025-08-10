import { createContext, useEffect, useState  } from "react";
import { getGeneros } from "@/services/Generos/GenerosServices";
import type { GeneroCreate, GeneroRequest } from "@/interfaces/Genero";
import useLocalStorage from "@/hooks/useLocalStorage";

interface GenerosContextType {
  generos: GeneroRequest[];
  loading: boolean;
  error: string | null;
  addNewGenero: (genero: GeneroCreate) => void;
  deleteGenero: (id: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GenerosContext = createContext<GenerosContextType | undefined>(undefined);

export const GenerosProvider = ({ children }: { children: React.ReactNode }) => {
  const [generos, setGeneros] = useLocalStorage<GeneroRequest[]>("generos", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (generos.length === 0) {
      const fetchGeneros = async () => {
        setLoading(true);
        try {
          const { data } = await getGeneros();
          setGeneros("generos", data.data);
        } catch (err) {
          setError("Error cargando géneros");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchGeneros();
    }
  }, [generos, setGeneros]);

  const addNewGenero = (genero: GeneroCreate) => {
    setGeneros("generos", (prevGeneros) => {
      const nextId = (prevGeneros.at(-1)?.id ?? 0) + 1;
      return [...prevGeneros, { id: nextId, nombre: genero.nombre }];
    });
  };

  const deleteGenero = (id: number) => {
    setGeneros("generos", (prevGeneros) =>
      prevGeneros.filter((g) => g.id !== id)
    );
  };

  return (
    <GenerosContext.Provider
      value={{ generos, loading, error, addNewGenero, deleteGenero }}
    >
      {children}
    </GenerosContext.Provider>
  );
};


