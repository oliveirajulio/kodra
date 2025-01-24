import service from './service';

function updateTaskState(taskId, newState) {
  return new Promise((resolve, reject) => {
    service.patch(`/tasks/${taskId}/state`, { state: newState })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export default updateTaskState;
