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
import { useEstudiantes } from "@/hooks/Estudiantes/Estudiantes";
import { useSedes } from "@/hooks/Sedes/useSedes";
import type { estudianteAsignSede } from "@/interfaces/Estudiante";
import { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateRoosterProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  sede?: {
    nombre: string;
    id: number;
  };
}

export function AddEstudianteSede({
  mode = "create",
  triggerMessage,
  icon,
  sede,
}: CreateRoosterProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { estudiantes } = useEstudiantes();
  const { addEstudianteInSede} = useSedes();

  const { register, handleSubmit, reset } = useForm<estudianteAsignSede>({
    mode: "onChange",
    defaultValues: {
      estudiante_id: 0,
    },
  });

  const handleClick = (data: estudianteAsignSede) => {
    if(sede?.id){
        data.sede_id = sede.id
        console.log(data)
        addEstudianteInSede(data)
        reset()

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
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode === "create"
                ? "Inscribir Nuevo Estudiante en la Sede"
                : "Modificar Estudiante"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-3 col-span-2 mb-3">
              <Label htmlFor="sede">Estudiantes</Label>
              <select
                id="sede"
                {...register("estudiante_id", { valueAsNumber: true })}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">Selecciona un Estudiante</option>
                {estudiantes.map((estudiante) => (
                  <option key={estudiante.id} value={estudiante.id}>
                    {estudiante.nombre} {estudiante.apellido} - {estudiante.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3 col-span-2 mb-3">
              <Label htmlFor="fecha">Fecha de inscripción</Label>
              <Input type="date"  {...register("fecha_inscripcion", {required: 'La Fecha es requerida'})}></Input>
            </div>
            <div className="grid gap-3 col-span-2 mb-3">
              <Label htmlFor="fecha">Monto Pagado</Label>
              <Input type="text"  {...register("monto_pagado", {required: 'El monto es requerido'})}></Input>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button type="submit">Guardar</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
