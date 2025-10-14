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

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
  const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar") || "[]");

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
          <Dropdown
            align="end"
            autoClose="outside"
            onToggle={(nextShow, event, metadata) => {
              if (isDisabled && metadata.source === "click") {
                event.preventDefault();
                event.stopPropagation();
                return false;
              }
            }}
          >
            <Dropdown.Toggle
              as="div"
              id="dropdown-user"
              style={{
                opacity: isDisabled ? 0.5 : 1,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <i className="bi bi-person-circle fs-4 text-white"></i>
            </Dropdown.Toggle>

            {/* Sólo renderizo el menú si NO está deshabilitado */}
            {!isDisabled && (
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowProfile(true)}>Mis datos</Dropdown.Item>

                {/* Botón que despliega el grupo familiar dentro del menú */}
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    setMostrarListaFamiliar(!mostrarListaFamiliar);
                  }}
                >
                  Ver grupo familiar
                </Dropdown.Item>

                {/* Lista desplegable dentro del menú */}
                {mostrarListaFamiliar && grupoFamiliar.length > 0 && (
                  <div className="ps-3 border-start ms-2">
                    {grupoFamiliar.map((persona, index) => (
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
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem("usuarioLogueado");
                    localStorage.removeItem("grupoFamiliar");
                    window.location.href = "/";
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Container>
      </header>

      {/* Modal de perfil del usuario */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mi perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioLogueado ? (
            <>
              <p><strong>Nombre:</strong> {usuarioLogueado.nombre}</p>
              <p><strong>Email:</strong> {usuarioLogueado.correoElectronico}</p>
              <p><strong>DNI:</strong> {usuarioLogueado.numeroDeDocumento}</p>
              <p><strong>Credencial:</strong> {usuarioLogueado.numeroDeAfiliado}</p>
            </>
          ) : (
            <p>No hay información del usuario</p>
          )}
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
