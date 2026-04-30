import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Cấu hình base URL cho API (có thể thay đổi tùy theo môi trường)
const BASE_URL = 'https://server-elysia.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý token hoặc log (nếu cần)
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Xử lý lỗi chung (401, 500, v.v.)
    if (error.response?.status === 401) {
      // Logout người dùng nếu token hết hạn
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
