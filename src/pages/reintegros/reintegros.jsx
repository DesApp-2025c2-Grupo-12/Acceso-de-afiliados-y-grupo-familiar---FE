import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoReintegro)
            });

            if (!response.ok) throw new Error("Error al crear reintegro");

            const reintegroCreado = await response.json();

            setReintegros((prev) => [reintegroCreado, ...prev]);
            alert("Reintegro guardado con éxito ✅");

        } catch (error) {
            console.error("Error completo:", error);
            alert("Error al guardar el reintegro ❌");
        }
    };

    const [reintegroSeleccionado, setReintegroSeleccionado] = useState(null);
    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

    // Fetch inicial de recetas y grupo familiar
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
                    reintegrosFiltrados.map(reintegroFiltrado => (
                        <>
                            <CardReintegro
                                reintegroFiltrado={reintegroFiltrado}
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
