import { Modal, Button } from "react-bootstrap";

export default function PrestadorModal({ prestador, onClose }) {
  if (!prestador) return null;

  return (
    <Modal show={!!prestador} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Perfil del Prestador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{prestador.nombreCompleto}</h5>
        <p>
          <strong>Especialidad:</strong> {prestador.especialidad} <br />
          <strong>Ubicación:</strong> {prestador.direccion} <br />
          {prestador.esCentro && <><strong>Centro:</strong> Sí <br /></>}
          <strong>Teléfono:</strong> {prestador.telefono} <br />
          <strong>Correo:</strong> {prestador.correoElectronico} <br />
          <strong>Horario:</strong> {prestador.horarioInicio} - {prestador.horarioFin} <br />
          <strong>Días:</strong> {prestador.dias}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
