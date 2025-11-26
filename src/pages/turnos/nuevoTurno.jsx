import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";
import "./NuevoTurno.css"; 

export default function NuevoTurno({ setPantallaNuevoTurno, setAlerta, integrantesCuenta, pantallaNuevoTurno }) {
  const [especialidades, setEspecialidades] = useState([])
  const [turnosSinRerva, setTurnosSinReserva] = useState([])
  const [especialidad, setEspecialidad] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [afiliadoSeleccionado, setAfiliadoSeleccionado] = useState("");
  const [fechaInicioSemana, setFechaInicioSemana] = useState(() => {
    return getLunesSemanaActual();
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

  // Función para obtener el lunes de la semana actual
  function getLunesSemanaActual() {
    const hoy = new Date();
    const dia = hoy.getDay();
    const diff = hoy.getDate() - dia + (dia === 0 ? -6 : 1);
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
        // Formato desktop
        label: fecha.toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }),
        // Información adicional para formato mobile
        diaNumero: fecha.getDate(),
        diaSemanaCorto: fecha.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', ''),
        mesCorto: fecha.toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''),
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

  const obtenerTurnosNoReservados = async () => {
    try {
      const resTurnos = await fetch(`http://localhost:3000/appointment/unreserved-appointments/`)
      if (!resTurnos.ok) throw new Error("Error al cargar los turnos")
      const dataTurnos = await resTurnos.json();
      setTurnosSinReserva(dataTurnos)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const cargarEspecialidades = async () => {
    try {
      const especialidadesRes = await fetch(`http://localhost:3000/appointment/especialidades/`)
      if (!especialidadesRes.ok) throw new Error("Error al cargar las especialidades")
      const dataEsp = await especialidadesRes.json()
      setEspecialidades(dataEsp)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (pantallaNuevoTurno) {
      cargarEspecialidades();
      obtenerTurnosNoReservados();
      setEspecialidad("");
      setDiaSeleccionado("");
      setAfiliadoSeleccionado("");
      setFechaInicioSemana(getLunesSemanaActual());
    }
  }, [pantallaNuevoTurno])

  const turnosFiltrados = turnosSinRerva.filter(turno =>
    turno.especialidad === especialidad &&
    turno.fecha === diaSeleccionado
  )

  const reservarTurno = async (turno) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      if (!afiliadoSeleccionado) {
        throw new Error("No se ha seleccionado un afiliado para reservar el turno");
      }
      const response = await fetch(`http://localhost:3000/appointment/${turno.id}/assign/${usuarioLogueado.id}/${afiliadoSeleccionado}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la respuesta del servidor");
      }

      setSuccessMessage("¡Turno reservado correctamente!");

      setEspecialidad("");
      setDiaSeleccionado("");
      setAfiliadoSeleccionado("");

      await obtenerTurnosNoReservados();
      await cargarEspecialidades();

      setTimeout(() => {
        setPantallaNuevoTurno(false);
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Error al reservar el turno");
    }
  }

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };


  return (
    <Container className="my-4 border border-dark">

      <div className="d-flex justify-content-between align-items-center mb-4 pt-3">
        <Button
          variant="primary"
          className="fw-bold px-4 py-2 fs-5 rounded-3"
          style={{ background: "#132074", border: "none" }}
          onClick={() => setPantallaNuevoTurno(false)}
        >
          Volver
        </Button>
        <h2 className="mb-0">Nuevo Turno</h2>
        <div style={{ width: "100px" }}></div>
      </div>

      {(errorMessage || successMessage) && (
        <div className="sticky-top" style={{ top: '20px', zIndex: 100 }}>
          {errorMessage && (
            <div className="d-flex justify-content-center mb-3">
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{errorMessage}</div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="d-flex justify-content-center mb-3">
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                <div>{successMessage}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filtros superiores - Especialidad y Afiliado */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Select
            value={especialidad}
            onChange={(e) => {
              setEspecialidad(e.target.value);
              setDiaSeleccionado("");
              setFechaInicioSemana(getLunesSemanaActual());
            }}
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map(esp => <option key={esp} value={esp}>{esp}</option>)}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select
            value={afiliadoSeleccionado}
            onChange={(e) => {
              setAfiliadoSeleccionado(e.target.value);
              setErrorMessage("");
            }}
          >
            <option value="">Selecciona un afiliado</option>
            {integrantesCuenta && integrantesCuenta.length > 0 ? (
              integrantesCuenta.map(afiliado => (
                <option key={afiliado.id} value={afiliado.id}>
                  {afiliado.nombre} {afiliado.apellido} ({afiliado.parentesco})
                </option>
              ))
            ) : (
              <option value="" disabled>No hay afiliados disponibles</option>
            )}
          </Form.Select>
        </Col>
      </Row>

      {/* Barra de selección de días con navegación y selector de mes */}
      {especialidad && (
        <Row className="mb-4">
          <Col>
            <h5 className="mb-3 text-center">Selecciona un día:</h5>

            {/* Navegación de semanas y selector de mes */}
            <Row className="align-items-center mb-3">
              <Col xs={12} md={3} className="mb-2 mb-md-0">
                <Button
                  variant="outline-secondary"
                  onClick={semanaAnterior}
                  className="w-100"
                >
                  ← Semana anterior
                </Button>
              </Col>

              <Col xs={12} md={6} className="text-center mb-2 mb-md-0">
                <h6 className="mb-1">{getRangoFechas()}</h6>
                {esSemanaActual() && (
                  <small className="text-muted">(Semana actual)</small>
                )}
              </Col>

              <Col xs={12} md={3} className="mb-2 mb-md-0">
                <Button
                  variant="outline-secondary"
                  onClick={semanaSiguiente}
                  className="w-100"
                >
                  Semana siguiente →
                </Button>
              </Col>
            </Row>

            {/* Selector de mes */}
            <Row className="mb-3">
              <Col>
                <Form.Select
                  onChange={seleccionarMesSemana}
                  value={fechaInicioSemana.toISOString().split('T')[0]}
                >
                  <option value="">Ir a semana específica...</option>
                  {opcionesMeses.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Días de la semana */}
            <div className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {proximosDias.map((dia) => (
                  <Button
                    key={dia.fechaISO}
                    variant={
                      diaSeleccionado === dia.fechaISO ? "primary" :
                        dia.esPasado ? "outline-secondary" : "outline-primary"
                    }
                    onClick={() => !dia.esPasado && setDiaSeleccionado(dia.fechaISO)}
                    className="flex-grow-1 flex-md-grow-0 text-center dia-button"
                    disabled={dia.esPasado}
                    style={{
                      minWidth: "70px",
                      maxWidth: "140px",
                      height: "60px",
                      fontWeight: "500",
                      backgroundColor: diaSeleccionado === dia.fechaISO ? "#132074" : "transparent",
                      borderColor: dia.esPasado ? "#6c757d" : "#132074",
                      color: diaSeleccionado === dia.fechaISO ? "white" :
                        dia.esPasado ? "#6c757d" : "#132074",
                      cursor: dia.esPasado ? "not-allowed" : "pointer",
                      opacity: dia.esPasado ? 0.6 : 1,
                    }}
                  >
                    <div className="d-block d-md-none">
                      <div className="fw-bold" style={{ fontSize: "1rem", lineHeight: "1.2" }}>
                        {dia.diaNumero}
                      </div>
                      <div style={{ fontSize: "0.65rem", lineHeight: "1" }}>
                        {dia.diaSemanaCorto}
                      </div>
                    </div>
                    <span className="d-none d-md-inline" style={{ fontSize: "0.9rem" }}>
                      {dia.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Turnos disponibles */}
      {especialidad && diaSeleccionado && turnosFiltrados.length > 0 && (
        <>
          <h5 className="text-center mb-4">
            Turnos disponibles para el {proximosDias.find(d => d.fechaISO === diaSeleccionado)?.label}:
          </h5>

          <Row>
            {turnosFiltrados.map(turno => (
              <Col xs={12} sm={6} lg={4} key={turno.id} className="mb-3">
                <CardPersonalizada
                  header={turno.nombreDelPrestador}
                  title={turno.especialidad}
                  detalles={[
                    { label: "Fecha", value: formatFecha(turno.fecha) },
                    { label: "Hora", value: turno.horario },
                    { label: "Lugar", value: turno.lugarDeAtencion },
                  ]}
                  botonTexto="Reservar"
                  onClick={() => reservarTurno(turno)}
                  disabled={!afiliadoSeleccionado}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}