import React from "react";

export default function CardReceta({ receta, handleVer, handleRenovar, handleDescargar }) {

  // para cambiar el estado de la receta
  const estadoClass = receta.estado === "Pendiente" ? "bg-warning text-dark" : "bg-success text-dark";

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">

          {/* Nombre del medicmento */}
         <h5 className="card-title">{receta.nombreDelMedicamento}</h5>

          {/* Paciente */}
          <p className="text-muted mb-2">{receta.paciente}</p>

          {/* estado y botones */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">

            {/* Estado */}
            <span className={`badge px-3 py-2 fs-6 ${estadoClass}`}>
              {receta.estado}
            </span>

            {/* botons */}
            <div className="mt-2 mt-md-0">
              {/* botón de ver receta */}
              <button 
                className="btn btn-outline-dark btn-sm me-2" 
                onClick={() => handleVer(receta)}
              >
                Ver
              </button>

              {/* botón de rnovar receta */}
              <button 
                className="btn btn-outline-dark btn-sm me-2" 
                onClick={() => handleRenovar(receta)}
              >
                Renovar
              </button>

              {/* botón de descargar receta */}
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

