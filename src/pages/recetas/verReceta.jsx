import React from "react";

export default function verReceta({ receta, setRecetaSeleccionada }) {

  const cerrarModalVer = () => {
    const modalEl = document.getElementById("verRecetaModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.style.display = "none";
      document.body.classList.remove("modal-open");

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
    setRecetaSeleccionada(null);
  };

  return (
    <div className="modal fade" id="verRecetaModal" tabIndex="-1" aria-labelledby="verRecetaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Header del modal */}
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title text-center w-100" id="verRecetaModalLabel">
              {receta?.nombre || "Detalle de la Receta"}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModalVer} aria-label="Close"></button>
          </div>

          {/* Body del modal */}
          <div className="modal-body">
            {receta && (
              <div className="container">
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Presentación:</div>
                  <div className="col-7">{receta.presentacion || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Paciente:</div>
                  <div className="col-7">{receta.paciente}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">DNI:</div>
                  <div className="col-7">{receta.dni || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Fecha de emisión:</div>
                  <div className="col-7">{receta.fechaEmision || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Cantidad:</div>
                  <div className="col-7">{receta.cantidad}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Estado:</div>
                  <div className="col-7">{receta.estado}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Observaciones:</div>
                  <div className="col-7">{receta.observaciones || "-"}</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer del modal */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModalVer}>Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  );
}
