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

function CategoryTable({ categories, onEdit }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getBase64Image = (byteArray) => {
    const uint8Array = new Uint8Array(byteArray);
    const binaryString = uint8Array.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    return window.btoa(binaryString);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>الاسم</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Tri</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>#{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={`data:image/*;base64,${getBase64Image(category.image)}`}
                    alt={`category-${category.id}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </TableCell>
                <TableCell>{category.englishName}</TableCell>
                <TableCell>{category.arabicName}</TableCell>
                <TableCell>{category.frenchName}</TableCell>
                <TableCell>{category.tri}</TableCell>
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
