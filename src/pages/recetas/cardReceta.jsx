import React from "react";

export default function CardReceta({ receta, handleVer, handleRenovar, handleDescargar }) {

  // Clase para el estado
  const estadoClass = receta.estado === "Pendiente" ? "bg-warning text-dark" : "bg-success text-dark";

  // Función para formatear fecha
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">

          {/* Nombre del medicamento y fecha de emisión */}
          <h5 className="card-title">
            {receta.nombreDelMedicamento} -{" "}
            <small className="text-muted">{formatFecha(receta.fechaDeEmision)}</small>
          </h5>

          {/* Paciente */}
          <p className="text-muted mb-2">{receta.paciente}</p>

          {/* Estado y botones */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">

            {/* Estado */}
            <span className={`badge px-3 py-2 fs-6 ${estadoClass}`}>
              {receta.estado}
            </span>

            {/* Botones */}
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

