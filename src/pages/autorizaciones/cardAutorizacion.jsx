import React from "react";

export default function CardAutorizacion({ autorizacion, setAutorizacionSeleccionada }) {
  const estadoClass =
    autorizacion.estado === "Pendiente"
      ? "bg-warning text-dark"
      : autorizacion.estado === "Aprobado"
      ? "bg-success"
      : "bg-danger";

  return (
    <div className="col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <p><strong>Fecha:</strong> {autorizacion.fecha}</p>
            <p><strong>Paciente:</strong> {autorizacion.paciente}</p>
            <p><strong>Médico:</strong> {autorizacion.medico}</p>
            <p><strong>Especialidad:</strong> {autorizacion.especialidad}</p>
          </div>

          {/* Estado + botón Ver */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className={`badge px-3 py-2 fs-6 ${estadoClass}`}>
              {autorizacion.estado}
            </span>

            <button
              className="btn btn-outline-dark"
              style={{ padding: "6px 18px", fontSize: "0.95rem" }}
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
