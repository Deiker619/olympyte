import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CursoEstududianteDetalles } from "@/interfaces/Estudiante";
export const TableDetallesCursos = ({
  cursos,
}: {
  cursos: CursoEstududianteDetalles[];
}) => {
  

  return (
    <Table>
      <TableCaption>Lista de Cursos inscritos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Desde</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          cursos.length == 0 && <p>No hay cursos inscritos</p>
        }
        {cursos.map((detalles) => (
          <>
            <TableCell>{detalles.curso.nombre}</TableCell>
            <TableCell>
              <Badge>{detalles.tipo}</Badge>
            </TableCell>
            <TableCell>{detalles.estado}</TableCell>
            <TableCell>{detalles.fecha_asignacion}</TableCell>
          </>
        ))}
      </TableBody>
    </Table>
  );
};
