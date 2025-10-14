import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from './pages/home/home'
import Recetas from './pages/recetas/recetas'
import Turnos from './pages/turnos/turnos'
import Prestadores from './pages/prestadores/prestadores'
import Autorizaciones from './pages/autorizaciones/autorizaciones'
import NuevoTurno from './pages/turnos/nuevoTurno'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Reintegros from './pages/reintegros/reintegros'
import ProtectedRoute from './components/protectedRoutes/protectedRoutes'
//import { useState, useEffect } from 'react'


function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/register";
  return (


    <div className="d-flex flex-column min-vh-100">
       <Header />

      <div className="content">

        {!hideNav && <Navbar />}
        <main className="container my-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<p>Contacto...</p>} />
            <Route path="/recetas" element={<ProtectedRoute><Recetas /></ProtectedRoute>} />
            <Route path="/turnos" element={<ProtectedRoute><Turnos /></ProtectedRoute>} />
            <Route path="/reintegros" element={<ProtectedRoute><Reintegros /></ProtectedRoute>} />
            <Route path="/autorizaciones" element={<ProtectedRoute><Autorizaciones></Autorizaciones></ProtectedRoute>} />
            <Route path="/prestadores" element={<ProtectedRoute><Prestadores /></ProtectedRoute>} />
            <Route path="/nuevo-turno" element={<ProtectedRoute><NuevoTurno /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>

  )

}

export default App

