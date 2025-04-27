import React, { useState, useEffect, useCallback } from "react";
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
  IconButton,
} from "@mui/material";
import {
  getAllCategories,
  getSousCategoriesbyIdCategory,
} from "../../../api/backend";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductFormModal = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    nameFr: "",
    nameEng: "",
    description: "",
    price: 0,
    image: null,
    image2: null, // State for image2
    image3: null, // State for image3
    image4: null, // State for image4
    creationDate: new Date().toISOString().split("T")[0],
    inSold: false,
    promotion: false,
    productNew: false,
    newPrice: 0,
    quantity: 1,
    startDate: "",
    soldRatio: 0,
    lastDate: "",
    active: true,
    category: null,
    souscategory: null,
    productType: "STANDARD",
    prices: {},
    availableOptions: [],
    hasTaste: false,
    freeDelivery: false,
    tastes: [],
  });

  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({
    image: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const currentDate = new Date().toISOString().split("T")[0];
  const [subcategories, setSubcategories] = useState([]);

  const resetForm = useCallback(() => {
    setFormData({
      id: null,
      name: "",
      nameFr: "",
      nameEng: "",
      description: "",
      price: 0,
      image: null,
      image2: null,
      image3: null,
      image4: null,
      creationDate: currentDate,
      inSold: false,
      promotion: false,
      productNew: false,
      newPrice: 0,
      freeDelivery: false,
      soldRatio: 0,
      quantity: 1,
      startDate: "",
      lastDate: "",
      active: true,
      category: null,
      souscategory: null,
      productType: "STANDARD",
      prices: {},
      availableOptions: [],
      hasTaste: false,
      tastes: [],
    });
    setImagePreviews({
      image: "",
      image2: "",
      image3: "",
      image4: "",
    });
  }, [currentDate]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();

    if (product) {
      const availableOptions =
        product.productType === "GRAMMAGE"
          ? Object.keys(product.prices || {}).map((value) => ({
              value: parseInt(value),
              unit: "g",
            }))
          : Object.keys(product.prices || {}).map((value) => ({
              value: parseInt(value),
              unit: "ml",
            }));

      setFormData({
        ...product,
        productType: product.productType || "STANDARD",
        prices: product.prices || {},
        availableOptions,
        hasTaste: product.hasTaste || false,
        tastes: product.tastes || [],
      });

      // Set image previews
      const previews = {};
      
      if (product.image) {
        previews.image = typeof product.image === "string"
          ? `data:image/jpeg;base64,${product.image}`
          : URL.createObjectURL(new Blob([product.image]));
      }
      
      // Handle additional images
      ['image2', 'image3', 'image4'].forEach(field => {
        if (product[field]) {
          // For byte arrays or base64 strings
          previews[field] = typeof product[field] === "string"
            ? `data:image/jpeg;base64,${product[field]}`
            : URL.createObjectURL(new Blob([product[field]], { type: 'image/jpeg' }));
        }
      });
      
      setImagePreviews(previews);
    } else {
      resetForm();
    }
  }, [product, resetForm]);

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        souscategory: null,
      }));
      try {
        const response = await fetchSubcategories(value.id);
        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const subcategories = await response.json();
        setFormData((prev) => ({
          ...prev,
          souscategory: subcategories,
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else if (name === "productType" && value !== formData.productType) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        availableOptions: [],
      }));
    } else if (name === "hasTaste" && !checked) {
      setFormData((prev) => ({
        ...prev,
        hasTaste: checked,
        tastes: [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handlePriceChange = (value, price) => {
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [value]: price,
      },
    }));
  };

  const addOption = () => {
    const unit = formData.productType === "GRAMMAGE" ? "g" : "ml";
    setFormData((prev) => ({
      ...prev,
      availableOptions: [...prev.availableOptions, { value: "", unit }],
    }));
  };

  const removeOption = (index) => {
    setFormData((prev) => {
      const newOptions = [...prev.availableOptions];
      const removedOption = newOptions[index];
      newOptions.splice(index, 1);

      const newPrices = { ...prev.prices };
      if (removedOption && removedOption.value) {
        delete newPrices[removedOption.value];
      }

      return {
        ...prev,
        availableOptions: newOptions,
        prices: newPrices,
      };
    });
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();

    if (product) {
      setFormData({
        ...product,
        souscategory: product.souscategory || null,
      });
      if (product.category?.id) {
        fetchSubcategories(product.category.id); // Fetch subcategories if editing an existing product
      }
    } else {
      resetForm();
    }
  }, [product, resetForm]);

  const fetchSubcategories = async (categoryId) => {
    const fetchedSubcategories =
      await getSousCategoriesbyIdCategory(categoryId);
    setSubcategories(fetchedSubcategories);
  };

  const handleOptionValueChange = (index, newValue) => {
    setFormData((prev) => {
      const newOptions = [...prev.availableOptions];
      const oldValue = newOptions[index].value;
      newOptions[index] = {
        ...newOptions[index],
        value: parseInt(newValue) || "",
      };

      const newPrices = { ...prev.prices };
      if (oldValue in newPrices) {
        newPrices[newValue] = newPrices[oldValue];
        delete newPrices[oldValue];
      }

      return {
        ...prev,
        availableOptions: newOptions,
        prices: newPrices,
      };
    });
  };

  const addTaste = () => {
    setFormData((prev) => ({
      ...prev,
      tastes: [...prev.tastes, ""],
    }));
  };

  const removeTaste = (index) => {
    setFormData((prev) => {
      const newTastes = [...prev.tastes];
      newTastes.splice(index, 1);
      return {
        ...prev,
        tastes: newTastes,
      };
    });
  };

  const handleTasteChange = (index, value) => {
    setFormData((prev) => {
      const newTastes = [...prev.tastes];
      newTastes[index] = value;
      return {
        ...prev,
        tastes: newTastes,
      };
    });
  };

  // Updated to handle multiple images
  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          [imageField]: event.target.result.split(",")[1], // Store base64 string without prefix
        }));
        
        setImagePreviews((prev) => ({
          ...prev,
          [imageField]: URL.createObjectURL(file), // Store preview URL
        }));
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
          alignItems: "flex-start",
          justifyContent: "space-between",
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
            gap: 3,
            width: "250px",
          }}
        >
          {/* Main image */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: "200px",
                height: "200px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
                backgroundColor: "#f5f5f5",
              }}
            >
              {imagePreviews.image ? (
                <img
                  src={imagePreviews.image}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box sx={{ color: '#888', fontSize: '14px' }}>Image principale</Box>
              )}
            </Box>
            <Button
              variant="contained"
              style={{ background: "#2fcb00" }}
              component="label"
              fullWidth
            >
              Image principale
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image")}
              />
            </Button>
          </Box>

          {/* Additional images */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              width: "100%",
            }}
          >
            {["image2", "image3", "image4"].map((field, index) => (
              <Box key={index} sx={{ textAlign: "center", width: "110px" }}>
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {imagePreviews[field] ? (
                    <img
                      src={imagePreviews[field]}
                      alt={`Preview ${index + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Box sx={{ color: '#888', fontSize: '12px' }}>Image {index + 2}</Box>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  style={{ color: "#2fcb00", borderColor: "#2fcb00", fontSize: "12px" }}
                  component="label"
                  fullWidth
                >
                  Image {index + 2}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field)}
                  />
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
            maxHeight: "70vh",
            width: "500px",
          }}
        >
          <TextField
            name="name"
            label="الاسم بالعربية"
            fullWidth
            value={formData.name}
            lang="ar"
            dir="rtl"
            onChange={handleInputChange}
            sx={{
              marginTop: "5px",
            }}
          />
          <TextField
            name="nameFr"
            label="Nom en français"
            fullWidth
            value={formData.nameFr}
            onChange={handleInputChange}
          />
          <TextField
            name="nameEng"
            label="Name in english"
            fullWidth
            value={formData.nameEng}
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
            name="quantity"
            label="Quantité"
            type="number"
            fullWidth
            value={formData.quantity}
            onChange={handleInputChange}
            inputProps={{ min: 1 }}
          />
          <FormControl fullWidth>
            <InputLabel id="product-type-label">Type de produit</InputLabel>
            <Select
              labelId="product-type-label"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              label="Type de produit"
            >
              <MenuItem value="STANDARD">Standard</MenuItem>
              <MenuItem value="GRAMMAGE">Grammage</MenuItem>
              <MenuItem value="DOSAGE">Dosage</MenuItem>
            </Select>
          </FormControl>
          {(formData.productType === "GRAMMAGE" ||
            formData.productType === "DOSAGE") && (
            <>
              {formData.availableOptions.map((option, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <TextField
                    label={
                      formData.productType === "GRAMMAGE"
                        ? "Grammage"
                        : "Dosage"
                    }
                    type="number"
                    value={option.value}
                    onChange={(e) =>
                      handleOptionValueChange(index, e.target.value)
                    }
                    InputProps={{
                      endAdornment: <span>{option.unit}</span>,
                    }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Prix"
                    type="number"
                    value={formData.prices[option.value] || ""}
                    onChange={(e) =>
                      handlePriceChange(
                        option.value,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    onClick={() => removeOption(index)}
                    sx={{ color: "error.main" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={addOption}
                variant="outlined"
                style={{ color: "#2fcb00", borderColor: "#2fcb00" }}
              >
                Ajouter{" "}
                {formData.productType === "GRAMMAGE"
                  ? "un grammage"
                  : "un dosage"}
              </Button>
            </>
          )}
          {formData.productType === "STANDARD" && (
            <TextField
              name="price"
              label="Prix"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleInputChange}
              inputProps={{ min: 5 }}
            />
          )}
          <FormControl fullWidth>
            <InputLabel id="category-label">Catégorie</InputLabel>
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
          {subcategories.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="subcategory-label">Sous-catégorie</InputLabel>
              <Select
                labelId="subcategory-label"
                name="souscategory"
                value={formData?.souscategory}
                onChange={handleInputChange}
                label="Sous Catégorie"
              >
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory.id} value={subcategory}>
                    {subcategory.frenchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={formData.hasTaste}
                onChange={handleInputChange}
                name="hasTaste"
              />
            }
            label="Goûts disponibles"
          />{" "}
          {formData.hasTaste && (
            <>
              {formData.tastes.map((taste, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <TextField
                    label="Goût"
                    value={taste}
                    onChange={(e) => handleTasteChange(index, e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    onClick={() => removeTaste(index)}
                    sx={{ color: "error.main" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={addTaste}
                variant="outlined"
                style={{ color: "#2fcb00", borderColor: "#2fcb00" }}
              >
                Ajouter un goût
              </Button>
            </>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={formData.freeDelivery}
                onChange={handleInputChange}
                name="freeDelivery"
              />
            }
            label="Livrison gratuite"
          />{" "}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
                label="Pourcentage de réduction"
                type="number"
                fullWidth
                value={formData.soldRatio}
                onChange={handleInputChange}
                inputProps={{ min: 10, max: 90 }}/>
              <TextField
                name="startDate"
                label="Début de la promotion"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleInputChange}
                inputProps={{ min: currentDate }}
              />
              <TextField
                name="lastDate"
                label="Fin de la promotion"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.lastDate}
                onChange={handleInputChange}
                inputProps={{ min: formData.startDate }}
                disabled={!formData.startDate}
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