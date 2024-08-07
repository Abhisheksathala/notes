import axios from 'axios';
import { BASE_URL } from './Import';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Fixed typo: baseURl to baseURL
  timeout: 10000, // Fixed typo: Timeout to timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error setting authorization header', error);
      // Optionally, you can handle the error in some way, such as notifying the user
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
