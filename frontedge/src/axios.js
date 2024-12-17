import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Set the base URL of your Laravel API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
