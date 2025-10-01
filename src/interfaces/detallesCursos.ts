export interface EstudianteAsistencia {
  estudiante_id: string;
  nombre: string;
  telefono: string;
  email: string | null;
  presente: boolean;
}

export interface AsistenciaPorFecha {
  curso: {
    id: number;
  };
  fecha: string; // formato YYYY-MM-DD
  estudiantes: EstudianteAsistencia[];
  presentes: number;
  total: number;
}
