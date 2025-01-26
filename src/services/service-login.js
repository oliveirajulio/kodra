import service from './service';

function LoginCall(email, password) {
    return new Promise((resolve, reject) => {
        service.post('/login', { email, password })
            .then((response) => {
                const token = response.data.token; // Supondo que o backend retorne o token no campo "token"
                if (token) {
                    localStorage.setItem('token', token); // Salva o token no localStorage
                    console.log("Login bem-sucedido, token armazenado.");
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error.response?.data || error.message);
                reject(error);
            });
    });
}

export default LoginCall;
