import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { store } from './redux/store.ts'; 
import React, { Suspense } from 'react';
import Loader from './components/loader/Loader.jsx';

const Home = React.lazy(() => import('./components/Home.jsx'));
const Cart = React.lazy(() => import('./components/Cart/Cart.jsx'));
const Products = React.lazy(() => import('./components/Products.jsx'));
const Product = React.lazy(() => import('./components/Product.jsx'));
const SignIn = React.lazy(() => import('./components/SignIn.jsx'));
const SignUp = React.lazy(() => import('./components/SignUp.jsx'));
const Profile = React.lazy(() => import('./components/Profile.jsx'));
const Contact = React.lazy(() => import('./components/Contact.jsx'));
const Favorite = React.lazy(() => import('./components/Favorite/Favorites.jsx'));
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar />
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/sabrine-bio" element={<Home />} />
              <Route path="/sabrine-bio/cart" element={<Cart />} />
              <Route path="/sabrine-bio/favorite" element={<Favorite />} />
              <Route path="/sabrine-bio/products" element={<Products />} />
              <Route path="/sabrine-bio/product/:id" element={<Product />} />
              <Route path="/sabrine-bio/sign-in" element={<SignIn />} />
              <Route path="/sabrine-bio/sign-up" element={<SignUp />} />
              <Route path="/sabrine-bio/profile" element={<Profile />} />
              <Route path="/sabrine-bio/contact" element={<Contact />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
