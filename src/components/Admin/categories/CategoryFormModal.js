import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";

const CategoryFormModal = ({category,open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    frenchName: "",
    englishName: "",
    arabicName: "",
    creationDate: new Date().toISOString().split("T")[0],
  });
    useEffect(() => {

      if(category){
          setFormData({
            id:category.id,
            frenchName:category.frenchName,
            englishName:category.englishName,
            arabicName:category.arabicName,
            creationDate:category.creationDate,
          })
      }else{
        setFormData({
          frenchName:"",
          englishName:"",
          arabicName:"",
          creationDate:new Date().toISOString().split("T")[0],
        })
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle>{category ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</DialogTitle>
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
