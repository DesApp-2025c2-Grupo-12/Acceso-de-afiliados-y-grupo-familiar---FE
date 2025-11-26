import React, { useState, useRef, useEffect } from "react";
import { formularioBase } from "../../utils/form";
import { Modal } from "react-bootstrap";

export default function ModalNuevoReintegro({
  show,
  onHide,
  onSave,
  grupoFamiliar = [],
  initialForm = formularioBase,
  error,
  setError
}) {
  const [form, setForm] = useState({ ...initialForm });
  const errorRef = useRef(null);
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? (files[0] || null) : value,
    }));
  };

  const handleSubmit = () => {
    try {
      // Validar campos obligatorios
      if (!form.integranteDNI) throw new Error("Debe seleccionar un integrante");
      if (!form.fechaPrestacion) throw new Error("Debe ingresar fecha de prestación");
      if (!form.facturacion_Cuit) throw new Error("Debe ingresar CUIT de facturación");
      if (!form.facturacion_Fecha) throw new Error("Debe ingresar fecha de facturación");
      if (!form.facturacion_NombreDePersonaACobrar) throw new Error("Debe ingresar nombre de persona a cobrar");
      if (!form.medico) throw new Error("Debe ingresar médico");
      if (!form.especialidad) throw new Error("Debe ingresar especialidad");
      if (!form.monto || form.monto <= 0) throw new Error("Debe ingresar un monto válido");
      if (!form.lugarAtencion) throw new Error("Debe ingresar lugar de atención");
      if (!form.formaPago) throw new Error("Debe seleccionar forma de pago");
      if (!form.cbuAlias) throw new Error("Debe ingresar CBU/Alias");

      const integrante = grupoFamiliar.find((m) => m.numeroDeDocumento === form.integranteDNI);
    

      const nuevoReintegro = {
        fechaDePrestacion: form.fechaPrestacion,
        nombreDelAfiliado: integrante ? `${integrante.nombre} ${integrante.apellido} (${integrante.parentesco})` : "",
        nombreDelMedico: form.medico,
        especialidad: form.especialidad,
        lugarDeAtencion: form.lugarAtencion,
        facturacion_Fecha: form.facturacion_Fecha,
        facturacion_Cuit: form.facturacion_Cuit,
        facturacion_ValorTotal: Number(form.monto),
        facturacion_NombreDePersonaACobrar: form.facturacion_NombreDePersonaACobrar || (integrante ? integrante.nombre : ""),
        formaDePago: form.formaPago,
        cbu: form.cbuAlias,
        observaciones: form.descripcion,
        usuarioLogueadoId: usuarioLogueado.id,
        affiliateId: integrante.id
      };

     

      onSave && onSave(nuevoReintegro);
      onHide && onHide();
      setForm({ ...initialForm });
    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header style={{ backgroundColor: "#132074", color: "white" }} closeButton closeVariant="white">
        <Modal.Title>Nueva Solicitud de Reintegro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div ref={errorRef}>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        {/* Campos existentes */}
        <div className="mb-3">
          <label className="form-label">Seleccionar integrante *</label>
          <select className="form-select" name="integranteDNI" value={form.integranteDNI} onChange={handleInputChange}>
            <option value="">Seleccionar...</option>
            {grupoFamiliar.map((miembro) => (
              <option key={miembro.numeroDeDocumento} value={miembro.numeroDeDocumento}>
                {miembro.nombre} {miembro.apellido} ({miembro.parentesco})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de la prestación *</label>
          <input
            type="date"
            className="w-100 p-2 border rounded bg-white text-black"
            style={{
              colorScheme: 'light'
            }}
            name="fechaPrestacion"
            value={form.fechaPrestacion}
            onChange={handleInputChange}
          />
        </div>

        {/* NUEVOS CAMPOS OBLIGATORIOS */}
        <div className="mb-3">
          <label className="form-label">CUIT de facturación *</label>
          <input
            type="text"
            placeholder="XX-XXXXXXXX-X"
            className="form-control"
            name="facturacion_Cuit"
            value={form.facturacion_Cuit}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label">Fecha de facturación *</label>
          <input
            type="date"
            className="w-100 p-2 border rounded bg-white text-black"
            style={{
              colorScheme: 'light'
            }}
            name="facturacion_Fecha"
            value={form.facturacion_Fecha}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre de persona a cobrar *</label>
          <input type="text" className="form-control" name="facturacion_NombreDePersonaACobrar" value={form.facturacion_NombreDePersonaACobrar} onChange={handleInputChange} placeholder="Nombre completo" />
        </div>

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
          <select className="form-select" name="formaPago" value={form.formaPago} onChange={handleInputChange}>
            <option value="">Seleccionar...</option>
            <option value="transferencia">Transferencia</option>
            <option value="deposito">Depósito</option>
            <option value="cheque">Cheque</option>
            <option value="efectivo">Efectivo</option>
          </select>
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