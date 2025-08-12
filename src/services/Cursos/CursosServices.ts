
import api from "@/api/api";
import type { CursoCreate } from "@/interfaces/Curso";

export const getCursos = async () => {
  const response = await api.get("cursos"); // ruta relativa al baseURL
  return response;
};
export const createCurso = async (curso:CursoCreate) => {
  const response = await api.post("cursos", curso); // ruta relativa al baseURL
  return response;
};
export const deleteCurso = async (id:number|string) => {
  const response = await api.delete(`cursos/${id}`); // ruta relativa al baseURL
  return response;
};
export const AddInstructorCurso = async (id:number|string, instructorID:number|string) => {
  const response = await api.post(`cursos/${id}/instructores/${instructorID}`); // ruta relativa al baseURL
  return response;
};
export const DeleteInstructorCurso = async (id:number|string, instructorID:number|string) => {
  const response = await api.delete(`cursos/${id}/instructores/${instructorID}`); // ruta relativa al baseURL
  return response;
};