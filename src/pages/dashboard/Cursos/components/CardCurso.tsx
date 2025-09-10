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
import { Link } from "react-router-dom";
import {
  DollarSign,
  MapPin,
  MoreVertical,
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


export const CardCurso = ({ cursos }: { cursos: Curso[] }) => {
  const { loading, error, cursoDelete } = useCursos();
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AnimatePresence>
        {cursos.map((curso) => (
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
                    <AddRooster
                      icon={<IconUserPlus />}
                      triggerMessage="Agregar estudiante al curso"
                      curso={{ nombre: curso.nombre, id: curso.id }}
                    ></AddRooster>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="">
              <Badge className="bg-black">{curso.genero.nombre}</Badge>
            </div>
            <div className="flex flex-col space-y-2 px-2 text-gray-500">
              {curso.instructores.length > 0 ? (
                <div className="flex  items-center gap-3">
                  <UserCheck size={16}></UserCheck>
                  {curso.instructores.map((instructor) => (
                    <p key={instructor.id} className="text-md">
                      {instructor.nombre}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="flex  items-center gap-3">
                  <AddInstructorCurso
                    curso={curso.id}
                    icon={<IconPlus />}
                    triggerMessage="Agregar Instructores"
                  ></AddInstructorCurso>
                </div>
              )}
              <div className="flex  items-center gap-3">
                <MapPin size={16}></MapPin>
                <p className="text-md">{curso.sede.nombre}</p>
              </div>

              <div className="flex  items-center gap-3">
                <DollarSign size={16} className="text-primary"></DollarSign>
                <p className="text-md">
                  {" "}
                  <span className="text-black font-semibold">
                    {curso.precio_normal}$
                  </span>{" "}
                  ({curso.precio_apoyo} de apoyo){" "}
                </p>
              </div>
            </div>
            <Separator></Separator>
            <div className="flex items-center px-2 ">
              <div className="flex-1 flex items-center gap-3">
                <Users size={16} className="text-primary"></Users>
                <div className="font-semibold">24/30</div>
              </div>

              <div className="w-20 overflow-hidden  bg-muted rounded-full h-2">
                <div
                  className="bg-primary max-w-100 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(curso.id / 30) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
