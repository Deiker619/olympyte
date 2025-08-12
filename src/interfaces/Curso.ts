
import type {   typeEstado } from "./Estados";
import type { InstructorCurso } from "./Intructor";
export interface Curso {
  id: number;
  nombre: string; // p.ej., 'Salsa Casino Básico 3'
  genero: number | string; // FK -> Genero.id
  sede: number; // FK -> Sede.id
  instructores: InstructorCurso[]; // FK -> Instructor.id
  nivel?: number | null; // Nivel relativo dentro del género/sede (1, 2, 3...)
  precio_normal: number; // DECIMAL(8,2)
  precio_apoyo: number; // DECIMAL(8,2)
  created_at: string; // DATETIME en formato ISO o YYYY-MM-DD HH:mm:ss
  updated_at: string; // DATETIME en formato ISO o YYYY-MM-DD HH:mm:ss
}


export type CursoRequest = Omit<Curso, "created_at"| 'updated_at'>
export type CursoCreate ={
  nombre: string,
  genero_id: number,
  sede_id: number,
  nivel?: number | null,
  precio_normal: number,
  precio_apoyo: number
}
export type CursoHasEstudiante = Pick<Curso, 'id'| 'nombre'>&{
  estado: typeEstado
}