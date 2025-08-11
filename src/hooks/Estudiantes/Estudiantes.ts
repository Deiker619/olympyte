import { useContext } from "react";
import { EstudiantesContext } from "@/contexts/Estudiantes/EstudiantesContext";
export const useEstudiantes= () => {
  const context = useContext(EstudiantesContext);
  if (!context) {
    throw new Error("useEstudiantes debe usarse dentro de un estudiantesProvider");
  }
  return context;
};