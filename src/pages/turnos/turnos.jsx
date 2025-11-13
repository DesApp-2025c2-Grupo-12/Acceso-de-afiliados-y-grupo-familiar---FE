import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container, Alert } from "react-bootstrap";
import NuevoTurno from "./nuevoTurno";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";
import Home from "../home/home";

export default function Turnos() {
  const [pantallaNuevoTurno, setPantallaNuevoTurno] = useState(false);
  const [alerta, setAlerta] = useState({ msg: "", tipo: "success" });
  const [turnos, setTurnos] = useState([]);
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
  const [turnosHijos, setTurnosHijos] = useState([]);
  const [afiTieneHijos,setAfiTieneHijos] = useState(false);

  const [ultimoTurno, setUltimoTurno] = useState(null);


  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

  const obtenerTurnosDeAPI = async () => {
    try {
      const resTurnos = await fetch(`http://localhost:3000/appointment/turnosFuturos/${usuarioLogueado.id}`)
      if (!resTurnos.ok) {
        const errorData = await resTurnos.json();
        throw new Error(errorData.error || "Error en la respuesta del servidor");
      }
      const dataTurnos = await resTurnos.json();
      setTurnos(dataTurnos)
    } catch (error) {
      setAlerta({ msg: error.message, tipo: "danger" });
    }
  }

  const obtenerTurnosHijosAPI = async () => {
    try {
      const resTurnosHijos = await fetch(`http://localhost:3000/appointment/${usuarioLogueado.id}/turnosHijos`)
      if (!resTurnosHijos.ok) {
        const errorData = await resTurnosHijos.json();
        throw new Error(errorData.error || "Error en la respuesta del servidor");
      }
      const dataTurnosHijos = await resTurnosHijos.json()
      setTurnosHijos(dataTurnosHijos)
    } catch (error) {
      setAlerta({ msg: error.message, tipo: "danger" });
    }
  }


  useEffect(() => {
    obtenerTurnosDeAPI()
    obtenerTurnosHijosAPI()
    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    setIntegrantesCuenta(grupoFamiliar);
  }, [])

  useEffect(() => {
    if (turnos.length > 0) {
      actualizarHome();
    }
  }, [turnos]);


  useEffect(() => {
    if (!pantallaNuevoTurno) {
      obtenerTurnosDeAPI();
      obtenerTurnosHijosAPI();
    }
  }, [pantallaNuevoTurno]);


  const tieneHijos = async() =>  {
    try {
      const resTieneHijos = await fetch(`http://localhost:3000/appointment/${usuarioLogueado.id}/tieneHijos`)
      if(resTieneHijos.ok){
         const errorData = await resTieneHijos.json();
        throw new Error(errorData.error || "Error en la respuesta del servidor");
      }

      const dataTieneHijos = resTieneHijos.json()

      if(dataTieneHijos.existe) {
        setAfiTieneHijos(true)
      }


    } catch (error) {
        setAlerta({ msg: error.message, tipo: "danger" });
    }
  }
  const actualizarHome = () => {
    const turnosOrdenados = [...turnos].sort(
      (a, b) => new Date(a.fechaYHora) - new Date(b.fechaYHora)
    );
    const turnoMasReciente = turnosOrdenados[0];
    setUltimoTurno(turnoMasReciente);
    localStorage.setItem('ultimoTurno', JSON.stringify(turnoMasReciente));
  }

  const cancelarTurno = async (turno) => {
    try {
      const fechaActual = new Date();
      const fechaTurnoACancelar = new Date(`${turno.fecha}T${turno.horario}`);
      const diferenciasFechas = fechaTurnoACancelar - fechaActual;
      const hs24 = 24 * 60 * 60 * 1000;


      if (diferenciasFechas < hs24) {
        setAlerta({ msg: "El turno no puede ser cancelado con menos de 24 horas de anticipación", tipo: "danger" });
        setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);
        return;
      }


      const response = await fetch(`http://localhost:3000/appointment/${turno.id}/cancel`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },

      });

      if (!response.ok) throw new Error('Error al cancelar el turno');


      setAlerta({ msg: `Turno cancelado correctamente`, tipo: "success" });
      setTurnos(prev => prev.filter(t => t.id !== turno.id));
      setTurnosHijos(prev => prev.filter(t => t.id !== turno.id))

      setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);

    } catch (error) {
      console.error('Error cancelando turno:', error);
      setAlerta({ msg: "Error al cancelar el turno", tipo: "danger" });
      setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);
    }
  };

  const turnosOrdenados = [...turnos].sort(
    (a, b) => new Date(a.fechaYHora) - new Date(b.fechaYHora)
  );

  const turnosOrdenadosHijos = [...turnosHijos].sort(
    (a, b) => new Date(a.fechaYHora) - new Date(b.fechaYHora)
  );

  return (
    <Container className="my-4">
      {!pantallaNuevoTurno ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Turnos</h2>
            <Button
              variant="primary"
              className="fw-bold px-4 py-2 fs-5 rounded-3"
              style={{ background: "#132074", border: "none" }}
              onClick={() => setPantallaNuevoTurno(true)}
            >Nuevo turno
            </Button>

          </div>

          {alerta.msg && <Alert variant={alerta.tipo}>{alerta.msg}</Alert>}

          <Row>
            {/* Columna Mis Turnos */}
            <Col md={6}>
              <Card className=" border shadow-sm">
                <Card.Header className="bg-light">
                  <h4 className="mb-0">Mis Turnos</h4>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  {turnosOrdenados.length > 0 ? (
                    <Row>
                      {turnosOrdenados.map(turno => (
                        <Col md={12} key={turno.id} className="mb-3">
                          <CardPersonalizada
                            title={turno.nombreDelPrestador}
                            titleClassName="h5 fw-bold text-dark mb-1"
                            subtitle={turno.especialidad}
                            subtitleClassName="text-primary fw-normal mb-2"
                            tipo={turno.tipo}
                            tipoClassName="badge bg-warning text-dark fs-7 mb-2"
                            detalles={[
                              { label: "Fecha", value: turno.fecha },
                              { label: "Horario", value: turno.horario?.substring(0, 5) },
                              { label: "Lugar", value: turno.lugarDeAtencion },
                            ]}
                            detallesClassName="text-secondary small mb-2"
                            botonTexto="Cancelar turno"
                            onClick={() => cancelarTurno(turno)}
                            cardClassName="border shadow-sm"
                            bodyClassName="p-3"
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center py-5 flex-grow-1 d-flex align-items-center justify-content-center">
                      <div>
                        <h5 className="text-muted mb-3">No tenés turnos asignados actualmente</h5>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Columna Turnos Hijos */}
            <Col md={6}>
              <Card className=" border shadow-sm">
                <Card.Header className="bg-light">
                  <h4 className="mb-0">Turnos Hijos</h4>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  {turnosOrdenadosHijos.length > 0 ? (
                    <Row>
                      {turnosOrdenadosHijos.map(turno => (
                        <Col md={12} key={turno.id} className="mb-3">
                          <CardPersonalizada
                            header={turno.afiliado.nombre + " " + turno.afiliado.apellido}
                            title={turno.nombreDelPrestador}
                            subtitle={turno.especialidad}
                            tipo={turno.tipo}
                            detalles={[
                              { label: "Fecha", value: turno.fecha },
                              { label: "Horario", value: turno.horario },
                              { label: "Lugar", value: turno.lugarDeAtencion },
                            ]}
                            botonTexto="Dar de baja"
                            onClick={() => cancelarTurno(turno)}
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center py-5 flex-grow-1 d-flex align-items-center justify-content-center">
                      <div>
                        {afiTieneHijos &&<h5 className="text-muted mb-3">No hay turnos asignados a tus hijos</h5>}
                        {!afiTieneHijos && <h5 className="text-muted mb-3">No tenes hijos a tu cargo</h5>}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <NuevoTurno
          setPantallaNuevoTurno={setPantallaNuevoTurno}
          setAlerta={setAlerta}
          integrantesCuenta={integrantesCuenta}
          pantallaNuevoTurno={pantallaNuevoTurno}
        />
      )
      }
    </Container >
  );
}
