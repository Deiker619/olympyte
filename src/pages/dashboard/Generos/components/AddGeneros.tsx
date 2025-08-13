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
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type ModeType = "create" | "editing";
interface GeneroForm {
  id?: number;
  nombre: string;
}
interface CreateGeneroProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  genero?: GeneroForm;
  id?:number
}

export function AddGeneros({
  mode = "create",
  triggerMessage,
  icon,
  genero,
  id
}: CreateGeneroProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { addNewGenero, generoUpdate } = useGeneros();

  const { register, reset, handleSubmit, formState: { isValid, errors } } =
    useForm<GeneroForm>({
      mode: "onChange",
      defaultValues: genero || { nombre: "" },
    });

  useEffect(() => {
    if (genero) reset(genero);
  }, [genero, reset]);

  const handleClick = (data: GeneroForm) => {
    if (useMode === "create") {
      addNewGenero(data);
    } else if (id) {
      generoUpdate(id, data);
    }
    reset();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {useMode === "create"
          ?
          <Button>
            <span>{icon}</span> {triggerMessage}
          </Button>
          :
          <button className="focus:bg-accent hover:bg-accent w-full focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            {icon} {triggerMessage}
          </button>

        }
      </AlertDialogTrigger>
      <AlertDialogDescription></AlertDialogDescription>
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode === "create" ? "Crear Género" : "Modificar Género"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="nombre">Nombre del Género</Label>
              <Input
                id="nombre"
                {...register("nombre", { required: "El nombre es obligatorio" })}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm">{errors.nombre.message}</p>
              )}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()}>
              Cancelar
            </AlertDialogCancel>
            <Button type="submit" disabled={!isValid}>
              Guardar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
