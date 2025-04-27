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
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageIcon from "@mui/icons-material/Image";
import BeforeAfterIcon from "@mui/icons-material/Compare";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";

const TestimonialTable = ({
  testimonials =[],
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
            <TableCell>Type</TableCell>
            <TableCell>Aperçu</TableCell>
            <TableCell>Produit</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => {
              const displayIndex = page * rowsPerPage + index + 1;

              // Determine preview image
              let previewImage;
              if (testimonial.type === "beforeAfter") {
                previewImage = testimonial.beforeImageUrl || testimonial.afterImageUrl;
              } else if (testimonial.images && testimonial.images.length > 0) {
                previewImage = testimonial.images[0]; // For comment type, display the first image
              }

              return (
                <TableRow key={testimonial.id}>
                  <TableCell>{displayIndex}</TableCell>
                  <TableCell>
                    <Chip
                      icon={testimonial.type === "beforeAfter" ? <BeforeAfterIcon /> : <CommentIcon />}
                      label={testimonial.type === "beforeAfter" ? "Avant/Après" : "Commentaire"}
                      size="small"
                      color={testimonial.type === "beforeAfter" ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    {previewImage ? (
                      <img
                        src={`data:image/jpeg;base64,${previewImage}`}
                        alt="Aperçu"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "60px",
                          height: "60px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#f5f5f5",
                          borderRadius: "4px",
                        }}
                      >
                        <ImageIcon color="disabled" />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{testimonial.productName || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      label={testimonial.active ? "Actif" : "Inactif"}
                      color={testimonial.active ? "success" : "default"}
                      size="small"
                      sx={{ color: testimonial.active ? "white" : "inherit" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Voir">
                      <IconButton onClick={() => onView(testimonial)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifier">
                      <IconButton onClick={() => onEdit(testimonial)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton onClick={() => onDelete(testimonial.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Aucune donnée disponible.
              </TableCell>
            </TableRow>
          )}
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

export default TestimonialTable;
