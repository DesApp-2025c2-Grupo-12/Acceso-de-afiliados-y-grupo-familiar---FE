import { useState, useEffect } from "react";
import CardReceta from "./cardReceta";
import NuevaReceta from "./nuevaReceta";
import VerReceta from "./verReceta";
import RenovarReceta from "./renovarReceta";
import BuscarReceta from "./buscarReceta";
import { handleDescargar } from "./descargarReceta";

export default function Recetas() {
  // CAMBIO AQUI: carga dinámica de integrantesCuenta desde localStorage
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
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

  // Cargar recetas y grupo familiar al montar
  //SE CORRIGIO FETCH
 useEffect(() => {
  const fetchRecetas = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
      if (!response.ok) throw new Error("Error al cargar recetas");
      const data = await response.json();
      setRecetas(data);
    } catch (err) {
      console.error("Error fetching recetas:", err);
      setError("No se pudieron cargar las recetas");
    }
  };

  fetchRecetas();

     // Cargar grupo familiar
     //NUEVO AGREGO USUARIO LOGEADO(no es necesario ya era parte del grupo familiar segun armado de bd)
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || {};
  const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
  
  
  setIntegrantesCuenta(grupoFamiliar);

    /* console.log("Grupo Familiar cargado:", grupoFamiliar); */
  }, []);

  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombreDelMedicamento?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para ver receta
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

  // Abrir modal para renovar receta
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
        integrantesCuenta={integrantesCuenta} // 🔹 Dinámico desde localStorage
        formData={formData}
        setFormData={setFormData}
        setRecetas={setRecetas}
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
