import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./reintegros.css";
import grupoFamiliarInicial from "../../data/grupoFamiliar.json";
import { normalizar, coincide } from "../../utils/filtros";
import ModalNuevoReintegro from "./ModalNuevoReintegro";
import ModalDetalleReintegro from "./ModalDetalleReintegro";
import CardReintegro from "./CardReintegro";

export default function Reintegros() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [reintegros, setReintegros] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

    const grupoFamiliar = grupoFamiliarInicial;

    const agregarReintegro = async (nuevoReintegro) => {
        try {
            const response = await fetch("http://localhost:3000/refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoReintegro)
            });

            if (!response.ok) throw new Error("Error al crear reintegro");

            const reintegroCreado = await response.json();
            setReintegros((prev) => [reintegroCreado, ...prev]);
            setSuccess("Reintegro guardado con éxito ✅"); // ← EN LUGAR DE alert()

        } catch (error) {
            console.error("Error completo:", error);
            setError("Error al guardar el reintegro ❌"); // ← EN LUGAR DE alert()
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
        fetchReintegros();
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
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <Card className="h-100 border shadow-sm">
                    <Card.Header className="bg-light">
                        <h4 className="mb-0">Todos los Reintegros</h4>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                        {reintegrosFiltrados.length === 0 ? (
                            <div className="text-center py-5 flex-grow-1 d-flex align-items-center justify-content-center">
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
                </Card>
            </div>

            <ModalNuevoReintegro
                show={modalAbierto}
                onHide={() => setModalAbierto(false)}
                onSave={agregarReintegro}
                grupoFamiliar={grupoFamiliar}
            />

            <ModalDetalleReintegro
                show={modalDetalleAbierto}
                onHide={() => setModalDetalleAbierto(false)}
                reintegro={reintegroSeleccionado}
            />
        </Container>
    );
}
