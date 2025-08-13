export interface Sede {
  id: number; // Identificador único
  nombre: string; // Nombre de la sede
  direccion: string; // Dirección
  telefono: string; // Teléfono de contacto

}

export type SedeCreate = Omit<Sede, 'id'> & { id?: number };
export type SedeRequest = Pick<Sede, 'id'|'nombre'>
export type SedeHasEstudiante = Pick<Sede, 'id'>

export interface InscripcionSede {
  id: number;
  estudiante_id: number;
  sede_id: number;
  fecha_inscripcion: string;  // Podrías usar Date si haces parseo
  monto_pagado: string;       // Podría ser number si lo conviertes
  createdAt: string;          // ISO datetime en string
  updatedAt: string;
  sede: Sede;
}