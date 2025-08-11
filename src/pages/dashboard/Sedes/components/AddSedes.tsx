
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
import React, { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode
}

export function AddSedes({
  mode = "create",
  triggerMessage,
  icon
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { addNewSede } = useSedes()

  const handleClick = (data: SedeCreate) => {
    console.log(data)
    addNewSede(data)
    reset()
  };
  const { register, /* control, */ reset, handleSubmit, formState: { isValid, errors } } = useForm<SedeCreate>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      direccion: '',
      telefono: ''
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
              {useMode == "create" ? "Crear Sede" : "Modificar Sede"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="nombre">Nombre de la Sede</Label>
              <Input
                id="nombre"
                {...register("nombre", { required: "El nombre es obligatorio" })}
              />

              {errors.nombre && (
                <p className="text-red-600 text-sm">{errors.nombre.message}</p>
              )}
            </div>
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="nombre">Teléfono de la Sede</Label>
              <Input
                id="telefono"
                {...register("telefono", { required: "El teléfono es obligatorio" })}
              />

              {errors.nombre && (
                <p className="text-red-600 text-sm">{errors.nombre.message}</p>
              )}
            </div>
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="nombre">Dirección</Label>
              <Input
                id="direccion"
                {...register("direccion", { required: "La dirección es obligatoria" })}
              />

              {errors.direccion && (
                <p className="text-red-600 text-sm">{errors.direccion.message}</p>
              )}
            </div>

          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()}>Cancelar</AlertDialogCancel>
            <Button type="submit" disabled={!isValid} variant={"default"}>
              Guardar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
