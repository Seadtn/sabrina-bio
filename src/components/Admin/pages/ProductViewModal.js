import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const ProductViewModal = ({ open, onClose, product }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>View Product</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Name: {product?.name}</Typography>
        <Typography variant="body1">Description: {product?.description}</Typography>
        <Typography variant="body1">Price: ${product?.price}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductViewModal;
