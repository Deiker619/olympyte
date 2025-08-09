import axios from "axios";

const api = axios.create({
  baseURL: "https://tuservidor.com/api", // Cambia por tu backend
  headers: {
    "Content-Type": "application/json"
  }
});

// Ejemplo de interceptor para auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;