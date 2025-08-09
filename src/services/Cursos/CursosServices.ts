
import api from "@/api/apiMock";

export const getCursos = async () => {
  const response = await api.get("data/cursos/listado.json"); // ruta relativa al baseURL
  return response;
};