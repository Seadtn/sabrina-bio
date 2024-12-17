import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, Box, Stack, Chip, Divider } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
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


  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle 
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        {command?.name}
      </DialogTitle>
      <DialogContent sx={{ p: 4,mt:2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {command?.image ? (
              <Box
                component="img"
                src={`data:image/jpeg;base64,${Buffer.from(command.image).toString('base64')}`}
                alt={command?.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            ) : (
              <Box
                sx={{
                  backgroundColor: '#f0f0f0',
                  height: 300,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ImageNotSupportedIcon sx={{ fontSize: 60, color: '#999' }} />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  ${command?.price?.toFixed(2)}
                </Typography>
                <Chip 
                  label={command?.inSold ? "On Sale" : "Regular Price"}
                  color={command?.inSold ? "error" : "default"}
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {command?.description}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Product Details
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <b>Created:</b> {new Date(command?.creationDate).toLocaleDateString()}
                  </Typography>
                  {command?.inSold && (
                    <>
                      <Typography variant="body2">
                        <b>Sale Start:</b> {new Date(command?.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <b>Sale End:</b> {new Date(command?.lastDate).toLocaleDateString()}
                      </Typography>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommandViewModal;
