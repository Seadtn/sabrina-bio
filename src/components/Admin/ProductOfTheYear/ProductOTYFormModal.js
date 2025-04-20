import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
  Typography,
} from "@mui/material";

const ProductOTYFormModal = ({
  open,
  onClose,
  onSave,
  products,
  productOTY,
}) => {
  const [formData, setFormData] = useState({
    id: null,
    product: "",
    image: "",
    active: false,
  });

  useEffect(() => {
    if (productOTY) {
      setFormData({
        id: productOTY.id || null,
        product: productOTY.product?.id || "",
        image: productOTY.image || "",
        active: productOTY.active || false,
      });
    } else {
      resetForm();
    }
  }, [productOTY]);

  const resetForm = () => {
    setFormData({
      id: null,
      product: "",
      image: "",
      active: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFormData((prevData) => ({
        ...prevData,
        image: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const selectedProduct = products.find((p) => p.id === formData.product);
    const payload = {
      id: formData.id,
      product: selectedProduct,
      image: formData.image,
      active: formData.active,
    };
    onSave(payload);
    resetForm();
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {formData.id ? "Modifier Produit de l'année" : "Ajouter Produit de l'année"}
      </DialogTitle>
      <DialogContent dividers>
        {/* Product Selection */}
        <TextField
          select
          fullWidth
          label="Produit"
          name="product"
          value={formData.product}
          onChange={handleInputChange}
          margin="normal"
        >
          {products.map((prod) => (
            <MenuItem key={prod.id} value={prod.id}>
              {prod.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Image Upload */}
        <Button variant="outlined" component="label" fullWidth style={{ border: "1px solid #2fcb00", marginTop: "10px" ,color:'#2fcb00' }}>
          Télécharger une image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        {formData.image && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Image téléchargée ✅
          </Typography>
        )}

        {/* Active toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={formData.active}
              onChange={handleInputChange}
              name="active"
            />
          }
          label="Actif"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ background: "grey", marginTop: "10px" ,color: 'white' }}>Annuler</Button>
        <Button onClick={handleSave} variant="contained" style={{ background: "#2fcb00", marginTop: "10px" }}>
          {formData.id ? "Enregistrer les modifications" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductOTYFormModal;
