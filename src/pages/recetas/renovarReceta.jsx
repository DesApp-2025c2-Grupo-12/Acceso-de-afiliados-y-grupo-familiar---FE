import React, { useEffect } from "react";

export default function RenovarReceta({
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
        paciente: receta.paciente,
        nombreDelMedicamento: receta.nombreDelMedicamento,
        presentacion: receta.presentacion,
        cantidad: receta.cantidad,
        fechaDeEmision: receta.fechaDeEmision,
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

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
  };

  // Guardar receta renovada en DB
  const guardarRenovacion = async () => {
    try {
      const cantidadNum = parseInt(formData.cantidad);

      // Validaciones
      if (!formData.cantidad || !formData.fechaDeEmision) {
        setError("Cantidad y fecha de emisión son obligatorias");
        return;
      }

      if (cantidadNum < 1 || cantidadNum > 2) {
        setError("La cantidad debe ser 1 o 2");
        return;
      }

      // restriccion para no exceder mas de ds recetas al mes
      const fecha = new Date(formData.fechaDeEmision);
      const mes = fecha.getMonth();
      const año = fecha.getFullYear();

      const contador = recetas.filter(r =>
        r.nombreDelMedicamento === receta.nombreDelMedicamento &&
        new Date(r.fechaDeEmision).getMonth() === mes &&
        new Date(r.fechaDeEmision).getFullYear() === año
      ).reduce((acc, r) => acc + r.cantidad, 0);

      if (contador + cantidadNum > 2) {
        setError("No puede superar 2 recetas del mismo medicamento en el mismo mes");
        return;
      }

      const recetaRenovada = {
        nombreDelMedicamento: receta.nombreDelMedicamento,
        presentacion: receta.presentacion,
        paciente: receta.paciente,
        numeroDeDocumento: receta.numeroDeDocumento,
        fechaDeEmision: formData.fechaDeEmision,
        cantidad: cantidadNum,
        estado: "Pendiente",
        observaciones: receta.observaciones || "",
      };

      const response = await fetch("http://localhost:3000/recipes", { //REVISAR PUERTO
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaRenovada),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al renovar receta");
        setSuccess("");
        return;
      }

      setRecetas([...recetas, data]);
      setError("");
      setSuccess("Su receta se renovó correctamente!");
      setTimeout(() => setSuccess(""), 3000);

      cerrarModalRenovar();

    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
      setSuccess("");
    }
  };

  // Limites de fecha (mes actual o siguiente)
  const hoy = new Date();
  const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

  const minDate = inicioMesActual.toISOString().split("T")[0];
  const maxDate = finMesSiguiente.toISOString().split("T")[0];

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
            {error && <div className="alert alert-danger">{error}</div>}

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

