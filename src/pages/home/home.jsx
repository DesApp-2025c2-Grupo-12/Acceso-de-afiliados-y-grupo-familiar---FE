import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  const [stats, setStats] = useState({
    turnosPendientes: 0,
    recetasAprobadas: 0,
    reintegrosAprobados: 0,
    autorizacionesAprobadas: 0
  });

  useEffect(() => {
    if (!usuario || !usuario.id) return;

    fetch(`http://localhost:3000/dashboard/resumen/${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Dashboard data recibida:", data);
        setStats(data);
      })
      .catch(err => console.error("Error cargando dashboard:", err));
  }, [usuario?.id]); 

  return (
    <div className="container my-2">

     
      <h1 className="text-center mb-2 fw-bold">Bienvenido a Medicina Integral</h1>
      <p className="text-center text-muted mb-5">
        Recuerde mantener sus datos actualizados para una mejor atención.
      </p>

     
      <div className="row g-4 justify-content-center align-items-stretch ">

        {/* REINTEGROS */}
        <div className="col-12 col-md-3 d-flex">
          <div
            className="card text-center shadow-sm p-4 h-100 w-100"
            style={{
              backgroundColor: "#132074",
              borderRadius: "20px",
              transition: "transform .2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h5 className="fw-bold mb-2 text-white">Mis Reintegros</h5>
             <p  className= "text-white">Aprobados</p>
            <div className="display-5 fw-bold text-white">
              {stats.reintegrosAprobados}
            </div>

            <button
              className="btn btn-sm rounded-pill mt-3"
              style={{
                border: "1px solid white",
                color: "white",
                backgroundColor: "#132074",
                padding: "6px 18px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c5c5c5ff";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#132074";
                e.target.style.color = "white";
              }}
              onClick={() => navigate("/reintegros")}
            >
              Ver
            </button>
          </div>
        </div>

        {/* TURNOS */}
        <div className="col-12 col-md-3 d-flex">
          <div
            className="card text-center shadow-sm p-4 h-100 w-100"
            style={{
              backgroundColor: "#0010a1ff",
              borderRadius: "20px",
              transition: "transform .2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h5 className="fw-bold mb-2 text-white">Mis Turnos</h5>
            <p  className= "text-white">Pendientes</p>
            <div className="display-5 fw-bold text-white">
              {stats.turnosPendientes}
            </div>

            <button
              className="btn btn-sm rounded-pill mt-3"
              style={{
                border: "1px solid white",
                color: "white",
                backgroundColor: "#0010a1ff",
                padding: "6px 18px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c5c5c5ff";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0010a1ff";
                e.target.style.color = "white";
              }}
              onClick={() => navigate("/turnos")}
            >
              Ver
            </button>
          </div>
        </div>

        {/* RECETAS */}
        <div className="col-12 col-md-3 d-flex">
          <div
            className="card text-center shadow-sm p-4 h-100 w-100"
            style={{
              backgroundColor: "#132074",
              borderRadius: "20px",
              transition: "transform .2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h5 className="fw-bold mb-2 text-white">Mis Recetas</h5>
            <p  className= "text-white">Aprobadas</p>

            <div className="display-5 fw-bold text-white">
              {stats.recetasAprobadas}
            </div>

            <button
              className="btn btn-sm rounded-pill mt-3"
              style={{
                border: "1px solid white",
                color: "white",
                backgroundColor: "#132074",
                padding: "6px 18px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c5c5c5ff";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#132074";
                e.target.style.color = "white";
              }}
              onClick={() => navigate("/recetas")}
            >
              Ver
            </button>
          </div>
        </div>

        {/* AUTORIZACIONES */}
        <div className="col-12 col-md-3 d-flex">
          <div
            className="card text-center shadow-sm p-4 h-100 w-100"
            style={{
              backgroundColor: "#0010a1ff",
              borderRadius: "20px",
              transition: "transform .2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h5 className="fw-bold mb-2 text-white">Mis Autorizaciones</h5>
            <p  className= "text-white">Aprobadas</p>

            <div className="display-5 fw-bold text-white">
              {stats.autorizacionesAprobadas}
            </div>

            <button
              className="btn btn-sm rounded-pill mt-3"
              style={{
                border: "1px solid white",
                color: "white",
                backgroundColor: "#0010a1ff",
                padding: "6px 18px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c5c5c5ff";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0010a1ff";
                e.target.style.color = "white";
              }}
              onClick={() => navigate("/autorizaciones")}
            >
              Ver
            </button>
          </div>
        </div>

      </div>
 
{/* CARD + CARRUSEL – ESTILO INSTITUCIONAL */}
<div
  className="mt-5 p-4 rounded shadow-sm d-flex flex-column flex-md-row"
  style={{
    backgroundColor: "#d0daeeff",
    borderLeft: "6px solid #1b2a59",
    textAlign: "left",
    borderRadius: "12px"
  }}
>
  {/* COLUMNA IZQUIERDA – INFORMACIÓN */}
  <div style={{ flex: 1, paddingRight: "24px" }}>
    <h4 className="fw-bold mb-3" style={{ color: "#1b2a59" }}>
      Información de Contacto
    </h4>

    <p className="text-muted" style={{ fontSize: "0.95rem" }}>
      Nuestro centro médico brinda atención integral para todos los afiliados.
    </p>

    <div style={{ lineHeight: "1.9", fontSize: "0.96rem", marginTop: "12px" }}>
      <p className="mb-2">
        <i className="bi bi-exclamation-triangle-fill me-2" style={{ color: "#1b2a59" }}></i>
        <strong>Emergencias médicas:</strong> 0800-122-122
      </p>

      <p className="mb-2">
        <i className="bi bi-telephone-fill me-2" style={{ color: "#1b2a59" }}></i>
        <strong>Atención al afiliado:</strong> 011-1212-1212
      </p>

      <p className="mb-2">
        <i className="bi bi-clock-fill me-2" style={{ color: "#1b2a59" }}></i>
        <strong>Horario:</strong> Lunes a Viernes de 8:00 a 18:00 hs
      </p>

      <p className="mb-2">
        <i className="bi bi-geo-alt-fill me-2" style={{ color: "#1b2a59" }}></i>
        <strong>Dirección:</strong> Centro Médico 12 – Av. Profesional 012, CABA
      </p>
    </div>

    
  </div>

  {/* DIVISOR */}
  <div
    className="d-none d-md-block"
    style={{
      width: "1px",
      backgroundColor: "#b0b6c4",
      margin: "0 28px",
      opacity: 0.35
    }}
  ></div>

  {/* COLUMNA DERECHA – CARRUSEL */}
  <div style={{ flex: 1 }} className="mt-4 mt-md-0">
    <div
      id="centroMedicoCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      {/* Indicadores */}
      <div className="carousel-indicators">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#centroMedicoCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
          ></button>
        ))}
      </div>

      {/* Imágenes */}
      <div className="carousel-inner rounded shadow-sm">
        {[1, 2, 3, 4, 5].map((n, index) => (
          <div
            key={n}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={`/imagenes/centroMedico/${n}.jpg`}
              alt={`Imagen ${n}`}
              className="d-block w-100"
              style={{
                height: "260px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
          </div>
        ))}
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#centroMedicoCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Anterior</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#centroMedicoCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>
</div>


{/* NOVEDADES */}
<div
  className="mt-4 p-4 rounded shadow-sm"
  style={{
    backgroundColor: "#dee0e4ff",
    borderLeft: "6px solid #132074",
    textAlign: "left"
  }}
>
  <h4 className="fw-bold mb-3" style={{ color: "#132074" }}>
    Novedades
  </h4>

  <div className="mb-3">
    <strong>
      <i className="bi bi-calendar-check me-2"></i>
      Implementación del nuevo sistema de turnos online
    </strong>
    <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
      Ya se encuentra disponible la gestión de turnos las 24 horas, todos los días.
    </p>
  </div>

  <hr style={{ opacity: 0.15 }} />

  <div className="mb-3">
    <strong>
      <i className="bi bi-droplet-fill me-2"></i>
      Campaña de vacunación vigente
    </strong>
    <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
      Podés acercarte a cualquier sede con tu carnet para recibir la dosis correspondiente.
    </p>
  </div>

  <hr style={{ opacity: 0.15 }} />

  <div>
    <strong>
      <i className="bi bi-flask-fill me-2"></i>
      Incorporación de nuevo laboratorio
    </strong>
    <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
      Ya están disponibles análisis clínicos sin necesidad de solicitar turno.
    </p>
  </div>
</div>



<div
  style={{
    width: "100%",
    height: "4px",
    backgroundColor: "#132074",
    margin: "40px 0",
    borderRadius: "2px"
  }}
></div>

{/* Restricciones */}
<div
  className="mt-4 p-4 rounded shadow-sm"
  style={{
    backgroundColor: "#252e69ff",
    textAlign: "left",
    color: "white"
  }}
>
  <h4 className="fw-bold mb-3" style={{ color: "white" }}>
    Accesos según perfil de usuario
  </h4>

  <div className="mb-3">
    <strong className="d-flex align-items-center">
      <i className="bi bi-person-fill me-2 text-white"></i>
      Afiliado
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Acceso completo a sus operaciones y a las del grupo familiar. 
      Puede registrar operaciones para sí y para hijos menores de edad.
    </p>
  </div>

  <div className="mb-3">
    <strong className="d-flex align-items-center">
      <i className="bi bi-people-fill me-2 text-white"></i>
      Cónyuge
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Puede visualizar y registrar operaciones propias y de los hijos menores de edad.
    </p>
  </div>

  <div className="mb-3">
    <strong className="d-flex align-items-center">
      <i className="bi bi-lock-fill me-2 text-white"></i>
      Usuarios menores de 16 años
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Pueden acceder a la plataforma, pero no realizar ningún tipo de operación.
    </p>
  </div>

  <div>
    <strong className="d-flex align-items-center">
      <i className="bi bi-unlock-fill me-2 text-white"></i>
      Usuarios de 16 años o más
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Habilitados para solicitar turnos exclusivamente para sí mismos.
    </p>
  </div>
</div>

<div
  style={{
    width: "100%",
    height: "4px",
    backgroundColor: "#132074",
    margin: "40px 0",
    borderRadius: "2px"
  }}
></div>


{/* SECCIÓN SOBRE MEDICINA INTEGRAL */}
<div className="mt-5">
  <h3 className="fw-bold mb-4">Sobre Medicina Integral</h3>

  <div className="row g-4">

    {/* CARD 1 */}
    <div className="col-md-4">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{ backgroundColor: "#d7defaff" }}
      >
        <h5 className="fw-bold mb-2">Solicitar turnos de atención médica</h5>
        <p className="m-0">
          Solicitud de turnos según disponibilidad. Los turnos pueden cancelarse
          hasta un día antes de la fecha asignada.
        </p>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="col-md-4">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{ backgroundColor: "#bec6d8ff" }}
      >
        <h5 className="fw-bold mb-2">Registrar y renovar recetas</h5>
        <p className="m-0">
          Permite cargar, renovar y consultar recetas previas, con estados
          actualizados para un seguimiento claro desde la web o la app.
        </p>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="col-md-4">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{ backgroundColor: "#cbdcffff" }}
      >
        <h5 className="fw-bold mb-2">Gestionar reintegros</h5>
        <p className="m-0">
          Presentación de facturas, detalle de prestaciones y elección de forma de
          pago. Compatible con cheque, efectivo, transferencia o deposito.
        </p>
      </div>
    </div>

    {/* CARD 4 */}
    <div className="col-md-6">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{ backgroundColor: "#dee1e2ff" }}
      >
        <h5 className="fw-bold mb-2">Consultar la cartilla de prestadores</h5>
        <p className="m-0">
          Visualización de la cartilla actualizada con filtros por especialidad,
          zona y ubicación para una búsqueda más ágil.
        </p>
      </div>
    </div>

    {/* CARD 5 */}
    <div className="col-md-6">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{ backgroundColor: "#d7e6faff" }}
      >
        <h5 className="fw-bold mb-2">Gestionar autorizaciones</h5>
        <p className="m-0">
          Carga y seguimiento de solicitudes con notificaciones de estado para
          asegurar un proceso claro y eficiente.
        </p>
      </div>
    </div>

  </div>
</div>



    </div>
  );
}
