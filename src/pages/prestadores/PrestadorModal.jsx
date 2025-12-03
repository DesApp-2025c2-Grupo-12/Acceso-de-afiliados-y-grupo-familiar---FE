import { Modal, Button } from "react-bootstrap";

export default function PrestadorModal({ prestador, onClose }) {
    if (!prestador) return null;

    return (
        <Modal show={!!prestador} onHide={onClose} centered>
            <Modal.Header
                closeButton
                style={{ backgroundColor: "#132074", color: "white" }}
            >
                <Modal.Title style={{ color: "white" }}>
                    Perfil del Prestador
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{prestador.nombreCompleto}</h5>
                <p>
                    <strong>Especialidad:</strong> {prestador.especialidad} <br />
                    {prestador.esCentro ? (
                        <>
                            <strong>Centro Médico:</strong> Sí <br />
                            <strong>Zona:</strong> {prestador.integraCentro} <br />
                            <strong>Dirección:</strong> {prestador.direccion} <br />
                        </>
                    ) : (
                        <><strong>Dirección:</strong> {prestador.direccion} <br /></>
                    )}
                    <strong>Teléfono:</strong> {prestador.telefono} <br />
                    <strong>Correo:</strong> {prestador.correoElectronico} <br />
                    <strong>Horario:</strong> {prestador.horarioInicio?.slice(0, 5)} - {prestador.horarioFin?.slice(0, 5)} <br />
                    <strong>Días:</strong> {prestador.dias}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}
