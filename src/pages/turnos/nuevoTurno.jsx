import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button, Alert } from "react-bootstrap";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

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
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  // Función para generar los próximos 7 días desde "mañana"
  const generarProximosDias = () => {
    const dias = [];
    const hoy = new Date();

    for (let i = 1; i <= 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);

      const opcion = {
        fecha: fecha,
        fechaISO: fecha.toISOString().split('T')[0],
        label: fecha.toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        })
      };

      dias.push(opcion);
    }
    return dias;
  };

  const proximosDias = generarProximosDias();

  const generarFechaTurnoConDia = (hora, fechaSeleccionada) => {
    if (!fechaSeleccionada) return generarFechaTurno(hora);

    const fechaTurno = new Date(fechaSeleccionada);
    fechaTurno.setHours(parseInt(hora.split(":")[0]));
    fechaTurno.setMinutes(parseInt(hora.split(":")[1]));

    const diaSemana = fechaTurno.toLocaleDateString("es-AR", { weekday: "long" });
    const dia = fechaTurno.getDate();
    const mes = fechaTurno.toLocaleDateString("es-AR", { month: "long" });
    const horaStr = `${fechaTurno.getHours().toString().padStart(2, "0")}:${fechaTurno.getMinutes().toString().padStart(2, "0")}`;

    return `${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} ${dia} de ${mes}, ${horaStr}`;
  };

  const reservarTurno = (medico, hora) => {
    if (!especialidad || !tipoConsulta || !diaSeleccionado) {
      setAlerta({ msg: "Por favor completa todos los campos y selecciona un día.", tipo: "danger" });
      setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);
      return;
    }

    const fechaSeleccionadaObj = proximosDias.find(d => d.fechaISO === diaSeleccionado)?.fecha;
    const fechaTurnoFormateada = generarFechaTurnoConDia(hora, fechaSeleccionadaObj);

    const newTurno = {
      id: Date.now(),
      fechaYHora: fechaTurnoFormateada,
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
    setDiaSeleccionado("");
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Nuevo Turno</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Select value={especialidad} onChange={(e) => {
            setEspecialidad(e.target.value);
            setTipoConsulta("");
            setDiaSeleccionado("");
          }}>
            <option value="">Selecciona una especialidad</option>
            {Object.keys(especialidades).map(esp => <option key={esp} value={esp}>{esp}</option>)}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select value={tipoConsulta} onChange={(e) => {
            setTipoConsulta(e.target.value);
            setDiaSeleccionado("");
          }}>
            <option value="">Selecciona un tipo de consulta o estudio</option>
            {especialidad && especialidades[especialidad].map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
          </Form.Select>
        </Col>
      </Row>

      {/* Barra de selección de días */}
      {especialidad && tipoConsulta && (
        <Row className="mb-4">
          <Col>
            <h5 className="mb-3 text-center">Selecciona un día:</h5>

            {/* Contenedor con borde y centrado */}
            <div className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-center gap-2 overflow-auto">
                {proximosDias.map((dia) => (
                  <Button
                    key={dia.fechaISO}
                    variant={diaSeleccionado === dia.fechaISO ? "primary" : "outline-primary"}
                    onClick={() => setDiaSeleccionado(dia.fechaISO)}
                    className="flex-shrink-0"
                    style={{
                      minWidth: "100px",
                      fontWeight: "500",
                      backgroundColor: diaSeleccionado === dia.fechaISO ? "#132074" : "transparent",
                      borderColor: "#132074",
                      color: diaSeleccionado === dia.fechaISO ? "white" : "#132074"
                    }}
                    onMouseEnter={(e) => {
                      if (diaSeleccionado !== dia.fechaISO) {
                        e.target.style.backgroundColor = "#132074";
                        e.target.style.color = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (diaSeleccionado !== dia.fechaISO) {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#132074";
                      }
                    }}
                  >
                    {dia.label}
                  </Button>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Turnos disponibles */}
      {especialidad && tipoConsulta && diaSeleccionado && (
        <>
          <h5 className="text-center mb-4">
            Turnos disponibles para el {proximosDias.find(d => d.fechaISO === diaSeleccionado)?.label}:
          </h5>
          <Row>
            {medicos[especialidad].map(medico => (
              horarios.map(hora => {
                const fechaSeleccionadaObj = proximosDias.find(d => d.fechaISO === diaSeleccionado)?.fecha;
                const fechaTurnoFormateada = generarFechaTurnoConDia(hora, fechaSeleccionadaObj);

                const turnoExiste = turnos.some(t => t.medico === medico && t.fechaYHora === fechaTurnoFormateada);
                if (turnoExiste) return null;

                return (
                  <Col md={4} key={`${medico}-${hora}-${diaSeleccionado}`} className="mb-3">
                    <CardPersonalizada
                      title={medico}
                      subtitle={especialidad}
                      tipo={tipoConsulta}
                      detalles={[
                        { label: "Fecha", value: fechaTurnoFormateada },
                        { label: "Hora", value: hora },
                        { label: "Lugar", value: "Hospital Municipal de Hurlingham" },
                      ]}
                      botonTexto="Reservar"
                      onClick={() => reservarTurno(medico, hora)}
                    />
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