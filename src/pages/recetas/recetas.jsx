import { useState, useEffect, useRef } from "react";
import CardReceta from "./cardReceta";
import NuevaReceta from "./nuevaReceta";
import VerReceta from "./verReceta";
import RenovarReceta from "./renovarReceta";
import BuscarReceta from "./buscarReceta";
import { handleDescargar } from "./descargarReceta";

export default function Recetas() {
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
  const [alertaDescarga, setAlertaDescarga] = useState(""); // alerta de descarga
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [recetaRenovar, setRecetaRenovar] = useState(null);

  const nuevaRecetaRef = useRef(null); // Ref para modal nueva receta

  // Fetch inicial de recetas y grupo familiar
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

    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    setIntegrantesCuenta(grupoFamiliar);
  }, []);

  // Alertas temporales
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

  useEffect(() => {
    if (alertaDescarga) {
      const timer = setTimeout(() => setAlertaDescarga(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertaDescarga]);

  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombreDelMedicamento?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const abrirModalNuevaReceta = () => {
    nuevaRecetaRef.current?.show();
  };

  const abrirModalVer = (receta) => setRecetaSeleccionada(receta);
  const abrirModalRenovar = (receta) => setRecetaRenovar(receta);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS RECETAS</h2>
        <button
          className="btn text-white px-4 py-2 fs-5"
          style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
          onMouseEnter={() => setHoverNueva(true)}
          onMouseLeave={() => setHoverNueva(false)}
          onClick={abrirModalNuevaReceta}
        >
          + Nueva Receta
        </button>
      </div>

      {/* Mensajes temporales */}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}
      {alertaDescarga && <div className="alert alert-warning text-center">{alertaDescarga}</div>}

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
            handleDescargar={(r) => handleDescargar(r, setAlertaDescarga)}
          />
        ))}
      </div>

      <NuevaReceta
        refModal={nuevaRecetaRef}
        integrantesCuenta={integrantesCuenta}
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
