

export interface Instructor {
  id: number; // Identificador único
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  created_at: string; // Fecha de creación (DATETIME)
  updated_at: string; // Fecha de actualización (DATETIME)
}

export type IntructorCreate = Omit<Instructor,  'created_at'|'updated_at'>
export type InstructorCurso = Pick<Instructor, 'id'|'nombre'>
export type InstructorAddCurso = Pick<InstructorCurso, 'id'>