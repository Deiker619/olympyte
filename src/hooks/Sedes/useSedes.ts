import { SedesContext } from "@/contexts/Sedes/sedesContext";
import { useContext } from "react";

export const useSedes= () => {
  const context = useContext(SedesContext);
  if (!context) {
    throw new Error("useSedesContext debe usarse dentro de un SedesProvider");
  }
  return context;
};