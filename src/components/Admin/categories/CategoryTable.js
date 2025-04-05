import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function CategoryTable({ categories,onEdit }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de la catégorie</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>الاسم</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((category) => (
              <TableRow key={category.id}>
                <TableCell>#{category.id}</TableCell>
                <TableCell>{category.englishName}</TableCell>
                <TableCell>{category.arabicName}</TableCell>
                <TableCell>{category.frenchName}</TableCell>
                <TableCell>{category.creationDate}</TableCell>
                <TableCell>
                  {" "}
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit(category);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default CategoryTable;
