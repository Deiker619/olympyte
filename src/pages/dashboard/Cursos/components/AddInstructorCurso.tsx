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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useInstructores } from "@/hooks/Instructores/useInstructores";
import { Button } from "@/components/ui/button";
import { useCursos } from "@/hooks/Cursos/useCursos";

type InstructorAddCursoForm = {
  instructores: number;
};

type ModeType = "create" | "editing";

interface CreateCursoProps {
  mode?: ModeType;
  triggerMessage: string;
  icon: React.ReactNode;
  curso: number;
}

export function AddInstructorCurso({
  triggerMessage,
  icon,
  curso,
}: CreateCursoProps) {
  const { instructores } = useInstructores();
  const {addInstructorCurso} = useCursos();

  const handleClick = (data: InstructorAddCursoForm) => {
    addInstructorCurso(curso, data.instructores)
    console.log("Instructores seleccionados:", data.instructores, curso);
  };

  const { register, handleSubmit } = useForm<InstructorAddCursoForm>({
    mode: "onChange",
    defaultValues: {
      instructores: 0,
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Botón con estilos de DropdownMenuItem */}
        <button className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          {icon} {triggerMessage}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-200">
        <form onSubmit={handleSubmit(handleClick)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Agregar Instructor al curso</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-3 col-span-2 mb-3">
            <Label htmlFor="sede">Instructores</Label>
            <select
              id="sede"
              {...register("instructores", { valueAsNumber: true })}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Selecciona un instructor</option>
              {instructores.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.nombre}  {instructor.apellido}
                </option>
              ))}
            </select>
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
