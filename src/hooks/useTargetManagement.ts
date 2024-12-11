import { useCallback } from 'react';
import { useARStore } from '../store/arStore';
import { fetchTargets, createTarget } from '../services/targetService';
import { Target } from '../types/ar';

export const useTargetManagement = () => {
  const { setTargets, setLoading, setError } = useARStore();

  const loadTargets = useCallback(async () => {
    setLoading(true);
    try {
      const targets = await fetchTargets();
      setTargets(targets);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load targets');
    } finally {
      setLoading(false);
    }
  }, [setTargets, setLoading, setError]);

  const addTarget = useCallback(async (target: Omit<Target, 'id'>) => {
    setLoading(true);
    try {
      const newTarget = await createTarget(target);
      setTargets(prev => [...prev, newTarget]);
      return newTarget;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create target');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setTargets, setLoading, setError]);

  return { loadTargets, addTarget };
};