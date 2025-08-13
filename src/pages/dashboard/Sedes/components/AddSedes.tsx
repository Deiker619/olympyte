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
import { useSedes } from "@/hooks/Sedes/useSedes";
import type { SedeCreate } from "@/interfaces/Sede";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type ModeType = "create" | "editing";

interface CreateSedeProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  sede?: SedeCreate;
  id?:number
}

export function AddSedes({
  mode = "create",
  triggerMessage,
  icon,
  sede,
  id
}: CreateSedeProps) {
  const [useMode] = useState<ModeType>(mode);
  const { addNewSede, updateSede } = useSedes();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SedeCreate>({
    mode: "onChange",
    defaultValues: sede || {
      nombre: "",
      direccion: "",
      telefono: "",
    },
  });

  useEffect(() => {
    if (sede) reset(sede);
  }, [sede, reset]);

  const handleClick = (data: SedeCreate) => {
    if (useMode === "create") {
      addNewSede(data);
    } else {
      updateSede(id??0,data); // Ajusta según tu firma de update
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
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode === "create" ? "Crear Sede" : "Modificar Sede"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="nombre">Nombre de la Sede</Label>
              <Input
                id="nombre"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm">{errors.nombre.message}</p>
              )}
            </div>

            <div className="grid gap-2 col-span-2">
              <Label htmlFor="telefono">Teléfono de la Sede</Label>
              <Input
                id="telefono"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                })}
              />
              {errors.telefono && (
                <p className="text-red-600 text-sm">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            <div className="grid gap-2 col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                {...register("direccion", {
                  required: "La dirección es obligatoria",
                })}
              />
              {errors.direccion && (
                <p className="text-red-600 text-sm">
                  {errors.direccion.message}
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
