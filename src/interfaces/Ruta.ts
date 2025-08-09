export interface Ruta {

  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>; // Tipo para componentes de icono
  status: boolean
}