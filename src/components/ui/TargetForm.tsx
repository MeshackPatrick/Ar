import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTargetManagement } from '../../hooks/useTargetManagement';

interface TargetFormData {
  name: string;
  imageUrl: string;
  modelUrl: string;
}

const TargetForm: React.FC = () => {
  const [formData, setFormData] = useState<TargetFormData>({
    name: '',
    imageUrl: '',
    modelUrl: '',
  });

  const { addTarget } = useTargetManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTarget(formData);
      setFormData({ name: '', imageUrl: '', modelUrl: '' });
    } catch (error) {
      console.error('Failed to add target:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Target Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="3D Model URL"
        name="modelUrl"
        value={formData.modelUrl}
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Target
      </Button>
    </Box>
  );
};

export default TargetForm;