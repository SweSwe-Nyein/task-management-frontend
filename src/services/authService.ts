import { LoginBody, RegisterBody } from '../types/auth';
import api from './api';

const login = async (body: LoginBody) => {
  return api
    .post('/auth/login', body)
    .then(response => response.data);
}

const regsiter = async (body: RegisterBody) => {
  return api
    .post('/auth/register', body)
    .then(response => response.data);
}

const logout = async () => {
  return api
    .post('/auth/logout')
    .then(response => response.data);
}

const getProfile = async () => {
  return api
    .get('/auth/profile')
    .then(response => response.data);
}

const getUserList = async () => {
  return api
    .get('/users')
    .then(response => response.data);
}

export default {
  login,
  regsiter,
  logout,
  getProfile,
  getUserList,
}