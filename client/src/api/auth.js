import axiosService from '../axios/axiosServices';

const url = 'api';
export const signUp = ({ username, email, password }) => {
  return axiosService.post(`${url}/signup`, { username, email, password });
};

export const signIn = ({ email, password }) => {
  return axiosService.post(`${url}/signin`, { email, password });
};

export const auth = () => {
  return axiosService.get(`${url}/auth`);
};
