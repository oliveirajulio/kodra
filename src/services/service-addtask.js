import service from './service';

function addTask(newRow) {
  return new Promise((resolve, reject) => {
    service.post("/tasks/rows", newRow)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export default addTask;
