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
import type { Curso } from "@/interfaces/Estudiante";
export const TableDetallesCursos = ({cursos}:{cursos:Curso[]}) => {
  console.log(cursos)
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
        {cursos?.map((curso) => (
          <TableRow key={curso.curso_id}>
            <>
              <TableCell>{curso.nombre}</TableCell>
              <TableCell><Badge>{curso.tipo}</Badge></TableCell>
              <TableCell>{curso.estado}</TableCell>
              <TableCell>{curso.desde}</TableCell>


            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
