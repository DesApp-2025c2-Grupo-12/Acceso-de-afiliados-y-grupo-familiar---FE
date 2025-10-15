import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function Prestadores() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [zona, setZona] = useState("");
  const [selectedPrestador, setSelectedPrestador] = useState(null);

  const prestadores = [
    { id: 1, nombre: "Dr. Juan Pérez", especialidad: "Cardiología", ubicacion: "Buenos Aires", zona: "Oeste", telefono: "11-4567-8901", lugar: "Hospital Municipal de Hurlingham" },
    { id: 2, nombre: "Dra. María Gómez", especialidad: "Pediatría", ubicacion: "CABA", telefono: "11-2222-3333", lugar: "Sanatorio Trinidad" },
    { id: 3, nombre: "Dr. Luis Martínez", especialidad: "Dermatología", ubicacion: "Córdoba", telefono: "351-444-5555", lugar: "Hospital Italiano de Córdoba" },
    { id: 4, nombre: "Dra. Ana Torres", especialidad: "Cardiología", ubicacion: "Buenos Aires", zona: "Oeste", telefono: "11-9876-5432", lugar: "Clínica Modelo de Morón" },
    { id: 5, nombre: "Dr. Ricardo López", especialidad: "Clínica Médica", ubicacion: "Santa Fe", telefono: "342-111-2222", lugar: "Sanatorio Parque" },
    { id: 6, nombre: "Dra. Laura Sánchez", especialidad: "Pediatría", ubicacion: "Buenos Aires", zona: "Sur", telefono: "11-3333-4444", lugar: "Hospital El Cruce" },
    { id: 7, nombre: "Dr. Ernesto Díaz", especialidad: "Ginecología", ubicacion: "CABA", telefono: "11-5555-6666", lugar: "Hospital Fernández" },
    { id: 8, nombre: "Dra. Paula Fernández", especialidad: "Dermatología", ubicacion: "Buenos Aires", zona: "Este", telefono: "11-6666-7777", lugar: "Sanatorio Anchorena" },
    { id: 9, nombre: "Dr. Alberto Rivas", especialidad: "Neurología", ubicacion: "Mendoza", telefono: "261-888-9999", lugar: "Hospital Central de Mendoza" },
    { id: 10, nombre: "Dra. Sofía Méndez", especialidad: "Traumatología", ubicacion: "Buenos Aires", zona: "Norte", telefono: "11-1234-5678", lugar: "Hospital Posadas" },
  ];

  const filteredPrestadores = prestadores.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) &&
    (specialty === "" || p.especialidad === specialty) &&
    (location === "" || p.ubicacion === location) &&
    (location !== "Buenos Aires" || zona === "" || p.zona === zona)
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Prestadores</h2>

      {/* Buscador y filtros */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">Todas las especialidades</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Clínica Médica">Clínica Médica</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Neurología">Neurología</option>
            <option value="Traumatología">Traumatología</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={location}
            onChange={(e) => { setLocation(e.target.value); setZona(""); }}
          >
            <option value="">Todas las ubicaciones</option>
            <option value="CABA">CABA</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Santa Fe">Santa Fe</option>
            <option value="Mendoza">Mendoza</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Zonas para Buenos Aires */}
      {location === "Buenos Aires" && (
        <Row className="mb-4">
          <Col md={4}>
            <Form.Select value={zona} onChange={(e) => setZona(e.target.value)}>
              <option value="">Todas las zonas</option>
              <option value="Norte">Zona Norte</option>
              <option value="Sur">Zona Sur</option>
              <option value="Este">Zona Este</option>
              <option value="Oeste">Zona Oeste</option>
            </Form.Select>
          </Col>
        </Row>
      )}

      {/* Listado de prestadores */}
      <Row className="g-3">
        {filteredPrestadores.length > 0 ? (
          filteredPrestadores.map((p) => (
            <Col md={4} key={p.id} className="d-flex">
              <div className="d-flex flex-column h-100 w-100">
                <CardPersonalizada
                  title={p.nombre}
                  subtitle={p.especialidad}
                  tipo={p.ubicacion === "Buenos Aires" && p.zona ? `Zona ${p.zona}` : p.ubicacion}
                  detalles={[
                    { label: "Especialidad", value: p.especialidad },
                    { label: "Ubicación", value: p.ubicacion },
                    { label: "Lugar", value: p.lugar },
                    { label: "Teléfono", value: p.telefono },
                  ]}
                  botonTexto="Ver perfil"
                  onClick={() => setSelectedPrestador(p)}
                  className="h-100"
                />
              </div>
            </Col>
          ))
        ) : (
          <p className="text-center">No se encontraron prestadores.</p>
        )}
      </Row>

      {/* Modal de perfil */}
      <Modal show={selectedPrestador !== null} onHide={() => setSelectedPrestador(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Perfil del Prestador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPrestador && (
            <>
              <h5>{selectedPrestador.nombre}</h5>
              <p>
                <strong>Especialidad:</strong> {selectedPrestador.especialidad} <br />
                <strong>Ubicación:</strong> {selectedPrestador.ubicacion} <br />
                {selectedPrestador.ubicacion === "Buenos Aires" && (
                  <>
                    <strong>Zona:</strong> {selectedPrestador.zona} <br />
                  </>
                )}
                <strong>Lugar:</strong> {selectedPrestador.lugar} <br />
                <strong>Teléfono:</strong> {selectedPrestador.telefono}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedPrestador(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
