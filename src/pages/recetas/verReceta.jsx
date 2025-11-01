import React, { useEffect } from "react";
import { Modal } from "bootstrap";

export default function VerReceta({ receta, setRecetaSeleccionada }) {
  useEffect(() => {
    if (!receta) return;
    const modalEl = document.getElementById("verRecetaModal");
    const bsModal = new Modal(modalEl, { backdrop: "static" });
    bsModal.show();
  }, [receta]);

  const cerrarModalVer = () => {
    const modalEl = document.getElementById("verRecetaModal");
    Modal.getInstance(modalEl)?.hide();
    setRecetaSeleccionada(null);
  };

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="modal fade" id="verRecetaModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title w-100 text-center">
              {receta?.nombreDelMedicamento || "Detalle de la Receta"}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModalVer} />
          </div>

          <div className="modal-body">
            {receta && (
              <div className="container">
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Nombre de medicamento:</div>
                  <div className="col-7">{receta.nombreDelMedicamento || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Presentación:</div>
                  <div className="col-7">{receta.presentacion || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Paciente:</div>
                  <div className="col-7">{receta.paciente || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Número de Documento:</div>
                  <div className="col-7">{receta.numeroDeDocumento || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Cantidad:</div>
                  <div className="col-7">{receta.cantidad || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Estado:</div>
                  <div className="col-7">{receta.estado || "-"}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Fecha de emisión:</div>
                  <div className="col-7">
                    {receta.estado === "Aprobada" ? formatFecha(receta.fechaDeEmision) : "-"}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Observaciones:</div>
                  <div className="col-7">{receta.observaciones || "-"}</div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModalVer}>
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
