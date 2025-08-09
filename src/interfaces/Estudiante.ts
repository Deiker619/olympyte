export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  created_at: string; // DATETIME en formato ISO o YYYY-MM-DD HH:mm:ss
  updated_at: string; // DATETIME en formato ISO o YYYY-MM-DD HH:mm:ss
}