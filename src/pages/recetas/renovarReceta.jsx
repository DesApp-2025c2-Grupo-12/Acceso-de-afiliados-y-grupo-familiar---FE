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

    if (receta.estado !== "Aprobado") {
      setError("");
      setTimeout(() => {
        setError("Solo se pueden renovar recetas aprobadas");
      }, 10);
      setSuccess("");
      return;
    }

    setFormData({
      paciente: receta.paciente || "",
      nombreDelMedicamento: receta.nombreDelMedicamento || "",
      cantidad: receta.cantidad || 1,
      presentacion: receta.presentacion || "",
      observaciones: receta.observaciones || "",
    });

    setError("");
    setSuccess("");
    bsModal.current.show();
  }, [receta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cantidad") {
      const num = parseInt(value);
      if (isNaN(num) || num < 1 || num > 2) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    try {
      if (!formData.cantidad || formData.cantidad < 1 || formData.cantidad > 2) {
        throw new Error("Cantidad inválida (mínimo 1, máximo 2)");
      }

      // Traer recetas del paciente desde cache local
      const recetasDelPaciente = JSON.parse(localStorage.getItem("recetasCache")) || [];
      const hoy = new Date();
      const mesActual = hoy.getMonth();
      const anioActual = hoy.getFullYear();

      // Filtrar recetas del mismo paciente y mes actual, excluyendo la receta original
      const recetasMes = recetasDelPaciente.filter((r) => {
        const fecha = new Date(r.createdAt || r.fechaDeEmision || hoy);
        return (
          r.numeroDeDocumento === receta.numeroDeDocumento &&
          fecha.getMonth() === mesActual &&
          fecha.getFullYear() === anioActual &&
          r.id !== receta.id
        );
      });

      // Calcular total de unidades del mismo medicamento (solo recetas que no están aprobadas)
      const totalCantidad = recetasMes
        .filter(
          (r) =>
            r.nombreDelMedicamento.toLowerCase() ===
              formData.nombreDelMedicamento.toLowerCase() &&
            r.estado !== "Aprobado"
        )
        .reduce((sum, r) => sum + (r.cantidad || 0), 0);

      const cantidadTotal = totalCantidad + Number(formData.cantidad);
      if (cantidadTotal > 2) {
        throw new Error(
          `Este paciente ya tiene ${totalCantidad} unidades de "${formData.nombreDelMedicamento}" este mes (máximo 2)`
        );
      }

      // Construir objeto para enviar al backend
      const recetaRenovada = {
        paciente: formData.paciente,
        nombreDelMedicamento: formData.nombreDelMedicamento,
        cantidad: formData.cantidad,
        presentacion: formData.presentacion,
        observaciones: formData.observaciones,
        estado: "Recibido", // siempre recibido al renovar
        numeroDeDocumento: receta.numeroDeDocumento,
        affiliateId: receta.affiliateId,
        fechaDeEmision: new Date(), // nueva fecha de emisión
      };

      const response = await fetch(`http://localhost:3000/recipes/${receta.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaRenovada),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al renovar receta");

      // Actualizar lista de recetas
      setRecetas((prev) => prev.map((r) => (r.id === receta.id ? data : r)));

      // Actualizar cache local para futuras validaciones
      const nuevoCache = recetasDelPaciente.map((r) => (r.id === receta.id ? data : r));
      localStorage.setItem("recetasCache", JSON.stringify(nuevoCache));

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
          <div
            className="modal-header"
            style={{ backgroundColor: "#132074", color: "white" }}
          >
            <h5 className="modal-title" id="renovarRecetaModalLabel">
              Renovar Receta
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCancelar}
            />
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Nombre del medicamento</label>
              <input
                type="text"
                className="form-control"
                name="nombreDelMedicamento"
                value={formData.nombreDelMedicamento}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                className="form-control"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                min={1}
                max={2}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Presentación</label>
              <input
                type="text"
                className="form-control"
                name="presentacion"
                value={formData.presentacion}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Paciente</label>
              <input
                type="text"
                className="form-control"
                name="paciente"
                value={formData.paciente}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea
                className="form-control"
                name="observaciones"
                value={formData.observaciones}
                disabled
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
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
