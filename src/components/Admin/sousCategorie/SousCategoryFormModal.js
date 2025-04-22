import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllCategories } from "../../../api/backend";

const SousCategoryFormModal = ({ sousCategory, open, onClose, onSave, onPromote }) => {
  const [formData, setFormData] = useState({
    frenchName: "",
    englishName: "",
    arabicName: "",
    creationDate: new Date().toISOString().split("T")[0],
    category: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();

    if (sousCategory) {
      setFormData({
        id: sousCategory.id,
        frenchName: sousCategory.frenchName,
        englishName: sousCategory.englishName,
        arabicName: sousCategory.arabicName,
        creationDate: sousCategory.creationDate,
        category: sousCategory.category,
      });
    } else {
      setFormData({
        frenchName: "",
        englishName: "",
        arabicName: "",
        creationDate: new Date().toISOString().split("T")[0],
        category: null,
      });
    }
  }, [sousCategory]);

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

  const handlePromote = () => {
    const promotedCategory = {
      arabicName: formData.arabicName,
      frenchName: formData.frenchName,
      englishName: formData.englishName,
      creationDate: formData.creationDate,
      tri: 0, // The new category should have the correct tri (order number) value
      products: [], // Empty initially, backend will assign related products
    };

    // Pass the subcategory ID along with the new category data to be promoted
    onPromote(sousCategory.id, promotedCategory);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle>
        {sousCategory ? "Modifier la sous-catégorie" : "Ajouter une sous-catégorie"}
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
        <FormControl sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}>
          <InputLabel id="category-label">Catégorie</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            fullWidth
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
        <Box sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }}>
          <TextField
            name="frenchName"
            label="Nom en français"
            fullWidth
            value={formData.frenchName}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", minWidth: "400px", marginTop: "20px" }} lang="ar" dir="rtl">
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
        {sousCategory && (
          <Button
            onClick={handlePromote}
            style={{ color: "#2fcb00", borderColor: "#2fcb00" }}
            variant="outlined"
          >
            Promouvoir en catégorie
          </Button>
        )}
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

export default SousCategoryFormModal;
