import service from './service';

function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    service.get(`/check-email`, { params: { email } })
      .then((response) => resolve(response.data.exists))
      .catch((error) => reject(error));
  });
}

export default checkEmailExists;
