import api from "@/api/api";
import type { PagoCreate } from "@/interfaces/Estudiante";

export const addPago = async (pago:PagoCreate) => {
  const response = await api.post("pagos", pago); // ruta relativa al baseURL
  return response;
};
export const getPagosRecientes = async () =>{
  const response = await api.get(`pagos?limit=${4}`)
  console.log(response.data.data)
  return response.data.data
}