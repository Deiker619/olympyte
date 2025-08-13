
import api from "@/api/api";
import type { EstudianteHasCurso } from "@/interfaces/Estudiante";
export const getEstudiantes = async () => {
  const response = await api.get("estudiantes"); 
  return response;
};

export const getEstudiantesCursos = async (id:string) => {
  const response = await api.get(`estudiantes/${id}/cursos`); 
  return response;
};
export const getEstudiante = async (id:string) => {
  const response = await api.get(`estudiantes/${id}`); 
  return response;
};

export const getEstudiantesPagos = async (id:string) => {
  const response = await api.get(`estudiantes/${id}/pagos`); 
  return response;
};
export const createEstudiante = async (estudiante:EstudianteHasCurso) => {
  const response = await api.post(`estudiantes`, estudiante); 
  return response;
};
export const deleteEstudiantes = async (id:number|string) => {
  const response = await api.delete(`estudiantes/${id}`); 
  return response;
};
export const editEstudiante = async (id:number|string, estudiante:EstudianteHasCurso) => {
  const response = await api.put(`estudiantes/${id}`, estudiante); 
  return response;
};

