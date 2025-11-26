import React, { useEffect, useState } from "react";

export default function VerAutorizacion({
  autorizacion,
  setAutorizacionParaVer,
  setSuccess,
  setError, // viene del padre prop
  setAutorizaciones, // viene del padre prop
}) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [observacionText, setObservacionText] = useState("");

  const handleGuardarObservacion = async () => {
    if (!observacionText.trim()) {
      alert("Debe ingresar un texto de observación");
      return;
    }
    const currentUser = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
    const usuarioLogueadoId = currentUser.id;
    const targetAffiliateId = autorizacion.affiliateId;
    try {
      const res = await fetch(
        `http://localhost:3000/authorization/${autorizacion.id}/usuario/${usuarioLogueadoId}/afiliado/${targetAffiliateId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            observaciones: observacionText,
            estado: "En análisis",
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        const msg = errorData.error || errorData.message || `Error ${res.status}`;
        throw new Error(msg);
      }

      const data = await res.json();

      // Actualiza correctamente el estado
      setAutorizaciones((prev) =>
        prev.map((a) =>
          Number(a.id) === Number(data.id)
            ? { ...a, observaciones: data.observaciones, estado: data.estado }
            : a
        )
      );

      setSuccess("Observación guardada y estado actualizado a 'En análisis'");
      window.scrollTo({ top: 0, behavior: "smooth" }); // para que vuelva arriba y poder ver el msj
      setTimeout(() => setSuccess(""), 4000);

      setShow(false);
      setTimeout(() => setAutorizacionParaVer(null), 200);
    } catch (err) {
      console.error(err);
      setError(err.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShow(false);
    }
  };


  useEffect(() => {
    if (autorizacion) {
      setMounted(true);
      setTimeout(() => setShow(true), 50);
    } else {
      setShow(false);
    }
  }, [autorizacion]);

  const cerrarModal = () => {
    setShow(false);
    setTimeout(() => setAutorizacionParaVer(null), 200);
  };

  if (!mounted) return null;

  return (
    <>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "block" }}
        tabIndex="-1"
        aria-labelledby="verAutorizacionModalLabel"
        aria-modal={show}
        role="dialog"
        onClick={cerrarModal}
      >
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#132074", color: "white" }}
            >
              <h5 className="modal-title" id="verAutorizacionModalLabel">
                {autorizacion.paciente}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={cerrarModal}
              ></button>
            </div>

            <div className="modal-body text-start">
              <p>
                <strong>Estado:</strong> {autorizacion.estado}
              </p>
              <p>
                <strong>Médico:</strong> {autorizacion.medico}
              </p>
              <p>
                <strong>Especialidad:</strong> {autorizacion.especialidad}
              </p>
              <p>
                <strong>Lugar:</strong> {autorizacion.lugar}
              </p>
              <p>
                <strong>Días de internación:</strong> {autorizacion.internacion}
              </p>
              <p>
                <strong>Observaciones:</strong>{" "}
                {autorizacion.observaciones || "Ninguna"}
              </p>
              <p>
                <strong>Fecha prevista:</strong> {autorizacion.fecha}
              </p>

              {/* Si está Observada, permitir escribir motivo */}
              {autorizacion.estado === "Observada" && (
                <div className="mt-3">
                  <label className="form-label">Motivo de la observación</label>
                  <textarea
                    className="form-control"
                    value={observacionText}
                    onChange={(e) => setObservacionText(e.target.value)}
                    placeholder="Escriba el motivo..."
                    rows={3}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleGuardarObservacion}
                  >
                    Guardar
                  </button>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cerrarModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal-backdrop fade ${show ? "show" : ""}`}></div>
    </>
  );
}
