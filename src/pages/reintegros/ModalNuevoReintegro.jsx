import React, { useState } from "react";
import { formularioBase } from "../../utils/form";
import { Modal } from "react-bootstrap";

export default function ModalNuevoReintegro({
  show,
  onHide,
  onSave,
  grupoFamiliar = [],
  initialForm = formularioBase,
}) {
  const [form, setForm] = useState({ ...initialForm });

  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? (files[0] || null) : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.integranteDNI || !form.monto) {
      alert("Por favor selecciona un integrante y completa el monto.");
      return;
    }

    const integrante = grupoFamiliar.find((m) => m.DNI === form.integranteDNI);

    const nuevoReintegro = {
      id: Date.now(),
      fecha: form.fechaPrestacion,
      paciente: integrante ? integrante.nombre : "",
      medico: form.medico,
      especialidad: form.especialidad,
      monto: form.monto,
      estado: "Pendiente",
      lugarAtencion: form.lugarAtencion,
      formaPago: form.formaPago,
      cbuAlias: form.cbuAlias,
      descripcion: form.descripcion,
    };

    onSave && onSave(nuevoReintegro);

    onHide && onHide();
    setForm({ ...initialForm });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header style={{ backgroundColor: "#132074", color: "white" }} closeButton closeVariant="white">
        <Modal.Title>Nueva Solicitud de Reintegro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Seleccionar integrante</label>
          <select className="form-select" name="integranteDNI" value={form.integranteDNI} onChange={handleInputChange}>
            <option value="">Seleccionar...</option>
            {grupoFamiliar.map((miembro) => (
              <option key={miembro.DNI} value={miembro.DNI}>
                {miembro.nombre} — {miembro.relacion}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de la prestación</label>
          <input type="text" placeholder="DD/MM/YYYY" className="form-control" name="fechaPrestacion" value={form.fechaPrestacion} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Médico</label>
          <input type="text" className="form-control" name="medico" value={form.medico} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Especialidad</label>
          <input type="text" className="form-control" name="especialidad" value={form.especialidad} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input type="text" className="form-control" name="monto" value={form.monto} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Lugar de atención</label>
          <input type="text" className="form-control" name="lugarAtencion" value={form.lugarAtencion} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Forma de pago</label>
          <input type="text" className="form-control" name="formaPago" value={form.formaPago} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">CBU / Alias</label>
          <input type="text" className="form-control" name="cbuAlias" value={form.cbuAlias} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción (opcional)</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleInputChange}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Factura / Comprobante (opcional)</label>
          <input type="file" className="form-control" name="factura" onChange={handleInputChange}/>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Guardar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
