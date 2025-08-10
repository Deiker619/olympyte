
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
import React, { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode
}
interface GeneroForm {
  nombre: string;
}

export function AddGeneros({
  mode = "create",
  triggerMessage,
  icon
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { addNewGenero } = useGeneros()

  const handleClick = (data: GeneroForm) => {
    addNewGenero(data)
    reset()
  };
  const { register, /* control, */ reset, handleSubmit, formState: { isValid, errors } } = useForm<GeneroForm>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
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
              {useMode == "create" ? "Crear Género" : "Modificar Curso"}
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
