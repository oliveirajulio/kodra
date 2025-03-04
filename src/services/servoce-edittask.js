import service from './service';

function editTask(taskId, updatedTaskData) {
  return new Promise((resolve, reject) => {
    service
      .put(`/tasks/${taskId}`, updatedTaskData) // Envia os dados editados para o backend
      .then((response) => {
        console.log("Tarefa editada com sucesso:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao editar a tarefa:", error);
        reject(error);
      });
  });
}

export default editTask;
