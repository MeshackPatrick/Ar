import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Target } from '../../types/ar';

interface TargetCardProps {
  target: Target;
  onSelect: (target: Target) => void;
}

const TargetCard: React.FC<TargetCardProps> = ({ target, onSelect }) => {
  return (
    <Card 
      onClick={() => onSelect(target)}
      sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.02)' } }}
    >
      <CardMedia
        component="img"
        height="200"
        image={target.imageUrl}
        alt={target.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {target.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click to view in AR
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TargetCard;