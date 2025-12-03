import React, { useEffect, useState } from "react";
import { Modal } from "bootstrap";

export default function VerReceta({
  receta,
  setRecetaSeleccionada,
  setSuccess,
  setError,
  cerrarYDesmontar
}) {
  const [hoverGuardar, setHoverGuardar] = useState(false);

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

  const handleGuardar = async () => {
    try {
      if (setSuccess) setSuccess("Observación guardada con éxito");
      if (setError) setError("");

      
      if (cerrarYDesmontar) {
        cerrarYDesmontar();
      } else {
        cerrarModalVer();
      }
    } catch (err) {
      if (setError) setError(err.message || "Error al guardar");
      if (setSuccess) setSuccess("");
    }
  };


  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";

    if (typeof fechaStr === "string" && fechaStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [a, m, d] = fechaStr.split("-");
      return `${d}/${m}/${a}`;
    }

    const fecha = new Date(fechaStr);
    return `${String(fecha.getDate()).padStart(2, "0")}/${String(
      fecha.getMonth() + 1
    ).padStart(2, "0")}/${fecha.getFullYear()}`;
  };

  const fechaAprobacion =
    receta?.fechaDeAprobacion || receta?.fechaDeEmision || null;

  return (
    <div className="modal fade" id="verRecetaModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div
            className="modal-header"
            style={{ backgroundColor: "#132074", color: "white" }}
          >
            <h5 className="modal-title me-auto">Detalles de la receta</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={cerrarModalVer}
            />
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
                  <div className="col-5 fw-bold">Afiliado:</div>
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
                  <div className="col-5 fw-bold">Fecha de aprobación:</div>
                  <div className="col-7">
                    {receta.estado === "Aprobado"
                      ? formatFecha(fechaAprobacion)
                      : "-"}
                  </div>
                </div>

                
                <div className="row mb-2 align-items-start">
                  <div className="col-5 fw-bold">Observación:</div>
                  <div className="col-7">
                    <textarea
                      className="form-control"
                      defaultValue={receta.observaciones || ""}
                      rows={3}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>

              </div>
            )}
          </div>


          <div className="modal-footer d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={cerrarModalVer}>
              Cerrar
            </button>

          
            <button
              className="btn text-white"
              style={{
                backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074"
              }}
              onMouseEnter={() => setHoverGuardar(true)}
              onMouseLeave={() => setHoverGuardar(false)}
              onClick={handleGuardar}
            >
              Guardar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
