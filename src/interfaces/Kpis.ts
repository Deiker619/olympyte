export interface KPIs {
  estudiantes_activos: number;
  ingresos_mes_usd: number;
  clases_este_mes: number;
  tasa_asistencia: number;
}
export interface TopCurso {
  curso_id: number;
  nombre: string;
  inscritos: number;
  tasa_asistencia: number | null;
}
export interface DashboardData {
  kpis: KPIs;
  top_cursos: TopCurso[];
}
