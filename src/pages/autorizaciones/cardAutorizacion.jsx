import React from "react";

export default function CardAutorizacion({ autorizacion, setAutorizacionSeleccionada }) {
  return (
    <div className="col-md-6 mb-4">
      <div className="card recetaCard h-100">
        <div className="card-body p-3 text-start">

          <p><strong>Fecha:</strong> {autorizacion.fecha}</p>
          <p><strong>Paciente:</strong> {autorizacion.paciente}</p>
          <p><strong>Médico:</strong> {autorizacion.medico}</p>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span
              className={`badge px-3 py-2 ${
                autorizacion.estado === "Pendiente"
                  ? "bg-warning text-dark"
                  : autorizacion.estado === "Aprobado"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {autorizacion.estado}
            </span>

            <button
              className="btn btn-sm btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#verAutorizacionModal"
              onClick={() => setAutorizacionSeleccionada(autorizacion)}
            >
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
