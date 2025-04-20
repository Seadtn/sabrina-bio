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

function SousCategoryTable({ categories,onEdit }) {
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
            <TableCell>ID</TableCell>
            <TableCell>Nom de Catégorie</TableCell>
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
            .map((sousCategory,index) => (
              <TableRow key={sousCategory.id}>
                <TableCell>#{index+1}</TableCell>
                <TableCell>{sousCategory.category?.frenchName}</TableCell>
                <TableCell>{sousCategory.englishName}</TableCell>
                <TableCell>{sousCategory.arabicName}</TableCell>
                <TableCell>{sousCategory.frenchName}</TableCell>
                <TableCell>{sousCategory.creationDate}</TableCell>
                <TableCell>
                  {" "}
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit(sousCategory);
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

export default SousCategoryTable;
