import { apiClient } from './apiClient';

export const register = (payload) => {
  return apiClient.post('/register', payload);
};

export const login = (payload) => {
  return apiClient.post('/login', payload);
};

export const getUserData = (id) => {
  return apiClient.get(`${id}`);
};

export const patchUserData = (id, payload) => {
  return apiClient.patch(`/login/${id}`, payload);
};
