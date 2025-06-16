import service from './service';

function getEvent(date) {
  return new Promise((resolve, reject) => {
    service.get(`/events?date=${date}`)
      .then((response) => {
        console.log("Events received:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        reject(error);
      });
  });
}

export default getEvent;