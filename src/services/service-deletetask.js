import service from './service';

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    // Verifique se `taskId` é realmente uma string ou número
    console.log('Deletando tarefa com ID:', taskId);  // Verificação no console

    service
      .delete(`/tasks/${taskId}`)  // Passando apenas o taskId como string
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.error("Erro ao deletar:", error.response?.data || error.message);
        reject(error);
      });
  });
}
export default deleteTask;
