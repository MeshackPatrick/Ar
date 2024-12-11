import axios from 'axios';
import { Target } from '../types/ar';

const API_URL = 'YOUR_GOOGLE_SHEETS_API_URL';

export const fetchTargets = async (): Promise<Target[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching targets:', error);
    return [];
  }
};

export const uploadTarget = async (target: Omit<Target, 'id'>): Promise<Target> => {
  try {
    const response = await axios.post(API_URL, target);
    return response.data;
  } catch (error) {
    console.error('Error uploading target:', error);
    throw error;
  }
};