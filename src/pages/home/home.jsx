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


    </div>
  );
}
