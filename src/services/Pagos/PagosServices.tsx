import api from "@/api/api";
import type { PagoCreate } from "@/interfaces/Estudiante";

export const addPago = async (pago:PagoCreate) => {
  const response = await api.post("pagos", pago); // ruta relativa al baseURL
  return response;
};