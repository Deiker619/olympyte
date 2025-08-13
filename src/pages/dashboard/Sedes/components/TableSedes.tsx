import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  IconAdjustmentsAlt,
  IconEye,
  IconPencilCheck,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react";
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
import { AddSedes } from "./AddSedes";
import { AddEstudianteSede } from "./AddEstudianteSede";
import { Link } from "react-router-dom";

export const TableSedes = () => {
  const { sedes, loading, error, sedeDelete } = useSedes();
  console.log(sedes);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Table>
      <TableCaption>Lista de Sedes de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre de la Sede</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sedes?.map((sede) => (
          <TableRow key={sede.id}>
            <>
              <TableCell className="font-medium p-4">{sede.id}</TableCell>
              <TableCell>{sede.nombre}</TableCell>
              <TableCell>
                {sede.direccion ?? (
                  <p className="text-gray-500">Sin Dirección</p>
                )}
              </TableCell>
              <TableCell>
                {sede.telefono ?? <p className="text-gray-500">Sin teléfono</p>}
              </TableCell>
              <TableCell className="flex flex-col justify-start w-30">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconAdjustmentsAlt />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => sedeDelete(sede.id)}>
                      {" "}
                      <IconTrash></IconTrash> Eliminar Sede {sede.id}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <AddSedes
                        sede={sede}
                        id={sede.id}
                        icon={<IconPencilCheck />}
                        triggerMessage="Modificar Sede"
                        mode="editing"
                      />
                    </DropdownMenuItem>
                    <Link to={`/sedes/${sede.id}`}>
                      <DropdownMenuItem>
                        <span className="flex gap-2 items-center">
                          <IconEye /> Ver inscritos en la sede
                        </span>
                      </DropdownMenuItem>
                    </Link>
                      <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <AddEstudianteSede
                        sede={{nombre: sede.nombre, id: sede.id}}
                       
                        icon={<IconUserPlus />}
                        triggerMessage="Agregar Estudiante a Sede"
                        mode="create"
                      />
                    </DropdownMenuItem>
                    
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
