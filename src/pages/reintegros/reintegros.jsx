import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./reintegros.css";

export default function Reintegros() {
    const reintegros = [
        {
            id: 1,
            fecha: "Jueves 11 de Diciembre 2025",
            paciente: "Juan Salvo",
            medico: "Dr. Julio Cortés",
            especialidad: "Neurocirugía",
            monto: "$160.000",
            estado: "Pendiente",
        },
        {
            id: 2,
            fecha: "Miercoles 15 de Noviembre 2025",
            paciente: "Juan Salvo",
            medico: "Dr. Alejandra Pizarn",
            especialidad: "Psicóloga clínica",
            monto: "$32.000",
            estado: "Pago",
        },
    ];

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="titulo-reintegros">MIS REINTEGROS</h3>
                <button className="miBotonReceta">+ Nuevo Reintegro</button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="botonBusqueda ms-2" type="submit">Buscar</button>
            </div>

            {reintegros.map((r) => (
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
                                <div
                                    className={`estado ${r.estado === "Pendiente" ? "pendiente" : "pago"
                                        }`}
                                >
                                    {r.estado}
                                </div>
                                <div className="acciones">
                                    <a href="#">Ver detalle</a> |{" "}
                                    <a href="#">Descargar comprobante</a>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
