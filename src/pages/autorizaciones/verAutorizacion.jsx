import React from "react";

export default function VerAutorizacion({ autorizacion, setAutorizacionSeleccionada }) {
  const cerrarModalVer = () => {
    const modalEl = document.getElementById("verAutorizacionModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.style.display = "none";
      document.body.classList.remove("modal-open");

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
    setAutorizacionSeleccionada(null);
  };

  return (
    <div className="modal fade" id="verAutorizacionModal" tabIndex="-1" aria-labelledby="verAutorizacionModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="verAutorizacionModalLabel">{autorizacion?.paciente}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModalVer} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body text-start">
            {autorizacion && (
              <>
                <p><strong>Fecha prevista:</strong> {autorizacion.fecha}</p>
                <p><strong>Integrante:</strong> {autorizacion.paciente}</p>
                <p><strong>Médico:</strong> {autorizacion.medico}</p>
                <p><strong>Especialidad:</strong> {autorizacion.especialidad}</p>
                <p><strong>Lugar:</strong> {autorizacion.lugar}</p>
                <p><strong>Días de internación:</strong> {autorizacion.internacion}</p>
                <p><strong>Observaciones:</strong> {autorizacion.observaciones || "Ninguna"}</p>
                <p><strong>Estado:</strong> {autorizacion.estado}</p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModalVer}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
