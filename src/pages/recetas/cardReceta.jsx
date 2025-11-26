import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap"; 
import { calcularEdad } from "../../utils/utils";


export default function CardReceta({ receta, handleVer, handleRenovar, handleDescargar }) {
  const estadoColores = {
    "Recibido": { backgroundColor: "#90BFEA", color: "black" },
    "En análisis": { backgroundColor: "#c57020ff", color: "black" },
    "Observado": { backgroundColor: "#d1c629ff", color: "black" },
    "Aprobado": { backgroundColor: "#469F5E", color: "black" },
    "Rechazado": { backgroundColor: "#aa3737ff", color: "black" },
  };

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
  const desactivarBotonMenorDeEdad = calcularEdad(usuarioLogueado?.fechaDeNacimiento) <= 16;

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const fechaAprobacion = receta.fechaDeAprobacion || receta.fechaDeEmision || null;
  const fechaAMostrar = receta.estado === "Aprobado" ? formatFecha(fechaAprobacion) : "***";

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm" style={{ border: "1px solid #ccc" }}>

        {/* Franja superior con el estado */}
        <div
          style={{
            ...estadoColores[receta.estado],
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "0.5rem 1rem",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
          }}
        >
          {receta.estado}
        </div>

        <div className="card-body text-center">
          <h5 className="card-title fw-bold">
            {receta.nombreDelMedicamento} {" - "}
            <small className="text-muted">{fechaAMostrar}</small>
          </h5>

          <p className="text-muted mb-3">{receta.paciente}</p>

          <div className="d-flex justify-content-center flex-wrap gap-2">

            {/* ✔️ VER SIEMPRE DISPONIBLE */}
            <button
              className="btn btn-sm rounded-pill"
              style={{
                border: "1px solid black",
                color: "black",
                backgroundColor: "white",
                borderRadius: "50px",
                padding: "3px 12px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = "#c5c5c5ff"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
              onClick={() => handleVer(receta)}
            >
              Ver Detalle
            </button>
            {/* 🆕 RENOVAR SOLO SI ESTA APROBADO Y CON CONTROL DE EDAD */}
            {receta.estado === "Aprobado" && (
              desactivarBotonMenorDeEdad ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Debes ser mayor de 16 años de edad para renovar recetas
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <button
                      className="btn btn-sm rounded-pill"
                      style={{
                        border: "1px solid black",
                        color: "black",
                        backgroundColor: "white",
                        borderRadius: "50px",
                        padding: "3px 12px",
                        fontSize: "0.9rem",
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      Renovar
                    </button>
                  </span>
                </OverlayTrigger>
              ) : (
                <button
                  className="btn btn-sm rounded-pill"
                  style={{
                    border: "1px solid black",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "50px",
                    padding: "3px 12px",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = "#c5c5c5ff"; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
                  onClick={() => handleRenovar(receta)}
                >
                  Renovar
                </button>
              )
            )}
{/* ✔️ DESCARGAR SOLO SI ESTA APROBADO Y CON CONTROL DE EDAD */}
{receta.estado === "Aprobado" && (
  desactivarBotonMenorDeEdad ? (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          Debes ser mayor de 16 años de edad para descargar recetas
        </Tooltip>
      }
    >
      <span className="d-inline-block">
        <button
          className="btn btn-sm rounded-pill"
          style={{
            border: "1px solid black",
            color: "black",
            backgroundColor: "white",
            borderRadius: "50px",
            padding: "3px 12px",
            fontSize: "0.9rem",
            opacity: 0.6,
            cursor: "not-allowed",
          }}
          disabled
        >
          Descargar
        </button>
      </span>
    </OverlayTrigger>
  ) : (
    <button
      className="btn btn-sm rounded-pill"
      style={{
        border: "1px solid black",
        color: "black",
        backgroundColor: "white",
        borderRadius: "50px",
        padding: "3px 12px",
        fontSize: "0.9rem",
        transition: "all 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => { e.target.style.backgroundColor = "#c5c5c5ff"; }}
      onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
      onClick={() => handleDescargar(receta)}
    >
      Descargar
    </button>
  )
)}

          </div>

        </div>
      </div>
    </div>
  );
}
