import service from './service';

function addTask(newRow) {
  return new Promise((resolve, reject) => {
    // Ajuste para passar a data no endpoint
    service.post(`/tasks/${newRow.date}`, newRow)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export default addTask;
