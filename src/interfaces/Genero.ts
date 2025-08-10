export interface Genero {
  id: number; // Identificador único
  nombre: string; // Nombre del género (Salsa, Bachata, Kizomba, etc.)
  created_at: string; // Fecha de creación (DATETIME)
  updated_at: string; // Fecha de actualización (DATETIME)
}

export type GeneroRequest = Pick<Genero, 'id'| 'nombre'>
export type GeneroCreate = Pick<Genero, 'nombre'>
