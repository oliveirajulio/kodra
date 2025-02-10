import service from './service';

// Criar uma nova área
export function createArea(areaName) {
    return new Promise((resolve, reject) => {
      service.post('/areas', { name: areaName }) // Agora usa o parâmetro correto
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
  

// Listar todas as áreas
export function getAreas() {
  return new Promise((resolve, reject) => {
    service.get('/areas')
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

// Deletar uma área
export function deleteArea(areaId) {
  return new Promise((resolve, reject) => {
    service.delete(`/areas/${areaId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
