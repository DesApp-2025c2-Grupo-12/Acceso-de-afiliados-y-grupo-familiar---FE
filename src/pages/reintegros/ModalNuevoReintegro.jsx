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
    const [form, setForm] = useState({
        ...initialForm,
        cuitParte1: "",
        cuitParte2: "",
        cuitParte3: ""
    });
    const errorRef = useRef(null);
    const cuitInput1Ref = useRef(null);
    const cuitInput2Ref = useRef(null);
    const cuitInput3Ref = useRef(null);
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
    useEffect(() => {
        if (show) {
            const hoy = new Date().toISOString().split('T')[0];
            setForm(prev => ({
                ...prev,
                fechaPrestacion: hoy,
                facturacion_Fecha: hoy,
                cuitParte1: "",
                cuitParte2: "",
                cuitParte3: ""
            }));
            setError("");
        }
    }, [show, setError]);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [error]);

    // Función para obtener el CUIT completo como STRING formateado
    const obtenerCUITCompleto = () => {
        return `${form.cuitParte1}-${form.cuitParte2}-${form.cuitParte3}`;
    };

    // Función para validar el CUIT completo
    const validarCUITCompleto = () => {
        const cuitCompleto = obtenerCUITCompleto();
        return cuitCompleto.length === 13; // "xx-xxxxxxxx-x" = 13 caracteres
    };

    const handleCUITChange = (e, parte) => {
        const { value } = e.target;

        // Permitir solo números
        const soloNumeros = value.replace(/\D/g, '');

        setForm(prev => {
            const nuevoForm = { ...prev };

            switch (parte) {
                case 1:
                    // Máximo 2 dígitos
                    if (soloNumeros.length <= 2) {
                        nuevoForm.cuitParte1 = soloNumeros;
                        // Auto-avanzar al siguiente campo
                        if (soloNumeros.length === 2) {
                            setTimeout(() => cuitInput2Ref.current?.focus(), 10);
                        }
                    }
                    break;

                case 2:
                    // Máximo 8 dígitos
                    if (soloNumeros.length <= 8) {
                        nuevoForm.cuitParte2 = soloNumeros;
                        // Auto-avanzar o retroceder
                        if (soloNumeros.length === 8) {
                            setTimeout(() => cuitInput3Ref.current?.focus(), 10);
                        } else if (soloNumeros.length === 0) {
                            setTimeout(() => cuitInput1Ref.current?.focus(), 10);
                        }
                    }
                    break;

                case 3:
                    // Máximo 1 dígito
                    if (soloNumeros.length <= 1) {
                        nuevoForm.cuitParte3 = soloNumeros;
                        // Retroceder si se borra
                        if (soloNumeros.length === 0) {
                            setTimeout(() => cuitInput2Ref.current?.focus(), 10);
                        }
                    }
                    break;
            }

            return nuevoForm;
        });
    };

    const handleInputChange = (e) => {
        const { name, type, value, files } = e.target;
        setForm((prev) => {
            const nuevoForm = {
                ...prev,
                [name]: type === "file" ? (files[0] || null) : value,
            };

            if (name === "fechaPrestacion" && value) {
                const hoy = new Date().toISOString().split('T')[0];
                const fechaPrestacion = value;

                if (!nuevoForm.facturacion_Fecha || nuevoForm.facturacion_Fecha < fechaPrestacion) {
                    nuevoForm.facturacion_Fecha = fechaPrestacion;
                }

                if (fechaPrestacion === hoy) {
                    nuevoForm.facturacion_Fecha = hoy;
                }
            }

            return nuevoForm;
        });


    };
    const hoy = new Date().toISOString().split('T')[0];

    const handleSubmit = () => {
        try {
            // Validar campos obligatorios
            if (!form.integranteDNI) throw new Error("Debe seleccionar un integrante");
            if (!form.fechaPrestacion) throw new Error("Debe ingresar fecha de prestación");
            // Validar CUIT
            if (!validarCUITCompleto()) {
                throw new Error("El CUIT debe estar completo (formato: XX-XXXXXXXX-X)");
            }
            if (!form.facturacion_Fecha) throw new Error("Debe ingresar fecha de facturación");
            if (!form.facturacion_NombreDePersonaACobrar) throw new Error("Debe ingresar nombre de persona a cobrar");
            if (!form.medico) throw new Error("Debe ingresar médico");
            if (!form.especialidad) throw new Error("Debe ingresar especialidad");
            if (!form.monto || form.monto <= 0) throw new Error("Debe ingresar un monto válido");
            if (!form.lugarAtencion) throw new Error("Debe ingresar lugar de atención");
            if (!form.formaPago) throw new Error("Debe seleccionar forma de pago");
            const cbuAlias = form.cbuAlias.trim();

            // Si son solo números, debe tener exactamente 22 dígitos
            if (/^\d+$/.test(cbuAlias)) {
                if (cbuAlias.length !== 22) {
                    throw new Error("El CBU debe contener exactamente 22 dígitos numéricos");
                }
            }
            // Si contiene letras o símbolos (alias), debe tener entre 5 y 30 caracteres
            else {
                if (cbuAlias.length < 5 || cbuAlias.length > 30) {
                    throw new Error("El Alias debe tener entre 5 y 30 caracteres");
                }
                if (!/^[a-zA-Z0-9\.\-]+$/.test(cbuAlias)) {
                    throw new Error("El Alias solo puede contener letras, números, puntos y guiones");
                }
            }

            const integrante = grupoFamiliar.find((m) => m.numeroDeDocumento === form.integranteDNI);

            const nuevoReintegro = {
                fechaDePrestacion: form.fechaPrestacion,
                nombreDelAfiliado: integrante ? `${integrante.nombre} ${integrante.apellido} (${integrante.parentesco})` : "",
                nombreDelMedico: form.medico,
                especialidad: form.especialidad,
                lugarDeAtencion: form.lugarAtencion,
                facturacion_Fecha: form.facturacion_Fecha,
                facturacion_Cuit: obtenerCUITCompleto(),
                facturacion_ValorTotal: Number(form.monto),
                facturacion_NombreDePersonaACobrar: form.facturacion_NombreDePersonaACobrar || (integrante ? integrante.nombre : ""),
                formaDePago: form.formaPago,
                cbu: cbuAlias,
                observaciones: form.descripcion,
                estado: "Recibido",
                usuarioLogueadoId: usuarioLogueado.id,
                affiliateId: integrante.id
            };
            onSave && onSave(nuevoReintegro);
            onHide && onHide();
            setForm({
                ...initialForm,
                cuitParte1: "",
                cuitParte2: "",
                cuitParte3: ""
            });
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
                        max={hoy}
                    />
                </div>

                {/* CAMPO CUIT MODIFICADO - 3 inputs separados */}
                <div className="mb-3">
                    <label className="form-label">CUIT de facturación *</label>
                    <div className="d-flex align-items-center">
                        <input
                            ref={cuitInput1Ref}
                            type="text"
                            placeholder="20"
                            className="form-control text-center"
                            style={{ width: "60px" }}
                            value={form.cuitParte1}
                            onChange={(e) => handleCUITChange(e, 1)}
                            maxLength={2}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                        <span className="mx-2">-</span>
                        <input
                            ref={cuitInput2Ref}
                            type="text"
                            placeholder="12345678"
                            className="form-control text-center"
                            style={{ width: "100px" }}
                            value={form.cuitParte2}
                            onChange={(e) => handleCUITChange(e, 2)}
                            maxLength={8}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                        <span className="mx-2">-</span>
                        <input
                            ref={cuitInput3Ref}
                            type="text"
                            placeholder="9"
                            className="form-control text-center"
                            style={{ width: "40px" }}
                            value={form.cuitParte3}
                            onChange={(e) => handleCUITChange(e, 3)}
                            maxLength={1}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </div>
                    <small className="form-text text-muted">
                        Se guardará como: <strong>{obtenerCUITCompleto() || "XX-XXXXXXXX-X"}</strong>
                    </small>
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
                        min={form.fechaPrestacion || hoy}
                        max={hoy}
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
                    <label className="form-label">CBU o Alias *</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cbuAlias"
                        value={form.cbuAlias}
                        onChange={handleInputChange}
                        placeholder="22 dígitos (CBU) o 5-30 caracteres (Alias)"
                    />
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