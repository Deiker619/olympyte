import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCursos } from "@/hooks/Cursos/useCursos";
import { useEstudiantes } from "@/hooks/Estudiantes/Estudiantes";
import type { PagoCreate } from "@/interfaces/Estudiante";
import { addPago } from "@/services/Pagos/PagosServices";
import { IconCash } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddPagos = () => {
  const { estudiantes } = useEstudiantes();
  const { cursos } = useCursos();
  console.log(cursos);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<PagoCreate>({
    mode: "onChange",
    defaultValues: {
      estudiante_id: 0,
      curso_id: 0,
      mes: 0,
      anio: 2025,
      monto: 0,
      metodo_pago: "",
      nota: "",
      fecha: "",
    },
  });

  const createPago = async (pago: PagoCreate) => {
    const data = await addPago(pago);
    if (data.status == 201) {
      toast.success("Pago registrado correctamente");
    }else{
        toast.error("Ocurrió un erro al registrar el pago");
    }
  };

  const handleClick = (data: PagoCreate) => {
    console.log(data);

    createPago(data);

    reset();
  };
  return (
    <div className="mx-auto container">
      <p className="mb-10 text-center text-2xl">Registrar Pago </p>
      <form onSubmit={handleSubmit(handleClick)}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="grid gap-3 col-span-2 md:col-span-1">
            <Label htmlFor="sede">Estudiantes</Label>
            <select
              id="sede"
              {...register("estudiante_id", { valueAsNumber: true })}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Selecciona un Estudiante</option>
              {estudiantes.map((estudiante) => (
                <option key={estudiante.id} value={estudiante.id}>
                  {estudiante.nombre} - {estudiante.id}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 col-span-2 md:col-span-1 ">
            <Label htmlFor="sede">Curso</Label>
            <select
              id="curso"
              {...register("curso_id", { valueAsNumber: true })}
              className="border border-gray-300 rounded-md p-2 text-sm w-full"
            >
              <option value="">Selecciona un Curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre} - {curso.sede.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 col-span-2 md:col-span-1">
            <Label htmlFor="mes">Mes</Label>
            <select
              id="mes"
              {...register("mes", { required: "El mes es requerido" })}
              className="border border-gray-300 rounded-md p-2 text-sm" // o la clase que uses para estilizar
            >
              <option value="">Selecciona un mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            {errors.mes && (
              <p className="text-red-600 text-sm">{errors.mes.message}</p>
            )}
          </div>

          <div className="grid gap-3 col-span-2 md:col-span-1">
            <Label htmlFor="anio">Año</Label>
            <Input id="anio" type="text" {...register("anio")} />
          </div>

          <div className="grid gap-3 col-span-2">
            <Label htmlFor="telefono">Monto</Label>
            <Input
              id="telefono"
              {...register("monto", {
                required: "El monto es requerido",
              })}
            />
            {errors.monto && (
              <p className="text-red-600 text-sm">{errors.monto.message}</p>
            )}
          </div>
          <div className="grid gap-3 col-span-2 md:col-span-1">
            <Label htmlFor="metodo_pago">Método de Pago</Label>
            <select
              id="metodo_pago"
              {...register("metodo_pago", {
                required: "El método de pago es requerido",
              })}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Selecciona un método</option>
              <option value="EFECTIVO">EFECTIVO</option>
              <option value="ZELLE">ZELLE</option>
              <option value="TRANSFERENCIA">TRANSFERENCIA</option>
            </select>
            {errors.metodo_pago && (
              <p className="text-red-600 text-sm">
                {errors.metodo_pago.message}
              </p>
            )}
          </div>
          <div className="grid gap-3 col-span-2 md:col-span-1">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              {...register("fecha", { required: "La fecha es requerida" })}
              className="border border-gray-300 rounded-md p-2 text-sm" // o la clase que uses para estilizar
            ></Input>
            {errors.mes && (
              <p className="text-red-600 text-sm">{errors.fecha?.message}</p>
            )}
          </div>
          <div className="grid gap-3 col-span-2">
            <Label htmlFor="nota">Nota</Label>
            <textarea
              id="nota"
              {...register("nota")}
              className="border border-gray-300 rounded-md p-2 text-sm"
              rows={3}
            />

            {errors.monto && (
              <p className="text-red-600 text-sm">{errors.nota?.message}</p>
            )}
          </div>
          <Button
            className="md:col-span-1 col-span-2"
            type="submit"
            disabled={!isValid}
          >
            <IconCash></IconCash> Pagar
          </Button>
        </div>
      </form>
    </div>
  );
};
