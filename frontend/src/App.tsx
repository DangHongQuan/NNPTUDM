import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './pages/ProductList';
import './root/assets/img/favicon.png'
import './assets/css/styles.min.css'
import './root/assets/img/apple-touch-icon.png';
import './root/assets/vendor/bootstrap/css/bootstrap.min.css';
import './root/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './root/assets/vendor/aos/aos.css';
import './root/assets/vendor/aos/aos.css';
import './root/assets/vendor/glightbox/css/glightbox.min.css';
import './root/assets/vendor/swiper/swiper-bundle.min.css';
import './root/assets/css/main.css';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterFormProps';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import CartPage from "./pages/CartPage";
import Dasboard from "./admin/Dasboard";
import CategoryAddAdmin from "./admin/CategoryAddAdmin";
import ProductAddAdmin from "./admin/ProductAddAdmin";
import ProductAll from "./admin/ProductAll";
import EditProduct from "./admin/EditProduct";
import CategoryAllAdmin from "./admin/CategoryAll";
import CateProduct from "./pages/CateProduct";
import Contact from "./pages/Concact";
import UserAdmin from "./admin/UserAdmin";
import CartAdmin from "./admin/CartAdmin";
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>;
<script src="./root/assets/vendor/glightbox/js/glightbox.min.js"></script>;
<script src="./root/assets/vendor/purecounter/purecounter_vanilla.js"></script>;
<script src="./root/assets/vendor/swiper/swiper-bundle.min.js"></script>;
<script src="./root/assets/vendor/php-email-form/validate.js"></script>;
function App() {
  return (
    <>

      <BrowserRouter >
        <Routes>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/Dashboard" element={<Dasboard />} />
          <Route path="/admin/Category/add" element={<CategoryAddAdmin />} />
          <Route path="/product/edit/:id" element={<EditProduct  />} />
          <Route path="/admin/product/add" element={<ProductAddAdmin />} />
          <Route path="/admin/product" element={<ProductAll />} />
          <Route path="/admin/category" element={<CategoryAllAdmin />} />
          <Route path="/products/:categoryId" element={<CateProduct/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/admin/users" element={<UserAdmin/>} />
          <Route path="/admin/cart" element={<CartAdmin/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
