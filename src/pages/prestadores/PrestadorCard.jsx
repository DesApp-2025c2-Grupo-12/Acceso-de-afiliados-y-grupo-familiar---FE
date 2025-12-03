import React, { useState } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";

const PrestadorCard = ({ prestador, onVerDetalles }) => {
    const [idx, setIdx] = useState(0);

    const base = `/imagenes/prestadores/${prestador.id}`;
    const imagenes = [`${base}/1.jpg`, `${base}/2.jpg`, `${base}/3.jpg`];
    const placeholder = "/imagenes/prestadores/placeholder.jpg";

    const siguiente = (e) => {
        e.stopPropagation();
        setIdx((prev) => (prev + 1) % imagenes.length);
    };

    const anterior = (e) => {
        e.stopPropagation();
        setIdx((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    return (
        <Card className="mb-3 border shadow-sm" style={{ borderRadius: "8px" }}>
            <Card.Body>

                <Card.Title
                    className="fw-bold text-dark mb-2"
                    style={{ fontSize: "1.1rem", textAlign: "left" }}
                >
                    {prestador.nombreCompleto}
                </Card.Title>

                <hr className="mt-0 mb-3" />

                <Row className="align-items-center">
                    <Col xs={12} md={5} className="text-center position-relative">
                        <div
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "5px",
                                backgroundColor: "#f8f9fa",
                            }}
                        >
                            <Image
                                src={imagenes[idx]}
                                alt={prestador.nombreCompleto}
                                onError={(e) => (e.target.src = placeholder)}
                                fluid
                                style={{
                                    maxHeight: "180px",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                }}
                            />
                        </div>

                        <Button
                            variant="light"
                            className="position-absolute top-50 start-0 translate-middle-y"
                            onClick={anterior}
                            style={{
                                backgroundColor: "white",
                                border: "2px solid #001F87",
                                color: "#001F87",
                                borderRadius: "50%",
                                width: "32px",
                                height: "32px",
                                fontWeight: "bold",
                            }}
                        >
                            ‹
                        </Button>

                        <Button
                            variant="light"
                            className="position-absolute top-50 end-0 translate-middle-y"
                            onClick={siguiente}
                            style={{
                                backgroundColor: "white",
                                border: "2px solid #001F87",
                                color: "#001F87",
                                borderRadius: "50%",
                                width: "32px",
                                height: "32px",
                                fontWeight: "bold",
                            }}
                        >
                            ›
                        </Button>
                    </Col>

                    <Col xs={12} md={7} className="text-center text-md-start mt-3 mt-md-0">
                        <p className="fw-semibold mb-3 text-dark" style={{ fontSize: "0.95rem" }}>
                            {prestador.direccion || "Dirección no disponible"}
                            {prestador.localidad ? `, ${prestador.localidad}` : ""}
                        </p>

                        <div className="d-flex justify-content-center justify-content-md-start">
                            <Button
                                variant="primary"
                                size="sm"
                                style={{
                                    backgroundColor: "#001F87",
                                    border: "none",
                                    borderRadius: "50px",
                                    padding: "5px 20px",
                                    fontSize: "0.9rem",
                                }}
                                onClick={() => onVerDetalles(prestador)}
                            >
                                Ver Detalles
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PrestadorCard;
