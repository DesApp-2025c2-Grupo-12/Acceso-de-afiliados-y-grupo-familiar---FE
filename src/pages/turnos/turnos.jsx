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
       const resTurnos = await fetch(`http://localhost:3000/appointment/affiliated-appointments/${usuarioLogueado.id}`)
       if(!resTurnos.ok) throw new error("Error al cargar los turnos")
       const dataTurnos = await resTurnos.json();
       setTurnos(dataTurnos)
    } catch (error) {
       setErrorMessage(err.message);
       setSuccessMessage(false);
    }
  }

  
  useEffect(()=> {
    obtenerTurnosDeAPI()
    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    setIntegrantesCuenta(grupoFamiliar);
  },[])

  const meses = {
    "enero": 0, "febrero": 1, "marzo": 2, "abril": 3, "mayo": 4,
    "junio": 5, "julio": 6, "agosto": 7, "septiembre": 8,
    "octubre": 9, "noviembre": 10, "diciembre": 11
  };

  // Función para generar fecha completa de turno
  const generarFechaTurno = (hora) => {
    const hoy = new Date();
    let fechaTurno = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    fechaTurno.setHours(parseInt(hora.split(":")[0]));
    fechaTurno.setMinutes(parseInt(hora.split(":")[1]));
    if (fechaTurno < hoy) fechaTurno.setDate(fechaTurno.getDate() + 1);
    const diaSemana = fechaTurno.toLocaleDateString("es-AR", { weekday: "long" });
    const dia = fechaTurno.getDate();
    const mes = fechaTurno.toLocaleDateString("es-AR", { month: "long" });
    const horaStr = `${fechaTurno.getHours().toString().padStart(2, "0")}:${fechaTurno.getMinutes().toString().padStart(2, "0")}`;
    return `${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} ${dia} de ${mes}, ${horaStr}`;
  };

  const cancelarTurno = (turno) => {
    const fechaActual = new Date();
    const [ , dia, , mes, hora] = turno.fechaYHora.split(/[\s,]+/);
    const [horas, minutos] = hora.split(":");
    const fechaTurno = new Date(new Date().getFullYear(), meses[mes.toLowerCase()], parseInt(dia), parseInt(horas), parseInt(minutos));
    const diferenciaMs = fechaTurno - fechaActual;
    const horas24 = 24 * 60 * 60 * 1000;

    if (diferenciaMs >= horas24) {
      setTurnos(prev => prev.filter(t => t.id !== turno.id));
      setAlerta({ msg: `Turno con ${turno.medico} cancelado correctamente`, tipo: "success" });
    } else {
      setAlerta({ msg: "El turno no puede ser cancelado con menos de 24 horas de anticipación", tipo: "danger" });
    }
    setTimeout(() => setAlerta({ msg: "", tipo: "success" }), 3000);
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
                    { label: "Fecha", value: turno.fecha},
                    { label: "horario", value: turno.horario},
                    { label: "Lugar", value: turno.lugarDeAtencion },
                  ]}
                  botonTexto="Dar de baja"
                  onClick={() => cancelarTurno(turno)}
               />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <NuevoTurno 
          turnos={turnos} 
          setTurnos={setTurnos} 
          setPantallaNuevoTurno={setPantallaNuevoTurno} 
          setAlerta={setAlerta} 
          generarFechaTurno={generarFechaTurno}
          integrantesCuenta={integrantesCuenta}

        />
      )}
    </Container>
  );
}
