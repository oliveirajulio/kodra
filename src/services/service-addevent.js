import service from './service';

function addEvent(newEvent) {
  return new Promise((resolve, reject) => {
    // Mesma lógica: passa a data no endpoint
    service.post(`/events/${newEvent.date}`, newEvent)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export default addEvent;
