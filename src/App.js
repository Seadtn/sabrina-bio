import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Cart from './components/Cart'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Products from './components/Products'
import Product from './components/Product'
import Profile from './components/Profile'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import Contact from './components/Contact'
// eslint-disable-next-line no-unused-vars
import i18n from './i18n/i18n'; 

function App() {
  return (
    <div className="App" >
      <Router>
          <NavBar/>
          <Routes>
              <Route  path="/sabrine-bio" element={<Home/>}/>  
              <Route path="/sabrine-bio/cart" element={<Cart/>}/>  
              <Route path="/sabrine-bio/products" element={<Products/>}/>  
              <Route path="/sabrine-bio/product/:id" element={<Product/>}/>  
              <Route path="/sabrine-bio/sign-in" element={<SignIn/>}/>  
              <Route path="/sabrine-bio/sign-up" element={<SignUp/>}/>   
              <Route path="/sabrine-bio/profile" element={<Profile/>}/>  
              <Route path="/sabrine-bio/contact" element={<Contact/>}/>  
              <Route path="*" element={<Home/>}/>  
          </Routes>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;