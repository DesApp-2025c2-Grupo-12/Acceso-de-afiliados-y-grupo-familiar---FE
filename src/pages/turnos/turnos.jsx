import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container, Alert } from "react-bootstrap";
import NuevoTurno from "./nuevoTurno";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function Turnos() {
  const [pantallaNuevoTurno, setPantallaNuevoTurno] = useState(false);
  const [alerta, setAlerta] = useState({ msg: "", tipo: "success" });
  const [turnos, setTurnos] = useState([]);
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);



  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

  const obtenerTurnosDeAPI = async () => {
    try {
      const resTurnos = await fetch(`http://localhost:3000/appointment/turnosFuturos/${usuarioLogueado.id}`)
      if (!resTurnos.ok) throw new Error("Error al cargar los turnos")
      const dataTurnos = await resTurnos.json();
      setTurnos(dataTurnos)
    } catch (error) {
      setAlerta({ msg: error.message, tipo: "danger" });
    }
  }


  useEffect(() => {
    obtenerTurnosDeAPI()
    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    setIntegrantesCuenta(grupoFamiliar);
  }, [])

  useEffect(() => {
    if (!pantallaNuevoTurno) {
      // Cuando se cierra NuevoTurno, recargar los turnos del afiliado
      obtenerTurnosDeAPI();
    }
  }, [pantallaNuevoTurno]);

  // Función para generar fecha completa de turno


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


      const response = await fetch(`http://localhost:3000/appointment/${turno.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliateId: null
        })
      });

      if (!response.ok) throw new Error('Error al cancelar el turno');


      setAlerta({ msg: `Turno cancelado correctamente`, tipo: "success" });
      setTurnos(prev => prev.filter(t => t.id !== turno.id));

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

  return (
    <Container className="my-4">
      {!pantallaNuevoTurno ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Mis Turnos</h2>
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
            {turnosOrdenados.map(turno => (
              <Col md={6} lg={4} key={turno.id} className="mb-3">
                <CardPersonalizada
                  title={turno.nombreDelPrestador}
                  subtitle={turno.especialidad}
                  tipo={turno.tipo}
                  detalles={[
                    { label: "Fecha", value: turno.fecha },
                    { label: "horario", value: turno.horario },
                    { label: "Lugar", value: turno.lugarDeAtencion },
                  ]}
                  botonTexto="Dar de baja"
                  onClick={() => cancelarTurno(turno)}
                />
              </Col>
            ))}
            {turnosOrdenados.length === 0 && (
              <div className="text-center py-5 mt-5" style={{ minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h5 className="text-muted mb-3">No hay turnos reservados</h5>
              </div>
            )}
          </Row>
        </>
      ) : (
        <NuevoTurno
          setPantallaNuevoTurno={setPantallaNuevoTurno}
          setAlerta={setAlerta}
          integrantesCuenta={integrantesCuenta}
          pantallaNuevoTurno={pantallaNuevoTurno}
        />
      )}
    </Container>
  );
}
