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
import { useCursos } from "@/hooks/Cursos/useCursos";
import type { EstudianteCreateCurso } from "@/interfaces/Estudiante";
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
  const { cursos } = useCursos();
  const handleClick = (data: EstudianteCreateCurso) => {
    console.log(data);
  };
  const { register, /* control, */ handleSubmit } = useForm<EstudianteCreateCurso>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      apellido: '',
      cursos: [{ nombre: '' }]


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
            <div className="grid gap-3 ">
              <Label htmlFor="nombre">Nombre del Estudiante</Label>
              <Input id="nombre" {...register("nombre", { required: 'El nombre es requerido' })} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="apellido">Apellido del Estudiante</Label>
              <Input id="apellido" {...register("apellido")} />
            </div>
            <div className="grid col-span-2 gap-2 w-full bg-gray-200 p-3 rounded-2xl">
              <Label className="text-center">Cursos a Inscribir</Label>
              <div className="grid-cols-2 grid gap-3 bg">
              {cursos?.map((curso) => (
                <div key={curso.id}>
                  <label  className="inline-flex gap-1 items-center">
                    <input
                      type="checkbox"
                      value={curso.id}
                      {...register("cursos")}
                    />
                    {curso.nombre}
                  </label>
                </div>
              ))}

              </div>
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
