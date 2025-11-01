import React from "react";

export default function CardReceta({ receta, handleVer, handleRenovar, handleDescargar }) {

  const estadoColores = {
  "Recibido": "bg-info text-dark",
  "En análisis": "bg-primary text-white",
  "Observado": "bg-warning text-dark",
  "Aprobado": "bg-success text-dark",
  "Rechazado": "bg-danger text-white",
};

const estadoClass = estadoColores[receta.estado] || "bg-secondary text-dark";


  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Mostrar fecha solo si está aprobada
  const fechaAMostrar = receta.estado === "Aprobado" ? formatFecha(receta.fechaDeEmision) : "***";


  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">

          <h5 className="card-title">
            {receta.nombreDelMedicamento} -{" "}
            <small className="text-muted">{fechaAMostrar}</small>
          </h5>

          <p className="text-muted mb-2">{receta.paciente}</p>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">

            <span className={`badge px-3 py-2 fs-6 ${estadoClass}`}>
              {receta.estado}
            </span>

            <div className="mt-2 mt-md-0">
              <button 
                className="btn btn-outline-dark btn-sm me-2" 
                onClick={() => handleVer(receta)}
              >
                Ver
              </button>

              <button 
                className="btn btn-outline-dark btn-sm me-2" 
                onClick={() => handleRenovar(receta)}
              >
                Renovar
              </button>

              <button 
                className="btn btn-outline-dark btn-sm" 
                onClick={() => handleDescargar(receta)}
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
