import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { extendTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ProductTable from './pages/ProductTable';
import ProductFormModal from './pages/ProductFormModal';
import ProductViewModal from './pages/ProductViewModal';
import BackupTableIcon from '@mui/icons-material/BackupTable';

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
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function Dashboard(props) {
  const { window } = props;

  const router = useDemoRouter('/all-products');
  const demoWindow = window ? window() : undefined;

  const [products, setProducts] = React.useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 150 },
  ]);
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
    setSelectedProduct(product);
    setOpenViewModal(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <AppProvider  navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={3}>
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
