import api from "@/api/api";
import type { Asistencia } from "@/interfaces/Asistencia";
import { toast } from "sonner";

export const CreateAsistencias = async (Asistencia: Asistencia) => {
  console.log(Asistencia)
  try {
    const response = await api.post("/asistencias", Asistencia);
    console.log(response.data);
    toast.success('Asistencia creada correctamente')
    return response.data;
  } catch (error) {
    toast.error("Se produjo un erro al registrar Asistencia");
    console.log(error);
  }
};

export const getAllAsistenciasPorFecha = async (fecha: string, curso:number) => {
    try {
        const response = await api.get(`/asistencias/curso/${curso}/detalle/?fecha=${fecha}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Se produjo un error al obtener asistencias')
        return
    }
};
