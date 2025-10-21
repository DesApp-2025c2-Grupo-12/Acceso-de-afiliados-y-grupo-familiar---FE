import { Card, Row, Col } from "react-bootstrap";
import "./reintegros.css";


export default function CardReintegro({ reintegroFiltrado, seleccionarReintegro, abrirModalDetalle }) {

  const handleVerDetalle = (reintegro) => {
    seleccionarReintegro(reintegro);
    abrirModalDetalle(true);
  };


  return (
    <>
      <Card className="mb-3 card-reintegro" key={reintegroFiltrado.id}>

        <Card.Body>
          <Row className="align-items-center">
            <Col md={3}>
              <div className="monto">{reintegroFiltrado.monto}</div>
              <div className="fecha">{reintegroFiltrado.fecha}</div>
            </Col>

            <Col md={5}>
              <div className="paciente">{reintegroFiltrado.paciente}</div>
              <div className="datos-medico">
                <span>Médico: {reintegroFiltrado.medico}</span> |{" "}
                <span>Especialidad: {reintegroFiltrado.especialidad}</span>
              </div>
            </Col>

            <Col md={4} className="text-end">
              <div className={`estado ${reintegroFiltrado.estado === "Pendiente" ? "pendiente" : "pago"}`}>
                {reintegroFiltrado.estado}
              </div>
              <div className="acciones">
                <a href="#" onClick={() => handleVerDetalle(reintegroFiltrado) }>
                  Ver detalle
                </a>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </>
  )
}