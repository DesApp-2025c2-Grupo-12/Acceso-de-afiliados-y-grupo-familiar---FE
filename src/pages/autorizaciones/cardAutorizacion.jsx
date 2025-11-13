import React from "react";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function CardAutorizacion({
  autorizacion,
  setAutorizacionSeleccionada,
  onRequestDelete, // ahora esto abre el modal en el padre
}) {
  const estadoClass =
    autorizacion.estado === "Pendiente"
      ? "bg-info text-dark"
      : autorizacion.estado === "Aprobada"
      ? "bg-success text-dark" 
      : autorizacion.estado === "Observada"
      ? "bg-warning text-dark" 
      : autorizacion.estado === "En análisis"
      ? "bg-danger-subtle text-dark" 
      : autorizacion.estado === "Rechazada"  
      ? "bg-danger text-dark" 
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
          onClick={() => setAutorizacionSeleccionada(autorizacion)}
        />

        {/* Tachito ABSOLUTO abajo-izquierda */}
        <button
          type="button"
          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
          title="Eliminar autorización"
          onClick={(e) => {
            e.stopPropagation(); // evita que se abra el detalle
            onRequestDelete(autorizacion); // paso el objeto completo para mostrar info en el modal
          }}
          style={{
            position: "absolute",
            left: "12px",
            bottom: "12px",
            padding: "4px 8px",
            zIndex: 5,
            borderRadius: "6px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            transition: "transform .08s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <i className="bi bi-trash" aria-hidden="true" /> 
        </button>
      </div>
    </div>
  );
}
