import axios from "axios";

const BASE_URL = "https://backend-kbn-production.up.railway.app";  // Com https

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true // Certifique-se de que isso está configurado para enviar cookies e tokens
});

service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Verifica o token no localStorage
        if (token) {
            config.headers['x-access-token'] = token; // Adiciona o token ao cabeçalho
        } else {
            console.warn("Token não encontrado no localStorage."); // Aviso se não encontrar o token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Token inválido ou não autorizado.");
            // Opcional: Redirecionar para a tela de login
        } else {
            console.error("Erro na requisição", error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

export default service;
