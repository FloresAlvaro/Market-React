import axios from "axios";

const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

// Crear instancia de axios con configuración por defecto para Vinted
export const vintedApi = axios.create({
  baseURL: "https://vinted3.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": apiHost,
    "Content-Type": "application/json",
  },
});

// Interceptor para manejo de errores global
vintedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default vintedApi;
