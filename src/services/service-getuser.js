import service from './service';

async function getUser() {
  const response = await service.get('/user');
  return response.data;
}

export default getUser;
