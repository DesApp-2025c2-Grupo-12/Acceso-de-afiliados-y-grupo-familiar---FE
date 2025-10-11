import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ usuarioLogueado }) {
 
  

  const icons = {
    home: { default: "src/assets/icons/home-1.svg", active: "src/assets/icons/home-2.svg" },
    turnos: { default: "src/assets/icons/turnos-1.svg", active: "src/assets/icons/turnos-2.svg" },
    reintegros: { default: "src/assets/icons/reintegros-1.svg", active: "src/assets/icons/reintegros-2.svg" },
    autorizaciones: { default: "src/assets/icons/autorizaciones-1.svg", active: "src/assets/icons/autorizaciones-2.svg" },
    recetas: { default: "src/assets/icons/recetas-1.svg", active: "src/assets/icons/recetas-2.svg" },
    prestadores: { default: "src/assets/icons/prestadores-1.svg", active: "src/assets/icons/prestadores-2.svg" }
  };

  return (
    <nav>
      <NavLink to="/home">
        {({ isActive }) => (
          <>
            <img src={isActive ? icons.home.active : icons.home.default} alt="Ir al inicio" />
            <p>Home</p>
          </>
        )}
      </NavLink>

      <NavLink to="/turnos">
        {({ isActive }) => (
          <>
            <img src={isActive ? icons.turnos.active : icons.turnos.default} alt="Ir a la sección de turnos" />
            <p>Turnos</p>
          </>
        )}
      </NavLink>

      <NavLink to="/reintegros">
        {({ isActive }) => (
          <>
            <img src={isActive ? icons.reintegros.active : icons.reintegros.default} alt="Ir a la sección de reintegros" />
            <p>Reintegros</p>
          </>
        )}
      </NavLink>

      <NavLink to="/autorizaciones">
        {({ isActive }) => (
          <>
            <img src={isActive ? icons.autorizaciones.active : icons.autorizaciones.default} alt="Ir a la sección de autorizaciones" />
            <p>Autorizaciones</p>
          </>
        )}
      </NavLink>

      <NavLink to="/recetas">
        {({ isActive }) => (
          <>
            <img src={isActive ? icons.recetas.active : icons.recetas.default} alt="Ir a la sección de recetas" />
            <p>Recetas</p>
          </>
        )}
      </NavLink>

      <NavLink to="/prestadores">
        {({ isActive }) => (
          <>
            <img src={isActive ? icons.prestadores.active : icons.prestadores.default} alt="Ir a la sección de prestadores" />
            <p>Prestadores</p>
          </>
        )}
      </NavLink>
    </nav>
  );
}
