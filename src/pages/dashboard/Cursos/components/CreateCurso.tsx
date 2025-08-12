import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGeneros } from "@/hooks/Generos/useGeneros";
import { useSedes } from "@/hooks/Sedes/useSedes";
import { useCursos } from "@/hooks/Cursos/useCursos";
import type { CursoCreate } from "@/interfaces/Curso";
import React, { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
}
export function CreateCurso({
  mode = "create",
  triggerMessage,
  icon,
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { sedes } = useSedes();
  const { generos } = useGeneros();
  const {cursoCreate} = useCursos()
  const handleClick = (data: CursoCreate) => {
    cursoCreate(data)
    console.log(data);
  };
  const { register, /* control, */ handleSubmit } = useForm<CursoCreate>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      genero_id: 0,
      sede_id: 0,
      nivel: 1,
      precio_normal: 0,
      precio_apoyo: 0
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <span>{icon}</span> {triggerMessage}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode == "create" ? "Crear Nuevo Curso" : "Modificar Curso"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="nombre">Nombre del Curso</Label>
              <Input id="nombre" {...register("nombre")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="genero">Géneros</Label>
              <select
                id="genero"
                {...register("genero_id", { valueAsNumber: true })}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">Selecciona un Género</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nivel">Nivel</Label>
              <Input id="nivel" {...register("nivel")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="precio_normal">Precio normal</Label>
              <Input id="precio_normal" {...register("precio_normal")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="precio_apoyo">Precio apoyo</Label>
              <Input id="precio_apoyo" {...register("precio_apoyo")} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="sede">Sede</Label>
              <select
                id="sede"
                {...register("sede_id", { valueAsNumber: true })}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">Selecciona una sede</option>
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </select>
            </div>
        
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button type="submit" variant={"default"}>
              Guardar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
