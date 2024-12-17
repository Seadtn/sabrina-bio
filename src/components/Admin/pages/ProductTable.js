import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, onEdit,onView, onDelete }) => {
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
          {products.map((product) => (
            <TableRow key={product.id} onClick={(event) => onView(product,event)}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.creationDate}</TableCell>
              <TableCell>{product.inSold == true && product.soldRation > 0 ? `Yes (${product.soldRation}%)`:'No'}</TableCell>
              <TableCell>
                <IconButton 
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(product);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(product.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
