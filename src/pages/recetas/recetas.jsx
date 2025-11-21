import { useState, useEffect, useRef } from "react";
import CardReceta from "./cardReceta";
import NuevaReceta from "./nuevaReceta";
import VerReceta from "./verReceta";
import RenovarReceta from "./renovarReceta";
import BuscarReceta from "./buscarReceta";
import { handleDescargar } from "./descargarReceta";
import { calcularEdad } from "../../utils/utils";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Recetas() {
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    paciente: "",
    nombreDelMedicamento: "",
    cantidad: 1,
    presentacion: "",
    observaciones: "",
  });
  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alertaDescarga, setAlertaDescarga] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [recetaRenovar, setRecetaRenovar] = useState(null);
  const [desactivarBotonMenorDeEdad, setDesactivarBotonMenorDeEdad] = useState(null)

  const nuevaRecetaRef = useRef(null);

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        if (!response.ok) throw new Error("Error al cargar recetas");
        const data = await response.json();
        setRecetas(data);
        // also cache for validations if you want
        localStorage.setItem("recetasCache", JSON.stringify(data));
      } catch (err) {
        console.error("Error fetching recetas:", err);
        setError("No se pudieron cargar las recetas");
      }
    };
    fetchRecetas();

    const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
    setIntegrantesCuenta(grupoFamiliar);
    if (calcularEdad(usuarioLogueado.fechaDeNacimiento) <= 16) {
      setDesactivarBotonMenorDeEdad(true)
    } else {
      setDesactivarBotonMenorDeEdad(false)
    }
  }, []);

  // alert timeouts (sin cambios)
  useEffect(() => { if (error) { const t = setTimeout(() => setError(""), 3000); return () => clearTimeout(t); } }, [error]);
  useEffect(() => { if (success) { const t = setTimeout(() => setSuccess(""), 3000); return () => clearTimeout(t); } }, [success]);
  useEffect(() => { if (alertaDescarga) { const t = setTimeout(() => setAlertaDescarga(""), 3000); return () => clearTimeout(t); } }, [alertaDescarga]);

  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombreDelMedicamento?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const abrirModalNuevaReceta = () => nuevaRecetaRef.current?.show();
  const abrirModalVer = (receta) => setRecetaSeleccionada(receta);

  // <<-- cambio clave: pasar una copia para forzar nueva referencia
  const abrirModalRenovar = (receta) => setRecetaRenovar(receta ? { ...receta } : null);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS RECETAS</h2>
        {desactivarBotonMenorDeEdad ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Debes ser mayor de 16 años de edad para crear una nueva receta
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <button
                disabled={desactivarBotonMenorDeEdad}
                className="btn text-white px-4 py-2 fs-5"
                style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
                onMouseEnter={() => setHoverNueva(true)}
                onMouseLeave={() => setHoverNueva(false)}
                onClick={abrirModalNuevaReceta}
              >
                + Nueva Receta
              </button>
            </span>
          </OverlayTrigger>
        ) : (
          <button
            className="btn text-white px-4 py-2 fs-5"
            style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
            onMouseEnter={() => setHoverNueva(true)}
            onMouseLeave={() => setHoverNueva(false)}
            onClick={abrirModalNuevaReceta}
          >
            + Nueva Receta
          </button>
        )}
      </div>

      {/* Mensajes */}
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
        setRecetaRenovar={setRecetaRenovar}
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
