import service from './service';

function getUser() {
  return new Promise((resolve, reject) => {
    service.get('/user')
      .then((response) => {
        console.log("Usuário recebido:", response.data); // Verifica a resposta no console
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
        reject(error);
      });
  });
}

export default getUser;
