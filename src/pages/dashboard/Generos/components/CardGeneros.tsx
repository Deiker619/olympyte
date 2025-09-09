import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, Music, Trash2 } from "lucide-react";
import { randomColor } from "@/utils/ramdonColors";
import type { GeneroRequest } from "@/interfaces/Genero";
import { Badge } from "@/components/ui/badge";
import { AddGeneros } from "./AddGeneros";
import { IconPencilCheck } from "@tabler/icons-react";
import { useGeneros } from "@/hooks/Generos/useGeneros";
export const CardGeneros = ({ generos }: { generos: GeneroRequest[] }) => {
  const { generoDelete, loading, error } = useGeneros();
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <AnimatePresence>
        {generos.map((genero) => (
          <motion.div
            key={genero.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="card-dashboard  col-span-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      style={{ backgroundColor: randomColor() }}
                      className={`w-12 h-12  rounded-xl flex items-center justify-center shadow-medium`}
                    >
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {genero.nombre}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Descripción del genero
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <AddGeneros
                          icon={<IconPencilCheck />}
                          triggerMessage="Modificar Género"
                          genero={genero}
                          id={genero.id}
                          mode="editing"
                        ></AddGeneros>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => generoDelete(genero.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Badge className="text-xs bg-black">cursos</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Cursos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
