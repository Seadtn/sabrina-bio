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
  const hasFreeDeliveryItem = () => {
    console.log("command?.commandProducts", command?.commandProducts);
    return command?.commandProducts.some((item) => item.product.freeDelivery === true);
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
              {(command?.mail !== "" && command?.mail !== null) && (
                <Typography>
                  <strong>E-mail:</strong> {command?.mail}
                </Typography>
              )}
              <Typography>
                <strong>Téléphone:</strong> {command?.phone}
              </Typography>
              {(command?.phone2 !== "" && command?.phone2 !== null)&& (
                <Typography>
                  <strong>Téléphone 2:</strong> {command?.phone2}
                </Typography>
              )}
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
                  <TableCell>Goût</TableCell>
                  <TableCell>Poids/Volume</TableCell>
                  <TableCell align="right">Prix</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {command?.commandProducts.map((commandProduct) => (
                  <TableRow key={commandProduct.product.id}>
                    <TableCell>{commandProduct.product.name}</TableCell>
                    <TableCell>{commandProduct.quantity}</TableCell>
                    <TableCell>{commandProduct.taste}</TableCell>
                    <TableCell>{commandProduct.unit}</TableCell>
                    <TableCell align="right">
                      TND {commandProduct.prix?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Delivery Price Row */}
                <TableRow>
                  <TableCell colSpan={4}>
                    <strong>Frais de Livraison</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      TND {hasFreeDeliveryItem() ? "0.00" : "8.00"}
                    </strong>
                  </TableCell>
                </TableRow>
                {/* Total Price Row */}
                <TableRow>
                  <TableCell colSpan={4}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>TND {command?.totalPrice.toFixed(2)}</strong>
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
