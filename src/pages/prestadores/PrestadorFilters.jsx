import { Row, Col, Form } from "react-bootstrap";

export default function PrestadorFilters({
  search,
  setSearch,
  specialty,
  setSpecialty,
  location,
  setLocation,
  zona,
  setZona,
  errorNombre
}) {
  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Buscar prestador por nombre de medico o centro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={50}
          />
          {errorNombre && <small className="text-danger">{errorNombre}</small>}
        </Col>

        <Col md={4}>
          <Form.Select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
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
            onChange={(e) => {
              setLocation(e.target.value);
              setZona(""); // reset zona al cambiar ubicación
            }}
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

      {location === "Buenos Aires" && (
        <Row className="mb-4">
          <Col md={4}>
            <Form.Label>Zona:</Form.Label>
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
    </>
  );
}
