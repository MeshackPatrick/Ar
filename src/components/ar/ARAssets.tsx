import React from 'react';
import { Target } from '../../types/ar';

interface ARAssetsProps {
  target: Target;
}

const ARAssets: React.FC<ARAssetsProps> = ({ target }) => {
  return (
    <a-assets>
      <img id="target-image" src={target.imageUrl} />
      <a-asset-item id="target-model" src={target.modelUrl}></a-asset-item>
    </a-assets>
  );
};

export default ARAssets;