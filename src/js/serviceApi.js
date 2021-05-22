import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3003';

export const getWorkers = () => {
  return axios
    .get('/workers')
    .then(res => res.data)
    .catch(console.log);
};

export const updateWorker = (id, data) => {
  return axios
    .patch(`/workers/${id}`, data)
    .then(res => res.data)
    .catch(console.log);
};

export const getTables = () => {
  return axios
    .get('/tables')
    .then(res => res.data)
    .catch(console.log);
};
export const getMenu = () => {
  return axios
    .get('/menu')
    .then(res => res.data)
    .catch(console.log);
};

export const addUser = ({ login, password }) =>
  axios
    .post('/users', { login, password, id: password })
    .then(({ data }) => data)
    .catch(console.log);

export const getUser = password =>
  axios
    .get('/users/' + password)
    .then(({ data }) => data)
    .catch(e => console.log(e));

export const updateUserStatus = ({ userId, status }) =>
  axios
    .patch('/users/' + userId, { status })
    .then(({ data }) => data)
    .catch(console.log);
