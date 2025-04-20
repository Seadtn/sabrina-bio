import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TablePagination,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

const ProductOTYTable = ({
  productsOTY,
  onEdit,
  onView,
  onDelete,
  page,
  rowsPerPage,
  totalCount,
  setPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Catégorie</TableCell>
            <TableCell>Sous-Catégorie</TableCell>
            <TableCell>Actif</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsOTY.map((oty, index) => {
            const displayIndex = page * rowsPerPage + index + 1;
            const product = oty.product;

            return (
              <TableRow key={oty.id} onClick={(event) => onView(oty, event)}>
                <TableCell>{displayIndex}</TableCell>
                <TableCell>
                  <img
                    src={`data:image/*;base64,${oty.image}`}
                    alt={`product-oty-${oty.id}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </TableCell>
                <TableCell>{product?.name ?? "—"}</TableCell>
                <TableCell>{product?.category?.frenchName ?? "—"}</TableCell>
                <TableCell>{product?.souscategory?.frenchName ?? "—"}</TableCell>
                <TableCell>
                  {oty.active ? (
                    <Chip
                      label="Actif"
                      color="success"
                      size="small"
                      icon={<StarIcon />}
                      sx={{ color: "white" }}
                    />
                  ) : (
                    <Chip label="Inactif" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Modifier">
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit(oty);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(oty.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductOTYTable;
