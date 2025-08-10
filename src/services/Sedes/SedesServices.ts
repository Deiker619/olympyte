import api from "@/api/apiMock";

export const getSedes = async () => {
  const response = await api.get("data/sedes/sedes.json"); // ruta relativa al baseURL
  console.log(response.data)
  return response;
};