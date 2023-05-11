import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProduct from "../components/product/add-Product/AddProduct";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipe.jsx";
import Register from "../pages/Register.jsx";
import Admin from "../Admin/Admin";
import AdminOnly from "../Admin/AdminOnly";
import AdRouters from "./AdRouters";
import BlogAdd from "../components/blog/blogAdd/BlogAdd";
import Checkout from "../pages/Checkout";
import UserOnly from "../User/userOnly/UserOnly";
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
    </Routes>
  );
};

export default Routers;
