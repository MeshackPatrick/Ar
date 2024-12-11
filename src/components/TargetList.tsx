import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Target, TargetListProps } from '../types/ar';

const TargetList: React.FC<TargetListProps> = ({ targets, onSelectTarget }) => {
  return (
    <Grid container spacing={3} padding={3}>
      {targets.map((target: Target) => (
        <Grid item xs={12} sm={6} md={4} key={target.id}>
          <Card 
            onClick={() => onSelectTarget(target)}
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
        </Grid>
      ))}
    </Grid>
  );
};

export default TargetList;