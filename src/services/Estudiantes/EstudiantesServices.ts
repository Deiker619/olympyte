
import api from "@/api/api";
import type { EstudianteHasCurso } from "@/interfaces/Estudiante";
export const getEstudiantes = async () => {
  const response = await api.get("estudiantes"); // ruta relativa al baseURL
  return response;
};

export const getEstudiantesCursos = async (id:string) => {
  const response = await api.get(`estudiantes/${id}/cursos`); // ruta relativa al baseURL
  return response;
};
export const getEstudiante = async (id:string) => {
  const response = await api.get(`estudiantes/${id}`); // ruta relativa al baseURL
  return response;
};

export const getEstudiantesPagos = async (id:string) => {
  const response = await api.get(`estudiantes/${id}/pagos`); // ruta relativa al baseURL
  return response;
};
export const createEstudiante = async (estudiante:EstudianteHasCurso) => {
  const response = await api.post(`estudiantes`, estudiante); // ruta relativa al baseURL
  return response;
};
export const deleteEstudiantes = async (id:number|string) => {
  const response = await api.delete(`estudiantes/${id}`); // ruta relativa al baseURL
  return response;
};

