import { useState } from "react";
import CardReceta from "./cardReceta";
import NuevaReceta from "./nuevaReceta";
import VerReceta from "./verReceta";
import RenovarReceta from "./renovarReceta";
import BuscarReceta from "./buscarReceta";
import { handleDescargar } from "./descargarReceta";

export default function Recetas() {

  // Array con integrantes de la cuenta (ejemplo)
  const integrantesCuenta = ["Juan Salvo", "Ana Salvo", "María Salvo"];

  // Array con datos de prueba
  const recetasAfiliado = [
    { id: 1, nombre: "Paracetamol 500 mg, Comprimidos × 15", paciente: "Juan Salvo", estado: "Pendiente", observaciones: "Tomar después de comer" },
    { id: 2, nombre: "Ibuprofeno 600 mg, Comprimidos × 30", paciente: "Juan Salvo", estado: "Pendiente", observaciones: "" },
    { id: 3, nombre: "Amoxicilina 250 mg, Jarabe × 1 Unidad", paciente: "Juan Salvo", estado: "Entregada", observaciones: "Conservar en heladera" },
    { id: 4, nombre: "Loratadina 10 mg, Comprimidos × 10", paciente: "Ana Salvo", estado: "Pendiente", observaciones: "Tomar por la mañana" },
    { id: 5, nombre: "Metformina 500 mg, Comprimidos × 20", paciente: "María Salvo", estado: "Entregada", observaciones: "No omitir comidas" },
    { id: 6, nombre: "Omeprazol 20 mg, Cápsulas × 14", paciente: "Ana Salvo", estado: "Entregada", observaciones: "Tomar antes de desayunar" },
  ];

  const [recetas, setRecetas] = useState(recetasAfiliado);

  // Estados
  const [searchTerm, setSearchTerm] = useState(""); 
  const [formData, setFormData] = useState({
    integrante: "",
    nombre: "",
    cantidad: 1,
    presentacion: "",
    observaciones: "",
  });
  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [recetaRenovar, setRecetaRenovar] = useState(null);

  // Filtra la receta
  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones para abrir modales
  const abrirModalVer = (receta) => {
    setRecetaSeleccionada(receta);
    const modalEl = document.getElementById("verRecetaModal");
    if (modalEl) {
      modalEl.classList.add("show");
      modalEl.setAttribute("aria-hidden", "false");
      modalEl.style.display = "block";
      document.body.classList.add("modal-open");

      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);
    }
  };

  const abrirModalRenovar = (receta) => {
    setRecetaRenovar(receta);
    const modalEl = document.getElementById("renovarRecetaModal");
    if (modalEl) {
      modalEl.classList.add("show");
      modalEl.setAttribute("aria-hidden", "false");
      modalEl.style.display = "block";
      document.body.classList.add("modal-open");

      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);
    }
  };

  return (
    <div className="container">

      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS RECETAS - Juan Salvo</h2>
        <button
          className="btn text-white px-4 py-2 fs-5"
          style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
          onMouseEnter={() => setHoverNueva(true)}
          onMouseLeave={() => setHoverNueva(false)}
          data-bs-toggle="modal"
          data-bs-target="#nuevaRecetaModal"
        >
          + Nueva Receta
        </button>
      </div>

      {/* mensaje de éxito sobre la lista */}
      {success && (
        <div className="alert alert-success text-center mb-4" role="alert">
          {success}
        </div>
      )}

      {/* componente buscar receta */}
      <BuscarReceta
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hoverBuscar={hoverBuscar}
        setHoverBuscar={setHoverBuscar}
      />

      {/* Listado de recetas */}
      <div className="row">
        {recetasFiltradas.map((receta) => (
          <CardReceta
            key={receta.id}
            receta={receta}
            handleVer={abrirModalVer}
            handleRenovar={abrirModalRenovar}
            handleDescargar={handleDescargar}
          />
        ))}
      </div>

      {/* Modales */}
      <NuevaReceta
        integrantesCuenta={integrantesCuenta}
        formData={formData}
        setFormData={setFormData}
        setRecetas={setRecetas}
        recetas={recetas}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
        hoverGuardar={hoverGuardar}
        setHoverGuardar={setHoverGuardar}
      />

      <VerReceta
        receta={recetaSeleccionada}
        setRecetaSeleccionada={setRecetaSeleccionada}
      />

      <RenovarReceta
        receta={recetaRenovar}
        formData={formData}
        setFormData={setFormData}
        setRecetas={setRecetas}
        recetas={recetas}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
        hoverGuardar={hoverGuardar}
        setHoverGuardar={setHoverGuardar}
      />

    </div>
  );
}
