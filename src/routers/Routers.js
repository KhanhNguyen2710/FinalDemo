import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipe.jsx";
import Register from "../pages/Register.jsx";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product" element={<Product />} />


      <Route path="/profile" element={<Profile/>} />

      <Route path="/recipe" element={<Recipe />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;
