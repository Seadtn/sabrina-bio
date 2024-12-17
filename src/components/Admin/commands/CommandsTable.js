import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

function CommandsTable({ commands, onEdit,onView }) {

  if(commands.length === 0) 
    return <h4>No commands found</h4>

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commands.map((command) => (
            <TableRow key={command.id} onClick={(event) => onView(command, event)}>
              <TableCell>#{command.id}</TableCell>
              <TableCell>{`${command.firstName} ${command.lastName}`}</TableCell>
              <TableCell>
                <div>{command.mail}</div>
                <div>{command.phone}</div>
              </TableCell>
              <TableCell>{`${command.city}, ${command.postalCode}`}</TableCell>
              <TableCell>
                <Chip label={command.status}  color={getStatusColor(command.status)}  />
              </TableCell>
              <TableCell>{command.paymentMethod}</TableCell>
              <TableCell>{`$${command.totalPrice.toFixed(2)}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CommandsTable