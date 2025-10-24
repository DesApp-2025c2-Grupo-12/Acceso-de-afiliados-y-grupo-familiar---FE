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
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
  const [formData, setFormData] = useState({
    fecha: "",
    paciente: "",
    pacienteId: "",
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

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAutorizaciones = async () => {
      try {
        const response = await fetch("http://localhost:3000/authorization");
        if (!response.ok) throw new Error("Error al obtener las autorizaciones");
        const data = await response.json();

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
        console.error(error);
        setError("No se pudieron cargar las autorizaciones");
      }
    };
    fetchAutorizaciones();
  }, []);

  useEffect(() => {
    const fetchIntegrantes = async () => {
      try {
        const res = await fetch("http://localhost:3000/affiliate");
        console.log("fetch /api/affiliates status:", res.status);
        if (!res.ok) throw new Error("Error al obtener los afiliados");
        const data = await res.json();
        console.log("Integrantes cargados (raw):", data);
        setIntegrantesCuenta(
          data.map(i => ({
            id: i.id,
            nombreCompleto: `${i.nombre} ${i.apellido}`,
          }))
        );
      } catch (err) {
        console.error("Error cargando integrantes:", err);
      }
    };
    fetchIntegrantes();
  }, []);

  // filtro
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
          onClick={() => setShowModal(true)} // abre modal
        >
          + Nueva Autorización
        </button>
      </div>

      {error && <div className="alert alert-danger text-center mb-4">{error}</div>}
      {success && <div className="alert alert-success text-center mb-4">{success}</div>}

      <BuscarAutorizacion
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hoverBuscar={hoverBuscar}
        setHoverBuscar={setHoverBuscar}
      />

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
          <p className="text-center text-muted mt-4">No se encontraron autorizaciones.</p>
        )}
      </div>

      {/* NUEVA AUTORIZACION */}
      <NuevaAutorizacion
        showModal={showModal}      
        setShowModal={setShowModal} 
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
        onIntegranteSelect={(id) => {
          const integrante = integrantesCuenta.find((i) => String(i.id) === String(id));
          if (integrante) {
            setFormData((prev) => ({
              ...prev,
              paciente: integrante.nombreCompleto,
              pacienteId: integrante.id,
            }));
          }
        }}
      />

      {autorizacionSeleccionada && (
        <VerAutorizacion
          autorizacion={autorizacionSeleccionada}
          setAutorizacionSeleccionada={setAutorizacionSeleccionada}
        />
      )}
    </div>
  );
}
