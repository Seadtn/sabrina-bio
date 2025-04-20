import { PageContainer } from "@toolpad/core";
import React, { useEffect, useState } from "react";
import ProductOTYTable from "./ProductOTYTable";
import ProductOTYViewModal from "./ProductOTYViewModal";
import ProductOTYFormModal from "./ProductOTYFormModal";
import { Button, Grid, Typography } from "@mui/material";

import {
  createProductOTY,
  deleteProductOTY,
  getAllProducts,
  getPaginatedProductOTY,
  updateProductOTY,
} from "../../../api/backend.js";

function ProductOTYDashboard() {
  const [productsOTY, setProductsOTY] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedOTY, setSelectedOTY] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [page, setPage] = React.useState(0); // start at page 0
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchAllProducts = async () => {
    try {
      const productData = await getAllProducts();
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductOTY = async () => {
    try {
      const res = await getPaginatedProductOTY(); // uses default offset=0, limit=10
      setProductsOTY(res.products);
      setTotal(res.totalCount);
    } catch (error) {
      console.error("Error fetching ProductOTY:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchProductOTY();
  }, []);

  const handleViewOTY = (oty) => {
    setSelectedOTY(oty);
    setOpenViewModal(true);
  };

  const handleAddProduct = () => {
    setSelectedOTY(null);
    setOpenEditModal(true);
  };

  const handleSaveOTY = async (oty) => {
    try {
      if (oty.id) {
        // For updates, make sure we're sending the complete object
        await updateProductOTY(oty.id, oty);
      } else {
        // For new entries
        await createProductOTY(oty);
      }
      await fetchProductOTY();
      setOpenEditModal(false);
    } catch (error) {
      console.error("Failed to save ProductOTY:", error.response?.data || error.message);
    }
  };
  const handleDeleteOTY = async (id) => {
    try {
      await deleteProductOTY(id);
      await fetchProductOTY();
    } catch (error) {
      console.error("Failed to delete ProductOTY:", error.response?.data || error.message);
    }
  }
  return (
    <PageContainer>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant="h5">Produits de l’année ({total})</Typography>
        <Button
          variant="contained"
          style={{ background: "#2fcb00", marginTop: "10px" }}
          onClick={handleAddProduct}
        >
          Définir un produit de l’année
        </Button>
      </Grid>

      <ProductOTYTable
        productsOTY={productsOTY}
        onView={handleViewOTY}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalCount={total}
        setPage={setPage}
        page={page}
        onEdit={(oty) => {
          setSelectedOTY(oty);
          setOpenEditModal(true);
        }}
        onDelete={handleDeleteOTY}
      />

      <ProductOTYViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        oty={selectedOTY}
      />

      <ProductOTYFormModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleSaveOTY}
        products={products}
        productOTY={selectedOTY}
      />
    </PageContainer>
  );
}

export default ProductOTYDashboard;
