import {
  PayloadRegister,
  ResponseRegister,
  PayloadLogin,
  ResponseLogin,
} from '../types/auth';
import axiosInstance from './axios';

const authService = {
  register: async ({
    email,
    password,
    username,
  }: PayloadRegister): Promise<ResponseRegister> => {
    const response = await axiosInstance.post('/users/register', {
      email,
      password,
      username,
    });
    return response.data;
  },
  login: async ({
    identity,
    password,
  }: PayloadLogin): Promise<ResponseLogin> => {
    const response = await axiosInstance.post('/users/login', {
      identity,
      password,
    });
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<ResponseLogin> => {
    const response = await axiosInstance.post('/users/refresh', {
      refreshToken,
    });
    return response.data;
  },
  profile: async (): Promise<ResponseLogin> => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },
};

export default authService;
