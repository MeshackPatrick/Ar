import axios from 'axios';
import { API_CONFIG } from '../config/constants';

const api = axios.create({
  baseURL: API_CONFIG.GOOGLE_SHEETS_API_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

export const handleApiError = (error: any): never => {
  const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
  throw new Error(message);
};

export default api;