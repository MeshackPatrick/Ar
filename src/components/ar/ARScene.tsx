import React, { useEffect } from 'react';
import 'aframe';
import 'mind-ar';
import { ARSceneProps } from '../../types/ar';
import ARMarker from './ARMarker';
import ARAssets from './ARAssets';
import useARInitialization from '../../hooks/useARInitialization';

const ARScene: React.FC<ARSceneProps> = ({ target }) => {
  const { initializeAR } = useARInitialization();

  useEffect(() => {
    initializeAR();
  }, [target, initializeAR]);

  return (
    <a-scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      renderer="antialias: true; alpha: true"
      className="ar-scene"
    >
      <ARAssets target={target} />
      <ARMarker target={target} />
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;