
import { Card, CardContent } from "@/components/ui/card";
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
  Clock,

  MapPin,
  MoreVertical,
  Phone,

} from "lucide-react";
import type { Sede } from "@/interfaces/Sede";
import { useSedes } from "@/hooks/Sedes/useSedes";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { IconEye, IconPencilCheck, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { AddSedes } from "./AddSedes";
import { AddEstudianteSede } from "./AddEstudianteSede";

export const CardSedes = ({ sedes }: { sedes: Sede[] }) => {
    const { loading, error, sedeDelete } = useSedes();
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <AnimatePresence>
        {sedes.map((sede) => (
          <motion.div
            key={sede.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="card-dashboard hover-lift animate-fade-in">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {sede.nombre}
                    </h3>
                    <Badge className="bg-primary text-black">Activo</Badge>
                  </div>
                  <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
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
                </div>

                {/* Address and Contact */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">
                      {sede.direccion ?? "Sin dirección"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{sede.telefono ?? "Sin Teléfono"}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">
                      {sede.direccion ?? "Sin dirección"}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-lg font-bold text-primary">10</p>
                    <p className="text-xs text-muted-foreground">Cursos</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-lg font-bold text-green-600">10</p>
                    <p className="text-xs text-muted-foreground">Inscritos</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-lg font-bold text-foreground">30</p>
                    <p className="text-xs text-muted-foreground">Capacidad</p>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ocupación</span>
                    <span className="font-medium"></span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(sede.id / 30) * 100}%` }}
                    
                    />
                  </div>
                </div>

                {/* Manager */}
                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Encargado:</span>
                    <span className="font-medium">encargado</span>
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
