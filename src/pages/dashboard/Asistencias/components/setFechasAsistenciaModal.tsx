import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconDetails } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SetFechasAsistenciaModal = ({ id }: { id: number }) => {
    const navigate = useNavigate()
    const [fechaClase, setFechaClase] = useState("");

    // 📅 Obtener la fecha de hoy en formato YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.value;
        if (selected > today) {
            setFechaClase(today); // 👈 corrige si alguien intenta colocar futuro
        } else {
            setFechaClase(selected);
        }
    };


    return (
        <>
            <AlertDialog>

                <AlertDialogTrigger asChild>
                    {/* Botón con estilos de DropdownMenuItem */}
                    <button className="focus:bg-accent w-full hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                        <IconDetails />  Detalles de asistencia
                    </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Selecciona la Fecha de la asistencia </AlertDialogTitle>
                        <AlertDialogDescription>
                            <input
                                type="date"
                                value={fechaClase}
                                max={today}
                                onChange={handleFechaChange}
                                className="w-full border rounded-md p-2 text-sm"
                            />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={!fechaClase || fechaClase > today} onClick={() => navigate(`/cursos/asistencias-detalles/${id}`, {
                            state: { fecha: fechaClase }
                        })}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}
