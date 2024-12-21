import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { extendTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductTable from './product/ProductTable.js';
import ProductFormModal from './product/ProductFormModal.js';
import ProductViewModal from './product/ProductViewModal.js';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CommandsDashboard from './commands/CommandsDashboard.js';
import { addNewProduct, getAllProducts } from '../../api/backend.js';
import CategoryIcon from '@mui/icons-material/Category';
import CategoriesDashboard from './categories/CategoriesDashboard.js'
const NAVIGATION = [
  {
    kind: 'header',
    title: 'All',
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'commands',
    title: 'Commands',
    icon: <BackupTableIcon /> 
  },
  {
    segment: 'categories',
    title: 'Categories',
    icon: <CategoryIcon /> 
  },
  // {
  //   kind: 'divider',
  // },
  // {
  //   kind: 'header',
  //   title: 'Categories',
  // },
  // {
  //   segment: 'category1',
  //   title: 'Category 1',
  //   icon: <CategoryIcon />,
  // },
  // {
  //   segment: 'category2',
  //   title: 'Category 2',
  //   icon: <CategoryIcon />,
  // }
];

const demoTheme = extendTheme({
  palette: {
      mode: 'light', 
      primary: {
        main: '#2fcb00',  
      },
    },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState('products');
  const [products, setProducts] = React.useState([]);
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleAddProduct = () => setOpenFormModal(true);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenFormModal(true);
  };
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products); 
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
  }

  const handleViewProduct = (product) => {
    console.log(product);
    
    setSelectedProduct(product);
    setOpenViewModal(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const customRouter = {
    navigate: (to) => {
      setActivePage(to.slice(1)); // remove the / at the start of the string
      return false;
    },
    pathname: '',
    searchParams: new URLSearchParams(),
  };
  return (
    <AppProvider theme={demoTheme} router={customRouter} navigation={NAVIGATION} >
      <DashboardLayout branding={{ title: '', logo: <AppLogo /> }}>
        {activePage === 'products' && 
          (<PageContainer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" style={{background:"#2fcb00"}} onClick={handleAddProduct}>
                  Add Product
                </Button>
              </Grid>

              <Grid item xs={12}>
                <ProductTable
                  products={products}
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
          </PageContainer>)
        }
        {activePage === 'commands' && (<CommandsDashboard />)}
        {activePage === 'categories' && (<CategoriesDashboard />)}
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
