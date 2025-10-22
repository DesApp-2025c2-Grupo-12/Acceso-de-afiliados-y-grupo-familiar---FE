import { useState, useEffect } from "react";
import CardAutorizacion from "./cardAutorizacion";
import NuevaAutorizacion from "./nuevaAutorizacion";
import VerAutorizacion from "./verAutorizacion";
import BuscarAutorizacion from "./buscarAutorizacion";

export default function Autorizaciones() {
  const [autorizaciones, setAutorizaciones] = useState([]);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    paciente: "",
    medico: "",
    especialidad: "",
    lugar: "",
    internacion: 1,
    observaciones: "",
    tipodeAF: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autorizacionSeleccionada, setAutorizacionSeleccionada] = useState(null);

  const integrantesCuenta = ["Juan Salvo", "Ana Salvo", "María Salvo"];

  useEffect(() => {
    const fetchAutorizaciones = async () => {
      try {
        const response = await fetch("http://localhost:3000/authorization");
        if (!response.ok) {
          throw new Error("Error al obtener las autorizaciones");
        }

        const data = await response.json();
        console.log("Datos recibidos del backend:", data);

        const listaAdaptada = data.map((item) => ({
          id: item.id,
          fecha: item.fechaDePrestacion,
          paciente: item.nombreDelAfiliado,
          medico: item.nombreDelMedico,
          especialidad: item.especialidad,
          estado: item.estado || "Pendiente",
        }));

        setAutorizaciones(listaAdaptada);
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudieron cargar las autorizaciones");
      }
    };
    fetchAutorizaciones();
  }, []);

  // 🔍 Filtro por paciente o médico
  const autorizacionesFiltradas = autorizaciones.filter(
    (a) =>
      a.paciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.medico?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS AUTORIZACIONES</h2>
        <button
          className="btn text-white px-4 py-2 fs-5"
          style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
          onMouseEnter={() => setHoverNueva(true)}
          onMouseLeave={() => setHoverNueva(false)}
          data-bs-toggle="modal"
          data-bs-target="#nuevaAutorizacionModal"
        >
          + Nueva Autorización
        </button>
      </div>

      {error && (
        <div className="alert alert-danger text-center mb-4" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success text-center mb-4" role="alert">
          {success}
        </div>
      )}

      {/* Barra de búsqueda */}
      <BuscarAutorizacion
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hoverBuscar={hoverBuscar}
        setHoverBuscar={setHoverBuscar}
      />

      {/* Cards de autorizaciones */}
      <div className="row">
        {autorizacionesFiltradas.length > 0 ? (
          autorizacionesFiltradas.map((auto) => (
            <CardAutorizacion
              key={auto.id}
              autorizacion={auto}
              setAutorizacionSeleccionada={setAutorizacionSeleccionada}
            />
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No se encontraron autorizaciones.
          </p>
        )}
      </div>

      {/* Modal Nueva Autorización */}
      <NuevaAutorizacion
        integrantesCuenta={integrantesCuenta}
        formData={formData}
        setFormData={setFormData}
        autorizaciones={autorizaciones}
        setAutorizaciones={setAutorizaciones}
        hoverGuardar={hoverGuardar}
        setHoverGuardar={setHoverGuardar}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />

      {/* Modal Ver Autorización */}
      {autorizacionSeleccionada && (
        <VerAutorizacion
          autorizacion={autorizacionSeleccionada}
          setAutorizacionSeleccionada={setAutorizacionSeleccionada}
        />
      )}
    </div>
  );
}
