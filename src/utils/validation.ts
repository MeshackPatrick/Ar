import { Target } from '../types/ar';

export const validateTarget = (target: Partial<Target>): boolean => {
  return !!(
    target.id &&
    target.name &&
    target.imageUrl &&
    target.modelUrl &&
    isValidUrl(target.imageUrl) &&
    isValidUrl(target.modelUrl)
  );
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};