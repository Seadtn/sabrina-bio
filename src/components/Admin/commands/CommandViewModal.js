import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Status } from "../../../types/Product.ts";

const CommandViewModal = ({ open, onClose, command, onEditStatus }) => {
  const onClickAcceptCommand = () => {
    command.status = Status.Accepted;
    command.confirmationDate = new Date().toISOString().split("T")[0];
    onEditStatus(command);
  };
  const onClickRejectCommand = () => {
    command.status = Status.Rejected;
    command.confirmationDate = new Date().toISOString().split("T")[0];
    onEditStatus(command);
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
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Commande #{command?.id}
      </DialogTitle>
      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={4}>
          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
            Détails du client
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography>
                <strong>Nom:</strong> {command?.firstName} {command?.lastName}
              </Typography>
              <Typography>
                <strong>E-mail:</strong> {command?.mail}
              </Typography>
              <Typography>
                <strong>Téléphone:</strong> {command?.phone}
              </Typography>
              <Typography>
                <strong>Adresse:</strong> {command?.city}, {command?.postalCode}
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Statut de la commande :{" "}
              <Chip
                label={command?.status}
                color={getStatusColor(command?.status)}
              />
            </Typography>
          </Grid>

          {/* Order Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
            Détails de la commande
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Produit</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell align="right">Prix</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {command?.commandProducts.map((commandProduct) => (
                  <TableRow key={commandProduct.product.id}>
                    <TableCell>{commandProduct.product.name}</TableCell>
                    <TableCell>{commandProduct.quantity}</TableCell>
                    <TableCell align="right">
                      TND{" "}
                      {commandProduct.product?.promotion
                        ? (
                            commandProduct.product?.price -
                            commandProduct.product?.price *
                              (commandProduct.product?.soldRatio * 0.01)
                          ).toFixed(2)
                        : commandProduct.product?.price?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>TND{command?.totalPrice.toFixed(2)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              <Button onClick={() => onClose()} style={{ color: "#2fcb00" }}>
                Fermer
              </Button>
              {command?.status === Status.Pending && (
                <Box sx={{ display: "flex", justifyContent: "evenly", gap: 2 }}>
                  <Button
                    onClick={onClickRejectCommand}
                    variant="contained"
                    style={{ background: "rgba(180, 1, 10, 0.87)" }}
                  >
                    Rejeter
                  </Button>
                  <Button
                    onClick={onClickAcceptCommand}
                    variant="contained"
                    style={{ background: "#2fcb00" }}
                  >
                    Accepter
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CommandViewModal;
