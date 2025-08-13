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
import type { EstudianteHasCurso } from "@/interfaces/Estudiante";
import { useEffect, useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  estudiante?: EstudianteHasCurso;
  id?:number

}

export function AddEstudiante({
  mode = "create",
  triggerMessage,
  icon,
  estudiante,
  id
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { estudianteCreate,updateEstudiante } = useEstudiantes();

  const { register, handleSubmit, reset } = useForm<EstudianteHasCurso>({
    mode: "onChange",
    defaultValues: estudiante || { id: 0, nombre: "", apellido: "" },
  });

  useEffect(() => {
    if (estudiante) reset(estudiante);
  }, [estudiante, reset]);

  const handleClick = (data: EstudianteHasCurso) => {
    if (useMode === "create") {
      estudianteCreate(data);
    } else {
      console.log(data.id, data)
      updateEstudiante(id??0, data)
    }
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
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode === "create"
                ? "Inscribir Nuevo Estudiante"
                : "Modificar Estudiante"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2  gap-3 mb-4">
            <div className="grid gap-3 col-span-2 md:col-span-1">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" {...register("nombre", { required: true })} />
            </div>
            <div className="grid gap-3 col-span-2 md:col-span-1">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" {...register("apellido")} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="id">Cédula</Label>
              <Input id="id" {...register("id")} />
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

