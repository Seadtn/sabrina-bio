import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const TestimonialViewModal = ({ open, onClose, testimonial }) => {
  if (!testimonial) return null;

  // Prepare the list of comment images
  const commentImages = testimonial.images // remove undefined/null entries
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Témoignage Client
        <Chip
          label={
            testimonial.type === "beforeAfter"
              ? "Avant/Après"
              : testimonial.type === "certificate"
              ? "Certificat"
              : "Commentaire"
          }
          color={
            testimonial.type === "beforeAfter"
              ? "primary"
              : testimonial.type === "certificate"
              ? "secondary"
              : "default"
          }
          size="small"
          sx={{ ml: 2 }}
        />
      </DialogTitle>

      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={3}>
          {testimonial.type === "beforeAfter" ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Images Avant/Après
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Avant
                    </Typography>
                    {testimonial.beforeImageUrl ? (
                      <Box
                        component="img"
                        src={`data:image/jpeg;base64,${testimonial.beforeImageUrl}`}
                        alt="Avant"
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 2,
                          boxShadow: 1,
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
                        }}
                      >
                        <ImageNotSupportedIcon sx={{ fontSize: 40, color: "#999" }} />
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Après
                    </Typography>
                    {testimonial.afterImageUrl ? (
                      <Box
                        component="img"
                        src={`data:image/jpeg;base64,${testimonial.afterImageUrl}`}
                        alt="Après"
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 2,
                          boxShadow: 1,
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
                        }}
                      >
                        <ImageNotSupportedIcon sx={{ fontSize: 40, color: "#999" }} />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Images de Commentaire
                </Typography>
                <Grid container spacing={2}>
                  {commentImages.length > 0 ? (
                    commentImages.map((img, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          component="img"
                          src={`data:image/jpeg;base64,${img}`}
                          alt={`Commentaire ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 2,
                            boxShadow: 1,
                          }}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          backgroundColor: "#f0f0f0",
                          height: 200,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageNotSupportedIcon sx={{ fontSize: 40, color: "#999" }} />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ ml: 1 }}
                        >
                          Aucune image
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </>
          )}

          {testimonial.avisImageUrl && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Commentaire Principal
              </Typography>
              <Box
                component="img"
                src={`data:image/jpeg;base64,${testimonial.avisImageUrl}`}
                alt="Commentaire Principal"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Détails
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  <strong>Produit associé :</strong> {testimonial.productName || "Aucun"}
                </Typography>
                {testimonial.productLink && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Lien produit :</strong>{" "}
                    <Link href={testimonial.productLink} target="_blank" rel="noopener noreferrer">
                      {testimonial.productLink}
                    </Link>
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  <strong>Statut :</strong>{" "}
                  <Chip
                    label={testimonial.active ? "Actif" : "Inactif"}
                    color={testimonial.active ? "success" : "default"}
                    size="small"
                    sx={{ color: testimonial.active ? "white" : "inherit" }}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
        <Button
          onClick={onClose}
          variant="contained"
          style={{ background: "#2fcb00" }}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestimonialViewModal;
