import React, { useEffect } from "react";

export default function NuevaAutorizacion({
  showModal,
  setShowModal,
  integrantesCuenta,
  formData,
  setFormData,
  autorizaciones,
  setAutorizaciones,
  error,
  setError,
  success,
  setSuccess,
}) {

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fechaDePrestacion: formData.fecha,
        nombreDelAfiliado: formData.paciente,
        afiliadoId: formData.pacienteId || null,
        nombreDelMedico: formData.medico,
        especialidad: formData.especialidad,
        lugarDePrestacion: formData.lugar,
        diasDeInternacion: Number(formData.internacion),
        observaciones: formData.observaciones,
        estado: "Pendiente",
      };

      const res = await fetch("http://localhost:3000/authorization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

      setAutorizaciones([
        ...autorizaciones,
        {
          id: data.id || Date.now(),
          fecha: data.fechaDePrestacion,
          paciente: data.nombreDelAfiliado,
          medico: data.nombreDelMedico,
          especialidad: data.especialidad,
          estado: data.estado || "Pendiente",
        },
      ]);

      setSuccess("Autorización agregada correctamente");
      setError("");
      setFormData({
        fecha: "",
        paciente: "",
        pacienteId: "",
        medico: "",
        especialidad: "",
        lugar: "",
        internacion: 1,
        observaciones: "",
        tipodeAF: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess("");
    }
  };

  if (!showModal) return null;

  //  Calcula fecha mínima (hoy) y máxima (2 años desde hoy)
  const today = new Date().toISOString().split("T")[0];
  const twoYearsLater = new Date();
  twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);
  const maxDate = twoYearsLater.toISOString().split("T")[0];

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
            <h5 className="modal-title">Nueva Autorización</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                  min={today}
                  max={maxDate}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Integrante</label>
                <select
                  className="form-select"
                  value={formData.pacienteId || ""}
                  onChange={(e) => {
                    const i = integrantesCuenta.find(
                      (i) => String(i.id) === e.target.value
                    );
                    if (i)
                      setFormData({
                        ...formData,
                        pacienteId: i.id,
                        paciente: i.nombreCompleto,
                      });
                  }}
                  required
                >
                  <option value="">Seleccionar integrante</option>
                  {integrantesCuenta.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Médico</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.medico}
                  onChange={(e) =>
                    setFormData({ ...formData, medico: e.target.value })
                  }
                  required
                />
              </div>

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

              <div className="mb-3">
                <label>Lugar</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.lugar}
                  onChange={(e) =>
                    setFormData({ ...formData, lugar: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label>Días de internación</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.internacion}
                  onChange={(e) =>
                    setFormData({ ...formData, internacion: e.target.value })
                  }
                  min={1}
                  required
                />
              </div>

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
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
