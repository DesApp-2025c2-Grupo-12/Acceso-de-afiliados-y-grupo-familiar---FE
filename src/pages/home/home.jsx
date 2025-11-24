import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const ultimoTurno = JSON.parse(localStorage.getItem("ultimoTurno") || "null");

  return (
    <div className="container my-2">

      {/* TITULO */}
      <h1 className="text-center mb-2">Bienvenido a Medicina Integral</h1>
      <p className="text-center text-muted mb-5">
        Recuerde mantener sus datos actualizados para una mejor atención.
      </p>


      {/* GRID PRINCIPAL */}
      <div className="row g-4 justify-content-center align-items-stretch ">


        {/* REINTEGRO */}
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
            <h5 className="fw-bold mb-3 text-white">Mis Reintegros</h5>
            <div className="display-5 fw-bold text-white">1</div>

            {/* Botón */}
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
            <h5 className="fw-bold mb-3 text-white">Mis Turnos</h5>

            {ultimoTurno ? (
              <div className="display-5 fw-bold text-white">1</div>
            ) : (
              <div className="text-white mt-2">Sin turnos</div>
            )}

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
            <h5 className="fw-bold mb-3 text-white">Mis Recetas</h5>

            {ultimoTurno ? (
              <div className="display-5 fw-bold text-white">1</div>
            ) : (
              <div className="text-white mt-2">Sin recetas</div>
            )}

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
            <h5 className="fw-bold mb-3 text-white">Mis Autorizaciones</h5>
            <div className="display-5 fw-bold text-white">1</div>

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



      

     {/* CARRUSEL DE IMÁGENES DEL CENTRO MÉDICO */}
<div className="mt-5">
  <div
    id="centroMedicoCarousel"
    className="carousel slide position-relative"
    data-bs-ride="carousel"
  >
    {/* INDICADORES (puntitos) */}
    <div className="carousel-indicators">
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          key={i}
          type="button"
          data-bs-target="#centroMedicoCarousel"
          data-bs-slide-to={i}
          className={i === 0 ? "active" : ""}
          aria-current={i === 0 ? "true" : undefined}
        ></button>
      ))}
    </div>

    {/* IMÁGENES */}
    <div className="carousel-inner rounded shadow">
      {[1, 2, 3, 4, 5].map((n, index) => (
        <div
          key={n}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <img
            src={`/imagenes/centroMedico/${n}.jpg`}
            className="d-block w-100"
            alt={`Imagen ${n}`}
            style={{
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
            onError={(e) => { e.target.src = "/imagenes/centroMedico/placeholder.jpg" }}
          />
        </div>
      ))}
    </div>


  
  </div>
</div>

      {/* INFORMACIÓN ÚTIL */}
<div
  className="mt-5 p-4 rounded shadow-sm"
  style={{
    backgroundColor: "#c4d5f5ff",
    borderLeft: "6px solid #132074",
    textAlign: "left"
  }}
>
  <h4 className="fw-bold mb-3" style={{ color: "#132074" }}>
    Información Útil
  </h4>

  <ul style={{ lineHeight: "2", fontSize: "1rem", paddingLeft: "15px" }}>
    <div className="mb-3">
      <strong>📞 Emergencias médicas:</strong> 0800-122-122
    </div>
    <div className="mb-3">
      <strong>☎️ Atención al afiliado:</strong> 011-1212-1212
    </div>
    <div className="mb-3">
      <strong>⏰ Horario:</strong> Lunes a Viernes de 8:00 a 18:00 hs
    </div>
    
    <div className="mb-3">
<strong>📍 Dirección:</strong> Av. Siempre Viva 012, CABA    </div>
  </ul>
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
