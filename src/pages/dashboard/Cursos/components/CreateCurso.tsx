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
import type { IntructorCurso } from "@/interfaces/Intructor";
import React, { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode
}
interface CursoForm {
  nombre: string;
  genero: string;
  sede: string;
  nivel: number;
  precio_normal: number;
  precio_apoyo: number;
  instructores: IntructorCurso[];
}

export function CreateCurso({
  mode = "create",
  triggerMessage,
  icon
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const handleClick = (data: CursoForm) => {
    console.log(data);
  };
  const { register, /* control, */ handleSubmit } = useForm<CursoForm>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      genero: "",
      sede: "",
      nivel: 1,
      precio_normal: 0,
      precio_apoyo: 0,
      instructores: [],
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <span>
            {icon}
          </span>{" "}
          {triggerMessage}
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
              <Label htmlFor="genero">Genéro</Label>
              <Input id="genero" {...register("genero")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nivel">Nivel</Label>
              <Input id="nivel" {...register("nivel")} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="sede">Sede</Label>
              <Input id="sede" {...register("sede")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="precio_normal">Precio normal</Label>
              <Input id="precio_normal" {...register("precio_normal")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="precio_apoyo">Precio apoyo</Label>
              <Input id="precio_apoyo" {...register("precio_apoyo")} />
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
