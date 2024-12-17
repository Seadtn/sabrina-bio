import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

function CommandsTable({ commands, onEdit,onView }) {


  if(commands.length === 0) 
    return <h4>No commands found</h4>
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Added At</TableCell>
            <TableCell>At Sold</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commands.map((product) => (
            <TableRow key={product.id} onClick={(event) => onView(product,event)}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.creationDate}</TableCell>
              <TableCell>{product.inSold === true && product.soldRation > 0 ? `Yes (${product.soldRation}%)`:'No'}</TableCell>
              <TableCell>
                <IconButton 
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(product);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CommandsTable