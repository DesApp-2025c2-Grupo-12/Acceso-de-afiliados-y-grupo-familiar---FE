import React, { useEffect, useState } from "react";

export default function RenovarReceta({
  receta,
  setRecetaRenovar,
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
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false); // controla animación
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

  // guardo valores previos del body para restaurar luego
  const prevBodyStateRef = React.useRef({ overflow: "", paddingRight: "" });

  // Cuando llega `receta`, cargar datos y animar apertura
  useEffect(() => {
    if (!receta) return;

    setFormData({
      paciente: receta.paciente || "",
      nombreDelMedicamento: receta.nombreDelMedicamento || "",
      cantidad: receta.cantidad ?? 1,
      presentacion: receta.presentacion || "",
      observaciones: receta.observaciones || "",
      
    });

    // calcular ancho del scrollbar y guardar estado previo
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // ancho de scrollbar: diferencia entre innerWidth y clientWidth
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

    // aplicar bloqueo de scroll y compensación para evitar salto
    document.body.style.overflow = "hidden";
    // si ya tenía paddingRight inline lo respetamos guardándolo y luego restauramos
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    prevBodyStateRef.current = { overflow: prevOverflow, paddingRight: prevPaddingRight };

    // Mostrar modal con fade
    setVisible(true);
    // pequeña demora para que el fade funcione
    setTimeout(() => setFade(true), 10);

    return () => {
      // cleanup: restaurar estilos previos del body
      document.body.style.overflow = prevBodyStateRef.current.overflow || "";
      document.body.style.paddingRight = prevBodyStateRef.current.paddingRight || "";
    };

  }, [receta]);

  const cerrarYDesmontar = () => {
    setFade(false); 

    setTimeout(() => {
      setVisible(false);

  
      document.body.style.overflow = prevBodyStateRef.current.overflow || "";
      document.body.style.paddingRight = prevBodyStateRef.current.paddingRight || "";

      if (typeof setRecetaRenovar === "function") setRecetaRenovar(null);
    }, 250); 
  };

  if (!receta) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cantidad") {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 1 || num > 2) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelar = () => {
    setError("");
    setSuccess("");
    cerrarYDesmontar();
  };

  const handleGuardar = async () => {
    try {
      if (!formData.cantidad || formData.cantidad < 1 || formData.cantidad > 2) {
        throw new Error("Cantidad inválida (mínimo 1, máximo 2)");
      }

      const recetasDelPaciente = JSON.parse(localStorage.getItem("recetasCache")) || [];
      const hoy = new Date();
      const mes = hoy.getMonth();
      const anio = hoy.getFullYear();

      const recetasMes = recetasDelPaciente.filter((r) => {
        const fecha = new Date(r.createdAt || r.fechaDeEmision || hoy);
        return (
          r.numeroDeDocumento === receta.numeroDeDocumento &&
          fecha.getMonth() === mes &&
          fecha.getFullYear() === anio &&
          r.id !== receta.id
        );
      });

      const totalCantidad = recetasMes
        .filter(
          (r) =>
            r.nombreDelMedicamento?.toLowerCase() ===
            formData.nombreDelMedicamento?.toLowerCase() &&
            r.estado !== "Aprobado"
        )
        .reduce((s, r) => s + (r.cantidad || 0), 0);

      if (totalCantidad + Number(formData.cantidad) > 2) {
        throw new Error(
          `El paciente ya tiene ${totalCantidad} unidades este mes (máximo 2)`
        );
      }

      const recetaNueva = {
        paciente: formData.paciente,
        nombreDelMedicamento: formData.nombreDelMedicamento,
        cantidad: formData.cantidad,
        presentacion: formData.presentacion,
        observaciones: formData.observaciones,
        estado: "Recibido",
        numeroDeDocumento: receta.numeroDeDocumento,
        affiliateId: receta.affiliateId,
        fechaDeEmision: new Date(),
      };

      const resp = await fetch(`http://localhost:3000/recipes/${receta.id}/usuario/${usuarioLogueado.id}/afiliado/${receta.affiliateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaNueva),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Error al renovar receta");

      setRecetas((prev) => prev.map((r) => (r.id === receta.id ? data : r)));

      try {
        const cache = JSON.parse(localStorage.getItem("recetasCache")) || [];
        const nuevo = cache.map((r) => (r.id === receta.id ? data : r));
        localStorage.setItem("recetasCache", JSON.stringify(nuevo));
      } catch {}

      setSuccess("Receta renovada con éxito");
      setError("");

      cerrarYDesmontar();
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <>

      {visible && (
        <div
          className={`modal-backdrop fade ${fade ? "show" : ""}`}
          style={{ zIndex: 1040 }}
        />
      )}

 
      <div
        className={`modal fade ${fade ? "show d-block" : "d-block"}`}
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#132074", color: "white" }}
            >
              <h5 className="modal-title">Renovar Receta</h5>
              <button className="btn-close btn-close-white" onClick={handleCancelar} />
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label className="form-label">Nombre del medicamento</label>
                <input className="form-control" value={formData.nombreDelMedicamento} disabled />
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
                <input className="form-control" value={formData.presentacion} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Paciente</label>
                <input className="form-control" value={formData.paciente} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Observaciones</label>
                <textarea className="form-control" value={formData.observaciones} disabled />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCancelar}>
                Cancelar
              </button>

              <button
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
    </>
  );
}
