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
    // Campos obligatorios
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
    const pacienteNombre = pacienteSeleccionado
      ? `${pacienteSeleccionado.nombre} ${pacienteSeleccionado.apellido}`
      : "";

    // Validaciones de FRONT (para el mismo mes)
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    // Filtrar recetas del mismo paciente en el mes actual
    const recetasDelPaciente = JSON.parse(localStorage.getItem("recetasCache")) || [];

    const recetasMes = recetasDelPaciente.filter((r) => {
      const fecha = new Date(r.createdAt || r.fechaDeEmision || hoy);
      return (
        r.numeroDeDocumento === formData.paciente &&
        fecha.getMonth() === mesActual &&
        fecha.getFullYear() === anioActual
      );
    });

    // limite total de 30 recetas por mes
    if (recetasMes.length >= 30) {
      throw new Error(
        "Se ha alcanzado el límite de 30 recetas por mes para este paciente"
      );
    }

    // Verificar recetas idénticas (mismo medicamento)
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

    //Calcular total de unidades del mismo medicamento
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

   
  // Si pasa todo, enviar al backend
const recetaParaEnviar = {
  paciente: pacienteNombre,
  nombreDelMedicamento: formData.nombreDelMedicamento,
  cantidad: formData.cantidad,
  presentacion: formData.presentacion,
  observaciones: formData.observaciones,
  estado: "Recibido", // estado inicial actualizado
  numeroDeDocumento: "", // temporal para evitar el error
};


    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recetaParaEnviar),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al crear receta");

    // Actualizar lista para validaciones futuras
    setRecetas((prev) => [...prev, data]);
    const nuevoCache = [...recetasDelPaciente, data];
    localStorage.setItem("recetasCache", JSON.stringify(nuevoCache));

    setSuccess("Receta creada con éxito");
    setError("");

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
                    {persona.nombre} {persona.apellido}
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
