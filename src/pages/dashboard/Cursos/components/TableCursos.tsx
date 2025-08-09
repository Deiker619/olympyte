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
import { useCursos } from "@/hooks/Cursos/useCursos";

export const TableCursos = () => {
  const { cursos, loading, error } = useCursos();
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Table>
      <TableCaption>Lista de Cursos de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Género</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Sede</TableHead>
          <TableHead>Precio Normal</TableHead>
          <TableHead>Precio Apoyo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cursos?.map((curso) => (
          <TableRow key={curso.id}>
            <>
              <TableCell className="font-medium p-4">{curso.id}</TableCell>
              <TableCell>{curso.nombre}</TableCell>
              <TableCell>
                <Badge variant="default">{curso.genero}</Badge>
              </TableCell>
              <TableCell>
                {curso.instructores.map((instructor, index) => (
                  <span key={index}>
                    {instructor.nombre}
                    <br />
                  </span>
                ))}
              </TableCell>
              <TableCell>{curso.sede}</TableCell>
              <TableCell>{curso.precio_normal}</TableCell>
              <TableCell>{curso.precio_apoyo}</TableCell>
            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
