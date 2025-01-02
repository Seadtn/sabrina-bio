import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";

const ContactModal = ({ open, onClose, contact }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Coordonnées
      </DialogTitle>

      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Sujet
            </Typography>
            <Typography variant="h6">{contact?.subject || "N/A"}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              E-mail
            </Typography>
            <Typography variant="body1">{contact?.mail || "N/A"}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Message
            </Typography>
            <Typography variant="body1">{contact?.msg || "N/A"}</Typography>
          </Box>
        </Stack>
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

export default ContactModal;