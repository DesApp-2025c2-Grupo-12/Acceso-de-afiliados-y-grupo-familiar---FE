import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  
  return (
    <nav>
      <Link to="/Home">
        <img src="src/assets/icons/home-1.svg" alt="Ir al inicio" />
        <p>Home</p>
      </Link>
      
      <Link to="/turnos">
        <img src="src/assets/icons/turnos-1.svg" alt="Ir a la sección de turnos" />
        <p>Turnos</p>
      </Link>

      <Link to="/reintegros">
        <img src="src/assets/icons/reintegros-1.svg" alt="Ir a la sección de reintegros" />
        <p>Reintegros</p>
      </Link>

      <Link to="/autorizaciones">
        <img src="src/assets/icons/autorizaciones-1.svg" alt="Ir a la sección de autorizaciones" />
        <p>Autorizaciones</p>
      </Link>

      <Link to="/recetas">
        <img src="src/assets/icons/recetas-1.svg" alt="Ir a la sección de recetas" />
        <p>Recetas</p>
      </Link>
      
      {/**
        <Link to="/prestadores">
          <img src="src/assets/icons/prestadores-1.svg" alt="Ir a la sección de prestadores" />
        </Link>
      */}
    </nav>
  )
}

