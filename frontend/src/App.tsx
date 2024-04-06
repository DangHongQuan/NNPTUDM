import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './pages/ProductList';
import './root/assets/img/favicon.png'

import './root/assets/img/apple-touch-icon.png';
import './root/assets/vendor/bootstrap/css/bootstrap.min.css';
import './root/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './root/assets/vendor/aos/aos.css';
import './root/assets/vendor/aos/aos.css';
import './root/assets/vendor/glightbox/css/glightbox.min.css';
import './root/assets/vendor/swiper/swiper-bundle.min.css';
import './root/assets/css/main.css';
import './root/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterFormProps';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>;
<script src="./root/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>;
<script src="./root/assets/vendor/aos/aos.js"></script>;
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



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
