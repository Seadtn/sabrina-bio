import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { store } from "./redux/store.ts";
import React, { Suspense } from "react";
import Loader from "./components/loader/Loader";
import Dashboard from "./components/Admin/Dashboard";

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
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/sabrine-bio/admin";

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
          <Route path="/sabrina-bio/sign-in" element={<SignIn />} />
          <Route path="/sabrina-bio/sign-up" element={<SignUp />} />
          <Route path="/sabrina-bio/profile" element={<Profile />} />
          <Route path="/sabrina-bio/contact" element={<Contact />} />
          <Route path="/sabrina-bio/admin" element={<Dashboard />} />
        </Routes>
      </Suspense>
      {!isDashboardRoute && <Footer />}
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