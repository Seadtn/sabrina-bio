import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { closeFastViewModal } from "../../../redux/fastView/slice.ts";
import i18n from "../../../i18n/i18n.js";
import { useTranslation } from "react-i18next";

const FastViewModal = () => {
  const dispatch = useDispatch();
  const { successFastViewModal, product } = useSelector(
    (state) => state.fastView
  );
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const handleClose = () => { 
    dispatch(closeFastViewModal());
  };

  return (
    <Dialog
      open={successFastViewModal}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {product?.name}
        {product?.promotion === true && (
          <Chip
            label={t("homePage.products.soldLabel")}
            color={product?.promotion ? "warning" : "default"}
            sx={{ color: product?.promotion ? "white" : "black", marginLeft: 1 }}
            size="small"
          />
        )}
        {product?.productNew === true && (
          <Chip
            label={t("homePage.products.newLabel")}
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
      </DialogTitle>

      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
                maxWidth: 250,
              }}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                height: 200,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <ImageNotSupportedIcon sx={{ fontSize: 60, color: "#999" }} />
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {product?.promotion
              ? (
                  product?.price -
                  product?.price * (product?.soldRatio * 0.01)
                ).toFixed(2)
              : product?.price?.toFixed(2)}{" "}
            DT
          </Typography>
          {product?.promotion && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {product?.price} DT
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {product?.description}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{ p: 2, backgroundColor: "#f5f5f5" }}
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <Button
          onClick={handleClose}
          style={{ color: "white", backgroundColor: "#2fcb00" }}
        >
          {t("general.btnClose")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FastViewModal;
