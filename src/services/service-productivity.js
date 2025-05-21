import service from "./service";

function GetProductivity(date) {
  return new Promise((resolve, reject) => {
    service
      .get(`/tasks/productivity?date=${date}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar evolução da produtividade:", error.response?.data || error.message);
        reject(error);
      });
  });
}

export default GetProductivity;
