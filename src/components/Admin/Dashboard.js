import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { extendTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ProductTable from './pages/ProductTable';
import ProductFormModal from './pages/ProductFormModal.js';
import ProductViewModal from './pages/ProductViewModal.js';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Link } from "react-router-dom";

const NAVIGATION = [
  {
    kind: 'header',
    title: 'All',
  },
  {
    segment: '/all-products', 
    title: 'Products',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: '/all-commands', 
    title: 'Commands',
    icon: <BackupTableIcon /> 
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Categories',
  },
  {
    segment: '/category1', 
    title: 'Category 1',
    icon: <CategoryIcon />,
  },
  {
    segment: '/category2', 
    title: 'Category 2',
    icon: <CategoryIcon />,
  },
  {
    segment: '/category3', 
    title: 'Category 3',
    icon: <CategoryIcon />,
  },
  {
    segment: '/category4', 
    title: 'Category 4',
    icon: <CategoryIcon />,
  },
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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  
  
  const router = React.useMemo(() => {
    
    var x = {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
    console.log(x);
    return x;
  }, [pathname]);

  return router;
}

export default function Dashboard(props) {
  const { window } = props;

  const router = useDemoRouter('/all-products');

  const demoWindow = window ? window() : undefined;

  const [products, setProducts] = React.useState(SAMPLE_PRODUCTS);
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleAddProduct = () => setOpenFormModal(true);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenFormModal(true);
  };

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((prod) => (prod.id === selectedProduct.id ? { ...prod, ...productData } : prod))
      );
    } else {
      setProducts((prev) => [...prev, { ...productData, id: Date.now() }]);
    }
    setSelectedProduct(null);
  };

  const handleViewProduct = (product) => {
    console.log(product);
    
    setSelectedProduct(product);
    setOpenViewModal(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };


  // Handle navigation item click
  const handleNavigationClick = (item,event) => {
    console.log(item,event);
    return true;
  };

  return (
    <AppProvider theme={demoTheme} router={router} window={demoWindow} navigation={NAVIGATION}  >
      <DashboardLayout branding={{ title: '', logo: <AppLogo /> }}  >
        <PageContainer>
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
        </PageContainer>
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
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    description: "Handcrafted genuine leather backpack with multiple compartments. Perfect for daily use or travel. Features adjustable straps and water-resistant coating.",
    price: 199.99,
    image: null, // Would be byte array in real data
    creationDate: "2024-03-01",
    inSold: true,
    startDate: "2024-03-15",
    lastDate: "2024-04-15",
    soldRation : 30,
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    description: "High-quality wireless headphones with active noise cancellation. 30-hour battery life, premium sound quality, and comfortable over-ear design.",
    price: 299.99,
    image: null,
    creationDate: "2024-02-15",
    inSold: false,
    startDate: null,
    lastDate: null,
    soldRation : 20,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and smartphone notifications. Water-resistant up to 50m.",
    price: 149.99,
    image: null,
    creationDate: "2024-01-20",
    inSold: true,
    startDate: "2024-03-10",
    lastDate: "2024-03-31",
    soldRation : 20,
  }
];

