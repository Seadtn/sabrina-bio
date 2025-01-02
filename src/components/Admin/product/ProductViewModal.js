import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Box,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const ProductViewModal = ({ open, onClose, product }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {product?.name}
      </DialogTitle>
      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {product?.image ? (
              <Box
                component="img"
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product?.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            ) : (
              <Box
                sx={{
                  backgroundColor: "#f0f0f0",
                  height: 300,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageNotSupportedIcon sx={{ fontSize: 60, color: "#999" }} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {product?.promotion
                    ? product?.price-(product?.price * (product.soldRatio * 0.01))
                    : product?.price?.toFixed(2)}{" "}
                  DT
                </Typography>
                {product?.promotion && (
                  <p className="old-price" style={{ textAlign: "start" }}>
                    {product?.price} DT
                  </p>
                )}
                <Chip
                  label={product?.promotion ? "On Sale" : "Regular Price"}
                  color={product?.promotion ? "error" : "default"} 
                  sx={{
                    color: product?.promotion ? "white !important" : "black ", 
                  }}
                  size="small"
                />
                {product?.productNew === true && (
                  <Chip
                    label="New"
                    color="success"
                    size="small"
                    sx={{
                      "&.MuiChip-colorSuccess": {
                        "& .MuiChip-label": {
                          color: "white",
                        },
                      },
                      marginLeft: 1,
                    }}
                  />
                )}
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">{product?.description}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                Détails du produit
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <b>Créé:</b>{" "}
                    {new Date(product?.creationDate).toLocaleDateString()}
                  </Typography>
                  {product?.inSold && (
                    <>
                      <Typography variant="body2">
                        <b>Taux de la promotion:</b> {product?.soldRatio}%
                      </Typography>
                      <Typography variant="body2">
                        <b>Début de la promotion:</b>{" "}
                        {new Date(product?.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <b>Fin de la promotion:</b>{" "}
                        {new Date(product?.lastDate).toLocaleDateString()}
                      </Typography>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
        <Button
          onClick={onClose}
          variant="contained"
          style={{ background: "#2fcb00" }}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductViewModal;
