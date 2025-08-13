import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
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
import type { Curso, CursoCreate } from "@/interfaces/Curso";
import { useForm } from "react-hook-form";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

type ModeType = "create" | "editing";

interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  curso?: Curso;
  id?: number; // curso para editar, opcional
}

export function CreateCurso({
  mode = "create",
  triggerMessage,
  icon,
  curso,
  id,
}: CreateCursoProps) {
  const [useMode] = useState<ModeType>(mode);
  const { sedes } = useSedes();
  const { generos } = useGeneros();
  const { cursoCreate, cursoUpdate } = useCursos();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CursoCreate>({
    mode: "onChange",
    defaultValues: curso || {
      nombre: "",
      genero_id: 0,
      sede_id: 0,
      nivel: "",
      precio_normal: 0,
      precio_apoyo: 0,
    },
  });

  // Cuando cambia el curso a editar, resetea el formulario con esos datos
  useEffect(() => {
    if (curso) {
      reset({
        ...curso,
        genero_id: curso.genero?.id ?? 0,
        sede_id: curso.sede?.id??0
      });
    }
  }, [curso, reset]);

  const onSubmit = (data: CursoCreate) => {
    if (useMode === "create") {
      cursoCreate(data);
      console.log(data);
    } else {
      console.log(data);
      cursoUpdate(id ?? 0, data);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {useMode === "create" ? (
          <Button>
            <span>{icon}</span> {triggerMessage}
          </Button>
        ) : (
          <button className="focus:bg-accent hover:bg-accent w-full focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            {icon} {triggerMessage}
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogDescription></AlertDialogDescription>
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode === "create" ? "Crear Nuevo Curso" : "Modificar Curso"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="nombre">Nombre del Curso</Label>
              <Input id="nombre" {...register("nombre")} />
            </div>
            <div className="grid gap-3 md:col-span-1 col-span-2">
              <Label htmlFor="genero">Géneros</Label>
              <select
                id="genero"
                {...register("genero_id", {
                  valueAsNumber: true,
                  required: "El Género es requerido",
                })}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">Selecciona un Género</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nombre}
                  </option>
                ))}
              </select>
              {errors.genero_id && (
                <p className="text-red-600 text-sm">
                  {errors.genero_id.message}
                </p>
              )}
            </div>
            <div className="grid gap-3  md:col-span-1 col-span-2">
              <Label htmlFor="nivel">Nivel</Label>
              <Input
                id="nivel"
                {...register("nivel")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="precio_normal">Precio normal</Label>
              <Input
                id="precio_normal"
                type="number"
                {...register("precio_normal", { valueAsNumber: true })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="precio_apoyo">Precio apoyo</Label>
              <Input
                id="precio_apoyo"
                type="number"
                {...register("precio_apoyo", { valueAsNumber: true })}
              />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="sede">Sede</Label>
              <select
                id="sede"
                {...register("sede_id", { valueAsNumber: true, required: 'La Sede es requerida' })}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">Selecciona una sede</option>
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </select>
              {errors.sede_id && (
                <p className="text-red-600 text-sm">
                  {errors.sede_id.message}
                </p>
              )}
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
