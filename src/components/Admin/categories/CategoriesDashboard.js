import { PageContainer } from "@toolpad/core";
import React from "react";
import { addNewCategory } from "../../../api/backend";
import CategoryTable from "./CategoryTable";
import { Button, Grid } from "@mui/material";
import CategoryFormModal from './CategoryFormModal'
function CategoriesDashboard({categories,setCategories}) {
  const [openFormModal, setOpenFormModal] = React.useState(false);

  const handleAddProduct = () => setOpenFormModal(true);

  const saveCategory= async (category)=>{
    try {
    let response=await addNewCategory(category)
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
          Add Category
        </Button>
      </Grid>
      <CategoryTable categories={categories} />
      {/* Modals */}
        <CategoryFormModal open={openFormModal} onSave={saveCategory} onClose={() => setOpenFormModal(false)}/>
    </PageContainer>
  );
}

export default CategoriesDashboard;
