import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3003';

export const getWorkers = () => {
  return axios.get('/workers').then(res => res.data);
};

export const updateWorker = (id, data) => {
  return axios.patch(`/workers/${id}`, data).then(res => res.data);
};
