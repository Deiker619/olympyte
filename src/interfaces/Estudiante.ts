import type { Curso, CursoHasEstudiante } from "./Curso";
import type { typeEstado } from "./Estados";
import type { SedeHasEstudiante } from "./Sede";

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  created_at: string; // DATETIME en formato ISO o YYYY-MM-DD HH:mm:ss
  updated_at: string; // DATETIME en formato ISO o YYYY-MM-DD HH:mm:ss
}
export type EstudianteHasCurso = Pick<Estudiante, 'id'| 'nombre' | 'apellido'> &{
  sedes_inscritas: SedeHasEstudiante[],
  cursos?: CursoHasEstudiante[],
}



export type EstudianteHasRooster = Pick<Estudiante, 'id'|'nombre'>

export type EstudianteDetalles = Pick<Estudiante, 'id'|'nombre'|'apellido'>&{
  pagos_recientes: PagoReciente[]
  sedes_inscritas: SedeInscrita[];
  cursos: Curso[];

}




/* FIXME: Mueve esas interfaces a los respectivos archivos */
export interface SedeInscrita {
  sede_id: number;
  nombre: string;
  fecha_inscripcion: string; // formato ISO: "YYYY-MM-DD"
  monto_pagado: number;
}

export type estudianteAsignSede = Omit<SedeInscrita,'nombre' >&{
  estudiante_id: number
}


export interface CursoEstududianteDetalles{
  curso: Pick<Curso, 'id'|'nombre'|'sede'>
  estado: typeEstado
  estudiante_id: Pick<Estudiante, 'id'>
  fecha_asignacion: string
  tipo: 'NORMAL'|'OTRO'

}

export interface PagoReciente {
  pago_id: number;
  curso_id: number;
  mes: number;
  anio: number;
  monto: number;
  fecha: string; // formato ISO
  metodo_pago: "EFECTIVO" | "ZELLE" | "TRANSFERENCIA" | string;
  nota: string;
}
export interface PagoCreate {
  estudiante_id:number
  curso_id: number;
  mes: number;
  anio: number;
  monto: number;
  fecha: string; // formato ISO
  metodo_pago: "EFECTIVO" | "ZELLE" | "TRANSFERENCIA" | string;
  nota: string;
}
