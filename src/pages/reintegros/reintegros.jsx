import React, { useState } from "react";
import { Card, Row, Col, Modal, Container } from "react-bootstrap";
import "./reintegros.css";
import grupoFamiliarInicial from "../../data/grupoFamiliar.json";
import reintegrosIniciales from "../../data/reintegros.json";
import { normalizar, coincide } from "../../utils/filtros";
import ModalNuevoReintegro from "./ModalNuevoReintegro";
import ModalDetalleReintegro from "./ModalDetalleReintegro";
import CardReintegro from "./CardReintegro";

export default function Reintegros() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [reintegros, setReintegros] = useState(reintegrosIniciales);

    const term = normalizar(busqueda.trim());
    const camposBusqueda = ["paciente", "medico", "especialidad", "fecha", "estado", "monto"];

    const reintegrosFiltrados = reintegros.filter(
        (r) => !term || coincide(r, camposBusqueda, term)
    );

    const grupoFamiliar = grupoFamiliarInicial;

    const agregarReintegro = (nuevo) => {
        setReintegros((prev) => [nuevo, ...prev]);
        alert("Reintegro guardado con éxito ✅");
    };
    
    const [reintegroSeleccionado, setReintegroSeleccionado] = useState(null);
    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

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
                    reintegrosFiltrados.map(reintegro => (
                        <>
                        <CardReintegro
                        reintegroFiltrado={reintegro}
                        seleccionarReintegro={setReintegroSeleccionado}
                        abrirModalDetalle={setModalDetalleAbierto}
                        ></CardReintegro>
                    </>
                    ))
                )}
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
