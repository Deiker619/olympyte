

export interface Instructor {
  id: number; // Identificador único
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  created_at: string; // Fecha de creación (DATETIME)
  updated_at: string; // Fecha de actualización (DATETIME)
}

export type IntructorCurso = Pick<Instructor, 'nombre'| 'apellido'|'id'>

