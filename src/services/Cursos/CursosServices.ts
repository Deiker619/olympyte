
import api from "@/api/api";
import type { CursoCreate, RoosterCreate } from "@/interfaces/Curso";

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
export const AddEstudianteCurso = async (data:RoosterCreate) => {
  const response = await api.post(`asignaciones-curso`, data); // ruta relativa al baseURL
  return response;
};
export const UpdateCurso = async (id:number|string, curso:CursoCreate) => {
  const response = await api.put(`cursos/${id}`,curso); // ruta relativa al baseURL
  return response;
};
export const DeleteInstructorCurso = async (id:number|string, instructorID:number|string) => {
  const response = await api.delete(`cursos/${id}/instructores/${instructorID}`); // ruta relativa al baseURL
  return response;
};
export const GetDetallesCurso = async (id:number|string) => {
  const response = await api.get(`cursos/${id}`); // ruta relativa al baseURL
  return response;
};