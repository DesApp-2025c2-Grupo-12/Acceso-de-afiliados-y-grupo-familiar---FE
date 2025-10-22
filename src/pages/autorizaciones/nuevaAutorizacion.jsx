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
  setHoverGuardar,
}) {
  // Maneja cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Guardar nueva autorización (POST al backend)
  const handleGuardar = async () => {
    // Validación básica
    if (
      !formData.fecha ||
      !formData.paciente ||
      !formData.medico ||
      !formData.especialidad ||
      !formData.lugar ||
      !formData.internacion
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/authorization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechaDePrestacion: formData.fecha,
          nombreDelAfiliado: formData.paciente,
          nombreDelMedico: formData.medico,
          especialidad: formData.especialidad,
          lugarDePrestacion: formData.lugar,
          diasDeInternacion: formData.internacion,
          observaciones: formData.observaciones || "",
          estado: "Pendiente",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la autorización");
      }

      const nuevaAutorizacion = await response.json();

      // Agregar al estado local sin recargar la página
      setAutorizaciones((prev) => [
        ...prev,
        {
          id: nuevaAutorizacion.id,
          fecha: nuevaAutorizacion.fechaDePrestacion,
          paciente: nuevaAutorizacion.nombreDelAfiliado,
          medico: nuevaAutorizacion.nombreDelMedico,
          especialidad: nuevaAutorizacion.especialidad,
          estado: nuevaAutorizacion.estado || "Pendiente",
        },
      ]);

      setSuccess("Autorización creada correctamente");
      setError("");

      // Limpiar formulario
      setFormData({
        fecha: "",
        paciente: "",
        medico: "",
        especialidad: "",
        lugar: "",
        internacion: 1,
        observaciones: "",
      });

      // Cerrar modal automáticamente
      setTimeout(() => {
        const modalEl = document.getElementById("nuevaAutorizacionModal");
        if (modalEl) {
          const modal = window.bootstrap.Modal.getInstance(modalEl);
          modal?.hide();
        }
      }, 800);
    } catch (error) {
      console.error("Error al crear autorización:", error);
      setError("No se pudo crear la autorización. Intente nuevamente.");
    }
  };

  return (
    <div
      className="modal fade"
      id="nuevaAutorizacionModal"
      tabIndex="-1"
      aria-labelledby="nuevaAutorizacionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div
            className="modal-header"
            style={{ backgroundColor: "#132074", color: "white" }}
          >
            <h5 className="modal-title" id="nuevaAutorizacionModalLabel">
              Nueva Autorización
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">
                Fecha prevista para la prestación
              </label>
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
                  <option key={idx} value={i}>
                    {i}
                  </option>
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
              <label className="form-label">
                Lugar donde se realizará la prestación
              </label>
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
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
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
