import { PageContainer } from "@toolpad/core";
import React from "react";
import {addNewSousCategory } from "../../../api/backend";
import { Button, Grid } from "@mui/material";
import SousCategoryFormModal from "./SousCategoryFormModal";
import SousCategoryTable from "./SousCategoryTable";
function SousCategoryDashboard({categories,setCategories}) {
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [selectedCategory,setSelectedCategory]=React.useState(null);
  const handleAddProduct = () => {setSelectedCategory(null); setOpenFormModal(true)};
    const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenFormModal(true);
  };
  const saveCategory= async (category)=>{
    try {
    let response=await addNewSousCategory(category)
    setCategories((prev) => {
      if (category.id) {
        return prev.map((prod) =>
          prod.id === category.id ? { ...prod, ...response } : prod
        );
      } else {
        return [...prev, response];
      }
    });
    } catch (error) {
      console.error("Error saving category:", error.message);
    }
  }

  return (
    <PageContainer>
      <Grid item xs={12}>
        <Button
          variant="contained"
          style={{ background: "#2fcb00" }}
          onClick={handleAddProduct}
        >
          Ajouter une sous catégorie
        </Button>
      </Grid>
      <SousCategoryTable categories={categories} onEdit={handleEditCategory} />
      {/* Modals */}
        <SousCategoryFormModal sousCategory={selectedCategory} open={openFormModal} onSave={saveCategory} onClose={() => setOpenFormModal(false)}/>
    </PageContainer>
  );
}

export default SousCategoryDashboard;
