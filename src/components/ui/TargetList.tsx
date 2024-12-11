import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import TargetCard from './TargetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useARStore } from '../../store/arStore';

const TargetList: React.FC = () => {
  const { targets, isLoading, error, loadTargets, setSelectedTarget } = useARStore();

  useEffect(() => {
    loadTargets();
  }, [loadTargets]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <Grid container spacing={3} padding={3}>
      {targets.map((target) => (
        <Grid item xs={12} sm={6} md={4} key={target.id}>
          <TargetCard target={target} onSelect={setSelectedTarget} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TargetList;