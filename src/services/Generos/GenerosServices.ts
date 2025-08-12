import api from "@/api/api";
import type { GeneroCreate } from "@/interfaces/Genero";

export const getGeneros = async () => {
  const response = await api.get("generos"); // ruta relativa al baseURL
  return response;
};
export const createGenero = async (genero:GeneroCreate) => {
  const response = await api.post("generos", genero); // ruta relativa al baseURL
  return response;
};
export const deleteGenero = async (id:number | string) => {
  const response = await api.delete(`generos/${id}`); // ruta relativa al baseURL
  return response;
};
