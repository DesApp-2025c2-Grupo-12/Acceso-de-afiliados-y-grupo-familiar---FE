import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const usuarioLogueado = localStorage.getItem("usuarioLogueado");

  if (!usuarioLogueado) {
    return <Navigate to="/" replace />;
  }

  
  return children;
}