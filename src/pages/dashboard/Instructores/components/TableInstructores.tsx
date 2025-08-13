
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInstructores } from "@/hooks/Instructores/useInstructores";
import {
  IconAdjustmentsAlt,
  IconPencilCheck,
  IconTrash,
} from "@tabler/icons-react";
import { AddInstructor } from "./AddInstructor";


export const TableInstructores = () => {
  const { instructores, loading, error,instructorDelete  } = useInstructores();
  console.log(instructores)
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Table>
      <TableCaption>Lista de Instructores de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cédula</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Télefono</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {instructores?.map((instructor) => (
          <TableRow key={instructor.id}>
            <>
              <TableCell className="font-medium p-2">{instructor.id}</TableCell>
              <TableCell>{instructor.nombre}</TableCell>
              <TableCell>{instructor.apellido}</TableCell>
              <TableCell>
                {instructor.telefono}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconAdjustmentsAlt />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => instructorDelete(instructor.id)}
                    >
                      <span className="flex gap-2 items-center">
                        <IconTrash /> Eliminar
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <AddInstructor instructor={instructor} id={instructor.id} icon={<IconPencilCheck/>} triggerMessage="Modificar Instructor" mode="editing" />
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
