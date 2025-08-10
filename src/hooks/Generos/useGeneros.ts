import { useContext } from "react";
import { GenerosContext } from "@/contexts/Generos/generosContext";
export const useGeneros = () => {
  const context = useContext(GenerosContext);
  if (!context) {
    throw new Error("useGenerosContext debe usarse dentro de un GenerosProvider");
  }
  return context;
};