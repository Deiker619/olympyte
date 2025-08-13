import { Badge } from "@/components/ui/badge";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
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
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconAdjustmentsAlt,
  IconEye,
  IconPencilCheck,
  IconPlus,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AddInstructorCurso } from "./AddInstructorCurso";
import { CreateCurso } from "./CreateCurso";
import { Link } from "react-router-dom";
import { AddRooster } from "./AddRooster";


export const TableCursos = () => {
  const { cursos, loading, error, cursoDelete, deleteIntructorCurso } =
    useCursos();
  console.log(cursos);
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
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cursos?.map((curso) => (
          <TableRow key={curso.id}>
            <>
              <TableCell className="font-medium p-4">{curso.id}</TableCell>
              <TableCell>{curso.nombre}</TableCell>
              <TableCell>
                <Badge variant="default">{curso.genero.nombre}</Badge>
              </TableCell>
              <TableCell>
                {curso.instructores.map((instructor, index) => (
                  <div key={index} className="">
                    <span className="inline-flex gap-2 items-center justify-evenly">
                      {instructor.nombre}
                      <Button
                        className="size-8 cursor-pointer"
                        variant={"secondary"}
                        onClick={() =>
                          deleteIntructorCurso(curso.id, instructor.id)
                        }
                      >
                        <IconTrash className="size-4"></IconTrash>
                      </Button>
                    </span>
                    <br />
                  </div>
                ))}
              </TableCell>
              <TableCell>{curso.sede.nombre}</TableCell>
              <TableCell>{curso.precio_normal}</TableCell>
              <TableCell>{curso.precio_apoyo}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconAdjustmentsAlt />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => cursoDelete(curso.id)}>
                      <span className="flex gap-2 items-center">
                        <IconTrash /> Eliminar
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <AddInstructorCurso
                        curso={curso.id}
                        icon={<IconPlus />}
                        triggerMessage="Agregar Instructores"
                      ></AddInstructorCurso>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <CreateCurso
                        icon={<IconPencilCheck />}
                        curso={curso}
                        id={curso.id}
                        triggerMessage="Modificar Curso"
                        mode="editing"
                      ></CreateCurso>
                    </DropdownMenuItem>

                    <Link to={`/cursos/${curso.id}`}>
                      <DropdownMenuItem>
                        <span className="flex gap-2 items-center">
                          <IconEye /> Ver detalles del Curso
                        </span>
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <AddRooster icon={<IconUserPlus/>} triggerMessage="Agregar estudiante al curso" curso={{nombre: curso.nombre, id: curso.id}}></AddRooster>
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
