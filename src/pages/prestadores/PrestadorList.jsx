import { Row, Col } from "react-bootstrap";
import PrestadorCard from "./PrestadorCard";

export default function PrestadorList({ prestadores, onSelect }) {
  if (!prestadores.length) return null;

  return (
    <Row className="g-3">
      {prestadores.map((p) => (
        <Col md={6} lg={6} key={p.id}>
          <PrestadorCard prestador={p} onVerDetalles={onSelect} />
        </Col>
      ))}
    </Row>
  );
}


