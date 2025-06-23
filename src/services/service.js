import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://backend-kbn-production.up.railway.app";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

// 🔑 flag para impedir múltiplos redirects
let isRedirecting = false;

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      console.error("Token inválido ou não autorizado.");

      // Evita múltiplos redirects
      isRedirecting = true;

      // Limpa o token
      localStorage.removeItem('token');

      // Mostra o toast
      toast.error("Sessão expirada. Faça login novamente.", {
        position: "top-center",
      });

      // Redireciona depois de um tempo para exibir o toast
      setTimeout(() => {
        window.location.href = "/login"; // ou "/unauthorized"
      }, 10000);
    }

    return Promise.reject(error); // <- Isso precisa ficar, mas vamos tratar no componente!
  }
);

export default service;
