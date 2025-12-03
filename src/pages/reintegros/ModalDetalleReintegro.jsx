import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { capitalizar } from "../../utils/utils"

export default function ModalDetalleReintegro({
  show,
  onHide,
  reintegroId
}) {
  const [reintegro, setReintegro] = useState(null);


  useEffect(() => {
    if (show && reintegroId) {
      // Usa tu endpoint existente
      fetch(`http://localhost:3000/refund/${reintegroId}`)
        .then(response => response.json())
        .then(setReintegro)
        .catch(console.error);
    }
  }, [show, reintegroId]);

  if (!reintegro) return null;

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#132074", color: "white" }}>
        <Modal.Title>Detalle del Reintegro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><b>Fecha de prestación:</b> {new Date(reintegro.fechaDePrestacion).toLocaleDateString('es-ES')}</p>
        <p><b>Afiliado:</b> {reintegro.nombreDelAfiliado}</p>
        <p><b>Médico:</b> {reintegro.nombreDelMedico}</p>
        <p><b>Especialidad:</b> {reintegro.especialidad}</p>
        <p><b>Lugar de atención:</b> {reintegro.lugarDeAtencion}</p>
        <p><b>Fecha de facturación:</b> {new Date(reintegro.facturacion_Fecha).toLocaleDateString('es-ES')}</p>
        <p><b>Cuit:</b> {reintegro.facturacion_Cuit}</p>
        <p><b>Monto Total:</b> ${reintegro.facturacion_ValorTotal?.toLocaleString('es-AR')}</p>
        <p><b>Persona a la que se factura:</b> {reintegro.facturacion_NombreDePersonaACobrar}</p>
        <p><b>Forma de pago:</b> {capitalizar((reintegro.formaDePago))}</p>
        <p><b>CBU/Alias:</b> {reintegro.cbu}</p>
        <p><b>Observaciones generales:</b> {reintegro.observaciones}</p>
        <p><b>Estado:</b> {reintegro.estado}</p>
        {reintegro.descripcion && <p><b>Descripción:</b> {reintegro.descripcion}</p>}
      </Modal.Body>
    </Modal>
  );
};