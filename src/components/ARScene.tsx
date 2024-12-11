import React, { useEffect } from 'react';
import 'aframe';
import 'mind-ar';
import { ARSceneProps } from '../types/ar';

const ARScene: React.FC<ARSceneProps> = ({ target }) => {
  useEffect(() => {
    // Initialize AR components when the scene mounts
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      if (!sceneEl.hasLoaded) {
        sceneEl.addEventListener('loaded', () => {
          console.log('AR Scene loaded');
        });
      }
    }
  }, [target]);

  return (
    <a-scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      renderer="antialias: true; alpha: true"
    >
      <a-assets>
        <img id="target-image" src={target.imageUrl} />
        <a-asset-item id="target-model" src={target.modelUrl}></a-asset-item>
      </a-assets>

      <a-marker preset="custom" type="pattern" url={target.imageUrl}>
        <a-entity
          position="0 0 0"
          rotation="-90 0 0"
          scale="0.5 0.5 0.5"
          gltf-model="#target-model"
          animation="property: rotation; to: -90 360 0; dur: 2000; easing: linear; loop: true"
        ></a-entity>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;