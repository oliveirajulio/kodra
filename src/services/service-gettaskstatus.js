import service from "./service";

function GetTasksStatus() {
  return new Promise((resolve, reject) => {
    service
      .get("/tasks/status")
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
