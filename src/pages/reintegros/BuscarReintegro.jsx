import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function BuscarReintegro({
  searchTerm,
  setSearchTerm,
  estadoFilter,
  setEstadoFilter,
  hoverBuscar,
  setHoverBuscar,
}) {
  const estados = [
    "Todos los estados",
    "Recibido",
    "En análisis",
    "Observado",
    "Aprobado",
    "Rechazado",
  ];

  return (
    <Row className="mb-4">
      <Col md={6} className="mb-2">
        <Form.Control
          type="search"
          placeholder="Buscar por afiliado, rol, médico o especialidad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>

      <Col md={4} className="mb-2">
        <Form.Select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
        >
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2} className="mb-2">
        <Button
          variant="outline-secondary"
          className="w-100"
          onClick={() => {
            setSearchTerm("");
            setEstadoFilter("Todos los estados");
          }}
          onMouseEnter={() => setHoverBuscar && setHoverBuscar(true)}
          onMouseLeave={() => setHoverBuscar && setHoverBuscar(false)}
        >
          Limpiar
        </Button>
      </Col>
    </Row>
  );
}