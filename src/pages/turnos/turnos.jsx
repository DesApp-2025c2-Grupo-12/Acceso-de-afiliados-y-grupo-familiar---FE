import React, { useState } from "react";
import { Form, Row, Col, Button, Dropdown, Card, Badge, Container } from "react-bootstrap";

export default function FormularioTurnos() {
    const [especialidad, setEspecialidad] = useState("");
    const [medico, setMedico] = useState("");
    const [lugar, setLugar] = useState("");
    const [fecha, setFecha] = useState("");
    const [showEsp, setShowEsp] = useState(false);
    const [showMed, setShowMed] = useState(false);
    const [showLugar, setShowLugar] = useState(false);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const especialidades = ["Cardiología", "Dermatología", "Odontología", "Pediatría"];
    const medicos = ["Dr. Gutierrez", "Dra. Calderon", "Dr. Cantero", "Dr. Primera", "Dr. Escobar"];
    const lugares = ["Clínica Modelo de Moron", "Hospital Municipal de Hurlingham", "Sanatorio Trinidad"];

    const resultadosEsp = especialidades.filter((e) =>
        e.toLowerCase().includes(especialidad.toLowerCase())
    );
    const resultadosMed = medicos.filter((m) =>
        m.toLowerCase().includes(medico.toLowerCase())
    );
    const resultadosLugar = lugares.filter((l) =>
        l.toLowerCase().includes(lugar.toLowerCase())
    );

    const MisTurnos = [
        {
            id: 1,
            fechaYHora: "Lunes 21 de Septiembre, 10:00",
            especialidad: "Pediatría",
            medico: "Dra. Calderon",
            lugar: "Hospital Municipal de Hurlingham"
        },
        {
            id: 2,
            fechaYHora: "Jueves 24 de Septiembre, 07:30",
            especialidad: "Cardiología",
            medico: "Dr. Gutierrez",
            lugar: "Clínica Modelo de Moron"
        },
        {
            id: 3,
            fechaYHora: "Lunes 18 de Octubre, 17:00",
            especialidad: "Dermatología",
            medico: "Dr. Escobar",
            lugar: "Sanatorio Trinidad"
        },
        {
            id: 4,
            fechaYHora: "Miércoles 10 de Septiembre, 20:00",
            especialidad: "Odontología",
            medico: "Dr. Primera",
            lugar: "Hospital Municipal de Hurlingham"
        }
    ];

    const filtrarTurnos = () => {
        return MisTurnos.filter(turno => {
            const coincideEspecialidad = !especialidad ||
                turno.especialidad.toLowerCase().includes(especialidad.toLowerCase());

            const coincideMedico = !medico ||
                turno.medico.toLowerCase().includes(medico.toLowerCase());

            const coincideLugar = !lugar ||
                turno.lugar.toLowerCase().includes(lugar.toLowerCase());


            const coincideFecha = !fecha;

            return coincideEspecialidad && coincideMedico && coincideLugar && coincideFecha;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resultados = filtrarTurnos();
        setResultadosBusqueda(resultados);
        setBusquedaRealizada(true);
        console.log("Resultados de búsqueda:", resultados);
    };

    const formatearFecha = (fechaStr) => {

        return fechaStr;
    };

    return (

        <Container className="px-3 px-md-4 px-lg-5 my-4">
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" size="lg">
                    Mis Turnos
                </Button>
            </div>
            <Form onSubmit={handleSubmit} className="p-4 bg-white rounded border border-dark mb-4">
                <Row className="mb-3">
                    <Col>
                        <div style={{ position: "relative" }}>
                            <Form.Control
                                type="text"
                                placeholder="Especialidad"
                                value={especialidad}
                                onChange={(e) => {
                                    setEspecialidad(e.target.value);
                                    setShowEsp(true);
                                }}
                                onBlur={() => setTimeout(() => setShowEsp(false), 150)}
                            />
                            {showEsp && resultadosEsp.length > 0 && (
                                <Dropdown.Menu show
                                    className="w-100 text-wrap overflow-hidden"
                                    style={{
                                        maxWidth: "100%",
                                        left: "0",
                                        right: "0"
                                    }}>
                                    {resultadosEsp.map((r, idx) => (
                                        <Dropdown.Item key={idx} onClick={() => setEspecialidad(r)}>
                                            {r}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            )}
                        </div>
                    </Col>
                    <Col>
                        <div style={{ position: "relative" }}>
                            <Form.Control
                                type="text"
                                placeholder="Médico"
                                value={medico}
                                onChange={(e) => {
                                    setMedico(e.target.value);
                                    setShowMed(true);
                                }}
                                onBlur={() => setTimeout(() => setShowMed(false), 150)}
                            />
                            {showMed && resultadosMed.length > 0 && (
                                <Dropdown.Menu show
                                    className="w-100 text-wrap overflow-hidden"
                                    style={{
                                        maxWidth: "100%",
                                        left: "0",
                                        right: "0"
                                    }}>
                                    {resultadosMed.map((r, idx) => (
                                        <Dropdown.Item key={idx} onClick={() => setMedico(r)}>
                                            {r}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <div style={{ position: "relative" }}>
                            <Form.Control
                                type="text"
                                placeholder="Lugar de atención"
                                value={lugar}
                                onChange={(e) => {
                                    setLugar(e.target.value);
                                    setShowLugar(true);
                                }}
                                onBlur={() => setTimeout(() => setShowLugar(false), 150)}
                            />
                            {showLugar && resultadosLugar.length > 0 && (
                                <Dropdown.Menu show
                                    className="w-100 text-wrap overflow-hidden"
                                    style={{
                                        maxWidth: "100%",
                                        left: "0",
                                        right: "0"
                                    }}>
                                    {resultadosLugar.map((r, idx) => (
                                        <Dropdown.Item key={idx} onClick={() => setLugar(r)}>
                                            {r}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            )}
                        </div>
                    </Col>

                    <Col>
                        <Form.Control
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </Col>
                </Row>

                <Button type="submit" variant="primary">
                    Buscar Turnos
                </Button>
            </Form>


            {busquedaRealizada && (
                <div className="resultados-busqueda">
                    <h3 className="mb-4">
                        {resultadosBusqueda.length > 0
                            ? `Se encontraron ${resultadosBusqueda.length} turno(s) disponible(s)`
                            : "No se encontraron turnos con los criterios seleccionados"}
                    </h3>

                    {resultadosBusqueda.length > 0 && (
                        <Row>
                            {resultadosBusqueda.map((turno) => (
                                <Col md={6} lg={4} key={turno.id} className="mb-3">
                                    <Card className="h-100 shadow-sm">
                                        <Card.Header className="d-flex justify-content-between align-items-center">
                                            <Badge bg="primary">{turno.especialidad}</Badge>
                                            <small className="text-muted">ID: {turno.id}</small>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title className="h6">{turno.medico}</Card.Title>
                                            <Card.Text>
                                                <strong>Fecha y Hora:</strong><br />
                                                {formatearFecha(turno.fechaYHora)}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Lugar:</strong><br />
                                                {turno.lugar}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-center">
                                            <Button variant="outline-success" size="sm" className="me-2">
                                                RESERVAR
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            )}
        </Container>
    );
}