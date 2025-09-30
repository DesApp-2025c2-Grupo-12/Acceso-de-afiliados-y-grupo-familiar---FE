import React from "react";

export default function CardAutorizacion({ autorizacion }) {
  // Badge según estado
  const badgeClass =
    autorizacion.estado === "Pendiente"
      ? "bg-warning text-dark"
      : "bg-success text-white";

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-start">
          <h5 className="card-title mb-3">{autorizacion.paciente}</h5>

          <p className="mb-1"><strong>Fecha prevista:</strong> {autorizacion.fecha}</p>
          <p className="mb-1"><strong>Integrante:</strong> {autorizacion.paciente}</p>
          <p className="mb-1"><strong>Médico:</strong> {autorizacion.medico}</p>
          <p className="mb-1"><strong>Especialidad:</strong> {autorizacion.especialidad}</p>
          <p className="mb-1"><strong>Lugar:</strong> {autorizacion.lugar}</p>
          <p className="mb-1"><strong>Días de internación:</strong> {autorizacion.internacion}</p>
          <p className="mb-1"><strong>Observaciones:</strong> {autorizacion.observaciones || "Ninguna"}</p>

          <div className="mt-3">
            <span className={`badge ${badgeClass} px-3 py-2`}>
              {autorizacion.estado}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
