import type { CursoHasEstudiante } from "./Curso";
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
  cursos: CursoHasEstudiante[],
}
export type EstudianteCreateCurso = Omit<EstudianteHasCurso, 'id' | 'sedes_inscritas'>
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

export interface Curso {
  curso_id: number;
  nombre: string;
  tipo: "NORMAL" | "APOYO";
  estado: "ACTIVO" | "SUSPENDIDO" | "APOYO-ACTIVO";
  precio: number;
  desde: string; // formato ISO
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
