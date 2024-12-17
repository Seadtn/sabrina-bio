import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, Grid, Typography, 
  Box, Chip, Table, TableBody, TableCell, TableHead, 
  TableRow, FormControl, Select, MenuItem, 
  Button
} from '@mui/material';
import { Status } from '../../../types/Product.ts';

const CommandViewModal = ({ open, onClose, command,onEditStatus }) => {
  const onClickAcceptCommand = () =>{
    command.status = Status.Accepted
    onEditStatus(command);
  }
  const onClickRejectCommand = () =>{
    command.status = Status.Rejected
    onEditStatus(command);
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };
  return (
    <Dialog 
    open={open} 
    onClose={onClose}
    maxWidth="lg"
    fullWidth
  >
    <DialogTitle 
      sx={{
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      Order #{command?.id}
    </DialogTitle>
    <DialogContent sx={{ p: 4, mt: 2 }}>
      <Grid container spacing={4}>
        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Customer Details</Typography>
          <Box sx={{ mb: 3 }}>
            <Typography><strong>Name:</strong> {command?.firstName} {command?.lastName}</Typography>
            <Typography><strong>Email:</strong> {command?.mail}</Typography>
            <Typography><strong>Phone:</strong> {command?.phone}</Typography>
            <Typography><strong>Address:</strong> {command?.city}, {command?.postalCode}</Typography>
          </Box>

          <Typography variant="h6" gutterBottom>Order Status : <Chip label={command?.status} color={getStatusColor(command?.status)} /></Typography>
        </Grid>

        {/* Order Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Order Details</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {command?.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                <TableCell align="right">
                  <strong>${command?.totalPrice.toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {command?.status === Status.Pending && 
            <Box sx={{ mt: 3,ml:1,display: 'flex',justifyContent:'center' }}>
              <Button onClick={onClickRejectCommand}>
                Reject
              </Button>
              <Button onClick={onClickAcceptCommand}>
                Accept
              </Button>
            </Box>
          }
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
  );
};

export default CommandViewModal;
