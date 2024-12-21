import React, { useState } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button, 
  TextField,
  Box
} from '@mui/material';

const CategoryFormModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    creationDate: new Date().toISOString().split('T')[0],
  });



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle>{'Add Category'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'row',alignItems: 'center',justifyContent:'space-evenly', gap: 2, my: 2 ,minWidth: '800px' }}>
        <Box sx={{ display: 'flex', minWidth: '400px',marginTop: '20px'  }}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{color:"#2fcb00"}}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" style={{background:"#2fcb00"}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormModal;