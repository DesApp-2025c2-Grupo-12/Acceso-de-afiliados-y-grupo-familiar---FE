import React, { useState } from "react";
import { Dropdown, Container, Button, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [showFamily, setShowFamily] = useState(false);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [showModalPerfilFamiliar, setShowModalPerfilFamiliar] = useState(false);

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


  const location = useLocation();
  const disabledPaths = ["/", "/register"];
  const isDisabled = disabledPaths.includes(location.pathname);

  return (
    <>
      <header style={{ backgroundColor: "#132074" }} className="text-white py-2">
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Logo */}

          <Link
            to={isDisabled ? "#" : "/Home"}
            className={`d-flex align-items-center text-white text-decoration-none ${isDisabled ? "disabled" : ""}`}
            onClick={e => isDisabled && e.preventDefault()}
          >
            <img src={logo} alt="Logo" height="50" className="me-2" />
            <span>
              MEDICINA <br /> INTEGRAL
            </span>
          </Link>
  

          {/* Título */}
          <div className="text-center fw-bold">MEDICINA INTEGRAL</div>

          {/* Dropdown de usuario */}
          <Dropdown align="end">
            <Dropdown.Toggle as="div" id="dropdown-user" style={{ cursor: "pointer" }}>
              <i className="bi bi-person-circle fs-4 text-white"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowProfile(true)}>Mis datos</Dropdown.Item>
              <Dropdown.Item onClick={() => setShowFamily(true)}>Ver grupo familiar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </header>

      {/* Modal de perfil */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mi perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Nombre:</strong> Bianca Margarita
          </p>
          <p>
            <strong>Email:</strong> biancamargarita@gmail.com
          </p>
          <p>
            <strong>DNI:</strong> 40260243
          </p>
          <p>
            <strong>Credencial:</strong> 27/40260243/00
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal grupo familiar */}
      <Modal show={showFamily} onHide={() => setShowFamily(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Grupo Familiar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap gap-3">
            {grupoFamiliar.map((persona, index) => (
              <div
                key={index}
                className="border rounded p-3 flex-grow-1"
                style={{ minWidth: "200px", maxWidth: "220px" }}
              >
                <h5>{persona.nombre}</h5>
                <p className="mb-2">Rol: {persona.relacion}</p>
                <Button className="btn btn-blue mt-auto align-self-center"
                  variant="primary"
                  size="sm"
                  onClick={() => handleVerPerfilFamiliar(persona)}
                >
                  Ver perfil
                </Button>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFamily(false)}>
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
            <p><strong>Rol:</strong> {perfilSeleccionado.relacion}</p>
            <p><strong>Edad:</strong> {perfilSeleccionado.edad}</p>
            <p><strong>DNI:</strong> {perfilSeleccionado.DNI}</p>
            <p><strong>Mail:</strong> {perfilSeleccionado.mail}</p>
            <p><strong>Credencial:</strong> {perfilSeleccionado.credencial}</p>
            {/* Acá después podés agregar más info si querés */}
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
