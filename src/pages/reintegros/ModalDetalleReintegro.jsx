import { Modal } from "react-bootstrap";

export default function ModalDetalleReintegro({
  show,
  onHide,
  reintegro
}) {
  if (!reintegro) return null;

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#132074", color: "white" }}>
        <Modal.Title>Detalle del Reintegro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Paciente:</b> {reintegro.paciente}</p>
        <p><b>Fecha:</b> {reintegro.fecha}</p>
        <p><b>Médico:</b> {reintegro.medico}</p>
        <p><b>Especialidad:</b> {reintegro.especialidad}</p>
        <p><b>Monto:</b> {reintegro.monto}</p>
        <p><b>Lugar de atención:</b> {reintegro.lugarAtencion}</p>
        <p><b>Forma de pago:</b> {reintegro.formaPago}</p>
        <p><b>CBU/Alias:</b> {reintegro.cbuAlias}</p>
        {reintegro.descripcion && <p><b>Descripción:</b> {reintegro.descripcion}</p>}
      </Modal.Body>
    </Modal>
  );
};