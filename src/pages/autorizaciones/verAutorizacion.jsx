import React, { useEffect, useState } from "react";

export default function VerAutorizacion({ autorizacion, setAutorizacionSeleccionada }) {
  const [show, setShow] = useState(false); 
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    if (autorizacion) {
      setMounted(true);            
      setTimeout(() => setShow(true), 50); 
    } else {
      setShow(false);
    }
  }, [autorizacion]);

  const cerrarModal = () => {
    setShow(false);
    setTimeout(() => setAutorizacionSeleccionada(null), 200); 
  };

  if (!mounted) return null;

  return (
    <>
      {/* Modal */}
      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "block" }} 
        tabIndex="-1"
        aria-labelledby="verAutorizacionModalLabel"
        aria-modal={show}
        role="dialog"
        onClick={cerrarModal} // click afuera cierra
      >
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <div className="modal-content">

            <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
              <h5 className="modal-title" id="verAutorizacionModalLabel">{autorizacion.paciente}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={cerrarModal} aria-label="Close"></button>
            </div>

            <div className="modal-body text-start">
              <p><strong>Fecha prevista:</strong> {autorizacion.fecha}</p>
              <p><strong>Integrante:</strong> {autorizacion.paciente}</p>
              <p><strong>Médico:</strong> {autorizacion.medico}</p>
              <p><strong>Especialidad:</strong> {autorizacion.especialidad}</p>
              <p><strong>Lugar:</strong> {autorizacion.lugar}</p>
              <p><strong>Días de internación:</strong> {autorizacion.internacion}</p>
              <p><strong>Observaciones:</strong> {autorizacion.observaciones || "Ninguna"}</p>
              <p><strong>Estado:</strong> {autorizacion.estado}</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
            </div>

          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className={`modal-backdrop fade ${show ? "show" : ""}`}></div>
    </>
  );
}
