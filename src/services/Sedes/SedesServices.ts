import api from "@/api/api";
import type { SedeCreate } from "@/interfaces/Sede";

export const getSedes = async () => {
  const response = await api.get("sedes"); // ruta relativa al baseURL
  return response;
};
export const createSede = async (Sede:SedeCreate) => {
  const response = await api.post("sedes",Sede ); // ruta relativa al baseURL
  return response;
};
export const deleteSede = async (id:string|number) => {
  const response = await api.delete(`sedes/${id}` ); // ruta relativa al baseURL
  return response
};
