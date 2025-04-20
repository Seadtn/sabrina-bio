import * as React from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  debounce,
} from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { extendTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductTable from "./product/ProductTable.js";
import ProductFormModal from "./product/ProductFormModal.js";
import ProductViewModal from "./product/ProductViewModal.js";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import CommandsDashboard from "./commands/CommandsDashboard.js";
import {
  addNewProduct,
  deleteProduct,
  getAllCategories,
  getAllCommands,
  getAllContacts,
  getAllSousCategories,
  getPaginatedProductsTable,
  getSousCategoriesbyIdCategory,
} from "../../api/backend.js";
import CategoryIcon from "@mui/icons-material/Category";
import CategoriesDashboard from "./categories/CategoriesDashboard.js";
import ContactDashboard from "./contact/ContactDashboard.js";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SousCategoryDashboard from "./sousCategorie/SousCategoryDashboard.js";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ProductOTYDashboard from "./ProductOfTheYear/ProductOTYDashboard.js";
const NAVIGATION = [
  { kind: "header", title: "All" },
  { segment: "products", title: "Produits", icon: <ShoppingCartIcon /> },
  { segment: "commands", title: "Commandes", icon: <BackupTableIcon /> },
  { segment: "categories", title: "Categories", icon: <CategoryIcon /> },
  {
    segment: "souscategories",
    title: "Sous Categories",
    icon: <CategoryIcon />,
  },
  {
    segment: "productOfTheYear",
    title: "Produit de l'année",
    icon: <CelebrationIcon />,
  },
  {
    segment: "ClientAvis",
    title: "Avis Client",
    icon: <ChatBubbleIcon />,
  },
  { segment: "contacts", title: "Contacts", icon: <ContactMailIcon /> },
];

const demoTheme = extendTheme({
  palette: {
    mode: "light",
    primary: { main: "#2fcb00" },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("products");
  const [products, setProducts] = React.useState([]);
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [commands, setCommands] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [productOTY, setProductOTY] = React.useState([]);

  const [Souscategories, setSousCategories] = React.useState([]);
  const [page, setPage] = React.useState(0); // start at page 0
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(0); // total number of
  const [TotalPages, setTotalPages] = React.useState(0); // total number of

  // Filter states
  const [category, setCategory] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOption, setSortOption] = React.useState("");
  const [contacts, setContacts] = React.useState([]);
  const [subcategory, setSubcategory] = React.useState("");
  const [currentOffset, setCurrentOffset] = React.useState(0);
  const [subcategories, setSubcategories] = React.useState([]);

  const debouncedSearch = debounce((value) => {
    fetchPaginatedProducts(0, { search: value });
  }, 500);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    setSubcategory("");
    setPage(0); // ⬅ Reset page
    fetchPaginatedProducts(0, { categoryId: newCategory, subcategoryId: "" });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(0); // ⬅ Reset page
    debouncedSearch(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    setPage(0); // ⬅ Reset page
    fetchPaginatedProducts(0, { sort: value });
  };

  const handleSubcategoryChange = (event) => {
    const newSubcategory = event.target.value;
    setSubcategory(newSubcategory);
    setPage(0); // ⬅ Reset page
    fetchPaginatedProducts(0, { subcategoryId: newSubcategory });
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setTimeout(() => setOpenFormModal(true), 0);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenFormModal(true);
  };
  const fetchPaginatedProducts = React.useCallback(
    async (offset = 0, filters = {}) => {
      const mergedFilters = {
        categoryId: category,
        subcategoryId: subcategory,
        search: searchTerm,
        sort: sortOption,
        ...filters,
      };

      try {
        const { products, total } = await getPaginatedProductsTable({
          offset,
          limit: rowsPerPage,
          ...mergedFilters,
        });

        if (Array.isArray(products)) {
          setProducts(products);
          setTotalCount(total);
          setCurrentOffset(offset);
        } else {
          console.error("Invalid product structure:", { products, total });
        }
      } catch (error) {
        console.error("Error fetching paginated products:", error);
      }
    },
    [category, subcategory, searchTerm, sortOption, rowsPerPage]
  );

  // 🎯 Load Subcategories by Category
  React.useEffect(() => {
    if (!category) return setSubcategories([]);

    const fetchSubcategories = async () => {
      try {
        const data = await getSousCategoriesbyIdCategory(category);
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [category]);

  // 📦 Initial Data Fetch
  React.useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch paginated products
        await fetchPaginatedProducts(0);

        // Fetch paginated commands with the necessary parameters
        const { data: commands, totalPages } = await getAllCommands(
          0,
          rowsPerPage
        );

        const [categories, contacts, sousCategories] = await Promise.all([
          getAllCategories(),
          getAllContacts(),
          getAllSousCategories(),
        ]);

        setCommands(commands);
        setCategories(categories);
        setContacts(contacts.reverse());
        setSousCategories(sousCategories);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, [fetchPaginatedProducts, rowsPerPage]);

  // 🧭 Table Pagination Effect
  React.useEffect(() => {
    fetchPaginatedProducts(page * rowsPerPage);
  }, [page, rowsPerPage, fetchPaginatedProducts]);

  // 🧩 Handlers

  const handleSaveProduct = async (productData) => {
    try {
      const isEdit = Boolean(productData.id);
      const response = await addNewProduct(productData);

      setProducts((prev) =>
        isEdit
          ? prev.map((prod) =>
              prod.id === productData.id ? { ...prod, ...response } : prod
            )
          : [...prev, response]
      );

      setSelectedProduct(null);
    } catch (error) {
      console.error("Error saving/updating product:", error.message);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenViewModal(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  // 🌐 Custom Router (maybe for SPA-style nav)
  const customRouter = {
    navigate: (to) => {
      setActivePage(to.slice(1));
      return false;
    },
    pathname: "",
    searchParams: new URLSearchParams(),
  };

  return (
    <AppProvider
      theme={demoTheme}
      router={customRouter}
      navigation={NAVIGATION}
    >
      <DashboardLayout branding={{ title: "", logo: <AppLogo /> }}>
        {activePage === "products" && (
          <PageContainer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{ background: "#2fcb00" }}
                  onClick={() => {
                    handleAddProduct();
                  }}
                >
                  Ajouter un Produit
                </Button>
              </Grid>

              {/* Filters Section */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Categorie</InputLabel>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="">Tous</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.frenchName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {subcategories.length > 0 && (
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Sous-catégorie</InputLabel>
                    <Select
                      value={subcategory}
                      onChange={handleSubcategoryChange}
                      label="Sous-catégorie"
                    >
                      <MenuItem value="">Tous</MenuItem>
                      {subcategories.map((sub) => (
                        <MenuItem key={sub.id} value={sub.id}>
                          {sub.frenchName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nom de produit"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Trier par</InputLabel>
                  <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    label="Sort By"
                  >
                    <MenuItem value="">Non</MenuItem>
                    <MenuItem value="highPrice">Prix élevé</MenuItem>
                    <MenuItem value="lowPrice">Prix Bas</MenuItem>
                    <MenuItem value="name">Nom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onView={handleViewProduct}
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={totalCount}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
              />
              {/* Product Table */}
              <Grid item xs={12}></Grid>
            </Grid>

            {/* Modals */}
            <ProductFormModal
              open={openFormModal}
              onClose={() => setOpenFormModal(false)}
              product={selectedProduct}
              onSave={handleSaveProduct}
            />
            <ProductViewModal
              open={openViewModal}
              onClose={() => setOpenViewModal(false)}
              product={selectedProduct}
            />
          </PageContainer>
        )}

        {activePage === "commands" && (
          <CommandsDashboard
            commands={commands}
            setCommands={setCommands}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={TotalPages}
          />
        )}
        {activePage === "categories" && (
          <CategoriesDashboard
            categories={categories}
            setCategories={setCategories}
          />
        )}
        {activePage === "souscategories" && (
          <SousCategoryDashboard
            categories={Souscategories}
            setCategories={setSousCategories}
          />
        )}
        {activePage === "contacts" && (
          <ContactDashboard contacts={contacts} setContacts={setContacts} />
        )}
        {activePage === "productOfTheYear" && (
          <ProductOTYDashboard productsOTY={productOTY}  setProductsOTY={setProductOTY} />
        )}
      </DashboardLayout>
    </AppProvider>
  );
}

export function AppLogo() {
  return (
    <div className="logo">
      <h4>
        Sabrina <span>Bio</span>
      </h4>
    </div>
  );
}
