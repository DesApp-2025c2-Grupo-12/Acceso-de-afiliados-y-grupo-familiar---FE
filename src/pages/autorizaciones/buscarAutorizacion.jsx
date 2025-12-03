import { Row, Col, Form, Button } from "react-bootstrap";

export default function BuscarAutorizacion({
  searchTerm,
  setSearchTerm,
  estadoFilter,
  setEstadoFilter,
  hoverBuscar,
  setHoverBuscar,
}) {
 const estados = [
    "Todos",
    "Recibido",
    "En análisis",
    "Observada",
    "Aprobada",
    "Rechazada",
    "Pendiente",
  ];

  return (
    <Row className="mb-4">
     
      <Col xs="auto" className="d-flex align-items-center">
       
      </Col>

      <Col md={5} className="mb-2">
        <Form.Control
          type="search"
          placeholder="Buscar por nombre de afiliado o médico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>

  
      <Col md={3} className="mb-2">
        <Form.Select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
        >
          {estados.map((e) => (
            <option key={e} value={e}>
              {e}
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
            setEstadoFilter("Todos");
          }}
          onMouseEnter={() => setHoverBuscar(true)}
          onMouseLeave={() => setHoverBuscar(false)}
        >
          Limpiar
        </Button>
      </Col>
    </Row>
  );
}
