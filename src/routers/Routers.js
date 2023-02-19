import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart.jsx";
import Contact from "../pages/Contact.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Recipe from "../pages/Recipe.jsx";
import Register from "../pages/Register.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default Routers;
