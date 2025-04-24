import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import i18n from "../../../i18n/i18n";
import { useTranslation } from "react-i18next";

const SuccessModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{ textAlign: "center" }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 2,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 60, color: "#4caf50", mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Success
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{t("contactPage.modal.msg")}</Typography>
      </DialogContent>
      <DialogActions
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            color: "#fff",
            borderRadius: 2,
            textTransform: "none",
            backgroundColor: "#4caf50",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          {t("general.btnClose")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
