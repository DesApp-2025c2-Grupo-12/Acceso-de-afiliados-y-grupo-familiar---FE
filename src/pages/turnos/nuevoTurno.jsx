import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function NuevoTurno({ setPantallaNuevoTurno, setAlerta, integrantesCuenta, pantallaNuevoTurno }) {
  const [especialidades, setEspecialidades] = useState([])
  const [turnosSinRerva, setTurnosSinReserva] = useState([])
  const [especialidad, setEspecialidad] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [afiliadosSeleccionados, setAfiliadosSeleccionados] = useState({})
  const [fechaInicioSemana, setFechaInicioSemana] = useState(() => {
    return getLunesSemanaActual();
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


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
      setAfiliadosSeleccionados({});
      setFechaInicioSemana(getLunesSemanaActual());
    }
  }, [pantallaNuevoTurno])

  const turnosFiltrados = turnosSinRerva.filter(turno =>
    turno.especialidad === especialidad &&
    turno.fecha === diaSeleccionado
  )

  const handleAfiliadoChange = (turnoId, afiliadoId) => {
    setAfiliadosSeleccionados(prev => ({
      ...prev,
      [turnoId]: afiliadoId
    }));

  }
  const reservarTurno = async (turno) => {
    try {

      setErrorMessage("");
      setSuccessMessage("");


      const afiliadoQueReserva = afiliadosSeleccionados[turno.id];
      if (!afiliadoQueReserva) throw new Error("No se ha seleccionado un afiliado para este turno")

      const bodyData = parseInt(afiliadoQueReserva)
      const turnoReservado = await fetch(`http://localhost:3000/appointment/${turno.id}/assign/${bodyData}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (!turnoReservado.ok) {
        const errorData = await turnoReservado.json();
        throw new Error(errorData.error || "Error en la respuesta del servidor");
      }

      setSuccessMessage("¡Turno reservado correctamente!");

      await obtenerTurnosNoReservados()

      setAfiliadosSeleccionados(prev => {
        const nuevos = { ...prev };
        delete nuevos[turno.id];
        return nuevos;
      });
      setEspecialidad("");
      setDiaSeleccionado("");
      setAfiliadosSeleccionados({});

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


  return (
    <Container className="my-4 border border-dark">
      <h2 className="mb-4">Nuevo Turno</h2>

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

      <Row className="mb-4">
        <Col md={12}>
          <Form.Select value={especialidad} onChange={(e) => {
            setEspecialidad(e.target.value);
            setDiaSeleccionado("");
            setFechaInicioSemana(getLunesSemanaActual());
          }}>
            <option value="">Selecciona una especialidad</option>
            {especialidades.map(esp => <option key={esp} value={esp}>{esp}</option>)}
          </Form.Select>
        </Col>
      </Row>

      {/* Barra de selección de días con navegación y selector de mes */}
      {especialidad && (
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
              <Col md={4} key={turno.id} className="mb-3">
                <CardPersonalizada
                  title={turno.nombreDelPrestador}
                  subtitle={turno.especialidad}
                  detalles={[
                    { label: "Fecha", value: turno.fecha },
                    { label: "Hora", value: turno.horario },
                    { label: "Lugar", value: turno.lugarDeAtencion },

                  ]}
                  contenidoAdicional={
                    <div className="mb-3">
                      <label htmlFor={`afiliado-${turno.id}`} className="form-label">
                        Seleccionar afiliado:
                      </label>


                      <select
                        id={`afiliado-${turno.id}`}
                        className="form-select"
                        value={afiliadosSeleccionados[turno.id] || ""}
                        onChange={(e) => handleAfiliadoChange(turno.id, e.target.value)}
                      >
                        <option value="">Seleccione un afiliado</option>
                        {integrantesCuenta && integrantesCuenta.length > 0 ? (
                          integrantesCuenta.map(afiliado => (
                            <option key={afiliado.id} value={afiliado.id}>
                              {afiliado.nombre} {afiliado.apellido}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>No hay afiliados disponibles</option>
                        )}
                      </select>

                    </div>
                  }
                  botonTexto="Reservar"
                  onClick={() => reservarTurno(turno)}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

    </Container>
  );
}