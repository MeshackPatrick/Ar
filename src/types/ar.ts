export interface Target {
  id: string;
  name: string;
  imageUrl: string;
  modelUrl: string;
}

export interface ARSceneProps {
  target: Target;
}

export interface TargetListProps {
  targets: Target[];
  onSelectTarget: (target: Target) => void;
}