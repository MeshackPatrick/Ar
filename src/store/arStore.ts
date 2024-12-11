import create from 'zustand';
import { Target } from '../types/ar';

interface ARStore {
  targets: Target[];
  selectedTarget: Target | null;
  isLoading: boolean;
  error: string | null;
  setTargets: (targets: Target[]) => void;
  setSelectedTarget: (target: Target | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useARStore = create<ARStore>((set) => ({
  targets: [],
  selectedTarget: null,
  isLoading: false,
  error: null,
  setTargets: (targets) => set({ targets }),
  setSelectedTarget: (target) => set({ selectedTarget: target }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));