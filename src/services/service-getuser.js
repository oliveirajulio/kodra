// getUser.js
import service from './service';

function getUser() {
  return new Promise((resolve, reject) => {
    service.get('/user')
      .then((response) => {
        console.log("Usuário recebido:", response.data); // Log para depuração
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
        reject(error);
      });
  });
}

export default getUser;
