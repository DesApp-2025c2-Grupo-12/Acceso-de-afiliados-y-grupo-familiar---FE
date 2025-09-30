import React, { useEffect } from "react";

export default function renovarReceta({
  receta,
  formData,
  setFormData,
  setRecetas,
  recetas,
  error,
  setError,
  success,
  setSuccess,
  hoverGuardar,
  setHoverGuardar
}) {

  // Precargar formulario con datos de la receta a renovar
  useEffect(() => {
    if (receta) {
      setFormData({
        integrante: receta.paciente,
        nombre: receta.nombre.split(",")[0], // solo nombre sin presentación y cantidad
        cantidad: parseInt(receta.nombre.split("×")[1]?.trim()) || 1,
        presentacion: receta.nombre.split(",")[1]?.split("×")[0]?.trim() || "",
        observaciones: receta.observaciones || "",
      });
    }
  }, [receta, setFormData]);

  // Maneja cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Cerrar modal de renovar
  const cerrarModalRenovar = () => {
    const modalEl = document.getElementById("renovarRecetaModal");
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

  // Guardar receta renovada
  const guardarRenovacion = () => {
    const cantidadNum = parseInt(formData.cantidad);

    // Validaciones
    if (!formData.integrante || !formData.nombre || !formData.presentacion) {
      setError("Todos los campos son obligatorios");
      return; // detiene la función si falta algún campo
    }

    if (cantidadNum < 1 || cantidadNum > 2) {
      setError("La cantidad debe ser 1 o 2");
      return;
    }

    const nuevaReceta = {
      id: recetas.length + 1,
      nombre: `${formData.nombre}, ${formData.presentacion} × ${formData.cantidad}`,
      paciente: formData.integrante,
      estado: "Pendiente",
      observaciones: formData.observaciones || "",
    };

    setRecetas([...recetas, nuevaReceta]);
    setError(""); // limpia errores
    setSuccess("Su receta se renovó correctamente!");
    setTimeout(() => setSuccess(""), 3000);

    cerrarModalRenovar(); // cierra modal
  };

  return (
    <div className="modal fade" id="renovarRecetaModal" tabIndex="-1" aria-labelledby="renovarRecetaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Header del modal */}
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="renovarRecetaModalLabel">Renovar Receta</h5>
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModalRenovar} aria-label="Close"></button>
          </div>

          {/* Body del modal */}
          <div className="modal-body">
            {/* Mensaje de error */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Formulario de renovación */}
            <div className="mb-3">
              <label className="form-label">Seleccionar integrante</label>
              <select
                className="form-select"
                name="integrante"
                value={formData.integrante}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                {["Juan Salvo", "Ana Salvo", "María Salvo"].map((integrante, index) => (
                  <option key={index} value={integrante}>{integrante}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre de medicamento</label>
              <input 
                type="text" 
                className="form-control" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
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
              <select
                className="form-select"
                name="presentacion"
                value={formData.presentacion}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                <option value="Comprimidos">Comprimidos</option>
                <option value="Jarabe">Jarabe</option>
                <option value="Gotas">Gotas</option>
                <option value="Otros">Otro</option>
              </select>
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

          {/* Footer del modal */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModalRenovar}>Cancelar</button>
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074" }}
              onMouseEnter={() => setHoverGuardar(true)}
              onMouseLeave={() => setHoverGuardar(false)}
              onClick={guardarRenovacion}
            >
              Guardar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
