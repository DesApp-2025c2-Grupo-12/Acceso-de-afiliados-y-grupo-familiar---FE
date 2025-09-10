import React from "react";
import { Dropdown, Container } from "react-bootstrap";
import logo from "../../assets/logo.png"; // Ruta a tu logo



export default function Header() {
  return (
    <header  style={{ backgroundColor: "#132074" }} className="text-white py-2">
      <Container fluid className="d-flex justify-content-between align-items-center">

        <a href="/Home" className="d-flex align-items-center text-white text-decoration-none">
          <img src={logo} alt="Logo Medicina Integral" height="50" className="me-2" />
          <span>MEDICINA <br></br> INTEGRAL</span>
        </a>

         <div className="text-center fw-bold">
          MEDICINA INTEGRAL
        </div>

        <Dropdown align="end">
          <Dropdown.Toggle as="div" id="dropdown-user" style={{ cursor: "pointer" }} >
            <i className="bi bi-person-circle fs-4 text-white"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="">Mis datos</Dropdown.Item>
            <Dropdown.Item href="">ver usuarios</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/">Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </header>
  );
}