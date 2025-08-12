import { useContext } from "react";
import { CursosContext } from "@/contexts/Cursos/CursosContext";
export const useCursos= () => {
  const context = useContext(CursosContext);
  if (!context) {
    throw new Error("useCursos debe usarse dentro de un CursosProviders");
  }
  return context;
};