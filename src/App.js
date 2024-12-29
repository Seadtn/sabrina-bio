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
const SignIn = React.lazy(() => import("./components/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const Profile = React.lazy(() => import("./components/Profile"));
const Contact = React.lazy(() => import("./components/Contact"));
const Favorite = React.lazy(() => import("./components/Favorite/Favorites"));

function AppContent() {
  const navigate = useNavigate();

  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/sabrina-bio/admin");
  const isMounted = React.useRef(false);

  // Check if user is authenticated and fetch the session data
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("user"));

  const { items, successModal, errorModal } = useSelector(
    (state) => state.cart
  );
  const { successFastViewModal, product } = useSelector(
    (state) => state.fastView
  );
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
        navigate("/sabrina-bio/sign-in");
      }
    }
  }, [items, favorites, userData, navigate]);

  return (
    <>
      {!isDashboardRoute && <NavBar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/sabrina-bio" element={<Home />} />
          <Route path="/sabrina-bio/cart" element={<Cart />} />
          <Route path="/sabrina-bio/favorite" element={<Favorite />} />
          <Route path="/sabrina-bio/products" element={<Products />} />
          <Route path="/sabrina-bio/product/:id" element={<Product />} />
          <Route
            path="/sabrina-bio/sign-in"
            element={
              isAuthenticated ? (
                <Navigate to="/sabrina-bio" replace />
              ) : (
                <SignIn />
              )
            }
          />
          <Route path="/sabrina-bio/sign-up" element={<SignUp />} />
          <Route path="/sabrina-bio/profile" element={<Profile />} />
          <Route path="/sabrina-bio/contact" element={<Contact />} />
          <Route
            path="/sabrina-bio/admin/dashboard/*"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/sabrina-bio/admin/login" replace />
              )
            }
          />
          <Route
            path="/sabrina-bio/admin/login"
            element={
              isAuthenticated ? (
                <Navigate to="/sabrina-bio/admin/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="*" element={<Navigate to="/sabrina-bio" replace />} />
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
