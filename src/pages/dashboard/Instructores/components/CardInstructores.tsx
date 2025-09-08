import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInstructores } from "@/hooks/Instructores/useInstructores";
import type { Instructor } from "@/interfaces/Intructor";

import { IconPencilCheck, IconTrash } from "@tabler/icons-react";
import { Badge, Mail, MoreVertical, Phone, Star, UserCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AddInstructor } from "./AddInstructor";
export const CardInstructores = ({ instructores }: { instructores: Instructor[] }) => {
  const { loading, error, instructorDelete } = useInstructores();
  console.log(instructores)
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <AnimatePresence>
        {instructores.map((instructor) => (
          <motion.div className="col-span-1 " key={instructor.id}
           initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <Card
              className="card-dashboard hover-lift animate-fade-in"

            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {instructor.nombre} {instructor.apellido}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        V-{instructor.id}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
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
                        <AddInstructor
                          instructor={instructor}
                          id={instructor.id}
                          icon={<IconPencilCheck />}
                          triggerMessage="Modificar Instructor"
                          mode="editing"
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{instructor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{instructor.telefono}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Especialidades:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {/* {instructor.specialties.map((specialty, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))} */}
                    <Badge>Prueba</Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">
                      {/* {instructor.activeCourses} */}
                      curso activo
                    </p>
                    <p className="text-xs text-muted-foreground">Cursos Activos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">
                      {/* {instructor.totalStudents} */}
                      instructor
                    </p>
                    <p className="text-xs text-muted-foreground">Estudiantes</p>
                  </div>
                </div>

                {/* Rating and Status */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-medium">rating</span>
                  </div>
                  <Badge>
                    status
                  </Badge>
                </div>
              </CardContent>
            </Card>

          </motion.div>


        ))}
      </AnimatePresence>
    </>
  );
};
