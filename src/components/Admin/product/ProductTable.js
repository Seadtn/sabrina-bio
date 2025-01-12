import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTable = ({ products, onEdit, onView, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
            <TableCell>Image</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Catégorie</TableCell>
            <TableCell>Sous-Catégorie</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Quantité</TableCell>
            <TableCell>Ajouté le</TableCell>
            <TableCell>Promotion</TableCell>
            <TableCell>Nouveau produit</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <TableRow
                key={product.id}
                onClick={(event) => onView(product, event)}
              >
                <TableCell>#{product?.id}</TableCell>
                <TableCell>
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={`product${product.id}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category?.frenchName}</TableCell>
                <TableCell>{product.souscategory?.frenchName}</TableCell>
                <TableCell>
                  {product.description.length > 25
                    ? product.description.substring(0, 25) + "..."
                    : product.description}
                </TableCell>
                <TableCell>
                  <TableCell>
                    {product.price === 0 ? (
                      <>
                        {product.availableOptions &&
                        product.availableOptions.length > 0
                          ? product.availableOptions.map((option, index) => (
                              <div key={index}>
                                {product.prices[option.value]}   
                              </div>
                            ))
                          : null}
                      </>
                    ) : (
                      product.price
                    )}
                  </TableCell>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.creationDate}</TableCell>
                <TableCell>
                  {product.promotion === true && product.soldRatio > 0
                    ? `Oui (${product.soldRatio}%)`
                    : product.startDate && product.startDate.trim() !== ""
                      ? `La promotion commencera ${product.startDate}`
                      : "Non"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.productNew === true ? "Nouveau" : "Standard"}
                    color={product.productNew === true ? "success" : "default"}
                    size="small"
                    sx={{
                      "&.MuiChip-colorSuccess": {
                        "& .MuiChip-label": {
                          color: "white",
                        },
                      },
                    }}
                  />
                </TableCell>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductTable;
