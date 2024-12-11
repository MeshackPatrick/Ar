import React from 'react';
import { Target } from '../../types/ar';

interface ARMarkerProps {
  target: Target;
}

const ARMarker: React.FC<ARMarkerProps> = ({ target }) => {
  return (
    <a-marker preset="custom" type="pattern" url={target.imageUrl}>
      <a-entity
        position="0 0 0"
        rotation="-90 0 0"
        scale="0.5 0.5 0.5"
        gltf-model="#target-model"
        animation="property: rotation; to: -90 360 0; dur: 2000; easing: linear; loop: true"
      ></a-entity>
    </a-marker>
  );
};

export default ARMarker;