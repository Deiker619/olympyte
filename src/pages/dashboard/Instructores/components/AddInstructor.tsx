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
import { useState } from "react";
import { useForm /* Controller */ } from "react-hook-form";

type ModeType = "create" | "editing";
interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
}

export function AddInstructor({
  mode = "create",
  triggerMessage,
  icon,
}: CreateCursoProps) {
  const [useMode] = useState<"create" | "editing">(mode);
  const { intructorCreate } = useInstructores();
  const handleClick = (data: IntructorCreate) => {
    console.log(data);
    intructorCreate(data);

  };
  const { register, /* control, */ handleSubmit } = useForm<IntructorCreate>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      id: 0,
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <span>{icon}</span> {triggerMessage}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useMode == "create"
                ? "Registrar Nuevo Instructor"
                : "Modificar Instructor"}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="grid gap-3 ">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                {...register("nombre", { required: "El nombre es requerido" })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" {...register("apellido",  { required: "El apellido es requerido" })} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="id">Cédula del Instructor</Label>
              <Input id="id" {...register("id", { required: "La Cédula es requerida" })} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="id">Email</Label>
              <Input id="id" {...register("email")} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="id">Télefono</Label>
              <Input id="id" {...register("telefono",  { required: "El Télefono es requerido" })} />
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
