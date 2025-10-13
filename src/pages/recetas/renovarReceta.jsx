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
  useEffect(() => {
    if (receta) {
      setFormData({
        paciente: receta.paciente,
        nombreDelMedicamento: receta.nombreDelMedicamento,
        presentacion: receta.presentacion,
        cantidad: receta.cantidad,
        fechaDeEmision: receta.fechaDeEmision,
        observaciones: receta.observaciones || "",
        numeroDeDocumento: receta.numeroDeDocumento
      });
    }
  }, [receta, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const cerrarModalRenovar = () => {
    const modalEl = document.getElementById("renovarRecetaModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.style.display = "none";
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-backdrop")?.remove();
    }
  };

  const guardarRenovacion = async () => {
    try {
      // Validaciones
      const cantidadNum = parseInt(formData.cantidad);
      if (!formData.cantidad || !formData.fechaDeEmision)
        throw new Error("Cantidad y fecha de emisión son obligatorias");
      if (cantidadNum < 1 || cantidadNum > 2)
        throw new Error("La cantidad debe ser 1 o 2");
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(formData.nombreDelMedicamento))
        throw new Error("Nombre del medicamento inválido");
      if (!/^[0-9]{7,9}$/.test(formData.numeroDeDocumento))
        throw new Error("Número de documento inválido");

      // restricción para no exceder más de dos recetas al mes
      const fecha = new Date(formData.fechaDeEmision);
      const mes = fecha.getMonth();
      const año = fecha.getFullYear();

      const contador = recetas.filter(r =>
        r.nombreDelMedicamento === receta.nombreDelMedicamento &&
        new Date(r.fechaDeEmision).getMonth() === mes &&
        new Date(r.fechaDeEmision).getFullYear() === año
      ).reduce((acc, r) => acc + r.cantidad, 0);

      if (contador + cantidadNum > 2)
        throw new Error("No puede superar 2 recetas del mismo medicamento en el mismo mes");

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

      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaRenovada),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al renovar receta");

      setRecetas([...recetas, data]);
      setError("");
      setSuccess("Su receta se renovó correctamente!");
      setTimeout(() => setSuccess(""), 3000);

      cerrarModalRenovar();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess("");
    }
  };

  const hoy = new Date();
  const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
  const minDate = inicioMesActual.toISOString().split("T")[0];
  const maxDate = finMesSiguiente.toISOString().split("T")[0];

  return (
    <div className="modal fade" id="renovarRecetaModal" tabIndex="-1" aria-labelledby="renovarRecetaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
            <h5 className="modal-title" id="renovarRecetaModalLabel">Renovar Receta</h5>
            <button type="button" className="btn-close btn-close-white" onClick={cerrarModalRenovar} aria-label="Close"></button>
          </div>

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
