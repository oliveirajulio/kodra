import service from './service';

function register(username, email, password) {
  return new Promise((resolve, reject) => {
    service.post('/register', {
      username,
      email,
      password,
    })
    .then((response) => {
      console.log("Usuário registrado com sucesso:", response.data); // Log para confirmar sucesso
      resolve(response.data);
    })
    .catch((error) => {
        console.error("Erro ao registrar usuário:", error.response?.data || error.message);
        alert(`Erro: ${error.response?.data?.message || 'Erro ao registrar usuário. Tente novamente.'}`);
      });      
  });
}

export default register;
