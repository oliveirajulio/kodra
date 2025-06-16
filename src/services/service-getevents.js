import service from './service';

function getEvent(date = null) {
  return new Promise((resolve, reject) => {
    // Se date for fornecido, adiciona como parâmetro
    const url = date ? `/events?date=${date}` : '/events';
    
    service.get(url)
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