import React from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

function CommandsTable({
  commands,
  onView,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  totalElements,
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Accepted":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "default";
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
            {commands.map((command,index) => {
              const displayIndex = page * rowsPerPage + index + 1; 
              return(
              
              <TableRow
                key={command.id}
                onClick={(event) => onView(command, event)}
              >
                <TableCell>#{displayIndex}</TableCell>
                <TableCell>{`${command.firstName} ${command.lastName}`}</TableCell>
                <TableCell>
                  <div>{command.mail === "" ? command.phone2 : command.mail}</div>
                  <div>{command.phone}</div>
                </TableCell>
                <TableCell>{`${command.city}, ${command.postalCode}`}</TableCell>
                <TableCell>
                  <Chip
                    label={command.status}
                    color={getStatusColor(command.status)}
                  />
                </TableCell>
                <TableCell>{command.creationDate}</TableCell>
                <TableCell>{command.paymentMethod}</TableCell>
                <TableCell>{command.confirmationDate}</TableCell>
                <TableCell>{`TND${command?.totalPrice}`}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements} // The count should be based on total records available
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CommandsTable;
