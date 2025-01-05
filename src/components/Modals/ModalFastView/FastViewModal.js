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

  const [selectedTaste, setSelectedTaste] = React.useState(
    product?.tastes?.[0] || null
  );
  const [selectedOption, setSelectedOption] = React.useState(
    product?.availableOptions?.[0]?.value || null
  );

  const getDisplayPrice = () => {
    if (!product?.hasTaste && !product?.availableOptions?.length) {
      return product?.price || 0;
    }

    if (selectedOption && product?.prices) {
      return product.prices[selectedOption] || 0;
    }

    return 0;
  };

  const displayPrice = getDisplayPrice();
  const promotionalPrice = product?.promotion
    ? displayPrice - displayPrice * (product?.soldRatio * 0.01)
    : null;

  const renderOptions = () => {
    if (!product?.availableOptions?.length) return null;

    return (
      <div className="options-section">
        <h3 className="options-title">
          {product?.productType === "GRAMMAGE"
            ? t("homePage.products.details.grammage")
            : t("homePage.products.details.dosage")}
        </h3>
        <div className="options-container">
          {product.availableOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedOption(option.value)}
              className={`option-button ${
                selectedOption === option.value ? "selected" : ""
              }`}
            >
              {option.value}{" "}
              {!isArabic
                ? product?.productType === "GRAMMAGE"
                  ? "g"
                  : product?.productType === "DOSAGE"
                    ? "ml"
                    : ""
                : product?.productType === "GRAMMAGE"
                  ? "غ"
                  : product?.productType === "DOSAGE"
                    ? "مل"
                    : ""}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTastes = () => {
    if (!product?.hasTaste || !product?.tastes?.length) return null;

    return (
      <div className="options-section">
        <h3 className="options-title">
          {t("homePage.products.details.gouts")}
        </h3>
        <div className="options-container">
          {product.tastes.map((taste) => (
            <button
              key={taste}
              onClick={() => setSelectedTaste(taste)}
              className={`option-button ${
                selectedTaste === taste ? "selected" : ""
              }`}
            >
              {taste}
            </button>
          ))}
        </div>
      </div>
    );
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
        {product?.promotion && (
          <Chip
            label={t("homePage.products.soldLabel")}
            color="warning"
            sx={{ color: "white", marginLeft: 1 }}
            size="small"
          />
        )}
        {product?.productNew && (
          <Chip
            label={t("homePage.products.newLabel")}
            color="success"
            size="small"
            sx={{ marginLeft: 1 }}
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
          <Typography
            variant="h6"
            gutterBottom
            className={
              product.promotion ? "old-price-product" : "price-product"
            }
          >
            {displayPrice} {!isArabic ? "DT" : "دت"}
          </Typography>

          {product.promotion && (
            <Typography
              variant="h6"
              gutterBottom
              className="price-product"
            >
              {promotionalPrice?.toFixed(2)} {!isArabic ? "DT" : "دت"}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {product?.description}
        </Typography>
        {renderOptions()}
        {renderTastes()}
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
