import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./reintegros.css";
import { normalizar, coincide } from "../../utils/filtros";
import ModalNuevoReintegro from "./ModalNuevoReintegro";
import ModalDetalleReintegro from "./ModalDetalleReintegro";
import CardReintegro from "./CardReintegro";
import { calcularEdad } from "../../utils/utils";

export default function Reintegros() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [reintegros, setReintegros] = useState([]);
    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");
    const [success, setSuccess] = useState("");
    const [desactivarBotonMenorDeEdad, setDesactivarBotonMenorDeEdad] = useState(null)
    const [grupoFamiliar, setGrupoFamiliar] = useState([]);

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

    const term = normalizar(busqueda.trim());
    const camposBusqueda = [
        "nombreDelAfiliado",
        "nombreDelMedico",
        "especialidad",
        "facturacion_Fecha",
        "facturacion_ValorTotal"];

    const reintegrosFiltrados = reintegros.filter(
        (r) => !term || coincide(r, camposBusqueda, term)
    );


    const agregarReintegro = async (nuevoReintegro) => {
        try {
            const response = await fetch("http://localhost:3000/refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoReintegro)
            });

            const reintegroCreado = await response.json();

            if (!response.ok) {
                const mensajeError = reintegroCreado.message || reintegroCreado.error || `Error ${response.status}`;
                const detalleError = reintegroCreado.errors ? reintegroCreado.errors.join(". ") : "";
                throw new Error(`${mensajeError}${detalleError ? ": " + detalleError : ""}`);
            }

            setReintegros((prev) => [reintegroCreado, ...prev]);
            setSuccess("Reintegro guardado con éxito ✅");
            setModalAbierto(false);

        } catch (error) {
            console.error("Error completo:", error);
            if (error.message.includes("Solo puede gestionar para sus hijos menores")) {
                setModalAbierto(false);
                setError(error.message);
            } else {
                setError(error.message);
            }
        }
    };


    const [reintegroSeleccionado, setReintegroSeleccionado] = useState(null);
    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

    useEffect(() => {
        const fetchReintegros = async () => {
            try {
                const response = await fetch("http://localhost:3000/refund");
                if (!response.ok) throw new Error("Error al cargar reintegros");
                const data = await response.json();
                setReintegros(data);
            } catch (err) {
                console.error("Error fetching reintegros:", err);
                setError("No se pudieron cargar las reintegros");
            }

        };
        const fetchGrupoFamiliar = async () => {
            try {
                const response = await fetch(`http://localhost:3000/affiliate/grupo-familiar/${usuarioLogueado.numeroDeDocumento}`);
                if (!response.ok) throw new Error("Error al cargar grupo familiar");
                const data = await response.json();
                setGrupoFamiliar(data);
            } catch (err) {
                console.error("Error fetching grupo familiar:", err);
            }
        };

        fetchReintegros();
        fetchGrupoFamiliar();
        if (calcularEdad(usuarioLogueado.fechaDeNacimiento) <= 16) {
            setDesactivarBotonMenorDeEdad(true)
        } else {
            setDesactivarBotonMenorDeEdad(false)
        }
    }, [])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <Container>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="fw-bold text-dark fs-3 mb-0">MIS REINTEGROS</h3>
                    {desactivarBotonMenorDeEdad ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Debes ser mayor de 16 años de edad para crear un nuevo reintegro
                                </Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <button
                                    disabled={desactivarBotonMenorDeEdad}
                                    className={`miBotonBase ${desactivarBotonMenorDeEdad ? 'miBotonRecetaDisabled' : 'miBotonReceta'}`}
                                    onClick={() => setModalAbierto(true)}
                                >
                                    + Nuevo Reintegro
                                </button>
                            </span>
                        </OverlayTrigger>
                    ) : (
                        <button
                            className="miBotonBase miBotonReceta"
                            onClick={() => setModalAbierto(true)}
                        >
                            + Nuevo Reintegro
                        </button>
                    )}
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
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <Card.Body className="d-flex flex-column">
                    {reintegrosFiltrados.length === 0 ? (
                        <div className="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center">
                            <div>
                                <h5 className="text-muted mb-3">No se encontraron reintegros</h5>
                            </div>
                        </div>
                    ) : (
                        <Row>
                            <div className="row">
                                {reintegrosFiltrados.map(reintegroFiltrado => (
                                    <CardReintegro
                                        key={reintegroFiltrado.id}
                                        reintegroFiltrado={reintegroFiltrado}
                                        seleccionarReintegro={setReintegroSeleccionado}
                                        abrirModalDetalle={setModalDetalleAbierto}
                                    />
                                ))}
                            </div>
                        </Row>
                    )}
                </Card.Body>
            </div>

            <ModalNuevoReintegro
                show={modalAbierto}
                onHide={() => setModalAbierto(false)}
                onSave={agregarReintegro}
                grupoFamiliar={grupoFamiliar}
                error={errorModal}        // ← Usa errorModal
                setError={setErrorModal}
            />

            <ModalDetalleReintegro
                show={modalDetalleAbierto}
                onHide={() => setModalDetalleAbierto(false)}
                reintegroId={reintegroSeleccionado?.id}
            />
        </Container>
    );
}
