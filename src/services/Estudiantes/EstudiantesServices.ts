
import api from "@/api/apiMock";
export const getEstudiantes = async () => {
  const response = await api.get("data/estudiantes/listado.json"); // ruta relativa al baseURL
  console.log(response.data)
  return response;
};
export const getEstudiantesDetalles = async () => {
  const response = await api.get("data/estudiante_detalle/5002.json"); // ruta relativa al baseURL
  return response;
};

