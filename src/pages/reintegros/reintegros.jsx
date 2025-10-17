import React, { useState } from "react";
import { Card, Row, Col, Modal, Container } from "react-bootstrap";
import "./reintegros.css";
import grupoFamiliarInicial from "../../data/grupoFamiliar.json";
import reintegrosIniciales from "../../data/reintegros.json";
import { normalizar, coincide } from "../../utils/filtros";
import ModalNuevoReintegro from "./ModalNuevoReintegro";

export default function Reintegros() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [reintegros, setReintegros] = useState(reintegrosIniciales);

    const term = normalizar(busqueda.trim());
    const camposBusqueda = ["paciente", "medico", "especialidad", "fecha", "estado", "monto"];

    const reintegrosFiltrados = reintegros.filter(
        (r) => !term || coincide(r, camposBusqueda, term)
    );

    const grupoFamiliar = grupoFamiliarInicial;

    const agregarReintegro = (nuevo) => {
        setReintegros((prev) => [nuevo, ...prev]);
        alert("Reintegro guardado con éxito ✅");
    };
    
    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
    const [reintegroSeleccionado, setReintegroSeleccionado] = useState(null);

    const handleVerDetalle = (reintegro) => {
        setReintegroSeleccionado(reintegro);
        setModalDetalleAbierto(true);
    };

    const ModalDetalleReintegro = ({ show, onHide, reintegro }) => {
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

    return (
        <Container>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="titulo-reintegros">MIS REINTEGROS</h3>
                    <button className="miBotonReceta" onClick={() => setModalAbierto(true)}>
                        + Nuevo Reintegro
                    </button>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Buscar por paciente, médico, especialidad..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                {reintegrosFiltrados.length === 0 ? (
                    <h5>No se encontraron reintegros</h5>
                ) : (
                    reintegrosFiltrados.map((r) => (
                        <Card key={r.id} className="mb-3 card-reintegro">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col md={3}>
                                        <div className="monto">{r.monto}</div>
                                        <div className="fecha">{r.fecha}</div>
                                    </Col>

                                    <Col md={5}>
                                        <div className="paciente">{r.paciente}</div>
                                        <div className="datos-medico">
                                            <span>Médico: {r.medico}</span> |{" "}
                                            <span>Especialidad: {r.especialidad}</span>
                                        </div>
                                    </Col>

                                    <Col md={4} className="text-end">
                                        <div className={`estado ${r.estado === "Pendiente" ? "pendiente" : "pago"}`}>
                                            {r.estado}
                                        </div>
                                        <div className="acciones">
                                            <a href="#" onClick={() => handleVerDetalle(r)}>
                                                Ver detalle
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>

            <ModalNuevoReintegro
                show={modalAbierto}
                onHide={() => setModalAbierto(false)}
                onSave={agregarReintegro}
                grupoFamiliar={grupoFamiliar}
            />

            <ModalDetalleReintegro
                show={modalDetalleAbierto}
                onHide={() => setModalDetalleAbierto(false)}
                reintegro={reintegroSeleccionado}
            />
        </Container>
    );
}
