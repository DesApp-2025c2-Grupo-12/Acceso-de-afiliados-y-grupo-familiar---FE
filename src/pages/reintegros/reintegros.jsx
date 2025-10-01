import React, { useState } from "react";
import { Card, Row, Col, Modal, Container } from "react-bootstrap";
import "./reintegros.css";

export default function Reintegros() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [reintegros, setReintegros] = useState([
        {
            id: 1,
            fecha: "Jueves 11 de Diciembre 2025",
            paciente: "Juan Salvo",
            medico: "Dr. Julio Cortés",
            especialidad: "Neurocirugía",
            monto: "$160.000",
            estado: "Pendiente",
        },
        {
            id: 2,
            fecha: "Miércoles 15 de Noviembre 2025",
            paciente: "Juan Salvo",
            medico: "Dr. Alejandra Pizarn",
            especialidad: "Psicóloga clínica",
            monto: "$32.000",
            estado: "Pago",
        },
    ]);

    const normalizar = (txt) =>
        txt.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    const term = normalizar(busqueda.trim());
    const reintegrosFiltrados = reintegros.filter((r) => {
        return (
            !term ||
            normalizar(r.paciente).includes(term) ||
            normalizar(r.medico).includes(term) ||
            normalizar(r.especialidad).includes(term) ||
            normalizar(r.fecha).includes(term) ||
            normalizar(r.estado).includes(term) ||
            normalizar(r.monto).includes(term)
        );
    });

    const grupoFamiliar = [
        { nombre: "Bianca Margarita", relacion: "Afiliado", DNI: "40260243" },
        { nombre: "Juan Pérez", relacion: "Cónyuge", DNI: "38265895" },
        { nombre: "Lucas Pérez", relacion: "Hijo", DNI: "48658945" },
        { nombre: "Sofía Pérez", relacion: "Hija", DNI: "50654965" },
    ];

    const agregarReintegro = (nuevo) => {
        setReintegros((prev) => [nuevo, ...prev]);
        alert("Reintegro guardado con éxito ✅");
    };

    const ModalNuevoReintegro = ({ modalAbierto, setModalAbierto, agregarReintegro, grupoFamiliar }) => {
        const [form, setForm] = useState({
            integranteDNI: "",
            fechaPrestacion: "",
            medico: "",
            especialidad: "",
            monto: "",
            descripcion: "",
            lugarAtencion: "",
            formaPago: "",
            cbuAlias: "",
            factura: null,
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0] || null;
            setForm((prev) => ({ ...prev, factura: file }));
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
                paciente: integrante.nombre,
                medico: form.medico,
                especialidad: form.especialidad,
                monto: form.monto,
                estado: "Pendiente",
                lugarAtencion: form.lugarAtencion,
                formaPago: form.formaPago,
                cbuAlias: form.cbuAlias,
                descripcion: form.descripcion,
            };

            agregarReintegro(nuevoReintegro);
            setModalAbierto(false);
            setForm({
                integranteDNI: "",
                fechaPrestacion: "",
                medico: "",
                especialidad: "",
                monto: "",
                descripcion: "",
                lugarAtencion: "",
                formaPago: "",
                cbuAlias: "",
                factura: null,
            });
        };

        return (
            <Modal show={modalAbierto} onHide={() => setModalAbierto(false)} size="lg" centered>
                <Modal.Header style={{ backgroundColor: "#132074", color: "white" }} closeButton closeVariant="white">
                    <Modal.Title>Nueva Solicitud de Reintegro</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Seleccionar integrante</label>
                        <select className="form-select" name="integranteDNI" value={form.integranteDNI} onChange={handleChange}>
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
                        <input type="text" placeholder="DD/MM/YYYY" className="form-control" name="fechaPrestacion" value={form.fechaPrestacion} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Médico</label>
                        <input type="text" className="form-control" name="medico" value={form.medico} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Especialidad</label>
                        <input type="text" className="form-control" name="especialidad" value={form.especialidad} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Monto</label>
                        <input type="text" className="form-control" name="monto" value={form.monto} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Lugar de atención</label>
                        <input type="text" className="form-control" name="lugarAtencion" value={form.lugarAtencion} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Forma de pago</label>
                        <input type="text" className="form-control" name="formaPago" value={form.formaPago} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">CBU / Alias</label>
                        <input type="text" className="form-control" name="cbuAlias" value={form.cbuAlias} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción (opcional)</label>
                        <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Factura / Comprobante (opcional)</label>
                        <input type="file" className="form-control" name="factura" onChange={handleFileChange} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Guardar
                    </button>
                </Modal.Footer>
            </Modal>
        );
    };

    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
    const [reintegroSeleccionado, setReintegroSeleccionado] = useState(null);


    const handleVerDetalle = (reintegro) => {
        setReintegroSeleccionado(reintegro);
        setModalDetalleAbierto(true);
    };


    const ModalDetalleReintegro = ({ show, onHide, reintegro }) => {
        if (!reintegro) return null;

        return (
            <Modal show={show} onHide={onHide} size="md" centered>
                <Modal.Header closeButton style={{ backgroundColor: "#132074", color: "white" }}>
                    <Modal.Title>Detalle del Reintegro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Paciente:</b> {reintegro.paciente}</p>
                    <p><b>Fecha:</b> {reintegro.fecha}</p>
                    <p><b>Médico:</b> {reintegro.medico}</p>
                    <p><b>Especialidad:</b> {reintegro.especialidad}</p>
                    <p><b>Monto:</b> {reintegro.monto}</p>
                    <p><b>Lugar de atención:</b> {reintegro.lugarAtencion}</p>
                    <p><b>Forma de pago:</b> {reintegro.formaPago}</p>
                    <p><b>CBU/Alias:</b> {reintegro.cbuAlias}</p>
                    {reintegro.descripcion && <p><b>Descripción:</b> {reintegro.descripcion}</p>}
                </Modal.Body>
            </Modal>
        );
    };

    return (
        <Container>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="titulo-reintegros">MIS REINTEGROS</h3>
                    <button className="miBotonReceta" onClick={() => setModalAbierto(true)}>
                        + Nuevo Reintegro
                    </button>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Buscar por paciente, médico, especialidad..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                {reintegrosFiltrados.length === 0 ? (
                    <h5>No se encontraron reintegros</h5>
                ) : (
                    reintegrosFiltrados.map((r) => (
                        <Card key={r.id} className="mb-3 card-reintegro">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col md={3}>
                                        <div className="monto">{r.monto}</div>
                                        <div className="fecha">{r.fecha}</div>
                                    </Col>

                                    <Col md={5}>
                                        <div className="paciente">{r.paciente}</div>
                                        <div className="datos-medico">
                                            <span>Médico: {r.medico}</span> |{" "}
                                            <span>Especialidad: {r.especialidad}</span>
                                        </div>
                                    </Col>

                                    <Col md={4} className="text-end">
                                        <div className={`estado ${r.estado === "Pendiente" ? "pendiente" : "pago"}`}>
                                            {r.estado}
                                        </div>
                                        <div className="acciones">
                                            <a href="#" onClick={() => handleVerDetalle(r)}>
                                                Ver detalle
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>

            <ModalNuevoReintegro
                modalAbierto={modalAbierto}
                setModalAbierto={setModalAbierto}
                grupoFamiliar={grupoFamiliar}
                agregarReintegro={agregarReintegro}
            />
            <ModalDetalleReintegro
                show={modalDetalleAbierto}
                onHide={() => setModalDetalleAbierto(false)}
                reintegro={reintegroSeleccionado}
            />
        </Container>
    );
}
