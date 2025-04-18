import * as React from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
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
  getAllProducts,
  getAllSousCategories,
} from "../../api/backend.js";
import CategoryIcon from "@mui/icons-material/Category";
import CategoriesDashboard from "./categories/CategoriesDashboard.js";
import ContactDashboard from "./contact/ContactDashboard.js";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SousCategoryDashboard from "./sousCategorie/SousCategoryDashboard.js";

const NAVIGATION = [
  { kind: "header", title: "All" },
  { segment: "products", title: "Produits", icon: <ShoppingCartIcon /> },
  { segment: "commands", title: "Commandes", icon: <BackupTableIcon /> },
  { segment: "categories", title: "Categories", icon: <CategoryIcon /> },
  { segment: "souscategories", title: "Sous Categories", icon: <CategoryIcon /> },
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
  const [Souscategories, setSousCategories] = React.useState([]);

  // Filter states
  const [category, setCategory] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOption, setSortOption] = React.useState("");
  const [contacts, setContacts] = React.useState([]);

  // Handlers for filter changes
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleAddProduct = () =>{
    setSelectedProduct(null);
    setTimeout(() => setOpenFormModal(true), 0);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenFormModal(true);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
        const commands = await getAllCommands();
        setCommands(commands.reverse());
        const categories = await getAllCategories();
        setCategories(categories);
        const Contact = await getAllContacts();
        setContacts(Contact.reverse());
        const sousCategories = await getAllSousCategories();
        setSousCategories(sousCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  const handleSaveProduct = async (productData) => {
    try {
      let response;
      if (productData.id) {
        response = await addNewProduct({ ...productData });
      } else {
        response = await addNewProduct(productData);
      }
      setProducts((prev) => {
        if (productData.id) {
          return prev.map((prod) =>
            prod.id === productData.id ? { ...prod, ...response } : prod
          );
        } else {
          return [...prev, response];
        }
      });
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error saving/updating product:", error.message);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenViewModal(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    deleteProduct(id);
  };

  // Filter logic
  const filteredProducts = products.filter((product) => {
    return (
      (!category || product.category.id  === category) &&
      (!searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!sortOption ||
        (sortOption === "sale"
          ? product.promotion
          : sortOption === "new"
            ? product.productNew
            : product.name))
    );
  });

  const customRouter = {
    navigate: (to) => {
      setActivePage(to.slice(1)); // remove the / at the start of the string
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
                  onClick={()=>{handleAddProduct()}}
                >
                  Ajouter un  Produit
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
                    <MenuItem value="sale">Soldé</MenuItem>
                    <MenuItem value="new">Nouveau</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Product Table */}
              <Grid item xs={12}>
                <ProductTable
                  products={filteredProducts}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onView={handleViewProduct}
                />
              </Grid>
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
          <CommandsDashboard commands={commands} setCommands={setCommands} />
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
