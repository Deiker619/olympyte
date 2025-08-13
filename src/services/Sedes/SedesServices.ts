import api from "@/api/api";
import type { estudianteAsignSede } from "@/interfaces/Estudiante";
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
export const editSede = async (id:number,sede:SedeCreate) => {
  const response = await api.put(`sedes/${id}`, sede ); // ruta relativa al baseURL
  return response
};
export const AsignEstudianteInSede = async (data: estudianteAsignSede) => {
  const response = await api.post("inscripciones-sede",data ); // ruta relativa al baseURL
  return response;
};
export const GetDetallesSedes = async (id:number|string) => {
  const response = await api.get(`inscripciones-sede?sedeId=${id}`); // ruta relativa al baseURL
  return response;
};