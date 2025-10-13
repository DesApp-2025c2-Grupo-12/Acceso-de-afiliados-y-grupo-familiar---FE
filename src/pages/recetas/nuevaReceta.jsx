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
  // reinicia el formulario cada vez que se abre el modal
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación en tiempo real
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

  // Validar si el DNI coincide con el paciente seleccionado
  const documentoValido = () => {
    const dni = formData.numeroDeDocumento;
    const nombre = formData.paciente?.split(" ")[0];
    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    return grupoFamiliar.some(
      (persona) =>
        persona.numeroDeDocumento == dni &&
        persona.nombre.toLowerCase() === nombre?.toLowerCase()
    );
  };

  const handleGuardar = async () => {
    try {
      // Validaciones finales antes de enviar
      if (!formData.paciente || !formData.nombreDelMedicamento || !formData.numeroDeDocumento) {
        throw new Error("Paciente, nombre del medicamento y documento son obligatorios");
      }

      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(formData.nombreDelMedicamento)) {
        throw new Error("Nombre del medicamento inválido");
      }

      if (!/^[0-9]{7,9}$/.test(formData.numeroDeDocumento)) {
        throw new Error("Número de documento inválido (7 a 9 dígitos)");
      }

      if (!documentoValido()) {
        throw new Error("El documento ingresado no pertenece al afiliado seleccionado");
      }

      const recetaParaEnviar = { ...formData, estado: "Pendiente" };

      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaParaEnviar),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al crear receta");

      if (handleAgregarReceta) handleAgregarReceta(data);
      else setRecetas(prev => [...prev, data]);

      setSuccess("Receta creada con éxito");
      setError("");

      // reinicia el formulario
      setFormData({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        fechaDeEmision: "",
        numeroDeDocumento: "",
        observaciones: "",
      });

      // cerrar modal
      const modalEl = document.getElementById("nuevaRecetaModal");
      if (modalEl) {
        modalEl.classList.remove("show");
        modalEl.style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop")?.remove();
      }

    } catch (error) {
      console.error(error);
      setError(error.message);
      setSuccess("");
    }
  };

  // Limites de fecha
  const hoy = new Date();
  const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
  const minDate = inicioMesActual.toISOString().split("T")[0];
  const maxDate = finMesSiguiente.toISOString().split("T")[0];

  return (
    <div className="modal fade" id="nuevaRecetaModal" tabIndex="-1" aria-labelledby="nuevaRecetaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="nuevaRecetaModalLabel">Nueva Receta</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
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
              <label className="form-label">Nombre de medicamento <small className="text-muted">(Ej: Ibuprofeno 600 mg x 30)</small></label>
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
