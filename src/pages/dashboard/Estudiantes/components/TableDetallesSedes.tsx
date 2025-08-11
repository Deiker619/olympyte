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
import type { SedeInscrita } from "@/interfaces/Estudiante";
export const TableDetallesSedes = ({sedes}:{sedes:SedeInscrita[]}) => {
  console.log(sedes)
  return (
    <Table>
      <TableCaption>Lista de Sedes Inscritas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha de Inscripción</TableHead>
          <TableHead>Monto pagado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sedes?.map((sede, index) => (
          <TableRow key={index}>
            <>
              <TableCell>{sede.sede_id}</TableCell>
              <TableCell>{sede.nombre}</TableCell>
              <TableCell><Badge>{sede.fecha_inscripcion}</Badge></TableCell>
              <TableCell>{sede.monto_pagado}</TableCell>


            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
