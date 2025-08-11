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
import type { PagoReciente } from "@/interfaces/Estudiante";
export const TableDetallesPagos = ({pagos}:{pagos:PagoReciente[]}) => {
  console.log(pagos)
  return (
    <Table>
      <TableCaption>Lista de Estudiantes de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Metodo</TableHead>
          <TableHead>Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pagos?.map((pago, index) => (
          <TableRow key={index}>
            <>
              <TableCell>{pago.fecha}</TableCell>
              <TableCell><Badge>{pago.metodo_pago}</Badge></TableCell>
              <TableCell>{pago.monto}</TableCell>


            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
