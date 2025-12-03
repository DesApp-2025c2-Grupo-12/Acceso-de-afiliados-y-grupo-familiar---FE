import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./reintegros.css";
import ModalNuevoReintegro from "./ModalNuevoReintegro";
import ModalDetalleReintegro from "./ModalDetalleReintegro";
import CardReintegro from "./CardReintegro";
import BuscarReintegro from "./BuscarReintegro";
import { calcularEdad } from "../../utils/utils";

export default function Reintegros() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [reintegros, setReintegros] = useState([]);
    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");
    const [success, setSuccess] = useState("");
    const [desactivarBotonMenorDeEdad, setDesactivarBotonMenorDeEdad] = useState(null);
    const [grupoFamiliar, setGrupoFamiliar] = useState([]);
    const [estadoFilter, setEstadoFilter] = useState("Todos los estados");
    const [hoverBuscar, setHoverBuscar] = useState(false);
    const [reintegroSeleccionado, setReintegroSeleccionado] = useState(null);
    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

    const reintegrosFiltrados = reintegros.filter((r) => {
        const termino = busqueda.trim().toLowerCase();
        const camposBusqueda = [
            "nombreDelAfiliado",
            "nombreDelMedico",
            "especialidad"
        ];

        const coincideTexto = !termino || camposBusqueda.some(campo =>
            (r[campo] || "").toLowerCase().includes(termino)
        );
        
        const coincideEstado =
            estadoFilter === "Todos los estados" ||
            (r.estado || "").toLowerCase() === estadoFilter.toLowerCase();

        return coincideTexto && coincideEstado;
    });

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

    useEffect(() => {
        const fetchReintegros = async () => {
            try {
                const resPropio = await fetch(`http://localhost:3000/refund/refundAffiliate/${usuarioLogueado.id}`);
                if (!resPropio.ok) throw new Error("Error al cargar reintegros Propios");
                const dataPropio = await resPropio.json();

                const resHijos = await fetch(`http://localhost:3000/refund/refundChildren/${usuarioLogueado.id}`);
                if (!resHijos.ok) throw new Error("Error al cargar reintegros Hijos");
                const dataHijos = await resHijos.json();

                const reintegrosParaMostrar = [...dataPropio, ...dataHijos];
                setReintegros(reintegrosParaMostrar);
            } catch (err) {
                console.error("Error fetching reintegros:", err);
                setError("No se pudieron cargar los reintegros");
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
            setDesactivarBotonMenorDeEdad(true);
        } else {
            setDesactivarBotonMenorDeEdad(false);
        }
    }, []);

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
                {/* Header con botón */}
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

                <BuscarReintegro
                    searchTerm={busqueda}
                    setSearchTerm={setBusqueda}
                    estadoFilter={estadoFilter}
                    setEstadoFilter={setEstadoFilter}
                    hoverBuscar={hoverBuscar}
                    setHoverBuscar={setHoverBuscar}
                />

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                {reintegrosFiltrados.length === 0 ? (
                    <div className="col-12 d-flex flex-column align-items-center mt-4">
                        <div
                            className="fst-italic text-center"
                            style={{
                                color: "#001F87",
                                fontWeight: "500",
                                fontSize: "1.1rem",
                                border: "1px solid #001F87",
                                borderRadius: "50px",
                                padding: "0.8rem 1.5rem",
                                backgroundColor: "white",
                                display: "inline-block",
                            }}
                        >
                            No se encontraron reintegros que coincidan con tu búsqueda.
                        </div>
                    </div>
                ) : (
                    <Row>
                        {reintegrosFiltrados.map(reintegroFiltrado => (
                            <CardReintegro
                                key={reintegroFiltrado.id}
                                reintegroFiltrado={reintegroFiltrado}
                                seleccionarReintegro={setReintegroSeleccionado}
                                abrirModalDetalle={setModalDetalleAbierto}
                            />
                        ))}
                    </Row>
                )}
            </div>

            {/* Modales */}
            <ModalNuevoReintegro
                show={modalAbierto}
                onHide={() => setModalAbierto(false)}
                onSave={agregarReintegro}
                grupoFamiliar={grupoFamiliar}
                error={errorModal}
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