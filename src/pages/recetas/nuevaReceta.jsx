import React, { useEffect, useRef } from "react";
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
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new Modal(modalRef.current, { backdrop: "static" });
      if (refModal) refModal.current = bsModal.current;
    }

    const handleShow = () => {
      setFormData({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        observaciones: "",
      });
    };

    modalRef.current?.addEventListener("show.bs.modal", handleShow);
    return () =>
      modalRef.current?.removeEventListener("show.bs.modal", handleShow);
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //Valida cantidad en frontend
    if (name === "cantidad") {
      const num = parseInt(value);
      if (isNaN(num) || num < 1 || num > 2) return;
    }

    //Limit observaciones a 300 caracteres
    if (name === "observaciones" && value.length > 300) return;

    setFormData({ ...formData, [name]: value });
  };

const handleGuardar = async () => {
  try {
    // Validaciones básicas
    if (!formData.paciente) throw new Error("Debe seleccionar un paciente");
    if (!formData.nombreDelMedicamento)
      throw new Error("Debe ingresar el nombre del medicamento");
    if (!formData.presentacion)
      throw new Error("Debe seleccionar la presentación");
    if (!formData.cantidad || formData.cantidad < 1 || formData.cantidad > 2)
      throw new Error("Cantidad inválida (mínimo 1, máximo 2)");
    if (!formData.observaciones)
      throw new Error("Debe ingresar observaciones");
    if (formData.observaciones.length > 300)
      throw new Error("Observaciones demasiado largas (máximo 300 caracteres)");
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(formData.nombreDelMedicamento))
      throw new Error(
        "Nombre del medicamento inválido (solo letras, números y espacios, máximo 60)"
      );

    if (!integrantesCuenta || integrantesCuenta.length === 0)
      throw new Error("No se pudo cargar la información del grupo familiar");

    // Traer paciente completo
    const pacienteSeleccionado = integrantesCuenta.find(
      (p) => p.numeroDeDocumento === formData.paciente
    );
    if (!pacienteSeleccionado)
      throw new Error("No se encontró el paciente seleccionado");

    const pacienteNombre = `${pacienteSeleccionado.nombre} ${pacienteSeleccionado.apellido}`;

    // 1️⃣ Traer todas las recetas desde el backend
    const responseFetch = await fetch("http://localhost:3000/recipes");
    if (!responseFetch.ok) throw new Error("Error al cargar recetas");
    const allRecetas = await responseFetch.json();

    // 2️⃣ Filtrar las del mismo paciente y mes actual
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    const recetasMes = allRecetas.filter((r) => {
      const fecha = new Date(r.createdAt || r.fechaDeEmision || hoy);
      return (
        r.numeroDeDocumento === formData.paciente &&
        fecha.getMonth() === mesActual &&
        fecha.getFullYear() === anioActual
      );
    });

    // 3️⃣ Validación de duplicado
    const recetaDuplicada = recetasMes.find(
      (r) =>
        r.nombreDelMedicamento.toLowerCase() ===
        formData.nombreDelMedicamento.toLowerCase()
    );
    if (recetaDuplicada) {
      throw new Error(
        `Ya existe una receta para "${formData.nombreDelMedicamento}" en este mes`
      );
    }

    // 4️⃣ Validación de cantidad total
    const totalCantidad = recetasMes
      .filter(
        (r) =>
          r.nombreDelMedicamento.toLowerCase() ===
          formData.nombreDelMedicamento.toLowerCase()
      )
      .reduce((sum, r) => sum + (r.cantidad || 0), 0);

    const cantidadTotal = totalCantidad + Number(formData.cantidad);
    if (cantidadTotal > 2) {
      throw new Error(
        `Este paciente ya tiene ${totalCantidad} unidades de "${formData.nombreDelMedicamento}" este mes (máximo 2)`
      );
    }

    // 5️⃣ Preparar receta para enviar
    const recetaParaEnviar = {
      paciente: pacienteNombre,
      nombreDelMedicamento: formData.nombreDelMedicamento,
      cantidad: formData.cantidad,
      presentacion: formData.presentacion,
      observaciones: formData.observaciones,
      estado: "Recibido",
      numeroDeDocumento: formData.paciente,
      affiliateId: pacienteSeleccionado.id, // clave FK correcta
    };

    // 6️⃣ Guardar en backend
    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recetaParaEnviar),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al crear receta");

    // 7️⃣ Actualizar estado y localStorage
    setRecetas((prev) => [...prev, data]);
    localStorage.setItem(
      "recetasCache",
      JSON.stringify([...recetasMes, data])
    );

    setSuccess("Receta creada con éxito");
    setError("");

    // 8️⃣ Reset del form
    setFormData({
      paciente: "",
      nombreDelMedicamento: "",
      cantidad: 1,
      presentacion: "",
      observaciones: "",
    });

    bsModal.current?.hide();
  } catch (err) {
    console.error(err);
    setError(err.message);
    setSuccess("");
  }
};


  return (
    <div
      className="modal fade"
      id="nuevaRecetaModal"
      ref={modalRef}
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
  {integrantesCuenta.map((persona, idx) => (
    <option key={idx} value={persona.numeroDeDocumento}>
      {persona.nombre} {persona.apellido} ({persona.parentesco})
    </option>
  ))}
</select>

            </div>

            <div className="mb-3">
              <label className="form-label">Nombre de medicamento</label>
              <input
                type="text"
                className="form-control"
                name="nombreDelMedicamento"
                value={formData.nombreDelMedicamento}
                placeholder="Ej: Ibuprofeno 600 mg x 30"
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
              <label className="form-label">Observaciones</label>
              <textarea
                className="form-control"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                maxLength={300}
                placeholder="Ingrese observaciones (máximo 300 caracteres)"
              />
            </div>
          </div>

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
              style={{
                backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074",
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
