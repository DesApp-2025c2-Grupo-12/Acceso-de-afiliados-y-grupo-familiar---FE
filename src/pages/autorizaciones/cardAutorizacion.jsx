import React from "react";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function CardAutorizacion({
  autorizacion,
  setAutorizacionParaVer,
  onRequestDelete,
  onRequestEdit,
}) {
  const estadoClass =
    autorizacion.estado === "Recibido"
      ? "bg-info text-dark"
      : autorizacion.estado === "Aprobada"
      ? "bg-success text-dark"
      : autorizacion.estado === "Observada"
      ? "bg-warning text-dark"
      : autorizacion.estado === "En análisis"
      ? "bg-danger-subtle text-dark"
      : autorizacion.estado === "Rechazada"
      ? "bg-danger text-dark"
      : autorizacion.estado === "Pendiente"
      ? "bg-secondary text-white"
      : "bg-light text-dark";

  const detalles = [
    { label: "Fecha", value: autorizacion.fecha },
    { label: "Paciente", value: autorizacion.paciente },
    { label: "Médico", value: autorizacion.medico },
    { label: "Especialidad", value: autorizacion.especialidad },
  ];

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="position-relative h-100">

        <CardPersonalizada
          title={
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold"></span>
              <span className={`badge ${estadoClass} px-3 py-2`}>
                {autorizacion.estado}
              </span>
            </div>
          }
          subtitle={null}
          tipo={null}
          detalles={detalles}
          botonTexto="Ver detalle"
          onClick={() => setAutorizacionParaVer(autorizacion)}
          disableCardClick={true}
          cardOnClick={false}
        />
        
        {/* BOTONES */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            display: "flex",
            gap: "8px",
            zIndex: 300,
            pointerEvents: "auto",
          }}
        >
          {autorizacion.estado === "Recibido" && (
            <button
              type="button"
              className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onRequestEdit(autorizacion);
              }}
            >
              <i className="bi bi-pencil-square" />
            </button>
          )}

          {autorizacion.estado === "Recibido" && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
              onClick={(e) => {
                e.stopPropagation(); 
                onRequestDelete(autorizacion);
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
