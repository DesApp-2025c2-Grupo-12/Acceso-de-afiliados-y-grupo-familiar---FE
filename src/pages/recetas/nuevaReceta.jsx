import React, { useEffect } from "react";

export default function NuevaReceta({
  integrantesCuenta,
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

  // Reinicia el formulario cada vez que se abre el modal
  useEffect(() => {
    const modalEl = document.getElementById("nuevaRecetaModal");
    if (!modalEl) return;

    const handleShow = () => {
      setFormData({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        fechaDeEmision: "",
        numeroDeDocumento: "",
        observaciones: ""
      });
      setError("");
    };

    modalEl.addEventListener("show.bs.modal", handleShow);
    return () => modalEl.removeEventListener("show.bs.modal", handleShow);
  }, [setFormData, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
  const cantidadNum = parseInt(formData.cantidad, 10);

  if (!formData.paciente || !formData.nombreDelMedicamento || !formData.presentacion) {
    setError("Todos los campos obligatorios deben completarse");
    return;
  }

  if (cantidadNum < 1 || cantidadNum > 2) {
    setError("La cantidad debe ser 1 o 2");
    return;
  }

    const nuevaReceta = {
      id: recetas.length + 1,
      nombre: `${formData.nombreDelMedicamento}, ${formData.presentacion} × ${formData.cantidad}`,
      paciente: formData.paciente,
      estado: "Pendiente",
      observaciones: formData.observaciones || "",
    };

    setRecetas([...recetas, nuevaReceta]);

    // Reiniciar formulario
    setFormData({
      paciente: "",
      nombreDelMedicamento: "",
      cantidad: 1,
      presentacion: "",
      fechaDeEmision: "",
      numeroDeDocumento: "",
      observaciones: ""
    });
    setError("");
    setSuccess("Su receta se guardó correctamente!");
    setTimeout(() => setSuccess(""), 3000);

    // Cerrar modal
    const modalEl = document.getElementById("nuevaRecetaModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.style.display = "none";
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
  };

  return (
    <div className="modal fade" id="nuevaRecetaModal" tabIndex="-1" aria-labelledby="nuevaRecetaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="nuevaRecetaModalLabel">Nueva Receta</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Seleccionar integrante</label>
              <select className="form-select" name="paciente" value={formData.paciente} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                {integrantesCuenta.map((i, idx) => <option key={idx} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre de medicamento</label>
              <input type="text" className="form-control" name="nombreDelMedicamento" value={formData.nombreDelMedicamento} onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input type="number" className="form-control" name="cantidad" value={formData.cantidad}  onChange={handleChange}
              min={1}
               max={2}   // maximo dos 
               />
            </div>

            <div className="mb-3">
              <label className="form-label">Presentación</label>
              <select className="form-select" name="presentacion" value={formData.presentacion} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option value="Comprimidos">Comprimidos</option>
                <option value="Jarabe">Jarabe</option>
                <option value="Gotas">Gotas</option>
                <option value="Otros">Otro</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de emisión</label>
              <input type="date" className="form-control" name="fechaDeEmision" value={formData.fechaDeEmision} onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Documento</label>
              <input type="text" className="form-control" name="numeroDeDocumento" value={formData.numeroDeDocumento} onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" name="observaciones" value={formData.observaciones} onChange={handleChange}/>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn text-white" style={{ backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074" }}
              onMouseEnter={() => setHoverGuardar(true)}
              onMouseLeave={() => setHoverGuardar(false)}
              onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
