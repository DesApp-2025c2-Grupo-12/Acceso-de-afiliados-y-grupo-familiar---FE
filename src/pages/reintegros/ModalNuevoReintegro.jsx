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
    // Validar campos obligatorios
    if (!form.integranteDNI || !form.monto || !form.facturacion_Cuit || !form.facturacion_Fecha) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const integrante = grupoFamiliar.find((m) => m.DNI === form.integranteDNI);

    // Convertir al formato que espera el backend
    const nuevoReintegro = {
      fechaDePrestacion: form.fechaPrestacion, // ← Ya viene en YYYY-MM-DD
      nombreDelAfiliado: integrante ? integrante.nombre : "",
      nombreDelMedico: form.medico,
      especialidad: form.especialidad,
      lugarDeAtencion: form.lugarAtencion,
      facturacion_Fecha: form.facturacion_Fecha, // ← Ya viene en YYYY-MM-DD
      facturacion_Cuit: form.facturacion_Cuit,
      facturacion_ValorTotal: Number(form.monto),
      facturacion_NombreDePersonaACobrar: form.facturacion_NombreDePersonaACobrar || (integrante ? integrante.nombre : ""),
      formaDePago: form.formaPago,
      cbu: form.cbuAlias,
      observaciones: form.descripcion
    };

    onSave && onSave(nuevoReintegro);
    onHide && onHide();
    setForm({ ...initialForm }); // Ya incluye los nuevos campos
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header style={{ backgroundColor: "#132074", color: "white" }} closeButton closeVariant="white">
        <Modal.Title>Nueva Solicitud de Reintegro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Campos existentes */}
        <div className="mb-3">
          <label className="form-label">Seleccionar integrante *</label>
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
          <label className="form-label">Fecha de la prestación *</label>
          <input
            type="date"
            className="form-control"
            name="fechaPrestacion"
            value={form.fechaPrestacion}
            onChange={handleInputChange}
          />
        </div>

        {/* NUEVOS CAMPOS OBLIGATORIOS */}
        <div className="mb-3">
          <label className="form-label">CUIT de facturación *</label>
          <input type="text" placeholder="XX-XXXXXXXX-X" className="form-control" name="facturacion_Cuit" value={form.facturacion_Cuit} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de facturación *</label>
          <input
            type="date"
            className="form-control"
            name="facturacion_Fecha"
            value={form.facturacion_Fecha}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre de persona a cobrar *</label>
          <input type="text" className="form-control" name="facturacion_NombreDePersonaACobrar" value={form.facturacion_NombreDePersonaACobrar} onChange={handleInputChange} placeholder="Nombre completo" />
        </div>

        {/* Campos existentes continuan... */}
        <div className="mb-3">
          <label className="form-label">Médico *</label>
          <input type="text" className="form-control" name="medico" value={form.medico} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Especialidad *</label>
          <input type="text" className="form-control" name="especialidad" value={form.especialidad} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Monto *</label>
          <input type="number" className="form-control" name="monto" value={form.monto} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Lugar de atención *</label>
          <input type="text" className="form-control" name="lugarAtencion" value={form.lugarAtencion} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Forma de pago *</label>
          <input type="text" className="form-control" name="formaPago" value={form.formaPago} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">CBU *</label>
          <input type="text" className="form-control" name="cbuAlias" value={form.cbuAlias} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción (opcional)</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Factura / Comprobante (opcional)</label>
          <input type="file" className="form-control" name="factura" onChange={handleInputChange} />
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