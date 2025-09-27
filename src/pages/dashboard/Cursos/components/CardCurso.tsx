import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCursos } from "@/hooks/Cursos/useCursos";
import { Link, useNavigate } from "react-router-dom";
import {
  DollarSign,
  MapPin,
  MoreVertical,
  Table,
  UserCheck,
  Users,
} from "lucide-react";
import { CreateCurso } from "./CreateCurso";
import {
  IconTrash,
  IconPlus,
  IconPencilCheck,
  IconEye,
  IconUserPlus,
} from "@tabler/icons-react";
import { AddInstructorCurso } from "./AddInstructorCurso";
import { AddRooster } from "./AddRooster";
import type { Curso } from "@/interfaces/Curso";
import { AnimatePresence, motion } from "motion/react";
import EmptyState from "@/components/emptyState";


export const CardCurso = ({ cursos }: { cursos: Curso[] }) => {
  const { loading, error, cursoDelete, deleteIntructorCurso } = useCursos();
  const navigate = useNavigate()
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AnimatePresence>
        {cursos && cursos.length > 0 ? (
          cursos.map((curso) => (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col bg-white space-y-2 border rounded-2xl p-4"
            >
              <div className="flex items-center">
                <div className="flex-1 text-lg font-bold">{curso.nombre}</div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => cursoDelete(curso.id)}>
                      <span className="flex gap-2 items-center">
                        <IconTrash /> Eliminar
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() =>navigate(`/cursos/asistencias-create/${curso.id}`) }>
                      <span className="flex gap-2 items-center">
                        <Table /> Gestionar Asistencias
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <AddInstructorCurso
                        curso={curso.id}
                        icon={<IconPlus />}
                        triggerMessage="Agregar Instructores"
                      />
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <CreateCurso
                        icon={<IconPencilCheck />}
                        curso={curso}
                        id={curso.id}
                        triggerMessage="Modificar Curso"
                        mode="editing"
                      />
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
                      <AddRooster
                        icon={<IconUserPlus />}
                        triggerMessage="Agregar estudiante al curso"
                        curso={{ nombre: curso.nombre, id: curso.id }}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <Badge className="bg-black">{curso.genero.nombre}</Badge>
              </div>

              <div className="flex flex-col space-y-2 px-2 text-gray-500">
                {curso.instructores.length > 0 ? (
                  <div className="flex flex-col">
                    {curso.instructores.map((instructor) => (
                      <div key={instructor.id} className="flex items-center w-full gap-3">
                        <UserCheck className="shrink-0" size={16} />
                        <div className="flex justify-between w-full">
                          <p className="text-md w-full flex-1 inline-flex gap-1 text-nowrap items-center">
                            {instructor.nombre}
                          </p>
                          <span
                            onClick={() => deleteIntructorCurso(curso.id, instructor.id)}
                            className="p-2 flex items-center cursor-pointer hover:bg-red-400 hover:text-white w-10 bg-accent rounded-md justify-center mt-1"
                          >
                            <IconTrash size={12} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <AddInstructorCurso
                      curso={curso.id}
                      icon={<IconPlus />}
                      triggerMessage="Agregar Instructores"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  <p className="text-md">{curso.sede.nombre}</p>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign size={16} className="text-primary" />
                  <p className="text-md">
                    <span className="text-black font-semibold">
                      {curso.precio_normal}$
                    </span>{" "}
                    ({curso.precio_apoyo} de apoyo)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center px-2">
                <div className="flex-1 flex items-center gap-3">
                  <Users size={16} className="text-primary" />
                  <div className="font-semibold">24/30</div>
                </div>

                <div className="w-20 overflow-hidden bg-muted rounded-full h-2">
                  <div
                    className="bg-primary max-w-100 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(curso.id / 30) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          
            <EmptyState message="No hay cursos registrados" />
          
        )}

      </AnimatePresence>
    </>
  );
};
