import api, { handleApiError } from '../utils/api';
import { Target } from '../types/ar';
import { validateTarget } from '../utils/validation';

export const fetchTargets = async (): Promise<Target[]> => {
  try {
    const response = await api.get('/targets');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createTarget = async (target: Omit<Target, 'id'>): Promise<Target> => {
  if (!validateTarget(target as Partial<Target>)) {
    throw new Error('Invalid target data');
  }

  try {
    const response = await api.post('/targets', target);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};