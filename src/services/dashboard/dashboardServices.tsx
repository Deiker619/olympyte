import api from "@/api/api";

export const getkpis = async () => {
  const response = await api.get("dashboard"); // ruta relativa al baseURL
  return response;
};