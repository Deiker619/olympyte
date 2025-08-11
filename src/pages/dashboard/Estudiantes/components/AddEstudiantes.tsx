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
import type { Estudiante } from "@/interfaces/Estudiante";
import { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode
};

export function AddEstudiante({
  mode = "create",
  triggerMessage,
  icon
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const handleClick = (data: Estudiante) => {
    console.log(data);
  };
  const { register, /* control, */ handleSubmit } = useForm<Estudiante>({
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
              {useMode == "create" ? "Inscribir Nuevo Estudiante" : "Modificar Estudiante"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="nombre">Nombre del Estudiante</Label>
              <Input id="nombre" {...register("nombre")} />
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
