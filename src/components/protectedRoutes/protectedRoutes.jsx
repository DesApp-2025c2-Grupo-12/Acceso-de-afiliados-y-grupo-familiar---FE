import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const usuarioLogueado = localStorage.getItem("afiliadoLogueado");

  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
}