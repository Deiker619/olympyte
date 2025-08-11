
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { IconAdjustmentsAlt } from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useSedes } from "@/hooks/Sedes/useSedes";

export const TableSedes = () => {
  const { sedes, loading, error, deleteSedes } = useSedes();
  console.log(sedes)
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Table>
      <TableCaption>Lista de Sedes de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre de la Sede</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sedes?.map((sede) => (
          <TableRow key={sede.id}>
            <>
              <TableCell className="font-medium p-4">{sede.id}</TableCell>
              <TableCell>{sede.nombre}</TableCell>
              <TableCell>{sede.direccion}</TableCell>
              <TableCell>{sede.telefono}</TableCell>
              <TableCell className="flex flex-col justify-start w-30">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconAdjustmentsAlt />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteSedes(sede.id)}>Eliminar Sede</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
