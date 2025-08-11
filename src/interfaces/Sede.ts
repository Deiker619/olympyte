export interface Sede {
  id: number; // Identificador único
  nombre: string; // Nombre de la sede
  direccion: string; // Dirección
  telefono: string; // Teléfono de contacto

}

export type SedeCreate = Omit<Sede, 'id'>
export type SedeHasEstudiante = Pick<Sede, 'id'>
