import { Row, Col } from "react-bootstrap";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function PrestadorList({ prestadores, onSelect }) {
  return (
    <Row className="g-3">
      {prestadores.length ? (
        prestadores.map((p) => (
          <Col md={4} key={p.id} className="d-flex">
            <div className="d-flex flex-column h-100 w-100">
              <CardPersonalizada
                title={p.nombreCompleto}
                subtitle={p.especialidad}
                tipo={p.esCentro ? "Centro Médico" : p.direccion}
                detalles={[
                  { label: "Especialidad", value: p.especialidad },
                  { label: "Ubicación", value: p.direccion },
                  { label: "Teléfono", value: p.telefono },
                  { label: "Correo", value: p.correoElectronico },
                ]}
                botonTexto="Ver perfil"
                onClick={() => onSelect(p)}
                className="h-100"
              />
            </div>
          </Col>
        ))
      ) : (
        <p className="text-center">No se encontraron prestadores.</p>
      )}
    </Row>
  );
}
