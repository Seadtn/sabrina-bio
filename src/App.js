import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { store } from "./redux/store.ts";
import React, { Suspense } from "react";
import Loader from "./components/loader/Loader";
import Dashboard from "./components/Admin/Dashboard";
import ModalCart from "./components/Modals/ModalCart/ModalCart";
import ModalFavorites from "./components/Modals/ModalFavorites/ModalFavorites";
import FastViewModal from "./components/Modals/ModalFastView/FastViewModal.js";
import LoginPage from "./components/Admin/Auth/LoginPage.js";
const Home = React.lazy(() => import("./components/Home"));
const Cart = React.lazy(() => import("./components/Cart/Cart"));
const Products = React.lazy(() => import("./components/Products"));
const Product = React.lazy(() => import("./components/Product"));
const Contact = React.lazy(() => import("./components/Contact"));
const Favorite = React.lazy(() => import("./components/Favorite/Favorites"));

function AppContent() {
  const navigate = useNavigate();

  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/admin");
  const isMounted = React.useRef(false);

  // Check if user is authenticated and fetch the session data
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("user"));
// eslint-disable-next-line
  const { items, successModal, errorModal } = useSelector(
    (state) => state.cart
  );
  // eslint-disable-next-line
  const { successFastViewModal, product } = useSelector(
    (state) => state.fastView
  );
  // eslint-disable-next-line
  const { favorites, errorFavModal, successFavModal } = useSelector(
    (state) => state.favorite
  );

  React.useEffect(() => {
    if (isMounted.current) {
      const dataCart = JSON.stringify(items);
      localStorage.setItem("cart", dataCart);
      const dataFavorites = JSON.stringify(favorites);
      localStorage.setItem("favorites", dataFavorites);
    }
    isMounted.current = true;

    // Session expiration check logic
    if (userData && userData.date) {
      const currentDate = new Date();
      const sessionDate = new Date(userData.date);
      const diffInTime = currentDate.getTime() - sessionDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      if (diffInDays > 7) {
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        localStorage.removeItem("favorites");
        navigate("/admin/login");
      }
    }
  }, [items, favorites, userData, navigate]);

  return (
    <>
      {!isDashboardRoute && <NavBar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/sign-in"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin/dashboard/*"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/login"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {!isDashboardRoute && <Footer />}
      {!isDashboardRoute && successModal && <ModalCart />}
      {!isDashboardRoute && successFastViewModal && <FastViewModal />}
      {!isDashboardRoute && successFavModal && <ModalFavorites />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
