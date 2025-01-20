import service from './service';

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    service
      .delete(`/tasks/${taskId}`) // Passa o ID da tarefa no endpoint do backend
      .then((response) => {
        console.log("Tarefa deletada com sucesso:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao deletar a tarefa:", error);
        reject(error);
      });
  });
}

export default deleteTask;
