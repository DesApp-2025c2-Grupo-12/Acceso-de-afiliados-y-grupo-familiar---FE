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
 
{/* CARD + CARRUSEL EN UNA MISMA FILA */}
<div
  className="mt-5 p-4 rounded shadow-sm d-flex flex-column flex-md-row"
  style={{
    backgroundColor: "#c4d5f5ff",
    borderLeft: "6px solid #132074",
    textAlign: "left",
  }}
>
  {/* COLUMNA IZQUIERDA – INFORMACIÓN */}
  <div style={{ flex: 1, paddingRight: "20px" }}>
    <h4 className="fw-bold mb-3" style={{ color: "#132074" }}>
      Información de Contacto
    </h4>

    <div style={{ lineHeight: "2", fontSize: "1rem" }}>
      <p className="mb-2"><strong>📞 Emergencias médicas:</strong> 0800-122-122</p>
      <p className="mb-2"><strong>☎️ Atención al afiliado:</strong> 011-1212-1212</p>
      <p className="mb-2"><strong>⏰ Horario de atención:</strong> Lunes a Viernes de 8:00 a 18:00 hs</p>
      <p className="mb-2">
        <strong>📍 Dirección:</strong> Centro Médico 12 – Av. Profesional 012, CABA
      </p>
    </div>
  </div>

 
  <div
    className="d-none d-md-block"
    style={{
      width: "1px",
      backgroundColor: "#b5b5b5",
      margin: "0 25px",
      opacity: 0.6,
    }}
  ></div>

  {/* COLUMNA DERECHA – CARRUSEL */}
  <div style={{ flex: 1 }} className="mt-4 mt-md-0">
  <div
    id="centroMedicoCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="3000"    //segundos donde pasa la imagen
  >
    
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

    
    <div className="carousel-inner rounded shadow">
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
              borderRadius: "10px",
            }}
          />
        </div>
      ))}
    </div>


    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#centroMedicoCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Anterior</span>
    </button>

    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#centroMedicoCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Siguiente</span>
    </button>

</div>

    
  </div>
</div>


{/* NOVEDADES */}
<div
  className="mt-4 p-4 rounded shadow-sm"
  style={{
    backgroundColor: "#d3d3d3ff",
    borderLeft: "6px solid #132074",
    textAlign: "left"
  }}
>
  <h4 className="fw-bold mb-3" style={{ color: "#132074" }}>
    Novedades
  </h4>

  <div className="mb-3">
    <strong>💻 Nuevo sistema de turnos online</strong>
    <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
      Ahora podés gestionar tus turnos 24/7 desde la web.
    </p>
  </div>

  <div className="mb-3">
    <strong>💉 Campaña de vacunación</strong>
    <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
      Acercate a cualquier sede con tu carnet.
    </p>
  </div>

  <div>
    <strong>🧪 Nuevo laboratorio incorporado</strong>
    <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
      Ya podés realizar tus análisis clínicos sin turno previo.
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
    <strong>
      <i className="bi bi-person-fill me-2 text-white"></i>
      Afiliado
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Puede ver sus operaciones y las de todo el grupo familiar. Puede registrar
      operaciones para sí y para hijos menores de 18 años.
    </p>
  </div>

  <div className="mb-3">
    <strong>
      <i className="bi bi-people-fill me-2 text-white"></i>
      Cónyuge
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Puede ver y registrar operaciones para sí y para los hijos menores de 18 años.
    </p>
  </div>

  <div>
    <strong>
      <i className="bi bi-lock-fill me-2 text-white"></i>
      Otros usuarios
    </strong>
    <p className="m-0" style={{ fontSize: "0.95rem" }}>
      Pueden ver y registrar únicamente sus propias operaciones.
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

    {/* COLUMNA IZQUIERDA */}
    <div className="col-md-4 d-flex flex-column gap-4">

      {/* Tarjeta 1 */}
      <div
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#e6e6f0" }}
      >
        <h5 className="fw-bold">Solicitar turnos de atención médica</h5>
        <p className="m-0">
          De acuerdo con la disponibilidad configurada por la empresa.
          Los turnos pueden cancelarse hasta un día antes de la fecha asignada.
        </p>
      </div>

      {/* Tarjeta 2 */}
      <div
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#cbd8ff" }}
      >
        <h5 className="fw-bold">Gestionar reintegros</h5>
        <p className="m-0">
          Carga de factura, datos de la prestación y forma de pago del reintegro.
          Compatible con cheque, efectivo o transferencia (CBU).
        </p>
      </div>

    </div>

    {/* COLUMNA CENTRAL (UNIFICADA) */}
    <div className="col-md-4">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{ backgroundColor: "#b6c4ff" }}
      >
        <h5 className="fw-bold">Registrar y renovar recetas</h5>
        
        <p className="m-4">
        Permite cargar y renovar recetas, consultar recetas anteriores y ver los medicamentos utilizados, 
        facilitando la gestión desde la web o la app sin necesidad de acercarte a la sede, 
        con estados actualizados en todo momento para un seguimiento claro de cada solicitud.
        </p>
      
      </div>
    </div>

    {/* COLUMNA DERECHA */}
    <div className="col-md-4 d-flex flex-column gap-4">

      {/* Tarjeta derecha 1 */}
      <div
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#e6e6f0" }}
      >
        <h5 className="fw-bold">Consultar la cartilla de prestadores</h5>
        <p className="m-0">
         Permite visualizar la cartilla actualizada de prestadores de Medicina Integral.
         Incluye filtros de búsqueda por especialidad, zonas y ubicaciones.
        </p>
      </div>


      {/* Tarjeta derecha 2 */}
      <div
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#e6e6f0" }}
      >
        <h5 className="fw-bold">Gestionar autorizaciones</h5>
        <p className="m-0">
        Carga y seguimiento ágil de solicitudes de autorización para prácticas médicas 
        con estado actualizado en todo momento.
        </p>
      </div>

    </div>
  </div>
</div>


    </div>
  );
}
