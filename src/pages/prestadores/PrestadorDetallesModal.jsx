import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PrestadorDetallesModal({ prestador, onClose }) {
  if (!prestador) return null;

  return (
    <Modal show={!!prestador} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{prestador.nombreCompleto}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Especialidad:</strong> {prestador.especialidad}</p>
        <p><strong>Centro Médico:</strong> {prestador.esCentro ? "Sí" : "No"}</p>
        {prestador.esCentro && (
          <p><strong>Zona:</strong> {prestador.integraCentro}</p>
        )}
        <p><strong>Dirección:</strong> {prestador.direccion}</p>
        <p><strong>Teléfono:</strong> {prestador.telefono}</p>
        <p><strong>Correo:</strong> {prestador.correoElectronico}</p>
        <p>
          <strong>Horario:</strong> {prestador.horarioInicio} - {prestador.horarioFin}
        </p>
        <p><strong>Días:</strong> {prestador.dias}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
