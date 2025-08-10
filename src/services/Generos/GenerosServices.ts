import api from "@/api/apiMock";

export const getGeneros = async () => {
  const response = await api.get("data/generos/data.json"); // ruta relativa al baseURL
  return response;
};