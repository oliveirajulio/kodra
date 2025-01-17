import service from './service';

function getTask(date) {
  return new Promise((resolve, reject) => {
    service.get(`/tasks/${date}`)
      .then((response) => {
        console.log("Tarefas recebidas:", response.data);  // Adicione isso para verificar a resposta
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
        reject(error);
      });
  });
}

export default getTask;