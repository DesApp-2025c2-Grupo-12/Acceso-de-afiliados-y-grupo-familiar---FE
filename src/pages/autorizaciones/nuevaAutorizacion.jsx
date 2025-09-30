import React from "react";

export default function NuevaAutorizacion({
  integrantesCuenta,
  formData,
  setFormData,
  setAutorizaciones,
  autorizaciones,
  error,
  setError,
  success,
  setSuccess,
  hoverGuardar,
  setHoverGuardar
}) {

  // Maneja cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Guardar nueva autorización
  const handleGuardar = () => {

    // Validación: todos los campos obligatorios
    if (!formData.fecha || !formData.paciente || !formData.medico || !formData.especialidad || !formData.lugar || !formData.internacion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const nuevaAutorizacion = {
      id: autorizaciones.length + 1,
      fecha: formData.fecha,
      paciente: formData.paciente,
      medico: formData.medico,
      especialidad: formData.especialidad,
      lugar: formData.lugar,
      internacion: formData.internacion,
      observaciones: formData.observaciones || "",
      estado: "Pendiente",
    };

    setAutorizaciones([...autorizaciones, nuevaAutorizacion]);

    // limpiar formulario
    setFormData({
      fecha: "",
      paciente: "",
      medico: "",
      especialidad: "",
      lugar: "",
      internacion: 1,
      observaciones: "",
    });

    setError(""); // limpia errores
    setSuccess("Su autorización se guardó correctamente!");
    setTimeout(() => setSuccess(""), 3000);

    // cerrar modal
    const modalEl = document.getElementById("nuevaAutorizacionModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.style.display = "none";
      document.body.classList.remove("modal-open");

      // eliminar backdrop
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
  };

  return (
    <div className="modal fade" id="nuevaAutorizacionModal" tabIndex="-1" aria-labelledby="nuevaAutorizacionModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="nuevaAutorizacionModalLabel">Nueva Autorización</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body">

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            <div className="mb-3">
              <label className="form-label">Fecha prevista para la prestación</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Integrante</label>
              <select
                className="form-select"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                {integrantesCuenta.map((i, idx) => (
                  <option key={idx} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Médico</label>
              <input
                type="text"
                className="form-control"
                name="medico"
                value={formData.medico}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Especialidad</label>
              <input
                type="text"
                className="form-control"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lugar donde se realizará la prestación</label>
              <input
                type="text"
                className="form-control"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Días de internación</label>
              <input
                type="number"
                className="form-control"
                name="internacion"
                value={formData.internacion}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea
                className="form-control"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
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
