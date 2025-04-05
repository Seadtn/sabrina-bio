import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import React, { useState } from 'react';

function CommandsTable({ commands, onEdit, onView }) {
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const paginatedCommands = commands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); 
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); 
    setPage(0); 
  };

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
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID de la commande</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date de création</TableCell>              
              <TableCell>Méthode de paiement</TableCell>
              <TableCell>Date de Conf/Rej</TableCell>
              <TableCell>Montant total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCommands.map((command) => (
              <TableRow key={command.id} onClick={(event) => onView(command, event)}>
                <TableCell>#{command.id}</TableCell>
                <TableCell>{`${command.firstName} ${command.lastName}`}</TableCell>
                <TableCell>
                  <div>{command.mail}</div>
                  <div>{command.phone}</div>
                </TableCell>
                <TableCell>{`${command.city}, ${command.postalCode}`}</TableCell>
                <TableCell>
                  <Chip label={command.status} color={getStatusColor(command.status)} />
                </TableCell>
                <TableCell>{command.creationDate}</TableCell>
                <TableCell>{command.paymentMethod}</TableCell>
                <TableCell>{command.confirmationDate}</TableCell>
                <TableCell>{`TND${command?.totalPrice}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} 
        component="div"
        count={commands.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage} 
        onRowsPerPageChange={handleChangeRowsPerPage} 
      />
    </>
  );
}

export default CommandsTable;
