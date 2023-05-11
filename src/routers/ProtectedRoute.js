import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../User/Auth";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = Auth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

// điều hướng đăng nhập để làm những chức năng
