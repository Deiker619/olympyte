import axios from "axios";

const api = axios.create({
  baseURL: "/", // Cambia por tu backend
  headers: {
    "Content-Type": "application/json"
  }
});


export default api;