import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getAllCategories } from "../../../api/backend";

const ProductFormModal = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: 0,
    image: null,
    creationDate: new Date().toISOString().split("T")[0],
    inSold: false,
    promotion: false,
    productNew: false,
    soldRatio: 0,
    quantity: 0,
    startDate: "",
    lastDate: "",
    active: true,
    category: null,
  });
  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        creationDate: product.creationDate,
        inSold: product.inSold,
        promotion: product.promotion,
        soldRatio: product.soldRatio,
        productNew: product.productNew,
        quantity: product.quantity,
        startDate: product.startDate || "",
        lastDate: product.lastDate || "",
        active: product.active || true,
        category: product.category || "",
      });

      if (product.image instanceof Blob || product.image instanceof File) {
        setPreviewUrl(URL.createObjectURL(product.image));
      } else if (typeof product.image === "string") {
        setPreviewUrl(`data:image/jpeg;base64,${product.image}`);
      } else {
        setPreviewUrl("");
      }
    } else {
      setFormData({
        id: null,
        name: "",
        description: "",
        price: 0,
        image: null,
        creationDate: new Date().toISOString().split("T")[0],
        promotion: false,
        inSold: false,
        productNew: false,
        soldRatio: 0,
        quantity: 0,
        startDate: "",
        lastDate: "",
        active: true,
        category: null,
      });
      setPreviewUrl("");
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result.split(",")[1];
        setFormData((prev) => ({ ...prev, image: base64String }));
        setPreviewUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        {product ? "Modifier le produit" : "Ajouter un produit"}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
          my: 2,
          minWidth: "800px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          )}
          <Button
            variant="contained"
            style={{ background: "#2fcb00" }}
            component="label"
          >
            Choisir une image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: "400px",
            marginTop: "100px",
          }}
        >
          <TextField
            name="name"
            label="Nom"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            name="price"
            label="Prix"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleInputChange}
          />
          <TextField
            name="quantity"
            label="Quantité"
            type="number"
            fullWidth
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Categorie</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              label="Catégorie"
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category.frenchName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.productNew}
                  onChange={handleInputChange}
                  name="productNew"
                />
              }
              label="Nouveau Produit"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.inSold}
                  onChange={handleInputChange}
                  name="inSold"
                />
              }
              label="En Promotion"
            />
          </Box>
          {formData.inSold && (
            <>
              <TextField
                name="soldRatio"
                label="Taux de la promotion"
                type="number"
                fullWidth
                value={formData.soldRatio}
                onChange={handleInputChange}
              />
              <TextField
                name="startDate"
                label="Début de la promotion"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleInputChange}
                inputProps={{ min:currentDate}}// Ensure the start date is today or after
              />

              <TextField
                name="lastDate"
                label="Fin de la promotion"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.lastDate}
                onChange={handleInputChange}
                inputProps={{ min:formData.startDate}} // Ensure the end date is after the start date
                disabled={!formData.startDate} // Disable until start date is selected
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#2fcb00" }}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{ background: "#2fcb00" }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormModal;
