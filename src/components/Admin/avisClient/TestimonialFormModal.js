import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  Typography,
  Box,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

const TestimonialFormModal = ({
  open,
  onClose,
  onSave,
  products,
  testimonial,
}) => {
  const [formData, setFormData] = useState({
    id: null,
    type: "comment",
    active: false,
    productId: "",
    beforeImageUrl: "",
    afterImageUrl: "",
    avisImageUrl: "",
    commentImage1: "",
    commentImage2: "",
    commentImage3: "",
    commentImage4: "",
  });

  const MAX_COMMENT_IMAGES = 4;

  useEffect(() => {
    if (testimonial) {
      if(testimonial.type === "beforeAfter") {
        setFormData({
          id: testimonial.id || null,
          type: testimonial.type || "comment",
          active: testimonial.active ?? false,
          productId: testimonial.productId || "",
          beforeImageUrl: testimonial.beforeImageUrl || "",
          afterImageUrl: testimonial.afterImageUrl || "",
          avisImageUrl: testimonial.avisImageUrl || "",
          commentImage1:  "",
          commentImage2: "",
          commentImage3:  "",
          commentImage4:  "",
        });
      } else if (testimonial.type === "comment") {
        setFormData({
          id: testimonial.id || null,
          type: testimonial.type || "comment",
          active: testimonial.active ?? false,
          productId: testimonial.productId || "",
          beforeImageUrl: "",
          afterImageUrl: "",
          avisImageUrl: "",
          commentImage1: testimonial?.images[0]  || "",
          commentImage2: testimonial?.images[1]  || "",
          commentImage3: testimonial?.images[2]  || "",
          commentImage4: testimonial?.images[3] || "",
        });
      }
      }
else {
      resetForm();
    }
  }, [testimonial]);

  const resetForm = () => {
    setFormData({
      id: null,
      type: "comment",
      active: false,
      productId: "",
      beforeImageUrl: "",
      afterImageUrl: "",
      avisImageUrl: "",
      commentImage1: "",
      commentImage2: "",
      commentImage3: "",
      commentImage4: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (field) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      if (field === "images") {
        if (formData.images.length < MAX_COMMENT_IMAGES) {
          // Check if image already exists in the array
          if (!formData.images.includes(base64String)) {
            setFormData((prevData) => ({
              ...prevData,
              images: [...prevData.images, base64String],
            }));
          }
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [field]: base64String,
        }));
      }
    };
    reader.readAsDataURL(file);
  };


  const handleSave = () => {
    const selectedProduct = products.find((p) => p.id === formData.productId);

    const payload = {
      id: formData.id,
      type: formData.type,
      active: formData.active,
      beforeImageUrl: formData.beforeImageUrl,
      afterImageUrl: formData.afterImageUrl,
      avisImageUrl: formData.avisImageUrl,
      commentImage1: formData.commentImage1,
      commentImage2: formData.commentImage2,
      commentImage3: formData.commentImage3,
      commentImage4: formData.commentImage4,
      productId: selectedProduct ? selectedProduct.id : null,
    };

    onSave(payload);
  };

  const getImageSrc = (imageData) => {
    return imageData
      ? imageData.startsWith("data:")
        ? imageData
        : `data:image/jpeg;base64,${imageData}`
      : null;
  };
  const handleCommentImageUpload = (index) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prevData) => ({
        ...prevData,
        [`commentImage${index}`]: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {formData.id ? "Modifier un témoignage" : "Ajouter un témoignage"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Testimonial Type */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1">Type de témoignage</Typography>
              <RadioGroup
                row
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="comment"
                  control={<Radio />}
                  label="Commentaires"
                />
                <FormControlLabel
                  value="beforeAfter"
                  control={<Radio />}
                  label="Avant/Après"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Product Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Produit</InputLabel>
              <Select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                label="Produit"
              >
                <MenuItem value="">
                  <em>Aucun</em>
                </MenuItem>
                {products.map((prod) => (
                  <MenuItem key={prod.id} value={prod.id}>
                    {prod.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Active Switch */}
          <Grid item xs={12}>
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
          </Grid>

          {formData.type === "beforeAfter" && (
            <>
              {/* Comment Image */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Commentaire
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    marginBottom: "10px",
                    borderColor: "#2fcb00",
                    color: "#2fcb00",
                  }}
                >
                  Télécharger
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload("avisImageUrl")}
                  />
                </Button>
                {formData.avisImageUrl && (
                  <Box sx={{ mt: 1, position: "relative" }}>
                    <img
                      src={getImageSrc(formData.avisImageUrl)}
                      alt="Comment"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      size="small"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, avisImageUrl: "" }))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Grid>

              {/* Before Image */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Avant
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    marginBottom: "10px",
                    borderColor: "#2fcb00",
                    color: "#2fcb00",
                  }}
                >
                  Télécharger
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload("beforeImageUrl")}
                  />
                </Button>
                {formData.beforeImageUrl && (
                  <Box sx={{ mt: 1, position: "relative" }}>
                    <img
                      src={getImageSrc(formData.beforeImageUrl)}
                      alt="Before state"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      size="small"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, beforeImageUrl: "" }))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Grid>

              {/* After Image */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Après
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    marginBottom: "10px",
                    borderColor: "#2fcb00",
                    color: "#2fcb00",
                  }}
                >
                  Télécharger
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload("afterImageUrl")}
                  />
                </Button>
                {formData.afterImageUrl && (
                  <Box sx={{ mt: 1, position: "relative" }}>
                    <img
                      src={getImageSrc(formData.afterImageUrl)}
                      alt="After state"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      size="small"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, afterImageUrl: "" }))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Grid>
            </>
          )}

          {formData.type === "comment" && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Images de commentaires
              </Typography>
              <Grid container spacing={2}>
                {[1, 2, 3, 4].map((index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Box sx={{ position: "relative" }}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AddPhotoAlternateIcon />}
                        style={{
                          marginBottom: "10px",
                          borderColor: "#2fcb00",
                          color: "#2fcb00",
                        }}
                      >
                        {formData[`commentImage${index}`]
                          ? "Modifier"
                          : "Ajouter"}
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleCommentImageUpload(index)}
                        />
                      </Button>

                      {formData[`commentImage${index}`] && (
                        <Box sx={{ mt: 1, position: "relative" }}>
                          <img
                            src={getImageSrc(formData[`commentImage${index}`])}
                            alt={`Comment ${index}`}
                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                          />
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              backgroundColor: "rgba(255,255,255,0.7)",
                            }}
                            size="small"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                [`commentImage${index}`]: "",
                              }))
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          style={{ background: "grey", marginTop: "10px", color: "white" }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          style={{ background: "#2fcb00", marginTop: "10px" }}
        >
          {" "}
          {formData.id ? "Enregistrer les modifications" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestimonialFormModal;
