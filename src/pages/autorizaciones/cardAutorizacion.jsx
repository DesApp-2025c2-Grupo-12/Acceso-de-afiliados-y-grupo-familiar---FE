import React from "react";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function CardAutorizacion({ autorizacion, setAutorizacionSeleccionada }) {
  const estadoClass =
    autorizacion.estado === "Pendiente"
      ? "bg-warning text-dark"
      : autorizacion.estado === "Aprobado"
      ? "bg-success"
      : autorizacion.estado === "Observada"
      ? "bg-secondary text-light"
      : "bg-danger text-light";

  const detalles = [
    { label: "Fecha", value: autorizacion.fecha },
    { label: "Paciente", value: autorizacion.paciente },
    { label: "Médico", value: autorizacion.medico },
    { label: "Especialidad", value: autorizacion.especialidad },
  ];

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <CardPersonalizada
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Autorización</span>
            <span className={`badge ${estadoClass} px-3 py-2`}>{autorizacion.estado}</span>
          </div>
        }
        subtitle={null}
        tipo={null}
        detalles={detalles}
        botonTexto="Ver detalle"
        onClick={() => setAutorizacionSeleccionada(autorizacion)}
      />
    </div>
  );
}