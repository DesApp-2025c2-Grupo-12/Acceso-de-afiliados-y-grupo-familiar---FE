import React from "react";

export default function CardReintegro({ reintegroFiltrado, seleccionarReintegro, abrirModalDetalle }) {

  const handleVerDetalle = (reintegro) => {
    seleccionarReintegro(reintegro);
    abrirModalDetalle(true);
  };

  const estadoColores = {
    "Recibido": { backgroundColor: "#90BFEA", color: "black" },
    "En análisis": { backgroundColor: "#c57020ff", color: "black" },
    "Observado": { backgroundColor: "#d1c629ff", color: "black" },
    "Aprobado": { backgroundColor: "#469F5E", color: "black" },
    "Rechazado": { backgroundColor: "#aa3737ff", color: "black" },
  };

  const estado = reintegroFiltrado.estado || "Recibido";

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES');
  };

  return (
    <div className=" col-12 col-sm-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm" style={{ border: "1px solid #ccc" }}>
        
        {/* Estado estilo receta */}
        <div
          style={{
            ...estadoColores[estado],
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "0.5rem 1rem",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
          }}
        >
          {estado}
        </div>

        <div className="card-body text-center">
          {/* Persona atendida - Persona que cobra (estilo nombre de receta) */}
          <h5 className="card-title fw-bold">
            <small className="text-muted">{reintegroFiltrado.nombreDelAfiliado}</small>
          </h5>

          {/* Fecha de factura (sin texto descriptivo, estilo receta) */}
          <p className="text-muted mb-3">
            {formatFecha(reintegroFiltrado.facturacion_Fecha)}
          </p>

          {/* Monto con estilo llamativo */}
          <div className="h4 text-success fw-bold mb-3">
            ${reintegroFiltrado.facturacion_ValorTotal}
          </div>

          {/* Botón Ver detalle */}
          <div className="d-flex justify-content-center">
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
              onClick={() => handleVerDetalle(reintegroFiltrado)}
            >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}