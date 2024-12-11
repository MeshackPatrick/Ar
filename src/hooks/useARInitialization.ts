import { useCallback } from 'react';

const useARInitialization = () => {
  const initializeAR = useCallback(() => {
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl && !sceneEl.hasLoaded) {
      sceneEl.addEventListener('loaded', () => {
        console.log('AR Scene loaded');
      });
    }
  }, []);

  return { initializeAR };
};

export default useARInitialization;