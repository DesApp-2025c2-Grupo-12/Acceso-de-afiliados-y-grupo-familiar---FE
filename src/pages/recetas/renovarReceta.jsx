import React, { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";

export default function RenovarReceta({
  receta,
  formData,
  setFormData,
  setRecetas,
  error,
  setError,
  success,
  setSuccess,
  hoverGuardar,
  setHoverGuardar,
}) {
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    setIntegrantesCuenta(grupoFamiliar);

    if (modalRef.current) {
      bsModal.current = new Modal(modalRef.current, { backdrop: "static" });
    }
  }, []);

  useEffect(() => {
    if (!receta || !bsModal.current) return;

    if (receta.estado !== "Aprobada") {
      setError("Solo se pueden renovar recetas aprobadas");
      setSuccess("");
      return;
    }

    const hoy = new Date();
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

    let fechaOriginal = new Date(receta.fechaDeEmision);
    let nuevaFecha = new Date(
      fechaOriginal.getFullYear(),
      fechaOriginal.getMonth() + 1,
      fechaOriginal.getDate()
    );

    if (nuevaFecha < inicioMesActual) nuevaFecha = inicioMesActual;
    if (nuevaFecha > finMesSiguiente) nuevaFecha = finMesSiguiente;

    const fechaISO = nuevaFecha.toISOString().split("T")[0];

    setFormData({
      paciente: receta.paciente || "",
      nombreDelMedicamento: receta.nombreDelMedicamento || "",
      cantidad: receta.cantidad || 1,
      presentacion: receta.presentacion || "",
      fechaDeEmision: fechaISO,
      numeroDeDocumento: receta.numeroDeDocumento || "",
      observaciones: receta.observaciones || "",
    });

    setError("");
    setSuccess("");

    bsModal.current.show(); // ⬅️ Solo aquí se abre el modal
  }, [receta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cantidad") {
      if (isNaN(value) || value < 1 || value > 2) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    try {
      const recetaRenovada = { ...formData, estado: "Pendiente" };

      const response = await fetch(`http://localhost:3000/recipes/${receta.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaRenovada),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al renovar receta");

      setRecetas((prev) => prev.map((r) => (r.id === receta.id ? data : r)));
      setSuccess("Receta renovada con éxito");
      setError("");

      bsModal.current.hide();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess("");
    }
  };

  const handleCancelar = () => {
    bsModal.current?.hide();
  };

  return (
    <div
      className="modal fade"
      id="renovarRecetaModal"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="renovarRecetaModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="renovarRecetaModalLabel">Renovar Receta</h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleCancelar} />
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Nombre del medicamento</label>
              <input type="text" className="form-control" name="nombreDelMedicamento" value={formData.nombreDelMedicamento} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input type="number" className="form-control" name="cantidad" value={formData.cantidad} onChange={handleChange} min={1} max={2} />
            </div>

            <div className="mb-3">
              <label className="form-label">Presentación</label>
              <input type="text" className="form-control" name="presentacion" value={formData.presentacion} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de emisión</label>
              <input type="date" className="form-control" name="fechaDeEmision" value={formData.fechaDeEmision} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Paciente</label>
              <input type="text" className="form-control" name="paciente" value={formData.paciente} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de documento</label>
              <input type="text" className="form-control" name="numeroDeDocumento" value={formData.numeroDeDocumento} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" name="observaciones" value={formData.observaciones} disabled />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074" }}
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
