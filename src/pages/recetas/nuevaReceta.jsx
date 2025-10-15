import React, { useEffect, useRef, forwardRef } from "react";
import { Modal } from "bootstrap";

export default function NuevaReceta({
  refModal,
  integrantesCuenta,
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
  const modalRef = useRef(null);   // 🔹 Ref interno
  const bsModal = useRef(null);    // 🔹 Instancia bootstrap

  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new Modal(modalRef.current, { backdrop: "static" });
      if (refModal) refModal.current = bsModal.current;
    }

    const handleShow = () => {
      const hoy = new Date().toISOString().split("T")[0];
      setFormData({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        fechaDeEmision: hoy,
        numeroDeDocumento: "",
        observaciones: "",
      });
    };

    modalRef.current?.addEventListener("show.bs.modal", handleShow);
    return () => modalRef.current?.removeEventListener("show.bs.modal", handleShow);
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    try {
      if (!formData.paciente || !formData.nombreDelMedicamento || !formData.numeroDeDocumento)
        throw new Error("Paciente, nombre del medicamento y documento son obligatorios");

      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(formData.nombreDelMedicamento))
        throw new Error("Nombre del medicamento inválido");

      if (!/^[0-9]{7,9}$/.test(formData.numeroDeDocumento))
        throw new Error("Número de documento inválido (7 a 9 dígitos)");

      if (formData.numeroDeDocumento !== formData.paciente)
        throw new Error("El número de documento debe coincidir con el integrante seleccionado");

      if (!integrantesCuenta || integrantesCuenta.length === 0)
        throw new Error("No se pudo cargar la información del grupo familiar");

      const recetaParaEnviar = { ...formData, estado: "Pendiente" };

      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaParaEnviar),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al crear receta");

      setRecetas(prev => [...prev, data]);
      setSuccess("Receta creada con éxito");
      setError("");

      setFormData({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        fechaDeEmision: "",
        numeroDeDocumento: "",
        observaciones: "",
      });

      bsModal.current?.hide();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess("");
    }
  };

  const hoy = new Date().toISOString().split("T")[0];

  return (
    <div className="modal fade" id="nuevaRecetaModal" ref={modalRef} tabIndex="-1" aria-labelledby="nuevaRecetaModalLabel" aria-hidden="true">
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
              <select className="form-select" name="paciente" value={formData.paciente} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                {integrantesCuenta.map((persona, idx) => (
                  <option key={idx} value={persona.numeroDeDocumento}>
                    {persona.nombre} {persona.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre de medicamento</label>
              <input type="text" className="form-control" name="nombreDelMedicamento" value={formData.nombreDelMedicamento} onChange={handleChange} maxLength={60} />
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input type="number" className="form-control" name="cantidad" value={formData.cantidad} onChange={handleChange} min={1} max={2} />
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
              <input type="date" className="form-control" name="fechaDeEmision" value={formData.fechaDeEmision} onChange={handleChange} min={hoy} max={hoy} />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Documento</label>
              <input type="text" className="form-control" name="numeroDeDocumento" value={formData.numeroDeDocumento} onChange={handleChange} placeholder="Solo números (7 a 9 dígitos)" inputMode="numeric" />
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" name="observaciones" value={formData.observaciones} onChange={handleChange} />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn text-white" style={{ backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074" }} onMouseEnter={() => setHoverGuardar(true)} onMouseLeave={() => setHoverGuardar(false)} onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
