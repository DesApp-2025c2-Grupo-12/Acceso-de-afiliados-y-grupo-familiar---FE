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
        <p><b>FechaDePrestación:</b> {reintegro.fechaDePrestacion}</p>
        <p><b>Paciente:</b> {reintegro.nombreDelAfiliado}</p>
        <p><b>Médico:</b> {reintegro.nombreDelMedico}</p>
        <p><b>Especialidad:</b> {reintegro.especialidad}</p>
        <p><b>Lugar de atención:</b> {reintegro.lugarDeAtencion}</p>
        <p><b>Fecha:</b> {reintegro.facturacion_Fecha}</p>
        <p><b>Cuit:</b> {reintegro.facturacion_Cuit}</p>
        <p><b>Monto Total:</b> {reintegro.facturacion_ValorTotal}</p>
        <p><b>Persona a la que se cobra:</b> {reintegro.facturacion_NombreDePersonaACobrar}</p>
        <p><b>Forma de pago:</b> {reintegro.formaDePago}</p>
        <p><b>CBU/Alias:</b> {reintegro.cbu}</p>
        <p><b>Observaciones generales:</b> {reintegro.observaciones}</p>
        {reintegro.descripcion && <p><b>Descripción:</b> {reintegro.descripcion}</p>}
      </Modal.Body>
    </Modal>
  );
};