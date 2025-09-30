import React, { useState } from "react";
import { Form, Row, Col, Button, Card, Badge, Container, Modal } from "react-bootstrap";

export default function FormularioTurnos() {
    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);

    const meses = {
        "enero": 0, "febrero": 1, "marzo": 2, "abril": 3, "mayo": 4,
        "junio": 5, "julio": 6, "agosto": 7, "septiembre": 8,
        "octubre": 9, "noviembre": 10, "diciembre": 11
    };
    const nombresMeses = Object.keys(meses);

    const MisTurnos = [
        { id: 1, fechaYHora: "Lunes 21 de Septiembre, 10:00", especialidad: "Pediatría", medico: "Dra. Calderon", lugar: "Hospital Municipal de Hurlingham" },
        { id: 2, fechaYHora: "Jueves 24 de Septiembre, 07:30", especialidad: "Cardiología", medico: "Dr. Gutierrez", lugar: "Clínica Modelo de Moron" },
        { id: 3, fechaYHora: "Lunes 18 de Octubre, 17:00", especialidad: "Dermatología", medico: "Dr. Escobar", lugar: "Sanatorio Trinidad" },
        { id: 4, fechaYHora: "Miércoles 10 de Septiembre, 20:00", especialidad: "Odontología", medico: "Dr. Primera", lugar: "Hospital Municipal de Hurlingham" },
        { id: 5, fechaYHora: "Jueves 30 de Diciembre, 07:30", especialidad: "Cardiología", medico: "Dr. Gutierrez", lugar: "Clínica Modelo de Moron" },
        { id: 6, fechaYHora: "Jueves 24 de Septiembre, 08:00", especialidad: "Cardiología", medico: "Dr. Gutierrez", lugar: "Clínica Modelo de Moron" }
    ];
    const [turnosGenerales, setTurnosGenerales] = useState(MisTurnos);

    const TurnosPersonales = [
        { id: 1, fechaYHora: "Lunes 21 de Octubre, 10:00", especialidad: "Pediatría", medico: "Dra. Calderon", lugar: "Hospital Municipal de Hurlingham" },
        { id: 2, fechaYHora: "Jueves 24 de Octubre, 07:30", especialidad: "Cardiología", medico: "Dr. Gutierrez", lugar: "Clínica Modelo de Moron" },
        { id: 3, fechaYHora: "Lunes 18 de Octubre, 17:00", especialidad: "Dermatología", medico: "Dr. Escobar", lugar: "Sanatorio Trinidad" },
        { id: 4, fechaYHora: "Miércoles 10 de Septiembre, 20:00", especialidad: "Odontología", medico: "Dr. Primera", lugar: "Hospital Municipal de Hurlingham" }
    ];
    const [turnosP, setTurnosP] = useState(TurnosPersonales);

    const formatearFecha = (fechaStr) => {
        const [, dia, , mes, hora] = fechaStr.split(/[\s,]+/);
        const [horas, minutos] = hora.split(":");
        const año = new Date().getFullYear();
        return new Date(año, meses[mes.toLowerCase()], parseInt(dia), parseInt(horas), parseInt(minutos));
    };

    const turnosOrdenados = [...turnosP].sort(
        (a, b) => formatearFecha(a.fechaYHora) - formatearFecha(b.fechaYHora)
    );

    const cancelarTurno = (turno) => {
        const fechaActual = new Date();
        const fechaTurno = formatearFecha(turno.fechaYHora);
        const diferenciaMs = fechaTurno - fechaActual;
        const horas24 = 24 * 60 * 60 * 1000;

        if (diferenciaMs >= horas24) {
            setTurnosP(tp => tp.filter(t => t.id !== turno.id));
            alert("Turno cancelado correctamente");
        } else {
            alert("El turno no puede ser cancelado con menos de 24 horas de anticipación");
        }
    };

    const reservarTurnos = (turno) => {
        setTurnosP(prev => [...prev, turno]);
        setTurnosGenerales(prev => prev.filter(t => t.id !== turno.id));
        alert("El turno se reservó correctamente");
    };

    const ModalTurnos = ({ modalAbierto }) => (
        <Modal show={modalAbierto} onHide={() => setModalAbierto(false)} size="lg" centered>
            <Modal.Header style={{ backgroundColor: "#132074", color: "white" }} closeButton closeVariant="white">
                <Modal.Title>Mis Turnos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {turnosOrdenados.map((turno, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <Badge bg="primary">{turno.especialidad}</Badge>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="h6">{turno.medico}</Card.Title>
                            <Card.Text><strong>Fecha y Hora:</strong><br />{turno.fechaYHora}</Card.Text>
                            <Card.Text><strong>Lugar:</strong><br />{turno.lugar}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <button className="btn btn-outline-dark btn-sm" onClick={() => cancelarTurno(turno)}>Dar de Baja</button>
                        </Card.Footer>
                    </Card>
                ))}
            </Modal.Body>
        </Modal>
    );

    
    const term = busqueda.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const turnosFiltrados = turnosGenerales.filter(turno => {
        const especialidad = turno.especialidad.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const medico = turno.medico.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return !term || especialidad.includes(term) || medico.includes(term);
    });

    const turnosPorMes = turnosFiltrados.reduce((acc, turno) => {
        const mes = formatearFecha(turno.fechaYHora).getMonth();
        if (!acc[mes]) acc[mes] = [];
        acc[mes].push(turno);
        return acc;
    }, {});

    return (
        <Container className="px-3 px-md-4 px-lg-5 my-4">
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" size="lg"style={{ backgroundColor:  "#132074" }} onClick={() => setModalAbierto(true)}>Mis Turnos</Button>
            </div>

                <Row className="mb-3">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por médico o especialidad"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </Col>
                </Row>
            

            <div className="resultados-busqueda">
                {Object.keys(turnosPorMes).length === 0 ? (
                    <h3>No se encontraron turnos con los criterios seleccionados</h3>
                ) : (
                    Object.keys(turnosPorMes).map((mesKey) => (
                        <div key={mesKey} className="mb-4">
                            <h4>{nombresMeses[mesKey].toUpperCase()}</h4>
                            <Row>
                                {turnosPorMes[mesKey].map((turno) => (
                                    <Col md={6} lg={4} key={turno.id} className="mb-3">
                                        <Card className="h-100 shadow-sm">
                                            <Card.Header className="d-flex justify-content-between align-items-center">
                                                <Badge bg="primary">{turno.especialidad}</Badge>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title className="h6">{turno.medico}</Card.Title>
                                                <Card.Text><strong>Fecha y Hora:</strong><br />{turno.fechaYHora}</Card.Text>
                                                <Card.Text><strong>Lugar:</strong><br />{turno.lugar}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="text-center">
                                                <Button variant="outline-success" size="sm" onClick={() => reservarTurnos(turno)}>RESERVAR</Button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))
                )}
            </div>

            <ModalTurnos modalAbierto={modalAbierto} />
        </Container>
    );
}
