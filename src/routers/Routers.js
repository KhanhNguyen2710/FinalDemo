import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart.jsx";

import AdminOnly from "../Admin/AdminOnly";
import CheckOutDetail from "../components/checkOut/CheckOutDetail";
import CheckOutHistory from "../components/checkOut/CheckOutHistory";
import CheckOutSuccess from "../components/checkOut/CheckOutSuccess";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipe.jsx";
import Register from "../pages/Register.jsx";
import AdRouters from "./AdRouters";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/home"
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product" element={<Product />} />
      {/* <Route path="/addProduct" element={<AddProduct />} /> */}
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/*"
        element={
          <AdminOnly>
            <AdRouters />
          </AdminOnly>
        }
      />
      {/* CHECK OUT */}
      <Route path="/checkout-success" element={<CheckOutSuccess />} />
      <Route path="/checkout-history" element={<CheckOutHistory />} />
      <Route path="/checkout-detail/:id" element={<CheckOutDetail />} />
    </Routes>
  );
};

export default Routers;
