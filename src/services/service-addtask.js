import service from './service';

function addTask(newTask) {
  return new Promise((resolve, reject) => {
    service.post('/tasks', newTask) // Endpoint para adicionar a tarefa
      .then((response) => resolve(response.data)) // Resolve com os dados da resposta
      .catch((error) => reject(error)); // Rejeita com o erro
  });
}

export default addTask;

