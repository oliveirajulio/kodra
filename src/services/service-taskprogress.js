import service from "./service";

function GetTasksProgress(date) {
  return new Promise((resolve, reject) => {
    service
      .get(`/tasks/progress/${date}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar progresso das tarefas:", error.response?.data || error.message);
        reject(error);
      });
  });
}

export default GetTasksProgress;
