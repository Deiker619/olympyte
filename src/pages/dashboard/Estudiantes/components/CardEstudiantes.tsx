import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EstudianteHasCurso } from "@/interfaces/Estudiante";
import {  IconEye, IconPencilCheck, IconTrash } from "@tabler/icons-react";

import { BookOpen,  Mail, MoreVertical } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AddEstudiante } from "./AddEstudiantes";
import { Link } from "react-router-dom";
import { useEstudiantes } from "@/hooks/Estudiantes/Estudiantes";

export const CardEstudiantes = ({
  estudiantes,
}: {
  estudiantes: EstudianteHasCurso[];
}) => {
  const {  estudianteDelete } = useEstudiantes();
  return (
    <>
      <AnimatePresence>
        {estudiantes.map((estudiante) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="col-span-1"
            key={estudiante.id}
          >
            <Card className="card-dashboard hover-lift animate-fade-in">
              <CardContent className="py-3">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {estudiante.nombre} {estudiante.apellido}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      V-{estudiante.id}
                    </p>
                    <Badge className="bg-primary text-black">Activo</Badge>
                  </div>
                  <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
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
                      
                        <AddEstudiante estudiante={estudiante} id={estudiante.id} icon={<IconPencilCheck/>} mode="editing" triggerMessage="Modificar Estudiante"></AddEstudiante>
                      
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
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{"email"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{estudiante.cursos?.length} curso(s)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Último pago:</span>
                    <span className="font-medium">{"10/9/2025"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
