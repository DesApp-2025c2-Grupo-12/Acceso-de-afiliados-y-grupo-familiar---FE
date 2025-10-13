import { useState, useEffect } from "react";
import CardReceta from "./cardReceta";
import NuevaReceta from "./nuevaReceta";
import VerReceta from "./verReceta";
import RenovarReceta from "./renovarReceta";
import BuscarReceta from "./buscarReceta";
import { handleDescargar } from "./descargarReceta";

export default function Recetas() {
  const integrantesCuenta = ["Juan Salvo", "Ana Salvo", "María Salvo"];

  const [recetas, setRecetas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    paciente: "",
    nombreDelMedicamento: "",
    cantidad: 1,
    presentacion: "",
    fechaDeEmision: "",
    numeroDeDocumento: "",
    observaciones: ""
  });
  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [recetaRenovar, setRecetaRenovar] = useState(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes"); //VER PUERTO
        if (!response.ok) throw new Error("Error al cargar recetas");
        const data = await response.json();
        setRecetas(data); 
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las recetas");
      }
    };

    fetchRecetas();
  }, []);

  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombreDelMedicamento?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS RECETAS</h2>
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

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}

      <BuscarReceta
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hoverBuscar={hoverBuscar}
        setHoverBuscar={setHoverBuscar}
      />

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

