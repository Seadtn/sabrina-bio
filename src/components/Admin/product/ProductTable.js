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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTable = ({ products, onEdit, onView, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Added At</TableCell>
            <TableCell>At Sold</TableCell>
            <TableCell>New Product</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              onClick={(event) => onView(product, event)}
            >
              <TableCell>
                {" "}
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={`product${product.id}`}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.creationDate}</TableCell>
              <TableCell>
                {product.inSold === true && product.soldRatio > 0
                  ? `Yes (${product.soldRatio}%)`
                  : "No"}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.productNew === true ? "New" : "Regular"}
                  color={product.productNew === true ? "success" : "default"}
                  size="small"
                  sx={{ 
                    "&.MuiChip-colorSuccess": {
                      "& .MuiChip-label": {
                        color: "white"
                      }
                    }
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
    </TableContainer>
  );
};

export default ProductTable;
