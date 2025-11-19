import React, { useEffect, useState } from "react";

export default function EditarAutorizacion({
  showModal,
  setShowModal,
  data,
  integrantesCuenta,
  onUpdate,
  setSuccess,
  setError,
}) {
  const [formData, setFormData] = useState({
    fecha: "",
    paciente: "",
    pacienteId: "",
    medico: "",
    especialidad: "",
    lugar: "",
    internacion: 0,
    observaciones: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        fecha: data.fecha?.split("/").reverse().join("-") || "",
        paciente: data.paciente,
        pacienteId: data.pacienteId || "",
        medico: data.medico || "",
        especialidad: data.especialidad || "",
        lugar: data.lugar || "",
        internacion: data.internacion || 0,
        observaciones: data.observaciones || "",
      });
    }
  }, [data]);

  // fechas válidas
  const today = new Date().toISOString().split("T")[0];
  const twoYearsLater = new Date();
  twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);
  const maxDate = twoYearsLater.toISOString().split("T")[0];

  if (!showModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (!formData.fecha) return setError("La fecha es obligatoria");
    if (formData.fecha < today) return setError("La fecha no puede ser pasada");
    if (formData.fecha > maxDate) return setError("La fecha no puede superar los 2 años");
    if (!formData.pacienteId) return setError("Debe seleccionar un integrante");
    if (!formData.medico.trim()) return setError("Debe ingresar un médico");
    if (!formData.especialidad.trim()) return setError("Debe ingresar una especialidad");
    if (!formData.lugar.trim()) return setError("Debe ingresar un lugar");

    try {
      const payload = {
        affiliateId: formData.pacienteId,
        fechaDePrestacion: formData.fecha,
        nombreDelMedico: formData.medico,
        especialidad: formData.especialidad,
        lugarDePrestacion: formData.lugar,
        diasDeInternacion: Number(formData.internacion),
        observaciones: formData.observaciones,
        estado: "Pendiente",
      };

      const res = await fetch(`http://localhost:3000/authorization/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const updated = await res.json();

      if (!res.ok) {
        const msg = updated.message || updated.error || `Error ${res.status}`;
        throw new Error(msg);
      }

      // actualizar en lista
      onUpdate({
        id: data.id,
        fecha: formData.fecha.split("-").reverse().join("/"),
        paciente: formData.paciente,
        medico: formData.medico,
        especialidad: formData.especialidad,
        lugar: formData.lugar,
        internacion: formData.internacion,
        observaciones: formData.observaciones,
        estado: "Pendiente",
      });

      setSuccess("Autorización modificada correctamente y estado actualizado a 'Pendiente'");
      setError("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess("");
    }
  };

  // Fallback mientras llegan los integrantes
  const listaIntegrantes = integrantesCuenta.length > 0 
    ? integrantesCuenta 
    : [{ id: "", nombre: "Cargando...", apellido: "" }];

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#132074", color: "white" }}
          >
            <h5 className="modal-title">Editar Autorización</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* FECHA */}
              <div className="mb-3">
                <label>Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.fecha}
                  min={today}
                  max={maxDate}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  required
                />
              </div>

              {/* INTEGRANTE */}
              <div className="mb-3">
                <label>Integrante</label>
                <select
                  className="form-select"
                  value={formData.pacienteId}
                  onChange={(e) => {
                    const integrante = listaIntegrantes.find(
                      (i) => String(i.id) === String(e.target.value)
                    );
                    setFormData({
                      ...formData,
                      pacienteId: e.target.value,
                      paciente: integrante ? `${integrante.nombre} ${integrante.apellido}` : "",
                    });
                  }}
                >
                  <option value="">Seleccionar integrante</option>
                  {listaIntegrantes.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.nombre} {i.apellido}
                    </option>
                  ))}
                </select>
              </div>

              {/* MÉDICO */}
              <div className="mb-3">
                <label>Médico</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.medico}
                  onChange={(e) => setFormData({ ...formData, medico: e.target.value })}
                  required
                />
              </div>

              {/* ESPECIALIDAD */}
              <div className="mb-3">
                <label>Especialidad</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.especialidad}
                  onChange={(e) =>
                    setFormData({ ...formData, especialidad: e.target.value })
                  }
                  required
                />
              </div>

              {/* LUGAR */}
              <div className="mb-3">
                <label>Lugar</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.lugar}
                  onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                  required
                />
              </div>

              {/* INTERNACION */}
              <div className="mb-3">
                <label>Días de internación</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.internacion}
                  onChange={(e) =>
                    setFormData({ ...formData, internacion: Number(e.target.value) })
                  }
                  min={0}
                  required
                />
              </div>

              {/* OBSERVACIONES */}
              <div className="mb-3">
                <label>Observaciones</label>
                <textarea
                  className="form-control"
                  value={formData.observaciones}
                  onChange={(e) =>
                    setFormData({ ...formData, observaciones: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
