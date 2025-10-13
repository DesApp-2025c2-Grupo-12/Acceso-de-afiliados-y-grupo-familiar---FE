import React, { useState } from "react";
import { Dropdown, Container, Button, Modal } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { calcularEdad } from "../../utils/utils";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [showModalPerfilFamiliar, setShowModalPerfilFamiliar] = useState(false);
  const [mostrarListaFamiliar, setMostrarListaFamiliar] = useState(false);

  const location = useLocation();
  const disabledPaths = ["/", "/register"];
  const isDisabled = disabledPaths.includes(location.pathname);

  // Datos de prueba
  const grupoFamiliar = [
    { nombre: "Bianca Margarita", relacion: "Afiliado", edad: 40, DNI: "40260243", mail: "biancamargarita@gmail.com", credencial: "27/40260243/00" },
    { nombre: "Juan Pérez", relacion: "Cónyuge", edad: 38, DNI: "38265895", mail: "juanperez@gmail.com", credencial: "27/38265895/00" },
    { nombre: "Lucas Pérez", relacion: "Hijo", edad: 17, DNI: "48658945", mail: "lucasperez@gmail.com", credencial: "27/48658945/00" },
    { nombre: "Sofía Pérez", relacion: "Hija", edad: 12, DNI: "50654965", mail: "sofiaperez@gmail.com", credencial: "27/50654965/00" },
  ];

  const handleVerPerfilFamiliar = (persona) => {
    setPerfilSeleccionado(persona);
    setShowModalPerfilFamiliar(true);
  };

  return (
    <>
      <header style={{ backgroundColor: "#132074" }} className="text-white py-2">
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Logo con control de navegación */}
          <Link
            to={isDisabled ? "#" : "/Home"}
            className={`d-flex align-items-center text-white text-decoration-none ${isDisabled ? "disabled" : ""}`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <img src={logo} alt="Logo" height="50" className="me-2" />
            <span>
              MEDICINA <br /> INTEGRAL
            </span>
          </Link>

          {/* Título */}
          <div className="text-center fw-bold">MEDICINA INTEGRAL</div>

          {/* Dropdown de usuario */}
          <Dropdown align="end" autoClose="outside">
            <Dropdown.Toggle as="div" id="dropdown-user" style={{ cursor: "pointer" }}>
              <i className="bi bi-person-circle fs-4 text-white"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowProfile(true)}>Mis datos</Dropdown.Item>

              {/* Botón que despliega el grupo familiar dentro del menú */}
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation(); // evita que se cierre el menú
                  setMostrarListaFamiliar(!mostrarListaFamiliar);
                }}
              >
                Ver grupo familiar
              </Dropdown.Item>

              {/* Lista desplegable dentro del menú */}
              {mostrarListaFamiliar && (
                <div className="ps-3 border-start ms-2">
                  {JSON.parse(localStorage.getItem("grupoFamiliar")).map((persona, index) => (
                    <Dropdown.Item
                      
                      key={index}
                      onClick={() => handleVerPerfilFamiliar(persona)}
                      className="text-primary"
                    >
                       {persona.nombre}
                    </Dropdown.Item>
                  ))}
                </div>
              )}

              <Dropdown.Divider />
              <Dropdown.Item href="/">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </header>

      {/* Modal de perfil del usuario */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mi perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Nombre:</strong> {JSON.parse(localStorage.getItem("usuarioLogueado")).nombre}</p>
          <p><strong>Email:</strong> {JSON.parse(localStorage.getItem("usuarioLogueado")).correoElectronico}</p>
          <p><strong>DNI:</strong> {JSON.parse(localStorage.getItem("usuarioLogueado")).numeroDeDocumento}</p>
          <p><strong>Credencial:</strong> {JSON.parse(localStorage.getItem("usuarioLogueado")).numeroDeAfiliado}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de perfil de familiar */}
      {perfilSeleccionado && (
        <Modal
          show={showModalPerfilFamiliar}
          onHide={() => setShowModalPerfilFamiliar(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Perfil de {perfilSeleccionado.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Nombre:</strong> {perfilSeleccionado.nombre}</p>
            <p><strong>Relacion:</strong> {perfilSeleccionado.parentesco}</p>
            <p><strong>Edad:</strong> {calcularEdad(perfilSeleccionado.fechaDeNacimiento)} Años</p>
            <p><strong>DNI:</strong> {perfilSeleccionado.numeroDeDocumento}</p>
            <p><strong>Mail:</strong> {perfilSeleccionado.correoElectronico}</p>
            <p><strong>Credencial:</strong> {perfilSeleccionado.numeroDeAfiliado}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalPerfilFamiliar(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
