
import api from "@/api/api";
import type { IntructorCreate } from "@/interfaces/Intructor";

export const getInstructores = async () => {
  const response = await api.get("instructores"); // ruta relativa al baseURL
  return response;
};
export const createInstructor = async (Instructor:IntructorCreate) => {
  const response = await api.post("instructores", Instructor); // ruta relativa al baseURL
  return response;
};
export const deleteInstructor = async (id:number|string) => {
  const response = await api.delete(`instructores/${id}`); // ruta relativa al baseURL
  return response;
};