import service from './service'

function getTask(date) {
  return new Promise((resolve, reject) => {
      service.get(`/tasks?date=${date}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export default getTask;
