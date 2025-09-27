interface AsistenciaItem {
  estudiante_id: number;
  presente: boolean;
}

export interface Asistencia {
  curso_id: string | number;
  fecha: string; // o Date si prefieres manejarlo como objeto Date
  items: AsistenciaItem[];
}