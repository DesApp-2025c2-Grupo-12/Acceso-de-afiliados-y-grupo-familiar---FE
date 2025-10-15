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
  const [fechaInicioSemana, setFechaInicioSemana] = useState(() => {
    // Iniciar desde el lunes de la semana actual
    return getLunesSemanaActual();
  });

  // Función para obtener el lunes de la semana actual
  function getLunesSemanaActual() {
    const hoy = new Date();
    const dia = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const diff = hoy.getDate() - dia + (dia === 0 ? -6 : 1); // Ajustar para que lunes sea el primer día
    const lunes = new Date(hoy.setDate(diff));
    lunes.setHours(0, 0, 0, 0);
    return lunes;
  }

  // Función para generar los 7 días a partir de la fecha de inicio de semana
  const generarProximosDias = () => {
    const dias = [];
    const fechaInicial = new Date(fechaInicioSemana);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(fechaInicial);
      fecha.setDate(fechaInicial.getDate() + i);

      const opcion = {
        fecha: fecha,
        fechaISO: fecha.toISOString().split('T')[0],
        label: fecha.toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }),
        mesAno: fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        esPasado: fecha < hoy,
        esHoy: fecha.toDateString() === hoy.toDateString()
      };

      dias.push(opcion);
    }
    return dias;
  };

  const proximosDias = generarProximosDias();

  // Función para navegar a la semana anterior
  const semanaAnterior = () => {
    const nuevaFecha = new Date(fechaInicioSemana);
    nuevaFecha.setDate(fechaInicioSemana.getDate() - 7);
    setFechaInicioSemana(nuevaFecha);
    setDiaSeleccionado("");
  };

  // Función para navegar a la semana siguiente
  const semanaSiguiente = () => {
    const nuevaFecha = new Date(fechaInicioSemana);
    nuevaFecha.setDate(fechaInicioSemana.getDate() + 7);
    setFechaInicioSemana(nuevaFecha);
    setDiaSeleccionado("");
  };

  // Función para seleccionar mes/semana específica
  const seleccionarMesSemana = (event) => {
    if (!event.target.value) return;

    const fechaSeleccionada = new Date(event.target.value);
    setFechaInicioSemana(fechaSeleccionada);
    setDiaSeleccionado("");
  };

  // Generar opciones de meses para el selector (próximos 6 meses)
  // Generar opciones de semanas agrupadas por mes
  const generarOpcionesMeses = () => {
    const opciones = [];
    const lunesActual = getLunesSemanaActual();

    // Opción para la semana actual
    opciones.push({
      label: "Semana actual",
      value: lunesActual.toISOString().split('T')[0]
    });

    // Generar 24 semanas hacia adelante (6 meses aprox)
    const semanasPorMes = {};

    for (let i = 1; i <= 24; i++) {
      const semana = new Date(lunesActual);
      semana.setDate(lunesActual.getDate() + (i * 7));

      const mesAño = semana.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric'
      });

      // Solo guardar la primera semana de cada mes
      if (!semanasPorMes[mesAño]) {
        semanasPorMes[mesAño] = semana.toISOString().split('T')[0];
      }
    }

    // Convertir a array y tomar solo los primeros 6 meses únicos
    Object.entries(semanasPorMes).slice(0, 6).forEach(([mesAño, fecha]) => {
      opciones.push({
        label: mesAño,
        value: fecha
      });
    });

    return opciones;
  };

  const opcionesMeses = generarOpcionesMeses();

  // Obtener el rango de fechas actual para mostrar
  const getRangoFechas = () => {
    if (proximosDias.length === 0) return "";

    const primeraFecha = proximosDias[0];
    const ultimaFecha = proximosDias[proximosDias.length - 1];

    if (primeraFecha.fecha.getMonth() === ultimaFecha.fecha.getMonth()) {
      return `${primeraFecha.fecha.getDate()} - ${ultimaFecha.fecha.getDate()} de ${primeraFecha.mesAno}`;
    } else {
      return `${primeraFecha.label} al ${ultimaFecha.label} ${ultimaFecha.fecha.getFullYear()}`;
    }
  };

  // Verificar si estamos en la semana actual
  const esSemanaActual = () => {
    const lunesActual = getLunesSemanaActual();
    return fechaInicioSemana.toDateString() === lunesActual.toDateString();
  };

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
    // Resetear a la semana actual
    setFechaInicioSemana(getLunesSemanaActual());
  };

  return (
    <Container className="my-4 border border-dark">
      <h2 className="mb-4">Nuevo Turno</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Select value={especialidad} onChange={(e) => {
            setEspecialidad(e.target.value);
            setTipoConsulta("");
            setDiaSeleccionado("");
            // Resetear a la semana actual
            setFechaInicioSemana(getLunesSemanaActual());
          }}>
            <option value="">Selecciona una especialidad</option>
            {Object.keys(especialidades).map(esp => <option key={esp} value={esp}>{esp}</option>)}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select value={tipoConsulta} onChange={(e) => {
            setTipoConsulta(e.target.value);
            setDiaSeleccionado("");
            // Resetear a la semana actual
            setFechaInicioSemana(getLunesSemanaActual());
          }}>
            <option value="">Selecciona un tipo de consulta o estudio</option>
            {especialidad && especialidades[especialidad].map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
          </Form.Select>
        </Col>
      </Row>

      {/* Barra de selección de días con navegación y selector de mes */}
      {especialidad && tipoConsulta && (
        <Row className="mb-4">
          <Col>
            <h5 className="mb-3 text-center">Selecciona un día:</h5>

            {/* Navegación de semanas y selector de mes */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <Button
                variant="outline-secondary"
                onClick={semanaAnterior}
                size="sm"
              >
                ← Semana anterior
              </Button>

              <div className="text-center flex-grow-1">
                <h6 className="mb-1">{getRangoFechas()}</h6>
                {esSemanaActual() && (
                  <small className="text-muted">(Semana actual)</small>
                )}
              </div>

              <div className="d-flex gap-2">
                <Form.Select
                  size="sm"
                  style={{ width: '180px' }}
                  onChange={seleccionarMesSemana}
                  value={fechaInicioSemana.toISOString().split('T')[0]}
                >
                  <option value="">Ir a...</option>
                  {opcionesMeses.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </Form.Select>

                <Button
                  variant="outline-secondary"
                  onClick={semanaSiguiente}
                  size="sm"
                >
                  Semana siguiente →
                </Button>
              </div>
            </div>

            {/* Contenedor con borde y centrado */}
            <div className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-center gap-2 overflow-auto">
                {proximosDias.map((dia) => (
                  <Button
                    key={dia.fechaISO}
                    variant={
                      diaSeleccionado === dia.fechaISO ? "primary" :
                        dia.esPasado ? "outline-secondary" : "outline-primary"
                    }
                    onClick={() => !dia.esPasado && setDiaSeleccionado(dia.fechaISO)}
                    className="flex-shrink-0"
                    disabled={dia.esPasado}
                    style={{
                      minWidth: "100px",
                      fontWeight: "500",
                      backgroundColor: diaSeleccionado === dia.fechaISO ? "#132074" : "transparent",
                      borderColor: dia.esPasado ? "#6c757d" : "#132074",
                      color: diaSeleccionado === dia.fechaISO ? "white" :
                        dia.esPasado ? "#6c757d" : "#132074",
                      cursor: dia.esPasado ? "not-allowed" : "pointer",
                      opacity: dia.esPasado ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!dia.esPasado && diaSeleccionado !== dia.fechaISO) {
                        e.target.style.backgroundColor = "#132074";
                        e.target.style.color = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!dia.esPasado && diaSeleccionado !== dia.fechaISO) {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#132074";
                      }
                    }}
                  >
                    {dia.label}

                  </Button>
                ))}
              </div>
              <div className="text-center mt-2">

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