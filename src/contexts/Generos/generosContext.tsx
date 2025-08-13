import { createContext, useEffect, useState } from "react";
import {
  createGenero,
  getGeneros,
  deleteGenero,
  editGenero,
} from "@/services/Generos/GenerosServices";
import type { GeneroCreate, GeneroRequest } from "@/interfaces/Genero";
import { toast } from "sonner";

interface GenerosContextType {
  generos: GeneroRequest[];
  loading: boolean;
  error: string | null;
  addNewGenero: (genero: GeneroCreate) => void;
  generoDelete: (id: number) => void;
  generoUpdate: (id: number, genero: GeneroCreate) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GenerosContext = createContext<GenerosContextType | undefined>(
  undefined
);

export const GenerosProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [generos, setGeneros] = useState<GeneroRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (generos.length === 0) {
      const fetchGeneros = async () => {
        setLoading(true);
        try {
          const { data } = await getGeneros();
          setGeneros(data.data);
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

  const addNewGenero = async (genero: GeneroCreate) => {
    try {
      const response = await createGenero(genero);

      if (response.status === 201) {
        const nuevoGenero: GeneroRequest = response.data;

        setGeneros((prevGeneros) => [...prevGeneros, nuevoGenero]);
        toast.success("Genéro creado correctamente");
      } else {
        console.error("No se pudo crear el género:", response);
        toast.error("No se pudo crear el género");
      }
    } catch (error) {
      console.error("Error al crear género:", error);
    }
  };

  const generoDelete = async (id: number) => {
    try {
      const response = await deleteGenero(id);
      if (response.status === 204 || response.status === 200) {
        setGeneros((prevGeneros) => prevGeneros.filter((g) => g.id !== id));
        toast.success("Genéro eliminado correctamente");
      } else {
        console.error("No se pudo eliminar el género:", response);
        toast.error("No se pudo eliminar el género");
      }
    } catch (error) {
      console.error("Error al eliminar el género:", error);
    }
  };

  const generoUpdate = async (id: number, genero: GeneroCreate) => {
    try {
      const response = await editGenero(id, genero);
      if (response.status === 200) {
        setGeneros((prevGeneros) =>
          prevGeneros.map((g) => (g.id === id ? response.data : g))
        );
        toast.success("Género actualizado correctamente");
      } else {
        console.error("No se pudo actualizar el género:", response);
        toast.error("No se pudo actualizar el género");
      }
    } catch (error) {
      console.error("Error al actualizar el género:", error);
      toast.error("Error al actualizar el género");
    }
  };
  return (
    <GenerosContext.Provider
      value={{
        generos,
        loading,
        error,
        addNewGenero,
        generoDelete,
        generoUpdate,
      }}
    >
      {children}
    </GenerosContext.Provider>
  );
};
