import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProduct from "../components/product/add-Product/AddProduct";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart.jsx";

import { ManagerAcc } from "../Admin/AdPages/ManagerAcc";
import AdminPage from "../Layout/adLayout/AdminPage";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipe.jsx";
import Register from "../pages/Register.jsx";

const Routers = () => {
  return (
    <Routes>
      {/* user */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product" element={<Product />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* admin */}
      <Route path="/admin" element={<AdminPage />} />
      {/* <Route path="/managerAcc" element={<ManagerAcc />} /> */}
    </Routes>
  );
};

export default Routers;
