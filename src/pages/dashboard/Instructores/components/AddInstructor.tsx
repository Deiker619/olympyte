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
import { useInstructores } from "@/hooks/Instructores/useInstructores";
import type { IntructorCreate } from "@/interfaces/Intructor";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type ModeType = "create" | "editing";

interface CreateInstructorProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  instructor?: IntructorCreate;
  id?:number
}

export function AddInstructor({
  mode = "create",
  triggerMessage,
  icon,
  instructor,
  id
}: CreateInstructorProps) {
  const [useMode] = useState<ModeType>(mode);
  const { intructorCreate, updateInstructor } = useInstructores();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<IntructorCreate>({
    mode: "onChange",
    defaultValues: instructor || {
      id: 0,
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
    },
  });

  useEffect(() => {
    if (instructor) reset(instructor);
  }, [instructor, reset]);

  const handleClick = (data: IntructorCreate) => {
    if (useMode === "create") {
      intructorCreate(data);
    } else {
      updateInstructor(id??0, data);
    }
    reset();
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
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode === "create"
                ? "Registrar Nuevo Instructor"
                : "Modificar Instructor"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-3  md:col-span-1 col-span-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                {...register("nombre", { required: "El nombre es requerido" })}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm">{errors.nombre.message}</p>
              )}
            </div>

            <div className="grid gap-3  md:col-span-1 col-span-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                {...register("apellido", {
                  required: "El apellido es requerido",
                })}
              />
              {errors.apellido && (
                <p className="text-red-600 text-sm">
                  {errors.apellido.message}
                </p>
              )}
            </div>

            <div className="grid gap-3 col-span-2">
              <Label htmlFor="id">Cédula del Instructor</Label>
              <Input
                id="id"
                type="number"
                {...register("id", { required: "La cédula es requerida" })}
              />
              {errors.id && (
                <p className="text-red-600 text-sm">{errors.id.message}</p>
              )}
            </div>

            <div className="grid gap-3 col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="grid gap-3 col-span-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                {...register("telefono", {
                  required: "El teléfono es requerido",
                })}
              />
              {errors.telefono && (
                <p className="text-red-600 text-sm">
                  {errors.telefono.message}
                </p>
              )}
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()}>
              Cancelar
            </AlertDialogCancel>
            <Button type="submit" disabled={!isValid} variant="default">
              Guardar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
