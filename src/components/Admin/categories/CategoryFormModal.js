import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const CategoryFormModal = ({ category, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    frenchName: "",
    englishName: "",
    arabicName: "",
    tri: 0,
    image: "",
    creationDate: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        frenchName: category.frenchName,
        englishName: category.englishName,
        arabicName: category.arabicName,
        tri: category.tri,
        creationDate: category.creationDate,
        image: category.image,
      });
    } else {
      setFormData({
        frenchName: "",
        englishName: "",
        arabicName: "",
        tri: 0,
        creationDate: new Date().toISOString().split("T")[0],
        image: "",
      });
    }
  }, [category]);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = () => {
    onSave(formData);
    onClose();
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
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle>
        {category ? "Modifier la catégorie" : "Ajouter une catégorie"}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
          my: 2,
          minWidth: "800px",
        }}
      >
        <Box sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          style={{
            border: "1px solid #2fcb00",
            marginTop: "10px",
            color: "#2fcb00",
          }}
        >
          Télécharger une image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        {formData.image && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Image téléchargée ✅
          </Typography>
        )}
        </Box>
        <Box sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}>
          <TextField
            name="tri"
            label="Numéro de tri"
            type="number"
            fullWidth
            value={formData.tri}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}>
          <TextField
            name="frenchName"
            label="Nom en français"
            fullWidth
            value={formData.frenchName}
            onChange={handleInputChange}
          />
        </Box>
        <Box
          sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}
          lang="ar"
          dir="rtl"
        >
          <TextField
            name="arabicName"
            label="الاسم بالعربية"
            fullWidth
            value={formData.arabicName}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}>
          <TextField
            name="englishName"
            label="Name in english"
            fullWidth
            value={formData.englishName}
            onChange={handleInputChange}
          />
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

export default CategoryFormModal;
