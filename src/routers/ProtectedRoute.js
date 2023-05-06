import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom/useAuth";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

// điều hướng đăng nhập để làm những chức năng
