import service from "./service";

function GetTasksStatus(date) {
  return new Promise((resolve, reject) => {
    service
      .get(`/tasks/status/${date}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar status das tarefas:", error.response?.data || error.message);
        reject(error);
      });
  });
}

export default GetTasksStatus;
