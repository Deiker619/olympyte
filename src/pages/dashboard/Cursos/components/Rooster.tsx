import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Rooster } from "@/interfaces/Curso";

export const RoosterDetalles = ({ rooster }: {rooster: Rooster[]}) => {
  return (
    <Table>
      <TableCaption>Lista de estudiantes del curso.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del estudiante</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Desde</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
        {
        
        rooster.length > 0 ?
        rooster?.map((roos, index) => (
          <TableRow key={index}>
            <>
              <TableCell>{roos.estudiante.nombre}</TableCell>
              <TableCell>
                <Badge>{roos.estado}</Badge>
              </TableCell>
              <TableCell>{roos.tipo}</TableCell>
              <TableCell>{roos.desde}</TableCell>
            </>
          </TableRow>
        ))
        : 'No hay Rooster'
        }
      </TableBody>
    </Table>
  );
};
