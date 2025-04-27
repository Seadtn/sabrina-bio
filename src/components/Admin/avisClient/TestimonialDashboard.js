import { PageContainer } from "@toolpad/core";
import React, { useEffect, useState } from "react";
import TestimonialTable from "./TestimonialTable";
import TestimonialViewModal from "./TestimonialViewModal";
import TestimonialFormModal from "./TestimonialFormModal";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";

import {
  createTestimonial,
  deleteTestimonial,
  getAllProducts,
  getPaginatedTestimonials,
  updateTestimonial,
} from "../../../api/backend.js";

function TestimonialDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false); 

  const fetchAllProducts = async () => {
    try {
      const productData = await getAllProducts();
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchTestimonials = React.useCallback(async () => {
    setLoading(true); 
    try {
      const res = await getPaginatedTestimonials(page, rowsPerPage);
      setTestimonials(res.content);
      setTotal(res.totalItems);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false); 
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchAllProducts();
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setOpenViewModal(true);
  };

  const handleAddTestimonial = () => {
    setSelectedTestimonial(null);
    setOpenEditModal(true);
  };

  const handleSaveTestimonial = async (testimonial) => {
    setLoading(true); 
    try {
      if (testimonial.id) {
        await updateTestimonial(testimonial.id, testimonial);
      } else {
        await createTestimonial(testimonial);
      }
      await fetchTestimonials();
      setOpenEditModal(false);
    } catch (error) {
      console.error("Failed to save testimonial:", error.response?.data || error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleDeleteTestimonial = async (id) => {
    setLoading(true);
    try {
      await deleteTestimonial(id);
      await fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error.response?.data || error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <PageContainer>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant="h5">Témoignages Clients ({total})</Typography>
        <Button
          variant="contained"
          style={{ background: "#2fcb00", marginTop: "10px" }}
          onClick={handleAddTestimonial}
        >
          Ajouter un témoignage
        </Button>
      </Grid>

      {loading ? ( 
        <CircularProgress sx={{ display: "block", margin: "0 auto" ,color:"#2fcb00" }} />
      ) : (
        <TestimonialTable
          testimonials={testimonials}
          onView={handleViewTestimonial}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalCount={total}
          setPage={setPage}
          page={page}
          onEdit={(testimonial) => {
            setSelectedTestimonial(testimonial);
            setOpenEditModal(true);
          }}
          onDelete={handleDeleteTestimonial}
        />
      )}

      <TestimonialViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        testimonial={selectedTestimonial}
      />

      <TestimonialFormModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleSaveTestimonial}
        products={products}
        testimonial={selectedTestimonial}
      />
    </PageContainer>
  );
}

export default TestimonialDashboard;
