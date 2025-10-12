import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button, Alert } from "react-bootstrap";

export default function NuevoTurno({ turnos, setTurnos, setPantallaNuevoTurno, setAlerta, generarFechaTurno }) {
  const especialidades = {
    "Pediatría": ["Consulta general", "Vacunación"],
    "Cardiología": ["Consulta", "Estudio de estrés"],
    "Dermatología": ["Consulta", "Biopsia"],
    "Odontología": ["Consulta", "Limpieza"]
  };

  const medicos = {
    "Pediatría": ["Dra. Calderon", "Dr. Perez"],
    "Cardiología": ["Dr. Gutierrez", "Dra. Ramirez"],
    "Dermatología": ["Dr. Escobar"],
    "Odontología": ["Dr. Primera"]
  };

  const horarios = ["07:30", "09:00", "10:30", "14:00", "15:30", "17:00"];

  const [especialidad, setEspecialidad] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");

  const reservarTurno = (medico, hora) => {
    if (!especialidad || !tipoConsulta) {
      setAlerta({ msg: "Por favor completa todos los campos.", tipo: "danger" });
      setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);
      return;
    }

    const newTurno = {
      id: Date.now(),
      fechaYHora: generarFechaTurno(hora),
      especialidad,
      tipo: tipoConsulta,
      medico,
      lugar: "Hospital Municipal de Hurlingham"
    };

    setTurnos(prev => [...prev, newTurno]);
    setAlerta({ msg: "Turno reservado correctamente", tipo: "success" });
    setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);
    setPantallaNuevoTurno(false);
    setEspecialidad("");
    setTipoConsulta("");
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Nuevo Turno</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Select value={especialidad} onChange={(e) => { setEspecialidad(e.target.value); setTipoConsulta(""); }}>
            <option value="">Selecciona una especialidad</option>
            {Object.keys(especialidades).map(esp => <option key={esp} value={esp}>{esp}</option>)}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select value={tipoConsulta} onChange={(e) => setTipoConsulta(e.target.value)}>
            <option value="">Selecciona un tipo de consulta o estudio</option>
            {especialidad && especialidades[especialidad].map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
          </Form.Select>
        </Col>
      </Row>

      {especialidad && tipoConsulta && (
        <>
          <h5>Opciones disponibles:</h5>
          <Row>
            {medicos[especialidad].map(medico => (
              horarios.map(hora => {
                const fechaTurno = generarFechaTurno(hora);
                const turnoExiste = turnos.some(t => t.medico === medico && t.fechaYHora === fechaTurno);
                if (turnoExiste) return null;
                return (
                  <Col md={4} key={`${medico}-${hora}`} className="mb-3">
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Card.Title>{medico}</Card.Title>
                        <Card.Text><strong>Horario:</strong> {hora}</Card.Text>
                        <Card.Text><strong>Lugar:</strong> Hospital Municipal de Hurlingham</Card.Text>
                        <Button variant="success" size="sm" onClick={() => reservarTurno(medico, hora)}>Reservar</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
