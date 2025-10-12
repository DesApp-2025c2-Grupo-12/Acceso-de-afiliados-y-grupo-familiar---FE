import React, { useEffect } from "react";

export default function NuevaReceta({
  integrantesCuenta,
  formData,
  setFormData,
  setRecetas,
  handleAgregarReceta,
  error,
  setError,
  success,
  setSuccess,
  hoverGuardar,
  setHoverGuardar,
}) {
  // 🔹 Reinicia el formulario cada vez que se abre el modal
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
        observaciones: "",
      });
      setError("");
    };

    modalEl.addEventListener("show.bs.modal", handleShow);
    return () => modalEl.removeEventListener("show.bs.modal", handleShow);
  }, [setFormData, setError]);

  // 🔹 Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombreDelMedicamento") {
      const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{0,60}$/;
      if (!regex.test(value)) return;
    }

    if (name === "numeroDeDocumento") {
      const regex = /^[0-9]{0,9}$/;
      if (!regex.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Guardar receta
  const handleGuardar = async () => {
    try {
      const recetaParaEnviar = { ...formData, estado: "Pendiente" };

      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaParaEnviar),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al crear receta");
        setSuccess("");
        return;
      }

      // 🔹 Agregamos receta al listado
      if (handleAgregarReceta) handleAgregarReceta(data);
      else setRecetas(prev => [...prev, data]);

      setSuccess("Receta creada con éxito");
      setError("");

      // 🔹 Reiniciamos el formulario
      setFormData({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        fechaDeEmision: "",
        numeroDeDocumento: "",
        observaciones: "",
      });

      // 🔹 Cerramos modal
      const modalEl = document.getElementById("nuevaRecetaModal");
      if (modalEl) {
        modalEl.classList.remove("show");
        modalEl.style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop")?.remove();
      }

    } catch (error) {
      console.error(error);
      setError("Error de conexión con el servidor");
      setSuccess("");
    }
  };

  // 🔹 Límites de fecha
  const hoy = new Date();
  const mesAnterior = new Date();
  mesAnterior.setMonth(hoy.getMonth() - 1);
  const mesSiguiente = new Date();
  mesSiguiente.setMonth(hoy.getMonth() + 1);

  const minDate = mesAnterior.toISOString().split("T")[0];
  const maxDate = mesSiguiente.toISOString().split("T")[0];

  return (
    <div
      className="modal fade"
      id="nuevaRecetaModal"
      tabIndex="-1"
      aria-labelledby="nuevaRecetaModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#132074", color: "white" }}
          >
            <h5 className="modal-title" id="nuevaRecetaModalLabel">
              Nueva Receta
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Seleccionar integrante</label>
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
              <label className="form-label">
                Nombre de medicamento <small className="text-muted">(Ej: Ibuprofeno 600 mg x 30)</small>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombreDelMedicamento"
                value={formData.nombreDelMedicamento}
                onChange={handleChange}
                maxLength={60}
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
              <label className="form-label">Fecha de emisión</label>
              <input
                type="date"
                className="form-control"
                name="fechaDeEmision"
                value={formData.fechaDeEmision}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Documento</label>
              <input
                type="text"
                className="form-control"
                name="numeroDeDocumento"
                value={formData.numeroDeDocumento}
                onChange={handleChange}
                placeholder="Solo números (7 a 9 dígitos)"
                inputMode="numeric"
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

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
