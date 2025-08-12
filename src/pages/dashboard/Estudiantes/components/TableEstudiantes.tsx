import { Badge } from "@/components/ui/badge";
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
import { useEstudiantes } from "@/hooks/Estudiantes/Estudiantes";
import {
  IconAdjustmentsAlt,
  IconEye,
  IconPencilCheck,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AddEstudiante } from "./AddEstudiantes";

export const TableEstudiantes = () => {
  const { estudiantes, loading, error, estudianteDelete } = useEstudiantes();
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Table>
      <TableCaption>Lista de Estudiantes de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cédula</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Cursos</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {estudiantes?.map((estudiante) => (
          <TableRow key={estudiante.id}>
            <>
              <TableCell className="font-medium p-2">{estudiante.id}</TableCell>
              <TableCell>{estudiante.nombre}</TableCell>
              <TableCell>{estudiante.apellido}</TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  {estudiante.cursos && estudiante.cursos.length > 0 ? (
                    estudiante.cursos.map((curso, index) => (
                      <span key={index} className="flex gap-2 w-auto">
                        {curso.nombre}{" "}
                        <Badge variant="default">{curso.estado}</Badge>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400">No hay cursos inscritos</p>
                  )}
                </div>
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
                      onClick={() => estudianteDelete(estudiante.id)}
                    >
                      <span className="flex gap-2 items-center">
                        <IconTrash /> Eliminar
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      
                        <AddEstudiante estudiante={estudiante} icon={<IconPencilCheck/>} mode="editing" triggerMessage="Modificar Estudiante"></AddEstudiante>
                      
                    </DropdownMenuItem>
                    <Link to={`/estudiantes/${estudiante.id}`}>
                      <DropdownMenuItem>
                        <span className="flex gap-2 items-center">
                          <IconEye /> Ver detalles del estudiante
                        </span>
                      </DropdownMenuItem>
                    </Link>
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
