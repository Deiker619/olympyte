type Tipo = "NORMAL" | "OTRO_TIPO"; 
type Estado = "ACTIVO" | "INACTIVO"; 

import type {   typeEstado } from "./Estados";
import type { EstudianteHasRooster } from "./Estudiante";
import type { GeneroRequest } from "./Genero";
import type { InstructorCurso } from "./Intructor";
import type { SedeRequest } from "./Sede";
export interface Curso {
  id: number;
  nombre: string; // p.ej., 'Salsa Casino Básico 3'
  genero: {
    nombre: string,
    id:number
  }; // FK -> Genero.id
  sede: {
    id: number,
    nombre: string
  }; 
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

export type CursoDetalles = {
  curso: {
    id: number,
    nombre: string,
    genero: GeneroRequest
    sede: SedeRequest
    nivel: string,
    precio_normal: number,
    precio_apoyo: number
    instructores: InstructorCurso[] 
  }
  roster:Rooster[] 
}

export interface Rooster {
  asignacion_id: number;
  estudiante: EstudianteHasRooster;
  tipo: Tipo;
  estado: Estado;
  desde: string;
}
export type RoosterCreate = Pick<Rooster, 'tipo'| 'estado'> &{
  estudiante_id: number
}